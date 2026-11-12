# Haier Laundry UI

An optional Home Assistant frontend for Haier Evo 2.0. A compact device name and state open the existing laundry window. It uses native sensors, buttons and the program selector. Installing this file alone does not replace any Home Assistant window.

## Install explicitly

### Manual installation

1. Copy `haier-laundry-ui.js` into `/config/www/haier-laundry-ui.js`.
2. In **Settings > Dashboards > Resources**, add `/local/haier-laundry-ui.js?v=0.1.0` as a **JavaScript module**.
3. Reload the browser and add a card in YAML:

```yaml
type: custom:haier-laundry-card
entity: sensor.my_washer_state
name: Washing machine
```

Use the existing state sensor's actual entity ID, including a user-renamed ID. For a dryer, add `kind: dryer`. The card itself only displays a name and state; controls appear after clicking it. Native Home Assistant more-info stays unchanged.

You may use `device_id: <Home Assistant device ID>` instead of `entity`. The device lookup happens only when the window opens; an incomplete frontend entity cache may require one display-registry read. Prefer `entity` for an immediate closed-card state.

### Optional more-info interception

Explicitly list only the native state sensors whose more-info should open this window. Choose one loading method to avoid loading the module twice.

**Dashboard resource:** use this resource URL in place of the ordinary resource URL:

```yaml
url: /local/haier-laundry-ui.js?v=0.1.0&more_info=sensor.my_washer_state,sensor.my_dryer_state
type: module
```

Lovelace loads this resource after a dashboard opens. A fresh browser load directly onto a device page, before opening a dashboard, keeps native more-info.

**Global frontend module:** to support direct device pages on a fresh load, the owner can explicitly add the same URL to `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - "/local/haier-laundry-ui.js?v=0.1.0&more_info=sensor.my_washer_state,sensor.my_dryer_state"
```

Merge this into the existing `frontend` section. Preserve its themes, other settings and existing `extra_module_url` entries. Check the configuration and restart Home Assistant Core after changing YAML, then reload the browser. This is an explicit owner choice to load a global frontend resource; only the listed entity IDs are intercepted. A separate Lovelace resource is unnecessary with this method. For HACS, use `/hacsfiles/haier-evo-laundry-ui/haier-laundry-ui.js` with the same query instead of `/local/haier-laundry-ui.js`.

Unlisted entities keep native more-info. A failed or unsupported lookup also returns to native Home Assistant. Remove `more_info` from the chosen URL to disable interception while retaining the custom card. YAML changes require the configuration check and Core restart above; reload the browser afterward.

### HACS

Add [nikrays/haier-evo-laundry-ui](https://github.com/nikrays/haier-evo-laundry-ui) as a HACS custom repository of type **Dashboard** (internally `plugin`). Add `/hacsfiles/haier-evo-laundry-ui/haier-laundry-ui.js` as a JavaScript module resource; append `more_info=...` only if interception is wanted. HACS installation has not been verified on a live Home Assistant instance.

[HACS plugin structure](https://www.hacs.dev/docs/publish/plugin/) describes the repository type and supported JavaScript locations.

## Behavior and compatibility

With plain Haier Evo 2.0, the card uses the native state sensor, program selector and control buttons. The selector and buttons require the integration's beta laundry-control option. Rich program groups, parameter controls and active-program details require the separate native-selector parameter extension; the basic card does not require it.

- Requires the existing Haier Evo 2.0 native `sensor` state entity and its device registry entries. No integration changes, custom entity domain, entity category changes or backend JavaScript injection are needed.
- Start, pause, resume and cancel call `button.press` on the matching native buttons. Start and cancel ask for confirmation. Missing, unavailable or remote-disabled controls stay unavailable. Nothing is sent when loading the resource or opening a window.
- Program selection calls `select.select_option`. Optional program metadata comes from the native `_laundry_program` selector: `program_catalog`, `program_settings` and `active_program_details`. Parameter staging requires the separate native-selector parameter extension and its `haier_evo.configure_program` service; without it parameter controls are unavailable. Staging targets the selector and never presses Start.
- The main state keeps native `off`, `idle`, `running`, `paused`, `finished` and `cancelled` semantics. Unknown states and missing values stay unknown. This frontend does not introduce a `care` state or completion events.
- Child lock is read from the existing binary sensor. It is informational and controlled on the appliance panel. Remote-control access is also panel-controlled. This frontend has no child-lock or remote-control setter.
- Authored labels and errors are available in English and Russian; names provided by the cloud stay unchanged. Structured integration errors use Home Assistant translations, with a localized fallback when a translation is unavailable.
- Lookup uses one target registry entry and the frontend's device candidates, followed by `get_entries` for that device only. It does not request the full registry or subscribe to registry updates. State subscriptions exist only while a dialog is open and are removed on close.

Removing the card/resource and reloading the browser restores the ordinary frontend. No entity IDs, automations, history or device settings are changed.

## Development

No runtime dependencies or build step:

```sh
npm test
python3 -m http.server 18442 --bind 127.0.0.1
# In another terminal, using an environment with Playwright and Chromium:
python3 tests/browser_check.py
```

`tests/fixture.html` is an isolated synthetic Home Assistant frontend. Its requests and commands are in-memory mocks, not appliance operations. Browser checks cover 320, 390 and 768 px, keyboard focus, reduced motion, dark theme, localized UI and native service routing. They do not establish live hardware compatibility.

## License and attribution

MIT, preserving the upstream license and copyright notices in [LICENSE](LICENSE). The initial window, SVG, style system and 29 JavaScript regression scenarios were derived from `nikrays/haier_evo` commit `2bce89ad479aad22a623ac0a27bcbb14c440f848`, based on `and7ey/haier_evo`. Attribution: and7ey, AGrigorii and nikrays. The optional frontend transport, scoped lookup and opt-in card/module are maintained separately here.
