const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

class Element {
  constructor() { this.events = {}; this.classList = { toggle: () => {} }; this.children = []; this.dataset = {}; this.attributes = {}; }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  addEventListener(name, callback) { this.events[name] = callback; }
  append(...children) { this.children.push(...children); }
  focus() { if (this.root) this.root.activeElement = this; }
  setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; }
  checkValidity() { return this.valid !== false; }
  reportValidity() { this.reported = true; }
  click() { if (!this.disabled) return this.events.click?.({ target: this }); }
}
class Shadow {
  constructor() { this.nodes = {}; this.activeElement = null; }
  set innerHTML(value) { this.html = value; this.nodes = {}; this.activeElement = null; }
  querySelector(selector) { return this.getElementById(selector); }
  getElementById(id) {
    const find = node => node.id === id ? node : node.children?.map(find).find(Boolean);
    const existing = Object.values(this.nodes).map(find).find(Boolean);
    if (existing) return existing;
    if (!this.nodes[id]) { this.nodes[id] = new Element(); this.nodes[id].id = id; this.nodes[id].root = this; }
    return this.nodes[id];
  }
}
class HTMLElement { attachShadow() { this.shadowRoot = new Shadow(); return this.shadowRoot; } }
const classes = new Map();
classes.set('home-assistant', class {});
let confirm = false;
const context = {
  HTMLElement, CustomEvent, document: { createElement: () => new Element(), querySelector: () => null },
  window: { confirm: () => confirm, customCards: [] },
  customElements: { define: (name, klass) => classes.set(name, klass), get: name => classes.get(name) },
  setTimeout: () => {}, URL, navigator: { language: 'ru' },
};
const code = fs.readFileSync(path.join(__dirname, '../haier-laundry-ui.js'), 'utf8');
vm.runInNewContext(code.replaceAll('import.meta.url', JSON.stringify('http://localhost/haier-laundry-ui.js')), context);

async function fixture(status = 'idle') {
  const entries = [];
  const states = {};
  for (const [domain, suffix, value, options] of [
    ['select', 'laundry_program', 'Cotton', ['Not selected', 'Cotton']],
    ['binary_sensor', 'remote_control', 'on'],
    ['sensor', 'state', status], ['sensor', 'phase', 'Phase'],
  ]) {
    const entity_id = `${domain}.machine_${suffix}`;
    entries.push({ entity_id, device_id: 'machine', platform: 'haier_evo', unique_id: `machine_${suffix}` });
    states[entity_id] = { state: value, attributes: options ? { options } : {} };
  }
  for (const action of ['start', 'pause', 'resume', 'cancel']) {
    const entity_id = `button.machine_laundry_${action}`;
    entries.push({ entity_id, device_id: 'machine', platform: 'haier_evo', unique_id: `machine_laundry_${action}` });
    states[entity_id] = { state: 'unknown', attributes: {} };
  }
  states['sensor.machine_state'].attributes = states['select.machine_laundry_program'].attributes;
  const calls = [];
  const hass = { states, language: 'ru', devices: {}, entities: Object.fromEntries(entries.map(e => [e.entity_id,e])),
    services: { haier_evo: { configure_program: {} } },
    callWS: async request => request.type.endsWith('/get') ? entries.find(e => e.entity_id === request.entity_id)
      : Object.fromEntries(entries.filter(e => request.entity_ids?.includes(e.entity_id)).map(e => [e.entity_id,e])),
    callService: async (...args) => calls.push(args) };
  const card = new (classes.get('haier-laundry-detail'))();
  card.setConfig({ device: 'machine', kind: 'dryer' });
  card.hass = hass;
  await new Promise(resolve => setImmediate(resolve));
  return { card, states, hass, calls };
}

test('unknown cycle state requires an explicit action choice', async () => {
  const { card, calls } = await fixture('unknown');
  assert.equal(card.shadowRoot.getElementById('start').disabled, false);
  assert.equal(card.shadowRoot.getElementById('toggle').disabled, false);
  card.shadowRoot.getElementById('start').click();
  card.shadowRoot.getElementById('toggle').click();
  assert.equal(calls.length, 0);
  await card.shadowRoot.getElementById('choose-pause').click();
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0])), ['button', 'press', { entity_id: 'button.machine_laundry_pause' }]);
});

test('running and paused select one appropriate action and connection loss blocks both', async () => {
  const { card, states, hass } = await fixture('running');
  assert.equal(card.shadowRoot.getElementById('toggle-label').textContent, 'Пауза');
  assert.equal(card.shadowRoot.getElementById('start').disabled, false);
  assert.equal(card.shadowRoot.getElementById('start-label').textContent, 'Отменить');
  assert.equal(card.shadowRoot.getElementById('toggle').disabled, false);
  states['sensor.machine_state'].state = 'paused';
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('toggle-label').textContent, 'Продолжить');
  states['binary_sensor.machine_remote_control'].state = 'unavailable';
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('toggle').disabled, true);
  assert.equal(card.shadowRoot.getElementById('cancel').disabled, true);
});

test('active controls put pause first and keep cancellation behind confirmation', async () => {
  const { card, states, hass, calls } = await fixture('running');
  let html = card.shadowRoot.html;
  assert.ok(html.indexOf('id="toggle"') < html.indexOf('id="start"'));
  assert.match(html, /class="primary" id="toggle"/);
  assert.match(html, /class="destructive" id="start"/);
  confirm = false;
  card.shadowRoot.getElementById('start').click();
  assert.equal(calls.length, 0);
  confirm = true;
  card.shadowRoot.getElementById('start').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['button', 'press', { entity_id: 'button.machine_laundry_cancel' }]]);
  confirm = false;
  states['sensor.machine_state'].state = 'idle';
  card.hass = hass;
  html = card.shadowRoot.html;
  assert.ok(html.indexOf('id="start"') < html.indexOf('id="toggle"'));
  assert.match(html, /class="primary" id="start"/);
});

test('active details show only device-reported values and return focus without commands', async () => {
  const { card, states, hass, calls } = await fixture('running');
  const viewChanges = [];
  card.onViewChange = value => viewChanges.push(value);
  const machine = states['sensor.machine_state'];
  machine.attributes.program_settings = { program: 'Cotton', fields: [{ key: 'temp', title: 'Следующая температура', kind: 'number', value: '99' }] };
  machine.attributes.active_program_details = { program: 'Шерсть', remaining_minutes: 65, fields: [{ key: 'temp', title: 'Температура', value: '30 °C', description: 'Фактическое значение' }] };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('current').textContent, 'Шерсть');
  assert.equal(card.shadowRoot.getElementById('remaining').textContent, 'Осталось 01:05');
  assert.match(card.shadowRoot.getElementById('completion').textContent, /^Примерно до /);
  assert.equal(card.shadowRoot.getElementById('program-fields').hidden, true);
  assert.equal(card.shadowRoot.getElementById('program-settings').hidden, true);
  card.shadowRoot.getElementById('show-details').click();
  assert.equal(viewChanges.at(-1), true);
  assert.equal(card.shadowRoot.getElementById('details-back').hidden, false);
  assert.equal(card.shadowRoot.getElementById('main-view').hidden, true);
  assert.equal(card.shadowRoot.getElementById('details-view').hidden, false);
  assert.equal(card.shadowRoot.getElementById('active-program').textContent, 'Шерсть');
  const fields = card.shadowRoot.getElementById('active-fields').children;
  assert.equal(fields.length, 1);
  assert.equal(fields[0].children[1].textContent, '30 °C');
  assert.equal(card.shadowRoot.activeElement.id, 'details-back');
  card.shadowRoot.getElementById('details-back').click();
  assert.equal(viewChanges.at(-1), false);
  assert.equal(card.shadowRoot.activeElement.id, 'show-details');
  assert.equal(calls.length, 0);
});

test('missing or invalid active details are not invented, pause has no completion estimate', async () => {
  const { card, states, hass } = await fixture('running');
  const machine = states['sensor.machine_state'];
  machine.attributes.active_program_details = { program: 'Хлопок', remaining_minutes: -1, fields: [] };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('remaining').textContent, undefined);
  assert.equal(card.shadowRoot.getElementById('completion').textContent, undefined);
  assert.equal(card.shadowRoot.getElementById('active-empty').hidden, false);
  machine.attributes.active_program_details.remaining_minutes = 10;
  machine.state = 'paused';
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('remaining').textContent, 'Осталось 00:10');
  assert.equal(card.shadowRoot.getElementById('completion').textContent, undefined);
});

test('progress requires a valid total and motion keeps its phase across updates', async () => {
  const { card, states, hass } = await fixture('running');
  const machine = states['sensor.machine_state'];
  machine.attributes.active_program_details = { program: 'Cotton', remaining_minutes: 10, fields: [] };
  card.hass = hass;
  const start = card.motionSince;
  assert.equal(card.shadowRoot.getElementById('meter').attributes['stroke-dasharray'], undefined);
  machine.attributes.active_program_details.total_minutes = 40;
  card.hass = hass;
  assert.equal(card.motionSince, start);
  assert.equal(card.shadowRoot.getElementById('meter').attributes['stroke-dasharray'], '75 100');
  machine.attributes.active_program_details.total_minutes = 10;
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('meter').attributes['stroke-dasharray'], undefined);
  machine.state = 'paused';
  card.hass = hass;
  assert.equal(card.motionSince, null);
});

test('remote info is informational and reflects unknown state', async () => {
  const { card, states, hass, calls } = await fixture();
  states['binary_sensor.machine_remote_control'].state = 'unknown';
  card.hass = hass;
  const button = card.shadowRoot.getElementById('remote-info-button');
  assert.match(button.attributes['aria-label'], /неизвестно/);
  button.click();
  assert.equal(card.shadowRoot.getElementById('remote-info').hidden, false);
  assert.equal(button.attributes['aria-expanded'], 'true');
  assert.equal(calls.length, 0);
});

test('start needs confirmation and targets only the chosen device', async () => {
  const { card, calls } = await fixture();
  confirm = false;
  card.shadowRoot.getElementById('start').click();
  assert.equal(calls.length, 0);
  confirm = true;
  await card.shadowRoot.getElementById('start').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0])), ['button', 'press', { entity_id: 'button.machine_laundry_start' }]);
  confirm = false;
});

test('module registers an optional card without starting a registry scan or waiting for HA', () => {
  const registry = new Map();
  let timers = 0;
  const sandbox = {
    HTMLElement, CustomEvent, URL, navigator: { language: 'en' }, document: context.document, window: { customCards: [] },
    customElements: { define: (name, klass) => registry.set(name, klass), get: name => registry.get(name) },
    setTimeout: () => { timers++; },
  };
  vm.runInNewContext(code.replaceAll('import.meta.url', JSON.stringify('http://localhost/haier-laundry-ui.js')), sandbox);
  assert.equal(registry.has('haier-laundry-detail'), true);
  assert.equal(registry.has('haier-laundry-card'), true);
  assert.equal(timers, 0);
});

test('program names get semantic icons with a generic fallback', async () => {
  const { card } = await fixture();
  assert.equal(card.programIcon('Постельное бельё'), 'mdi:bed');
  assert.equal(card.programIcon('Полотенца'), 'mdi:layers-outline');
  assert.equal(card.programIcon('Без названия'), 'mdi:tshirt-crew-outline');
});

test('explicit more-info targets are intercepted synchronously and failed lookup falls back to native HA', async () => {
  const handlers = {};
  const registry = new Map();
  const native = [];
  const root = { dispatchEvent: event => native.push(event.detail), hass: {
    language: 'en', callWS: async () => { throw new Error('registry unavailable'); }, states: {},
  } };
  const sandbox = {
    HTMLElement, CustomEvent, URL, navigator: { language: 'en' },
    customElements: { define: (name, klass) => registry.set(name, klass), get: name => registry.get(name) },
    window: { addEventListener: (name, callback) => { handlers[name] = callback; }, customCards: [] },
    document: { querySelector: selector => selector === 'home-assistant' ? root : null },
  };
  vm.runInNewContext(code.replaceAll('import.meta.url', JSON.stringify('http://localhost/haier-laundry-ui.js?more_info=sensor.washer_state')), sandbox);
  let intercepted = false;
  handlers['hass-more-info']({ detail: { entityId: 'sensor.someone_else' }, preventDefault() { throw Error('unexpected interception'); } });
  handlers['hass-more-info']({ detail: { entityId: 'sensor.washer_state' }, preventDefault() { intercepted = true; }, stopImmediatePropagation() {} });
  assert.equal(intercepted, true);
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(JSON.parse(JSON.stringify(native)), [{ entityId: 'sensor.washer_state', haierNative: true }]);
});

test('unmapped phase codes stay out of the primary machine status', async () => {
  const { card, states, calls } = await fixture('idle');
  for (const phase of ['Этап 0', 'Phase 99', 'Код 2', 'Code 17']) {
    states['sensor.machine_phase'].state = phase;
    card.render();
    assert.equal(card.shadowRoot.getElementById('status').textContent, 'Ожидание');
    assert.equal(card.shadowRoot.getElementById('phase').textContent, '');
  }
  assert.deepEqual(calls, []);
});

test('no selected program differs from an empty catalog without sending commands', async () => {
  const { card, states, calls } = await fixture('idle');
  const program = states['select.machine_laundry_program'];
  program.state = 'unknown';
  program.attributes.options = ['Cotton'];
  card.render();
  assert.equal(card.shadowRoot.getElementById('selected-name').textContent, 'Не выбрана');
  assert.equal(card.shadowRoot.getElementById('program').attributes['aria-label'], 'Все программы. Выбрана: Не выбрана');
  assert.equal(card.shadowRoot.getElementById('start').disabled, true);
  program.attributes.options = [];
  card.render();
  assert.equal(card.shadowRoot.getElementById('selected-name').textContent, 'Нет доступных программ');
  assert.equal(card.shadowRoot.getElementById('program').disabled, true);
  assert.deepEqual(calls, []);
});

test('search filters by words, case and е/ё; clearing restores the full list', async () => {
  const { card, states, hass, calls } = await fixture();
  states['select.machine_laundry_program'].state = 'Не выбрана';
  states['select.machine_laundry_program'].attributes.options = ['Не выбрана', 'Постельное бельё', 'Полотенца'];
  card.hass = hass;
  card.shadowRoot.getElementById('program').click();
  let search = card.shadowRoot.getElementById('program-search');
  assert.equal(card.shadowRoot.activeElement, search);
  search.value = 'БЕЛЬЕ постельное';
  search.events.input();
  let list = card.shadowRoot.getElementById('program-list').children;
  assert.deepEqual(list.map(option => option.hidden), [true, false, true]);
  assert.equal(card.shadowRoot.getElementById('program-empty').hidden, true);
  search.value = 'нет совпадений';
  search.events.input();
  assert.equal(card.shadowRoot.getElementById('program-empty').hidden, false);
  card.shadowRoot.getElementById('clear-search').click();
  assert.equal(search.value, '');
  assert.equal(card.shadowRoot.activeElement, search);
  assert.deepEqual(list.map(option => option.hidden), [false, false, false]);
  assert.equal(calls.length, 0);
});

test('search text, caret and focus survive a Home Assistant state update; Escape closes only the list', async () => {
  const { card, states, hass, calls } = await fixture();
  card.shadowRoot.getElementById('program').click();
  let search = card.shadowRoot.getElementById('program-search');
  search.value = 'Cott';
  search.events.input();
  search.setSelectionRange(1, 3);
  states['sensor.machine_state'].attributes.available_actions = ['start'];
  card.hass = hass;
  search = card.shadowRoot.getElementById('program-search');
  assert.equal(search.value, 'Cott');
  assert.equal(card.shadowRoot.activeElement, search);
  assert.deepEqual([search.selectionStart, search.selectionEnd], [1, 3]);
  let stopped = false;
  let prevented = false;
  card.shadowRoot.getElementById('program-options').events.keydown({ key: 'Escape', stopPropagation() { stopped = true; }, preventDefault() { prevented = true; } });
  assert.equal(stopped, true);
  assert.equal(prevented, true);
  assert.equal(card.programMenuOpen, false);
  assert.equal(card.shadowRoot.activeElement.id, 'program');
  assert.equal(calls.length, 0);
});


test('specific cycle icons take precedence over the program category', async () => {
  const { card } = await fixture();
  for (const [name, icon] of [
    ['Авто', 'mdi:autorenew'], ['Антиаллергия', 'mdi:shield-check'],
    ['UV-обработка', 'mdi:white-balance-sunny'], ['Быстрая 15 мин', 'mdi:timer-outline'],
    ['Стирка с паром - Деликатная', 'mdi:flower-outline'], ['Освежить', 'mdi:refresh'],
    ['Отжим', 'mdi:rotate-right'], ['Очистка барабана', 'mdi:washing-machine'],
    ['Смешанная', 'mdi:tshirt-crew'], ['Хлопок+', 'mdi:flower'], ['Шерсть', 'mdi:sheep'],
    ['Пуховые вещи', 'mdi:weather-cloudy'], ['Синтетика', 'mdi:tshirt-v-outline'],
    ['Детская одежда', 'mdi:baby-face-outline'],
  ]) assert.equal(card.programIcon(name), icon, name);
});


test('matching programs from different categories remain distinct and choosing one only selects it', async () => {
  const { card, states, hass, calls } = await fixture();
  states['select.machine_laundry_program'].state = 'Не выбрана';
  states['select.machine_laundry_program'].attributes.options = ['Не выбрана', 'Ткани - Деликатная', 'Стирка с паром - Деликатная'];
  card.hass = hass;
  card.shadowRoot.getElementById('program').click();
  const search = card.shadowRoot.getElementById('program-search');
  search.value = 'деликатная';
  search.events.input();
  const list = card.shadowRoot.getElementById('program-list').children;
  assert.deepEqual(list.map(option => option.hidden), [true, false, false]);
  list[1].click();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['select', 'select_option', { entity_id: 'select.machine_laundry_program', option: 'Ткани - Деликатная' }]]);
  assert.equal(card.programMenuOpen, false);
  assert.equal(card.programQuery, '');
});


test('catalog preserves category order, descriptions, durations, and duplicate options', async () => {
  const { card, states, hass } = await fixture();
  states['select.machine_laundry_program'].attributes.options = ['Not selected', 'Cotton', 'Delicate'];
  states['sensor.machine_state'].attributes.program_catalog = [
    { title: 'Ткани', description: 'Для разных тканей', programs: [
      { option: 'Cotton', name: 'Хлопок', duration: '42 минуты', description: 'Белые вещи' },
      { option: 'Delicate', name: 'Деликатная', duration: '', description: 'Чувствительная ткань' },
    ] },
    { title: 'Любимые', description: 'Повтор программы', programs: [
      { option: 'Cotton', name: 'Хлопок', duration: '42 минуты', description: 'Второй вариант' },
    ] },
  ];
  card.hass = hass;
  card.shadowRoot.getElementById('program').click();
  assert.deepEqual(Array.from(card.programGroups, group => group.title), ['Ткани', 'Любимые']);
  assert.deepEqual(Array.from(card.programEntries, entry => entry.element.dataset.option), ['Not selected', 'Cotton', 'Delicate', 'Cotton']);
  assert.equal(card.programGroups[0].element.children[0].textContent, 'Ткани');
  const cottonCopy = card.programGroups[0].entries[0].element.children[1];
  assert.equal(cottonCopy.children[1].textContent, '42 минуты');
  assert.equal(cottonCopy.children[2].textContent, 'Белые вещи');
  const search = card.shadowRoot.getElementById('program-search');
  search.value = 'повтор хлопок';
  search.events.input();
  assert.deepEqual(Array.from(card.programGroups, group => group.element.hidden), [true, false]);
  assert.equal(card.programGroups[1].entries[0].element.hidden, false);
  search.value = 'чувствительная';
  search.events.input();
  assert.deepEqual(Array.from(card.programGroups, group => group.element.hidden), [false, true]);
  assert.equal(card.programGroups[0].entries[1].element.hidden, false);
});

test('settings require matching program and each validated change configures once', async () => {
  const { card, states, hass, calls } = await fixture();
  const machine = states['sensor.machine_state'];
  machine.attributes.program_settings = { program: 'Cotton', values: { temp: '40', dirt: '2', time: '20' }, fields: [
    { key: 'temp', title: 'Температура', kind: 'select', value: '40', options: [{ value: '40', label: '40 °C' }, { value: '60', label: '60 °C' }] },
    { key: 'dirt', title: 'Загрязнение', kind: 'select', value: '2', disabled: true, options: [{ value: '2', label: 'Сильное', description: 'Для сильно загрязнённых вещей' }] },
    { key: 'time', title: 'Время', kind: 'number', value: '20', min: 10, max: 90, step: 5, unit: 'мин' },
  ] };
  card.hass = hass;
  const fields = card.shadowRoot.getElementById('settings-grid').children;
  assert.equal(card.shadowRoot.getElementById('program-settings').hidden, false);
  assert.equal(fields.length, 3);
  assert.equal(fields[1].children[1].disabled, true);
  assert.match(fields[1].children[2].textContent, /сильно загрязнённых/);
  assert.match(fields[1].children[2].textContent, /Недоступно/);
  assert.equal(fields[1].children[1].attributes['aria-describedby'], fields[1].children[2].id);
  const invalid = fields[2].children[1];
  invalid.value = '23'; invalid.valid = false; invalid.events.change();
  assert.equal(invalid.reported, true);
  assert.equal(calls.length, 0);
  const temperature = fields[0].children[1];
  temperature.value = '60'; temperature.events.change();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['haier_evo', 'configure_program', { entity_id: 'select.machine_laundry_program', program: 'Cotton', parameters: { temp: '60' } }]]);
  machine.attributes.program_settings = { program: 'Different', fields: [{ key: 'temp', kind: 'select' }], values: {} };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('program-settings').hidden, true);
});


test('settings preserve an unfinished numeric edit across unrelated updates', async () => {
  const { card, states, hass, calls } = await fixture();
  const machine = states['sensor.machine_state'];
  machine.attributes.program_settings = { program: 'Cotton', values: { time: '20' }, fields: [
    { key: 'time', title: 'Время', kind: 'number', min: 10, max: 90, unit: 'мин' },
  ] };
  card.hass = hass;
  card.shadowRoot.getElementById('program-settings').open = true;
  let input = card.shadowRoot.getElementById('settings-grid').children[0].children[1];
  input.root = card.shadowRoot;
  input.focus();
  input.value = '25';
  states['sensor.machine_phase'].state = 'New phase';
  card.hass = hass;
  input = card.shadowRoot.getElementById('settings-grid').children[0].children[1];
  assert.equal(input.value, '25');
  assert.equal(calls.length, 0);
  machine.attributes.program_settings.values.time = '30';
  input.root = card.shadowRoot;
  input.focus();
  states['sensor.machine_phase'].state = 'Another phase';
  card.hass = hass;
  input = card.shadowRoot.getElementById('settings-grid').children[0].children[1];
  assert.equal(input.value, '30');
});

test('partial catalog keeps ungrouped options available', async () => {
  const { card, states, hass } = await fixture();
  states['select.machine_laundry_program'].attributes.options = ['Not selected', 'Cotton', 'Delicate'];
  states['sensor.machine_state'].attributes.program_catalog = [{ title: 'Ткани', description: '', programs: [{ option: 'Cotton', name: 'Хлопок' }] }];
  card.hass = hass;
  card.shadowRoot.getElementById('program').click();
  assert.deepEqual(Array.from(card.programGroups, group => group.title), ['Ткани', 'Другие программы']);
  assert.deepEqual(Array.from(card.programEntries, entry => entry.element.dataset.option), ['Not selected', 'Cotton', 'Delicate']);
});

test('settings errors are shown only for the selected program; active cycles disable editing', async () => {
  const { card, states, hass, calls } = await fixture();
  const machine = states['sensor.machine_state'];
  machine.attributes.program_settings = { program: 'Cotton', fields: [], error: 'Нет данных' };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('program-settings').hidden, false);
  assert.match(card.shadowRoot.getElementById('settings-error').textContent, /Настройки этой программы недоступны/);
  machine.attributes.program_settings = { program: 'Other', fields: [], error: 'Старое сообщение' };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('program-settings').hidden, true);
  machine.attributes.program_settings = { program: 'Cotton', values: { temp: '40' }, fields: [{ key: 'temp', title: 'Температура', kind: 'select', options: [{value:'40',label:'40 °C'},{value:'60',label:'60 °C'}] }] };
  machine.state = 'running';
  card.hass = hass;
  const control = card.shadowRoot.getElementById('settings-grid').children[0].children[1];
  assert.equal(control.disabled, true);
  control.value = '60'; control.events.change();
  assert.equal(calls.length, 0);
});


test('one header navigation control closes the main view and goes back from details', async () => {
  const { card } = await fixture('running');
  const events = [];
  card.dispatchEvent = event => events.push(event.type);
  assert.match(card.shadowRoot.html, /grid-template-columns: 44px minmax\(0, 1fr\) 44px/);
  assert.match(card.shadowRoot.html, /text-overflow: ellipsis/);
  assert.match(card.shadowRoot.html, /id="details-back" aria-label="Закрыть"/);
  assert.equal(card.shadowRoot.getElementById('details-back').hidden, false);
  card.shadowRoot.getElementById('details-back').click();
  assert.deepEqual(events, ['haier-close']);
  card.shadowRoot.getElementById('show-details').click();
  assert.match(card.shadowRoot.html, /id="details-back" aria-label="Назад"/);
  card.shadowRoot.getElementById('details-back').click();
  assert.equal(card.detailsOpen, false);
  assert.deepEqual(events, ['haier-close']);
});


test('catalog header back closes the list and restores focus without closing the device', async () => {
  const { card, calls } = await fixture('idle');
  const events = [];
  card.dispatchEvent = event => events.push(event.type);
  card.shadowRoot.getElementById('program').click();
  assert.match(card.shadowRoot.html, /id="details-back" aria-label="Назад"/);
  card.programQuery = 'cotton';
  card.shadowRoot.getElementById('details-back').click();
  assert.equal(card.programMenuOpen, false);
  assert.equal(card.programQuery, '');
  assert.equal(card.shadowRoot.activeElement.id, 'program');
  assert.deepEqual(events, []);
  assert.equal(calls.length, 0);
});


test('unsupported care state is shown as unknown rather than invented completion', async () => {
  const { card } = await fixture('care');
  assert.equal(card.shadowRoot.getElementById('status').textContent, 'Нет данных о цикле');
  assert.equal(card.shadowRoot.getElementById('remaining').textContent || '', '');
});

test('structured settings errors use HA translations and a localized fallback', async () => {
  const { card, states, hass } = await fixture();
  states['select.machine_laundry_program'].attributes.program_settings = {
    program: 'Cotton', fields: [], error: { translation_key: 'laundry_parameters_missing_schema', translation_placeholders: { device: 'Washer' } },
  };
  const seen = [];
  hass.localize = (key, values) => { seen.push([key, values]); return 'Настройки недоступны для Washer'; };
  card.hass = hass;
  assert.match(card.shadowRoot.getElementById('settings-error').textContent, /Washer/);
  assert.equal(seen[0][0], 'component.haier_evo.exceptions.laundry_parameters_missing_schema.message');
  hass.localize = () => undefined;
  hass.language = 'en'; card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('settings-error').textContent, 'Settings for this program are unavailable');
});

test('native selector keeps its first real programme selected', async () => {
  const { card, states, hass } = await fixture('idle');
  states['select.machine_laundry_program'].attributes.options = ['Cotton', 'Delicate'];
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('start').disabled, false);
});

test('confirmed terminal states allow start when backend offers it', async () => {
  for (const state of ['finished', 'cancelled', 'off']) {
    const { card } = await fixture(state);
    assert.equal(card.shadowRoot.getElementById('start').disabled, false, state);
  }
});

test('English structured labels are localized while cloud program names stay unchanged', async () => {
  const { card, states, hass } = await fixture('idle');
  hass.language = 'en';
  states['select.machine_laundry_program'].attributes.program_settings = {
    program: 'Cotton', fields: [{ key: 'temp', title: 'Температура', description_key: 'schedule_readonly', kind: 'select', value: 'auto', options: [{ value: 'auto', label_key: 'automatic' }] }],
  };
  card.hass = hass;
  const field = card.shadowRoot.getElementById('settings-grid').children[0];
  assert.equal(field.children[1].children[0].textContent, 'Auto');
  assert.equal(field.children[2].textContent, 'Start time is set on the appliance');
  assert.equal(card.shadowRoot.getElementById('selected-name').textContent, 'Cotton');
  assert.equal(card.shadowRoot.getElementById('start-label').textContent, 'Start');
});

test('entity lookup reads one target and only registry entries from its device', async () => {
  const { hass } = await fixture();
  hass.entities['sensor.other'] = { entity_id: 'sensor.other', device_id: 'other' };
  const requests = [];
  const original = hass.callWS;
  hass.callWS = async request => { requests.push(request); return original(request); };
  const result = await context.resolveLaundry(hass, { entity: 'sensor.machine_state' });
  assert.equal(result.entities.start, 'button.machine_laundry_start');
  assert.equal(result.entities.program, 'select.machine_laundry_program');
  assert.equal(requests[0].type, 'config/entity_registry/get');
  assert.equal(requests[1].type, 'config/entity_registry/get_entries');
  assert.ok(!requests[1].entity_ids.includes('sensor.other'));
  assert.equal(requests.length, 2);
});

test('device-id display fallback is explicit and filters before requesting full entries', async () => {
  const { hass } = await fixture();
  const entries = hass.entities;
  hass.entities = {};
  const requests = [];
  hass.callWS = async request => {
    requests.push(request);
    if (request.type.endsWith('list_for_display')) return { entities: [
      ...Object.values(entries).map(entry => ({ ei: entry.entity_id, di: entry.device_id })),
      { ei: 'sensor.other', di: 'unrelated' },
    ] };
    return Object.fromEntries(request.entity_ids.map(id => [id, entries[id]]));
  };
  const result = await context.resolveLaundry(hass, { device_id: 'machine' }, true);
  assert.equal(result.entities.status, 'sensor.machine_state');
  assert.equal(requests[0].type, 'config/entity_registry/list_for_display');
  assert.ok(!requests[1].entity_ids.includes('sensor.other'));
});

test('device-id fallback also handles a partially loaded cache with only a phase sensor', async () => {
  const { hass } = await fixture();
  const entries = hass.entities;
  hass.entities = { 'sensor.machine_phase': entries['sensor.machine_phase'] };
  const requests = [];
  hass.callWS = async request => {
    requests.push(request);
    if (request.type.endsWith('list_for_display')) return { entities:Object.values(entries) };
    return Object.fromEntries(request.entity_ids.map(id => [id,entries[id]]));
  };
  const result = await context.resolveLaundry(hass, { device_id:'machine' }, true);
  assert.equal(result.entities.status, 'sensor.machine_state');
  assert.equal(requests.filter(r=>r.type.endsWith('list_for_display')).length,1);
});

test('explicit more-info targets with no device candidates fall back without scanning the registry', async () => {
  const { hass } = await fixture();
  const original = hass.callWS;
  hass.entities = {};
  const requests=[];
  hass.callWS=async request=>{requests.push(request);return original(request);};
  await assert.rejects(()=>context.resolveLaundry(hass,{entity:'sensor.machine_state'}));
  assert.deepEqual(requests.map(r=>r.type),['config/entity_registry/get']);
});

test('loading the module never installs a registry watcher or full registry fetch', () => {
  assert.doesNotMatch(code, /['"]config\/entity_registry\/list['"]/);
  assert.doesNotMatch(code, /entity_registry_updated|add_extra_js_url|execute_action/);
});

test('closed Lovelace card only shows name and native state and performs no lookup', async () => {
  const { hass } = await fixture();
  let requests = 0;
  hass.callWS = async () => { requests++; };
  const row = new (classes.get('haier-laundry-card'))();
  row.setConfig({ entity: 'sensor.machine_state', name: 'Washer' });
  row.hass = hass;
  assert.equal(row.shadowRoot.getElementById('strong').textContent, 'Washer');
  assert.equal(row.shadowRoot.getElementById('small').textContent, 'Ожидание');
  assert.equal(requests, 0);
  assert.doesNotMatch(row.shadowRoot.html, /id="start"|id="toggle"|program-settings/);
});

test('invented machine attributes cannot enable absent native buttons', async () => {
  const { card, states, hass } = await fixture('running');
  for (const action of ['start', 'pause', 'resume', 'cancel']) delete states[`button.machine_laundry_${action}`];
  states['sensor.machine_state'].attributes.available_actions = ['pause', 'cancel'];
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('toggle').disabled, true);
  assert.equal(card.shadowRoot.getElementById('start').disabled, true);
});

test('only selector attributes supply parameters and native configure_program targets the selector', async () => {
  const { card, states, hass, calls } = await fixture('idle');
  states['sensor.machine_state'].attributes = { program_settings: { program: 'Cotton', fields: [{ key:'wrong', kind:'number', value:1 }] } };
  states['select.machine_laundry_program'].attributes.program_settings = { program: 'Cotton', fields: [{ key:'time', kind:'number', value:2 }] };
  card.hass = hass;
  const input = card.shadowRoot.getElementById('settings-grid').children[0].children[1];
  input.value = '3'; input.events.change();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['haier_evo','configure_program',{ entity_id:'select.machine_laundry_program', program:'Cotton', parameters:{time:'3'} }]]);
});

test('child lock is informational and never sends a control command', async () => {
  const { card, states, hass, calls } = await fixture();
  card.entities.child_lock = 'binary_sensor.machine_child_lock';
  states[card.entities.child_lock] = { state: 'on', attributes: {} };
  card.hass = hass;
  assert.equal(card.shadowRoot.getElementById('child-lock').hidden, false);
  assert.match(card.shadowRoot.getElementById('child-lock-label').textContent, /на панели машины/);
  assert.equal(calls.length, 0);
  assert.doesNotMatch(card.shadowRoot.html, /set_child_lock|switch\.turn|child-lock.*button/);
});

test('all authored visible English template text is localized', async () => {
  const { card, hass } = await fixture();
  hass.language = 'en'; card.hass = hass;
  assert.doesNotMatch(card.shadowRoot.html, /[А-Яа-яЁё]/);
  assert.equal(card.shadowRoot.getElementById('status').textContent, 'Idle');
});

test('closing a modal unsubscribes even when the subscription resolves late', async () => {
  const { hass } = await fixture();
  const savedDocument = context.document;
  let resolveSubscription;
  let unsubscribed = 0;
  let focused = 0;
  hass.connection = { subscribeEvents: (_callback, type) => {
    assert.equal(type, 'state_changed');
    return new Promise(resolve => { resolveSubscription = resolve; });
  } };
  const details = new (classes.get('haier-laundry-detail'))();
  const dialog = new Element();
  dialog.querySelector = () => details;
  dialog.showModal = () => { dialog.open = true; };
  dialog.remove = () => { dialog.removed = true; };
  dialog.close = () => { dialog.open = false; dialog.events.close(); };
  context.document = {
    querySelector: selector => selector === 'home-assistant' ? { hass } : null,
    createElement: tag => tag === 'dialog' ? dialog : new Element(), body: { append() {} },
  };
  try {
    await context.openLaundryDialog(hass, { entity:'sensor.machine_state' }, { focus() { focused++; } });
    dialog.close();
    resolveSubscription(() => { unsubscribed++; });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(unsubscribed, 1);
    assert.equal(focused, 1);
    assert.equal(dialog.removed, true);
  } finally { context.document = savedDocument; }
});

test('state events update the open dialog before the outer hass snapshot catches up', async () => {
  const { hass } = await fixture('idle');
  const savedDocument = context.document;
  let update;
  hass.connection = { subscribeEvents: callback => { update = callback; return Promise.resolve(() => {}); } };
  const details = new (classes.get('haier-laundry-detail'))();
  const dialog = new Element();
  dialog.querySelector = () => details;
  dialog.showModal = () => { dialog.open = true; };
  context.document = {
    querySelector: selector => selector === 'home-assistant' ? { hass } : null,
    createElement: tag => tag === 'dialog' ? dialog : new Element(), body: { append() {} },
  };
  try {
    await context.openLaundryDialog(hass, { entity:'sensor.machine_state' });
    update({ data: { entity_id:'sensor.machine_state', new_state:{ state:'running', attributes:{} } } });
    assert.equal(details.shadowRoot.getElementById('status').textContent, 'Выполняется');
    assert.equal(details.shadowRoot.getElementById('toggle-label').textContent, 'Пауза');
    assert.equal(hass.states['sensor.machine_state'].state, 'idle');
    update({ data: { entity_id:'sensor.machine_phase', new_state:{ state:'1', attributes:{} } } });
    assert.equal(details.shadowRoot.getElementById('status').textContent, 'Выполняется');
    update({ data: { entity_id:'sensor.machine_state', new_state:null } });
    assert.equal(details.shadowRoot.getElementById('status').textContent, 'Нет данных о цикле');
    update({ data: { entity_id:'sensor.machine_phase', new_state:{ state:'2', attributes:{} } } });
    assert.equal(details.shadowRoot.getElementById('status').textContent, 'Нет данных о цикле');
  } finally { context.document = savedDocument; }
});
