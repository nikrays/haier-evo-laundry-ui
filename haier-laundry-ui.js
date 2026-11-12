// Optional frontend derived from nikrays/haier_evo 2bce89a. MIT; see LICENSE.
const UI_TEXT = {
  "config_error": {
    "ru": "Укажите entity или device_id",
    "en": "Set entity or device_id"
  },
  "load_error": {
    "ru": "Не удалось загрузить сущности устройства.",
    "en": "Could not load the device entities."
  },
  "command_error": {
    "ru": "Не удалось подтвердить выполнение команды. Проверьте машину.",
    "en": "The command was not confirmed. Check the machine."
  },
  "retry": {
    "ru": "Повторить",
    "en": "Retry"
  },
  "loading": {
    "ru": "Загрузка устройства...",
    "en": "Loading device..."
  },
  "no_cycle": {
    "ru": "Нет данных о цикле",
    "en": "Cycle state is unknown"
  },
  "no_device": {
    "ru": "Нет данных об устройстве",
    "en": "Device data is unavailable"
  },
  "back": {
    "ru": "Назад",
    "en": "Back"
  },
  "close": {
    "ru": "Закрыть",
    "en": "Close"
  },
  "remote_help": {
    "ru": "Включение и выключение дистанционного управления выполняется на панели машины.",
    "en": "Enable or disable remote control on the appliance panel."
  },
  "selected_program": {
    "ru": "Выбранная программа",
    "en": "Selected program"
  },
  "all_programs": {
    "ru": "Все программы",
    "en": "All programs"
  },
  "search": {
    "ru": "Поиск программы",
    "en": "Search programs"
  },
  "find_program": {
    "ru": "Найти программу",
    "en": "Find a program"
  },
  "clear_search": {
    "ru": "Очистить поиск",
    "en": "Clear search"
  },
  "clear": {
    "ru": "Очистить",
    "en": "Clear"
  },
  "program_settings": {
    "ru": "Параметры программы",
    "en": "Program settings"
  },
  "start_program": {
    "ru": "Запустить программу",
    "en": "Start program"
  },
  "cancel_program": {
    "ru": "Отменить программу",
    "en": "Cancel program"
  },
  "pause": {
    "ru": "Пауза",
    "en": "Pause"
  },
  "resume": {
    "ru": "Продолжить",
    "en": "Resume"
  },
  "details": {
    "ru": "Детали программы",
    "en": "Program details"
  },
  "history": {
    "ru": "История и настройки",
    "en": "History and settings"
  },
  "no_active_parameters": {
    "ru": "Машина не передала параметры текущей программы.",
    "en": "The appliance has not reported the current program settings."
  },
  "dryer": {
    "ru": "Сушильная машина",
    "en": "Dryer"
  },
  "washer": {
    "ru": "Стиральная машина",
    "en": "Washing machine"
  },
  "remote_on": {
    "ru": "Дистанционное управление включено",
    "en": "Remote control is on"
  },
  "remote_off": {
    "ru": "Дистанционное управление выключено",
    "en": "Remote control is off"
  },
  "remote_unknown": {
    "ru": "Состояние дистанционного управления неизвестно",
    "en": "Remote control state is unknown"
  },
  "no_program_name": {
    "ru": "Название программы не передано",
    "en": "Program name is not reported"
  },
  "unselected": {
    "ru": "Не выбрана",
    "en": "Not selected"
  },
  "no_programs": {
    "ru": "Нет доступных программ",
    "en": "No programs available"
  },
  "programs": {
    "ru": "Программы",
    "en": "Programs"
  },
  "other_programs": {
    "ru": "Другие программы",
    "en": "Other programs"
  },
  "parameter": {
    "ru": "Параметр",
    "en": "Setting"
  },
  "not_editable": {
    "ru": "Недоступно для изменения",
    "en": "Cannot be changed"
  },
  "start_cancel": {
    "ru": "Запуск / отмена",
    "en": "Start / cancel"
  },
  "cancel": {
    "ru": "Отменить",
    "en": "Cancel"
  },
  "start": {
    "ru": "Запустить",
    "en": "Start"
  },
  "pause_resume": {
    "ru": "Пауза / продолжить",
    "en": "Pause / resume"
  },
  "control_disabled": {
    "ru": "Управление машиной отключено в настройках интеграции Haier Evo.",
    "en": "Appliance control is disabled in the Haier Evo integration settings."
  },
  "no_remote": {
    "ru": "Управление недоступно, пока нет связи или выключен удалённый доступ.",
    "en": "Control is unavailable while the appliance is offline or remote control is off."
  },
  "unknown_cycle": {
    "ru": "Состояние цикла не получено. Выберите действие вручную.",
    "en": "Cycle state is unknown. Choose an action explicitly."
  },
  "confirm_cancel_note": {
    "ru": "Отмена требует подтверждения.",
    "en": "Cancellation requires confirmation."
  },
  "confirm_start_note": {
    "ru": "Запуск требует подтверждения.",
    "en": "Starting requires confirmation."
  },
  "confirm_cancel": {
    "ru": "Отменить текущую программу?",
    "en": "Cancel the current program?"
  },
  "no_matches": {
    "ru": "Программы не найдены",
    "en": "No matching programs"
  },
  "dialog": {
    "ru": "Управление машиной",
    "en": "Appliance controls"
  },
  "remaining": {
    "ru": "Осталось {time}",
    "en": "Remaining {time}"
  },
  "until": {
    "ru": "Примерно до {time}",
    "en": "Estimated finish {time}"
  },
  "selected": {
    "ru": "Все программы. Выбрана: {program}",
    "en": "All programs. Selected: {program}"
  },
  "confirm_start": {
    "ru": "Запустить программу «{program}»?",
    "en": "Start program “{program}”?"
  },
  "settings_unavailable": {
    "ru": "Настройки этой программы недоступны",
    "en": "Settings for this program are unavailable"
  },
  "automatic": {
    "ru": "Авто",
    "en": "Auto"
  },
  "forced_parameter": {
    "ru": "Значение задано программой",
    "en": "Set by the program"
  },
  "schedule_readonly": {
    "ru": "Время запуска задаётся на машине",
    "en": "Start time is set on the appliance"
  },
  "on": {
    "ru": "Включено",
    "en": "On"
  },
  "off": {
    "ru": "Выключено",
    "en": "Off"
  },
  "child_lock_on": {"ru": "Блокировка от детей включена. Управляется на панели машины.", "en": "Child lock is on. Controlled on the appliance panel."},
  "child_lock_off": {"ru": "Блокировка от детей выключена. Управляется на панели машины.", "en": "Child lock is off. Controlled on the appliance panel."},
  "child_lock_unknown": {"ru": "Состояние блокировки от детей неизвестно. Управляется на панели машины.", "en": "Child lock state is unknown. Controlled on the appliance panel."},
  "state_off": {
    "ru": "Выключена",
    "en": "Off"
  },
  "state_idle": {
    "ru": "Ожидание",
    "en": "Idle"
  },
  "state_running": {
    "ru": "Выполняется",
    "en": "Running"
  },
  "state_paused": {
    "ru": "Пауза",
    "en": "Paused"
  },
  "state_finished": {
    "ru": "Программа завершена",
    "en": "Program finished"
  },
  "state_cancelled": {
    "ru": "Программа отменена",
    "en": "Program cancelled"
  }
};
function uiText(hass, key, values = {}) {
  const language = String(hass?.language || navigator.language || 'en').startsWith('ru') ? 'ru' : 'en';
  let text = UI_TEXT[key]?.[language] || UI_TEXT[key]?.en || UI_TEXT.parameter[language];
  for (const [name, value] of Object.entries(values)) text = text.replaceAll(`{${name}}`, String(value));
  return text;
}

class HaierLaundryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.pending = false;
    this.error = '';
  }

  setConfig(config) {
    if (!config.entity && !config.device_id && !config.device) throw new Error(this.t('config_error'));
    this.config = config;
    this.entities = config.entities || null;
    this.loadFailed = false;
    this.signature = null;
    if (!this.entities) this.loadEntities();
    this.render();
  }

  async loadEntities() {
    if (!this.config || !this._hass) return;
    const config = this.config;
    try {
      const result = await resolveLaundry(this._hass, config, !!config.device_id || !!config.device);
      if (config !== this.config) return;
      this.entities = result.entities;
      this.config = { ...config, device: result.device_id };
      this.loadFailed = false;
      this.error = '';
    } catch (_) {
      this.loadFailed = true;
      this.error = this.t('load_error');
    }
    this.signature = null;
    this.render();
  }

  t(key, values) { return uiText(this._hass, key, values); }
  metadata(value) {
    if (!value || typeof value !== 'object') return value;
    const result = { ...value };
    for (const [attribute, key] of [['label', 'label_key'], ['description', 'description_key'], ['value', 'value_key']]) {
      if (value[key]) result[attribute] = this.t(value[key]);
    }
    if (Array.isArray(value.options)) result.options = value.options.map(option => this.metadata(option));
    return result;
  }
  errorText(error, fallback = 'command_error') {
    if (error?.translation_key) {
      const key = `component.haier_evo.exceptions.${error.translation_key}.message`;
      const message = this._hass?.localize?.(key, error.translation_placeholders || {});
      if (message && message !== key) return message;
    }
    return this.t(fallback);
  }
  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;
    if (!this.entities) {
      if (!this.loading && !this.loadFailed) {
        this.loading = true;
        this.loadEntities().finally(() => { this.loading = false; });
      }
      return;
    }
    const ids = Object.keys(this.entities);
    const signature = JSON.stringify(ids.map(key => {
      const state = hass.states[this.entities[key]];
      return [hass.language, state?.state, state?.attributes?.options, state?.attributes?.program_catalog, state?.attributes?.program_settings, state?.attributes?.active_program_details];
    }));
    if (signature !== this.signature) {
      this.signature = signature;
      this.render();
    }
  }

  getCardSize() { return 6; }

  state(key) { return this._hass?.states[this.entities?.[key]]; }
  value(key) {
    const value = this.state(key)?.state;
    return value && !['unknown', 'unavailable', 'None'].includes(value) ? value : null;
  }
  usable(key) {
    if (['start', 'pause', 'resume', 'cancel'].includes(key)) {
      const button = this.state(key);
      return !!button && button.state !== 'unavailable';
    }
    const state = this.state(key);
    return !!state && state.state !== 'unavailable';
  }

  async send(domain, service, data) {
    if (this.pending) return;
    this.pending = true;
    this.error = '';
    this.render();
    try {
      await this._hass.callService(domain, service, data);
    } catch (error) {
      this.error = this.errorText(error);
    } finally {
      this.pending = false;
      this.render();
    }
  }

  render() {
    if (!this.config || !this._hass) return;
    if (!this.entities) {
      this.shadowRoot.innerHTML = `<ha-card style="padding:20px"><span id="message" role="status"></span><button id="retry" hidden>${this.t('retry')}</button></ha-card>`;
      this.shadowRoot.getElementById('message').textContent = this.error || this.t('loading');
      const retry = this.shadowRoot.getElementById('retry');
      retry.hidden = !this.loadFailed;
      retry.addEventListener('click', () => { this.loadFailed = false; this.error = ''; this.loadEntities(); });
      return;
    }
    const focused = this.shadowRoot.activeElement;
    this.restoreFocusId = focused?.id || this.restoreFocusId;
    const searchFocused = focused?.id === 'program-search';
    const focusedSetting = focused?.dataset?.settingKey;
    const focusedDraft = focusedSetting ? focused.value : null;
    const focusedCommitted = focusedSetting ? focused.dataset.committedValue : null;
    const focusedProgram = focusedSetting ? focused.dataset.program : null;
    let settingFocusTarget = null;
    const searchStart = searchFocused ? focused.selectionStart : null;
    const searchEnd = searchFocused ? focused.selectionEnd : null;
    const listScroll = this.shadowRoot.getElementById('program-list')?.scrollTop || 0;
    const settingsOpen = !!this.shadowRoot.getElementById('program-settings')?.open;
    const c = { ...this.entities, ...this.config };
    const t = this.t.bind(this);
    const reportedStatus = this.value('status');
    const status = ['off', 'idle', 'running', 'paused', 'finished', 'cancelled'].includes(reportedStatus) ? reportedStatus : null;
    const isDryer = c.kind === 'dryer';
    const statuses = Object.fromEntries(['off', 'idle', 'running', 'paused', 'finished', 'cancelled'].map(value => [value, t(`state_${value}`)]));
    const phaseValue = this.value('phase');
    const phase = phaseValue && !/^(?:\d+$|(?:Код|Code|Этап|Phase)\s+\d+$)/i.test(phaseValue) ? phaseValue : null;
    const statusText = statuses[status] || this.t('no_cycle');
    const options = this.state('program')?.attributes?.options || [];
    const selected = this.value('program');
    const unselected = ['Не выбрана', 'Not selected'].includes(options[0]) ? options[0] : null;
    const selectedProgram = selected && selected !== unselected && options.includes(selected);
    const remote = this.value('remote');
    const connected = remote === 'on';
    const active = status === 'running' || status === 'paused';
    if (!active) this.detailsOpen = false;
    if (status === 'running') this.motionSince ??= Date.now();
    else this.motionSince = null;
    const motionOffset = this.motionSince === null ? 0 : (Date.now() - this.motionSince) / 1000;
    const actualDetails = this.state('program')?.attributes?.active_program_details;
    const rawRemaining = actualDetails?.remaining_minutes ?? this.value('duration');
    const numeric = value => typeof value === 'number' || (typeof value === 'string' && /^\d+(?:\.\d+)?$/.test(value.trim())) ? Number(value) : NaN;
    const remainingMinutes = numeric(rawRemaining);
    const totalMinutes = numeric(actualDetails?.total_minutes);
    const progress = active && Number.isFinite(remainingMinutes) && remainingMinutes >= 0 && Number.isFinite(totalMinutes) && totalMinutes > remainingMinutes ? (totalMinutes - remainingMinutes) / totalMinutes * 100 : null;
    const uncertain = !status;
    const canStart = connected && selectedProgram && this.usable('start') && (['idle', 'finished', 'cancelled', 'off'].includes(status) || uncertain) && !this.pending;
    const action = status === 'running' ? 'pause' : status === 'paused' ? 'resume' : null;
    const canToggle = connected && action && this.usable(action) && !this.pending;
    const canCancel = connected && (active || uncertain) && this.usable('cancel') && !this.pending;
    const canChooseToggle = connected && uncertain && !this.pending && (this.usable('pause') || this.usable('resume'));
    const device = this._hass.devices?.[c.device];
    if (!connected || active || this.pending) this.programMenuOpen = false;
    const subview = !!(this.detailsOpen || this.programMenuOpen);
    const startButton = `<button class="${active ? 'destructive' : 'primary'}" id="start" aria-controls="start-choices" aria-expanded="false"><ha-icon id="start-icon"></ha-icon><span id="start-label"></span></button>`;
    const toggleButton = `<button class="${active ? 'primary' : ''}" id="toggle" aria-controls="toggle-choices" aria-expanded="false"><ha-icon id="toggle-icon"></ha-icon><span id="toggle-label"></span></button>`;
    this.shadowRoot.innerHTML = `
      <style>
        :host { --haier-font-family: var(--paper-font-body1_-_font-family, sans-serif); --haier-type-caption: 400 12px/1.4 var(--haier-font-family); --haier-type-body: 400 14px/1.45 var(--haier-font-family); --haier-type-group: 600 17px/1.3 var(--haier-font-family); --haier-type-title: 600 20px/1.3 var(--haier-font-family); --haier-type-status: 600 24px/1.25 var(--haier-font-family); font: var(--haier-type-body); display: block; color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, inherit); }
        ha-card { display: block; box-sizing: border-box; padding: 22px; overflow: hidden; }
        h2, p { margin: 0; }
        .heading { display: grid; grid-template-columns: 44px minmax(0, 1fr) 44px; gap: 8px; align-items: center; }
        .heading .back { width: 44px; min-height: 44px; padding: 0; background: transparent; }
        .heading > div { min-width: 0; }
        .heading ha-icon { color: var(--primary-color); --mdc-icon-size: 25px; }
        .heading .remote-button { padding: 0; width: 44px; }
        .remote-info { margin-top: 10px; padding: 12px; border-radius: 9px; background: var(--secondary-background-color); font: var(--haier-type-caption); }
        [hidden] { display: none !important; }
        h2 { font: var(--haier-type-title); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .connection { margin-top: 3px; color: var(--secondary-text-color); font: var(--haier-type-caption); }
        .visual { display: flex; min-height: 112px; align-items: center; justify-content: center; gap: 24px; margin: 16px 0; }
        .drum { position: relative; width: 112px; height: 112px; border-radius: 50%; background: var(--secondary-background-color); display: grid; place-items: center; flex-shrink: 0; }
        .drum svg { width: 100%; height: 100%; overflow: visible; }
        .machine-body { fill: var(--card-background-color, var(--primary-background-color)); stroke: var(--secondary-text-color); stroke-width: 1.5; }
        .machine-glass { fill: var(--secondary-background-color); stroke: var(--secondary-text-color); stroke-width: 1.3; }
        .machine-marks { fill: var(--secondary-text-color); }
        .laundry { transform-origin: 56px 59px; }
        .laundry path:first-child { fill: var(--primary-color); opacity: .8; }
        .laundry path:last-child { fill: var(--secondary-text-color); opacity: .65; }
        .water { fill: var(--primary-color); opacity: .22; }
        .bubbles { fill: var(--primary-color); opacity: .65; }
        .heat { fill: none; stroke: var(--primary-color); stroke-width: 1.5; stroke-linecap: round; opacity: .8; }
        .meter-track { fill: none; stroke: var(--divider-color); stroke-width: 1.5; }
        .meter-value { fill: none; stroke: var(--primary-color); stroke-width: 2.5; stroke-linecap: round; }
        .drum.running .laundry { animation: tumble 7s ease-in-out infinite; animation-delay: var(--motion-delay); }
        .drum.running .bubbles, .drum.running .heat { animation: drift 3s ease-in-out infinite; animation-delay: var(--motion-delay); }
        @keyframes tumble { 0% { transform: rotate(0); } 40%, 52% { transform: rotate(180deg); } 92%, 100% { transform: rotate(360deg); } }
        @keyframes drift { 0%, 100% { transform: translateY(2px); opacity: .35; } 50% { transform: translateY(-3px); opacity: .8; } }
        @media (prefers-reduced-motion: reduce) { .drum.running .laundry, .drum.running .bubbles, .drum.running .heat { animation: none; } }
        .summary { min-width: 0; max-width: 250px; }
        .status { font: var(--haier-type-status); overflow-wrap: anywhere; }
        .phase, .current { margin-top: 7px; font: var(--haier-type-body); color: var(--secondary-text-color); overflow-wrap: anywhere; }
        .fields { display: grid; gap: 8px; }
        label { color: var(--secondary-text-color); font: var(--haier-type-caption); }
        .program-trigger { box-sizing: border-box; width: 100%; min-height: 48px; padding: 0 12px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; justify-content: flex-start; text-align: left; }
        .program-options { border-radius: 9px; background: var(--secondary-background-color); }
        .search-row { display: flex; align-items: center; gap: 8px; padding: 8px; }
        .search-row input { box-sizing: border-box; width: 100%; min-width: 0; min-height: 44px; padding: 0 10px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); font: inherit; }
        .search-row input:focus-visible { outline: 3px solid var(--primary-color); outline-offset: 2px; }
        .search-row button { flex-shrink: 0; }
        .search-row button[hidden], .program-option[hidden] { display: none; }
        .program-list { max-height: 300px; overflow-y: auto; }
        .program-group { padding-top: 8px; }
        .program-group-title { margin: 0; padding: 6px 14px 2px; font: var(--haier-type-group); }
        .program-group-description { padding: 0 14px 8px; color: var(--secondary-text-color); font: var(--haier-type-caption); }
        .program-option { width: 100%; justify-content: flex-start; align-items: flex-start; text-align: left; border-radius: 0; padding: 10px 14px; }
        .program-copy { display: grid; gap: 3px; min-width: 0; }
        .program-duration, .program-description { color: var(--secondary-text-color); font: var(--haier-type-caption); overflow-wrap: anywhere; }
        .program-empty { padding: 12px 16px; color: var(--secondary-text-color); font: var(--haier-type-body); }
        .program-settings { margin-top: 16px; }
        .program-settings summary { cursor: pointer; min-height: 44px; display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .program-settings summary:focus-visible { outline: 3px solid var(--primary-color); outline-offset: 2px; }
        .settings-chevron { margin-left: auto; }
        .program-settings[open] .settings-chevron { transform: rotate(180deg); }
        .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 8px; }
        .setting-field { min-width: 0; display: grid; gap: 5px; align-content: start; }
        .setting-field label { display: flex; gap: 5px; align-items: center; color: var(--primary-text-color); overflow-wrap: anywhere; }
        .setting-field label span { min-width: 0; overflow-wrap: anywhere; }
        .setting-field ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
        .setting-field select, .setting-field input { box-sizing: border-box; width: 100%; min-width: 0; min-height: 44px; padding: 0 8px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; }
        .setting-field select:focus-visible, .setting-field input:focus-visible { outline: 3px solid var(--primary-color); outline-offset: 2px; }
        .setting-field select:disabled, .setting-field input:disabled { opacity: .6; }
        .setting-hint { color: var(--secondary-text-color); font: var(--haier-type-caption); overflow-wrap: anywhere; }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        .actions[hidden] { display: none; }
        .actions.main-actions > .primary { flex: 1 1 auto; }
        .secondary-actions { display: flex; gap: 8px; margin-top: 12px; }
        .secondary-actions > button { flex: 1 1 0; min-width: 0; padding: 6px 8px; line-height: 1.25; text-align: center; }
        .secondary-actions > button span { min-width: 0; overflow-wrap: anywhere; }
        #details-view { margin-top: 14px; }
        #details-title { margin: 14px 0 0; }
        button { min-height: 44px; border: 0; border-radius: 9px; padding: 0 14px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; cursor: pointer; display: inline-flex; gap: 7px; align-items: center; justify-content: center; }
        button.primary { background: var(--primary-color); color: var(--text-primary-color, white); }
        button.destructive { color: var(--error-color); }
        button ha-icon { --mdc-icon-size: 19px; }
        button:disabled { opacity: .48; cursor: not-allowed; }
        button:focus-visible { outline: 3px solid var(--primary-color); outline-offset: 2px; }
        .note { margin-top: 13px; font: var(--haier-type-caption); color: var(--secondary-text-color); }
        .error { margin-top: 10px; color: var(--error-color); font: var(--haier-type-caption); }
        @media (max-width: 380px) { ha-card { padding: 17px; } .visual { gap: 16px; } .drum { width: 88px; height: 88px; } .settings-grid:not(#active-fields) { grid-template-columns: 1fr; } }
      </style>
      <ha-card>
        <div class="heading"><button type="button" class="back" id="details-back" aria-label="${subview ? this.t('back') : this.t('close')}"><ha-icon icon="${subview ? 'mdi:arrow-left' : 'mdi:close'}"></ha-icon></button><div><h2 id="name"></h2><p class="connection" id="connection"></p></div><button type="button" class="remote-button" id="remote-info-button" aria-controls="remote-info" aria-expanded="false"><ha-icon icon="mdi:access-point"></ha-icon></button></div>
        <p class="remote-info" id="remote-info" hidden>${this.t('remote_help')}</p>
        <p class="connection" id="child-lock" hidden><ha-icon icon="mdi:lock-outline"></ha-icon><span id="child-lock-label"></span></p><div id="main-view"><div class="visual"><div class="drum" id="drum" aria-hidden="true" style="--motion-delay:-${motionOffset}s"><svg viewBox="0 0 112 112"><circle class="meter-track" cx="56" cy="56" r="53"/><circle class="meter-value" id="meter" cx="56" cy="56" r="53" pathLength="100" transform="rotate(-90 56 56)" hidden/><rect class="machine-body" x="29" y="17" width="54" height="78" rx="7"/><path class="machine-body" d="M29 32h54"/><circle class="machine-marks" cx="36" cy="24.5" r="1.7"/><circle class="machine-marks" cx="42" cy="24.5" r="1.7"/><circle class="machine-glass" cx="56" cy="59" r="21"/><clipPath id="drum-clip"><circle cx="56" cy="59" r="18"/></clipPath><g clip-path="url(#drum-clip)"><g class="laundry"><path d="M43 49q8-5 14 1t-1 13q-7 5-14-1t1-13Z"/><path d="M60 58q8-4 10 4t-5 9q-7-1-5-13Z"/></g><path class="water" id="water" d="M34 65q6-3 12 0t12 0t12 0t12 0v18H34Z"/><g class="bubbles" id="bubbles"><circle cx="47" cy="53" r="1.4"/><circle cx="65" cy="48" r="1.2"/><circle cx="70" cy="58" r="1.5"/></g></g><g class="heat" id="heat"><path d="M47 87q-3-3 0-6t0-6"/><path d="M56 87q-3-3 0-6t0-6"/><path d="M65 87q-3-3 0-6t0-6"/></g></svg></div><div class="summary"><p class="status" id="status" role="status" aria-live="polite"></p><p class="phase" id="phase"></p><p class="current" id="current"></p><p class="current" id="remaining"></p><p class="current" id="completion"></p></div></div>
        <div class="fields" id="program-fields"><label>${this.t('selected_program')}</label><p class="current" id="selected-name"></p><button type="button" class="program-trigger" id="program" aria-controls="program-options" aria-expanded="false"><ha-icon id="selected-icon"></ha-icon><span>${this.t('all_programs')}</span></button><div class="program-options" id="program-options" hidden><div class="search-row"><input id="program-search" type="search" aria-label="${this.t('search')}" placeholder="${this.t('find_program')}" autocomplete="off"><button type="button" id="clear-search" aria-label="${this.t('clear_search')}">${this.t('clear')}</button></div><div class="program-list" id="program-list"></div><p class="program-empty" id="program-empty" role="status" aria-live="polite" hidden></p></div></div>
        <details class="program-settings" id="program-settings" hidden><summary><ha-icon icon="mdi:tune-variant"></ha-icon>${this.t('program_settings')}<ha-icon class="settings-chevron" icon="mdi:chevron-down"></ha-icon></summary><p class="setting-hint" id="settings-error" role="status" hidden></p><div class="settings-grid" id="settings-grid"></div></details>
        <div class="actions main-actions">${active ? toggleButton + startButton : startButton + toggleButton}</div>
        <div class="actions" id="start-choices" hidden><button id="choose-start">${this.t('start_program')}</button><button id="cancel">${this.t('cancel_program')}</button></div>
        <div class="actions" id="toggle-choices" hidden><button id="choose-pause">${this.t('pause')}</button><button id="choose-resume">${this.t('resume')}</button>
        </div>
        <p class="note" id="note"></p><p class="error" id="error" role="alert"></p>
        <div class="secondary-actions"><button type="button" id="show-details" hidden><ha-icon icon="mdi:information-outline"></ha-icon><span>${this.t('details')}</span></button><button type="button" id="native"><ha-icon icon="mdi:history"></ha-icon><span>${this.t('history')}</span></button></div></div>
        <section id="details-view" hidden aria-labelledby="details-title"><h3 id="details-title">${this.t('details')}</h3><p class="current" id="active-program"></p><div class="settings-grid" id="active-fields"></div><p class="note" id="active-empty" hidden>${this.t('no_active_parameters')}</p></section>
      </ha-card>`;
    const $ = id => this.shadowRoot.getElementById(id);
    $('name').textContent = c.name || device?.name_by_user || device?.name || (isDryer ? this.t('dryer') : this.t('washer'));
    $('name').title = $('name').textContent;
    $('drum').classList.toggle('running', status === 'running');
    if (isDryer) { $('water').setAttribute('hidden', ''); $('bubbles').setAttribute('hidden', ''); }
    if (!isDryer) $('heat').setAttribute('hidden', '');
    if (progress !== null) {
      $('meter').removeAttribute('hidden');
      $('meter').setAttribute('stroke-dasharray', `${progress} 100`);
    }
    $('connection').textContent = remote === 'on' ? this.t('remote_on') : remote === 'off' ? this.t('remote_off') : this.t('remote_unknown');
    $('remote-info-button').setAttribute('aria-label', $('connection').textContent);
    $('remote-info-button').setAttribute('aria-expanded', String(!!this.remoteInfoOpen));
    $('remote-info').hidden = !this.remoteInfoOpen;
    $('remote-info-button').addEventListener('click', () => {
      this.remoteInfoOpen = !this.remoteInfoOpen;
      $('remote-info').hidden = !this.remoteInfoOpen;
      $('remote-info-button').setAttribute('aria-expanded', String(this.remoteInfoOpen));
    });
    $('child-lock').hidden = !this.entities.child_lock;
    const childLock = this.value('child_lock');
    $('child-lock-label').textContent = t(childLock === 'on' ? 'child_lock_on' : childLock === 'off' ? 'child_lock_off' : 'child_lock_unknown');
    $('status').textContent = this.state('status')?.state === 'unavailable' ? this.t('no_device') : statusText;
    $('phase').textContent = remote !== null && phase && phase !== statusText && !(['idle', 'running', 'paused'].includes(status) && phase === 'Режим ожидания') ? phase : '';
    const current = this.value('current_program');
    const actualName = typeof actualDetails?.program === 'string' && actualDetails.program.trim() ? actualDetails.program : current;
    $('current').textContent = active ? actualName || '' : '';
    const minutes = remainingMinutes;
    if (active && Number.isFinite(minutes) && minutes >= 0 && minutes <= 10080) {
      const rounded = Math.round(minutes);
      $('remaining').textContent = this.t('remaining', { time: `${String(Math.floor(rounded / 60)).padStart(2, '0')}:${String(rounded % 60).padStart(2, '0')}` });
      if (status === 'running') {
        const end = new Date(Date.now() + rounded * 60000);
        $('completion').textContent = this.t('until', { time: end.toLocaleTimeString(this._hass.language || 'en', { hour: '2-digit', minute: '2-digit' }) });
      }
    }
    $('main-view').hidden = !!this.detailsOpen;
    $('details-view').hidden = !this.detailsOpen;
    $('details-back').hidden = false;
    $('show-details').hidden = !active;
    $('program-fields').hidden = active;
    $('show-details').addEventListener('click', () => {
      this.detailsOpen = true;
      this.render();
      this.shadowRoot.getElementById('details-back').focus();
    });
    $('details-back').addEventListener('click', () => {
      if (this.programMenuOpen) {
        this.programMenuOpen = false;
        this.programQuery = '';
        this.render();
        this.shadowRoot.getElementById('program').focus();
        return;
      }
      if (!this.detailsOpen) {
        this.dispatchEvent(new CustomEvent('haier-close', { bubbles: true, composed: true }));
        return;
      }
      this.detailsOpen = false;
      this.render();
      this.shadowRoot.getElementById('show-details').focus();
    });
    $('active-program').textContent = actualName || this.t('no_program_name');
    const activeFields = Array.isArray(actualDetails?.fields) ? actualDetails.fields : [];
    for (const rawField of activeFields) {
      const field = this.metadata(rawField);
      if (!field || typeof field.title !== 'string' || typeof field.value !== 'string' || !field.value.trim()) continue;
      const item = document.createElement('div');
      const label = document.createElement('label');
      const icon = document.createElement('ha-icon');
      const title = document.createElement('span');
      const value = document.createElement('p');
      const description = document.createElement('p');
      item.className = 'setting-field';
      icon.setAttribute('icon', typeof field.icon === 'string' && /^mdi:[a-z0-9-]+$/.test(field.icon) ? field.icon : this.settingIcon(field.title));
      title.textContent = field.title;
      value.textContent = field.value;
      description.className = 'setting-hint';
      description.textContent = typeof field.description === 'string' ? field.description : '';
      label.append(icon, title);
      item.append(label, value, description);
      $('active-fields').append(item);
    }
    $('active-empty').hidden = !!$('active-fields').children.length;
    const select = $('program');
    $('selected-icon').setAttribute('icon', this.programIcon(selected));
    const selectedLabel = selectedProgram ? selected : options.length ? this.t('unselected') : this.t('no_programs');
    $('selected-name').textContent = selectedLabel;
    select.setAttribute('aria-label', this.t('selected', { program: selectedLabel }));
    select.setAttribute('aria-expanded', String(!!this.programMenuOpen));
    $('program-options').hidden = !this.programMenuOpen;
    const search = $('program-search');
    search.value = this.programQuery || '';
    this.programEntries = [];
    this.programGroups = [];
    const addProgram = (program, container, group = null) => {
      const element = document.createElement('button');
      const icon = document.createElement('ha-icon');
      const copy = document.createElement('span');
      const label = document.createElement('span');
      element.type = 'button';
      element.className = 'program-option';
      element.dataset.option = program.option;
      icon.setAttribute('icon', this.programIcon(program.name));
      copy.className = 'program-copy';
      label.textContent = program.name;
      copy.append(label);
      if (typeof program.duration === 'string' && program.duration.trim()) {
        const duration = document.createElement('span');
        duration.className = 'program-duration';
        duration.textContent = program.duration;
        copy.append(duration);
      }
      if (typeof program.description === 'string' && program.description.trim()) {
        const description = document.createElement('span');
        description.className = 'program-description';
        description.textContent = program.description;
        copy.append(description);
      }
      element.append(icon, copy);
      element.addEventListener('click', () => {
        this.programMenuOpen = false;
        this.programQuery = '';
        this.send('select', 'select_option', { entity_id: c.program, option: program.option });
      });
      container.append(element);
      const entry = { element, search: [program.name, program.description, program.duration, group?.title, group?.description].filter(value => typeof value === 'string').join(' ') };
      this.programEntries.push(entry);
      if (group) group.entries.push(entry);
    };
    const catalog = this.state('program')?.attributes?.program_catalog;
    const selectable = new Set(options);
    const groups = Array.isArray(catalog) ? catalog.filter(group => group && typeof group.title === 'string' && Array.isArray(group.programs)).map(group => ({
      title: group.title.trim() || this.t('programs'), description: typeof group.description === 'string' ? group.description : '',
      programs: group.programs.filter(program => program && typeof program.option === 'string' && typeof program.name === 'string' && selectable.has(program.option)),
    })).filter(group => group.programs.length) : [];
    if (groups.length) {
      if (unselected && selectable.has(unselected)) addProgram({ option: unselected, name: unselected }, $('program-list'));
      const represented = new Set(groups.flatMap(group => group.programs.map(program => program.option)));
      const remaining = options.filter(option => option !== unselected && !represented.has(option));
      if (remaining.length) groups.push({ title: this.t('other_programs'), description: '', programs: remaining.map(option => ({ option, name: option })) });
      for (const group of groups) {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        group.entries = [];
        group.element = section;
        section.className = 'program-group';
        title.className = 'program-group-title';
        title.textContent = group.title;
        section.append(title);
        if (group.description.trim()) {
          const description = document.createElement('p');
          description.className = 'program-group-description';
          description.textContent = group.description;
          section.append(description);
        }
        for (const program of group.programs) addProgram(program, section, group);
        $('program-list').append(section);
        this.programGroups.push(group);
      }
    } else {
      for (const option of options) addProgram({ option, name: option }, $('program-list'));
    }
    this.filterPrograms();
    $('program-list').scrollTop = listScroll;
    search.addEventListener('input', () => {
      this.programQuery = search.value;
      $('program-list').scrollTop = 0;
      this.filterPrograms();
    });
    $('clear-search').addEventListener('click', () => {
      this.programQuery = '';
      search.value = '';
      this.filterPrograms();
      search.focus();
    });
    $('program-options').addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      this.programMenuOpen = false;
      this.programQuery = '';
      this.render();
      this.shadowRoot.getElementById('program').focus();
    });
    select.disabled = !connected || !this.usable('program') || !options.length || active || this.pending;
    select.addEventListener('click', () => {
      this.programMenuOpen = !this.programMenuOpen;
      if (!this.programMenuOpen) this.programQuery = '';
      this.render();
      this.shadowRoot.getElementById(this.programMenuOpen ? 'program-search' : 'program').focus();
    });
    const settings = this.state('program')?.attributes?.program_settings;
    const settingsFields = settings?.program === selected && selectedProgram && Array.isArray(settings.fields) ? settings.fields : [];
    const details = $('program-settings');
    const settingsGrid = $('settings-grid');
    const keys = new Set();
    for (const rawField of settingsFields) {
      const field = this.metadata(rawField);
      if (!field || typeof field.key !== 'string' || keys.has(field.key) || !['select', 'number'].includes(field.kind)) continue;
      keys.add(field.key);
      const container = document.createElement('div');
      const label = document.createElement('label');
      const icon = document.createElement('ha-icon');
      const title = document.createElement('span');
      const control = document.createElement(field.kind === 'select' ? 'select' : 'input');
      const hint = document.createElement('p');
      const id = `setting-${keys.size}`;
      const value = settings.values?.[field.key] ?? field.value;
      const options = Array.isArray(field.options) ? field.options.filter(option => option && option.value !== undefined && option.value !== null) : [];
      container.className = 'setting-field';
      label.htmlFor = id;
      icon.setAttribute('icon', this.settingIcon(field.title));
      title.textContent = typeof field.title === 'string' && field.title.trim() ? field.title : this.t('parameter');
      label.append(icon, title);
      control.id = id;
      control.dataset.settingKey = field.key;
      control.dataset.committedValue = value == null ? '' : String(value);
      control.dataset.program = selected;
      if (field.key === focusedSetting && selected === focusedProgram) settingFocusTarget = control;
      control.disabled = !!field.disabled || !connected || active || this.pending || !this._hass.services?.haier_evo?.configure_program;
      if (field.kind === 'select') {
        if (!options.length) control.disabled = true;
        for (const option of options) {
          const item = document.createElement('option');
          item.value = String(option.value);
          item.textContent = typeof option.label === 'string' && option.label.trim() ? option.label : String(option.value);
          control.append(item);
        }
        if (value !== null && value !== undefined && !options.some(option => String(option.value) === String(value))) {
          const item = document.createElement('option');
          item.value = String(value);
          item.textContent = String(value);
          control.append(item);
        }
      } else {
        control.type = 'number';
        control.required = true;
        control.step = 'any';
        for (const bound of ['min', 'max', 'step']) {
          if (field[bound] !== null && field[bound] !== undefined) control[bound] = String(field[bound]);
        }
      }
      control.value = value === null || value === undefined ? '' : String(value);
      control.addEventListener('change', () => {
        if (control.disabled || (field.kind === 'number' && !control.value) || !control.checkValidity()) {
          if (!control.disabled) control.reportValidity();
          return;
        }
        if (control.value === String(value ?? '')) return;
        this.send('haier_evo', 'configure_program', { entity_id: c.program, program: selected, parameters: { [field.key]: control.value } });
      });
      hint.className = 'setting-hint';
      const selectedOption = options.find(option => String(option.value) === String(value));
      hint.textContent = [field.description, selectedOption?.description, field.kind === 'number' ? field.unit : '', field.disabled ? this.t('not_editable') : '']
        .filter(text => typeof text === 'string' && text.trim()).join(' · ');
      if (hint.textContent) {
        hint.id = `${id}-hint`;
        control.setAttribute('aria-describedby', hint.id);
      }
      container.append(label, control, hint);
      settingsGrid.append(container);
    }
    const settingsError = settings?.program === selected && settings.error ? this.errorText(settings.error, 'settings_unavailable') : '';
    $('settings-error').textContent = settingsError;
    $('settings-error').hidden = !settingsError;
    details.hidden = active || (!settingsGrid.children.length && !settingsError);
    details.open = settingsOpen;
    $('start').disabled = !(uncertain ? canStart || canCancel : active ? canCancel : canStart);
    $('toggle').disabled = !(canToggle || canChooseToggle);
    $('choose-start').disabled = !canStart;
    $('cancel').disabled = !canCancel;
    $('choose-pause').disabled = !canChooseToggle || !this.usable('pause');
    $('choose-resume').disabled = !canChooseToggle || !this.usable('resume');
    $('start-icon').setAttribute('icon', active ? 'mdi:stop' : 'mdi:play');
    $('start-label').textContent = uncertain ? this.t('start_cancel') : active ? this.t('cancel') : this.t('start');
    $('toggle-icon').setAttribute('icon', action === 'resume' ? 'mdi:play' : 'mdi:pause');
    $('toggle-label').textContent = action === 'resume' ? this.t('resume') : action === 'pause' ? this.t('pause') : this.t('pause_resume');
    $('note').textContent = !c.start && !c.pause && !c.resume && !c.cancel ? t('control_disabled') : !connected ? t('no_remote') : !status ? t('unknown_cycle') : active ? t('confirm_cancel_note') : t('confirm_start_note');
    $('error').textContent = this.error;
    const start = () => {
      if (canStart && window.confirm(this.t('confirm_start', { program: selected }))) this.send('button', 'press', { entity_id: c.start });
    };
    const cancel = () => {
      if (canCancel && window.confirm(this.t('confirm_cancel'))) this.send('button', 'press', { entity_id: c.cancel });
    };
    $('start').addEventListener('click', () => {
      if (uncertain) {
        $('start-choices').hidden = !$('start-choices').hidden;
        $('start').setAttribute('aria-expanded', String(!$('start-choices').hidden));
      }
      else if (active) cancel();
      else start();
    });
    $('toggle').addEventListener('click', () => {
      if (canToggle) this.send('button', 'press', { entity_id: c[action] });
      else if (canChooseToggle) {
        $('toggle-choices').hidden = !$('toggle-choices').hidden;
        $('toggle').setAttribute('aria-expanded', String(!$('toggle-choices').hidden));
      }
    });
    $('choose-start').addEventListener('click', start);
    $('cancel').addEventListener('click', cancel);
    for (const choice of ['pause', 'resume']) {
      $('choose-' + choice).addEventListener('click', () => {
        if (canChooseToggle && this.usable(choice)) this.send('button', 'press', { entity_id: c[choice] });
      });
    }
    $('native').addEventListener('click', () => this.dispatchEvent(new CustomEvent('haier-show-native', { bubbles: true, composed: true })));
    if (settingFocusTarget && settingsOpen && !settingFocusTarget.disabled) {
      if (settingFocusTarget.type === 'number' && settingFocusTarget.dataset.committedValue === focusedCommitted) {
        settingFocusTarget.value = focusedDraft;
      }
      settingFocusTarget.focus({ preventScroll: true });
    }
    if (focused?.id === 'details-back') $('details-back').focus({ preventScroll: true });
    if (searchFocused && this.programMenuOpen) {
      search.focus({ preventScroll: true });
      if (searchStart !== null && searchEnd !== null) search.setSelectionRange(searchStart, searchEnd);
    }
    if (this.restoreFocusId) {
      const replacement = $(this.restoreFocusId);
      if (replacement && !replacement.disabled && !replacement.hidden && !this.pending) {
        replacement.focus({ preventScroll: true });
        this.restoreFocusId = null;
      }
    }
    this.onViewChange?.(!!this.detailsOpen);
  }

  filterPrograms() {
    const normalize = value => String(value).toLocaleLowerCase().replace(/ё/g, 'е').trim();
    const terms = normalize(this.programQuery || '').split(/\s+/).filter(Boolean);
    let matches = 0;
    for (const entry of this.programEntries) {
      const name = normalize(entry.search);
      entry.element.hidden = !terms.every(term => name.includes(term));
      if (!entry.element.hidden) matches++;
    }
    for (const group of this.programGroups) {
      group.element.hidden = !group.entries.some(entry => !entry.element.hidden);
    }
    this.shadowRoot.getElementById('clear-search').hidden = !this.programQuery;
    const empty = this.shadowRoot.getElementById('program-empty');
    empty.hidden = matches > 0;
    empty.textContent = matches ? '' : this.t('no_matches');
  }

  settingIcon(title = '') {
    const text = String(title).toLocaleLowerCase();
    if (/температур|temperature/.test(text)) return 'mdi:thermometer';
    if (/отжим|скорост|spin/.test(text)) return 'mdi:rotate-right';
    if (/загрязнен|soil/.test(text)) return 'mdi:tshirt-crew';
    if (/сушк|dryer/.test(text)) return 'mdi:tumble-dryer';
    return 'mdi:tune-variant';
  }

  programIcon(name = '') {
    const text = String(name).toLocaleLowerCase().split(' - ').at(-1);
    const icons = [
      [/очистк.*барабан|drum.*clean/, 'mdi:washing-machine'],
      [/анти.?аллерг|allerg/, 'mdi:shield-check'],
      [/(^|[^a-z])uv([^a-z]|$)|ультрафиолет|уф.?обработ/, 'mdi:white-balance-sunny'],
      [/освеж|refresh/, 'mdi:refresh'], [/отжим|spin/, 'mdi:rotate-right'],
      [/авто|auto/, 'mdi:autorenew'], [/смешан|mixed/, 'mdi:tshirt-crew'],
      [/постель|бель[её] пост|bed/, 'mdi:bed'], [/детск|baby/, 'mdi:baby-face-outline'],
      [/питом|pet/, 'mdi:paw'], [/полотен|towel/, 'mdi:layers-outline'], [/джинс|jeans/, 'mdi:hanger'],
      [/рубаш|shirt/, 'mdi:tshirt-crew'], [/спорт|sport/, 'mdi:run'], [/штор|curtain/, 'mdi:curtains'],
      [/шерст|wool/, 'mdi:sheep'], [/быстр|quick|времени|time/, 'mdi:timer-outline'],
      [/ночн|night/, 'mdi:weather-night'], [/паром|steam/, 'mdi:weather-fog'],
      [/полоскан|rinse/, 'mdi:water'], [/пух|объ[её]мн|пухов/, 'mdi:weather-cloudy'],
      [/школьн|school/, 'mdi:school-outline'], [/обув|shoe/, 'mdi:shoe-sneaker'],
      [/хлопок|cotton/, 'mdi:flower'], [/деликат|кашемир|delicate/, 'mdi:flower-outline'],
      [/мембран|waterproof/, 'mdi:water-outline'], [/подогрев|warm/, 'mdi:heat-wave'],
      [/синтет|synthetic/, 'mdi:tshirt-v-outline'],
      [/не выбран|not selected/, 'mdi:format-list-bulleted'],
    ];
    return icons.find(([pattern]) => pattern.test(text))?.[1] || 'mdi:tshirt-crew-outline';
  }
}

async function resolveLaundry(hass, config, allowDisplayFallback = false) {
  const target = config.entity ? await hass.callWS({ type: 'config/entity_registry/get', entity_id: config.entity }) : null;
  if (target && (target.platform !== 'haier_evo' || !target.entity_id.startsWith('sensor.') || !target.unique_id?.endsWith('_state'))) throw new Error('Unsupported target');
  const deviceId = target?.device_id || config.device_id || config.device;
  if (!deviceId) throw new Error('Missing device');
  const normalize = entry => ({ ...entry, entity_id: entry.entity_id || entry.ei, device_id: entry.device_id || entry.di });
  const candidates = Object.entries(hass.entities || {}).map(([id, entry]) => normalize({ entity_id: id, ...entry }))
    .filter(entry => entry.device_id === deviceId);
  const ids = [...new Set(candidates.map(entry => entry.entity_id).filter(id => id && id !== target?.entity_id))];
  if (target && !ids.length) throw new Error('Device entity cache is incomplete');
  const result = ids.length ? await hass.callWS({ type: 'config/entity_registry/get_entries', entity_ids: ids }) : {};
  const entries = [...Object.values(result), target].filter(entry => entry?.device_id === deviceId && entry.platform === 'haier_evo');
  const bySuffix = (domain, suffix) => entries.find(entry => entry.entity_id.startsWith(`${domain}.`) && entry.unique_id?.endsWith(`_${suffix}`))?.entity_id;
  if (!target && !bySuffix('sensor', 'state') && allowDisplayFallback) {
    const display = await hass.callWS({ type: 'config/entity_registry/list_for_display' });
    const missing = (display.entities || []).map(normalize)
      .filter(entry => entry.device_id === deviceId && !ids.includes(entry.entity_id)).map(entry => entry.entity_id);
    const extra = missing.length ? await hass.callWS({ type: 'config/entity_registry/get_entries', entity_ids: missing }) : {};
    entries.push(...Object.values(extra).filter(entry => entry?.device_id === deviceId && entry.platform === 'haier_evo'));
  }
  const entities = {
    status: target?.entity_id || bySuffix('sensor', 'state'), program: bySuffix('select', 'laundry_program'),
    remote: bySuffix('binary_sensor', 'remote_control'), child_lock: bySuffix('binary_sensor', 'child_lock'), phase: bySuffix('sensor', 'phase'),
    current_program: bySuffix('sensor', 'program'), duration: bySuffix('sensor', 'remaining_time'),
    ...Object.fromEntries(['start', 'pause', 'resume', 'cancel'].map(action => [action, bySuffix('button', `laundry_${action}`)])),
  };
  if (!entities.status) throw new Error('Missing state sensor');
  return { device_id: deviceId, entities };
}

function nativeMoreInfo(entityId) {
  const root = document.querySelector('home-assistant');
  root?.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId, haierNative: true }, bubbles: true, composed: true }));
}

async function openLaundryDialog(hass, config, opener) {
  let dialog;
  try {
    const result = await resolveLaundry(hass, config, !!config.device_id);
    document.querySelector('dialog[data-haier-laundry]')?.close();
    dialog = document.createElement('dialog');
    dialog.dataset.haierLaundry = '';
    dialog.setAttribute('aria-label', uiText(hass, 'dialog'));
    dialog.innerHTML = `<style>
      dialog[data-haier-laundry] { box-sizing: border-box; width: min(520px, calc(100vw - 24px)); max-width: none; max-height: calc(100dvh - 24px); padding: 0; border: 0; border-radius: 18px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); box-shadow: 0 16px 50px #0006; }
      dialog[data-haier-laundry]::backdrop { background: #0009; }
      dialog[data-haier-laundry] haier-laundry-detail { display: block; }
    </style><haier-laundry-detail></haier-laundry-detail>`;
    const details = dialog.querySelector('haier-laundry-detail');
    details.setConfig({ ...config, device: result.device_id, entities: result.entities });
    details.hass = hass;
    dialog.addEventListener('haier-close', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('haier-show-native', () => { dialog.close(); nativeMoreInfo(result.entities.status); });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...details.shadowRoot.querySelectorAll('button,input,select,summary,[tabindex]')]
        .filter(control => !control.disabled && control.tabIndex >= 0 && control.getClientRects().length);
      const first = controls[0], last = controls.at(-1), focused = details.shadowRoot.activeElement;
      if (event.shiftKey && focused === first || !event.shiftKey && focused === last) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    });
    let unsubscribe;
    dialog.addEventListener('close', () => { unsubscribe?.(); dialog.remove(); opener?.focus?.(); }, { once: true });
    document.body.append(dialog);
    dialog.showModal();
    details.shadowRoot.getElementById('details-back').focus();
    if (hass.connection?.subscribeEvents) {
      hass.connection.subscribeEvents(update => {
        if (!Object.values(result.entities).includes(update.data?.entity_id)) return;
        const current = document.querySelector('home-assistant')?.hass || hass;
        if (dialog.open) {
          const states = { ...details._hass.states };
          if (Object.hasOwn(update.data, 'new_state')) {
            if (update.data.new_state) states[update.data.entity_id] = update.data.new_state;
            else delete states[update.data.entity_id];
          }
          details.hass = { ...current, states };
        }
      }, 'state_changed').then(unsub => { if (dialog.open) unsubscribe = unsub; else unsub(); }).catch(() => {});
    }
    return dialog;
  } catch (error) {
    dialog?.remove();
    if (config.entity) { nativeMoreInfo(config.entity); return null; }
    throw error;
  }
}

class HaierLaundryRowCard extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  setConfig(config) {
    if (!config.entity && !config.device_id) throw new Error(uiText(this._hass, 'config_error'));
    this.config = config;
    this.render();
  }
  set hass(hass) { this._hass = hass; this.render(); }
  getCardSize() { return 1; }
  render() {
    if (!this.config || !this._hass) return;
    const focused = !!this.shadowRoot.activeElement;
    this.shadowRoot.innerHTML = `<style>
      :host { --haier-font-family:var(--paper-font-body1_-_font-family,sans-serif); --haier-type-group:600 17px/1.3 var(--haier-font-family); --haier-type-caption:400 12px/1.4 var(--haier-font-family); display:block; color:var(--primary-text-color); font-family:var(--paper-font-body1_-_font-family,sans-serif); }
      button { width:100%; min-height:72px; padding:14px 20px; border:0; border-radius:var(--ha-card-border-radius,12px); color:inherit; background:var(--card-background-color,var(--primary-background-color)); text-align:left; display:flex; gap:16px; align-items:center; cursor:pointer; }
      button:focus-visible { outline:3px solid var(--primary-color); outline-offset:2px; }
      ha-icon { color:var(--primary-color); } span { min-width:0; } strong { display:block; font:var(--haier-type-group); overflow-wrap:anywhere; } small { display:block; margin-top:3px; font:var(--haier-type-caption); color:var(--secondary-text-color); }
    </style><ha-card><button type="button" aria-haspopup="dialog"><ha-icon></ha-icon><span><strong></strong><small></small></span></button></ha-card>`;
    const state = this._hass.states[this.config.entity];
    const device = this._hass.devices?.[this.config.device_id];
    this.shadowRoot.querySelector('strong').textContent = this.config.name || device?.name_by_user || device?.name || state?.attributes?.friendly_name || uiText(this._hass, this.config.kind === 'dryer' ? 'dryer' : 'washer');
    this.shadowRoot.querySelector('small').textContent = this.error || uiText(this._hass, UI_TEXT[`state_${state?.state}`] ? `state_${state.state}` : 'no_cycle');
    this.shadowRoot.querySelector('ha-icon').setAttribute('icon', this.config.kind === 'dryer' ? 'mdi:tumble-dryer' : 'mdi:washing-machine');
    this.shadowRoot.querySelector('button').addEventListener('click', async () => {
      try { await openLaundryDialog(this._hass, this.config, { focus: () => this.shadowRoot.querySelector('button')?.focus() }); }
      catch (_) { this.error = uiText(this._hass, 'load_error'); this.render(); }
    });
    if (focused) this.shadowRoot.querySelector('button').focus();
  }
}

function installMoreInfo(targets) {
  if (!targets.size) return;
  window.addEventListener('hass-more-info', event => {
    const entity = event.detail?.entityId;
    if (event.detail?.haierNative || !targets.has(entity)) return;
    const hass = document.querySelector('home-assistant')?.hass;
    if (!hass) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openLaundryDialog(hass, { entity }, document.activeElement);
  }, true);
}

if (!customElements.get('haier-laundry-detail')) customElements.define('haier-laundry-detail', HaierLaundryCard);
if (!customElements.get('haier-laundry-card')) customElements.define('haier-laundry-card', HaierLaundryRowCard);
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === 'haier-laundry-card')) window.customCards.push({ type: 'haier-laundry-card', name: 'Haier Laundry', description: uiText(null, 'dialog') });
const moreInfo = new URL(import.meta.url).searchParams.get('more_info') || '';
installMoreInfo(new Set(moreInfo.split(',').map(value => value.trim()).filter(value => /^sensor\.[a-z0-9_]+$/.test(value))));
