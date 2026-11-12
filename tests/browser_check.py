"""Headless Linux checks against an isolated synthetic HA frontend."""
import json
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = "http://127.0.0.1:18442/tests/fixture.html"
OUT = Path(__file__).parent / "screenshots"
OUT.mkdir(exist_ok=True)

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    results = []
    for width in (320, 390, 768):
        page = browser.new_page(viewport={"width": width, "height": 900})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(ROOT, wait_until="networkidle")
        page.wait_for_function("window.fixtureReady")
        assert page.evaluate("wsCalls.length") == 0
        assert page.evaluate("serviceCalls.length") == 0
        page.locator("#washer button").click()
        detail = page.locator("haier-laundry-detail")
        detail.locator("#status").wait_for(state="visible")
        assert detail.locator("#status").inner_text() == "Ожидание"
        assert detail.locator("#phase").inner_text() == ""
        assert page.evaluate("listenerCount()") == 1
        assert page.evaluate("wsCalls.every(r=>r.type!=='config/entity_registry/list')")
        for button in detail.locator("button:visible").all():
            box = button.bounding_box()
            assert box["height"] >= 44, (width, button.get_attribute("id"), box)
        assert page.locator("dialog").evaluate("el=>el.scrollWidth<=el.clientWidth")
        assert detail.locator("#start-label").inner_text() == "Запустить"
        assert detail.locator("#native").inner_text() == "История и настройки"
        page.evaluate("()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))")
        page.screenshot(path=str(OUT / f"main-{width}.png"), full_page=True)
        detail.locator("#details-back").focus()
        page.keyboard.press("Shift+Tab")
        assert detail.locator("#native").evaluate("el=>el===el.getRootNode().activeElement")
        page.keyboard.press("Tab")
        assert detail.locator("#details-back").evaluate("el=>el===el.getRootNode().activeElement")
        detail.locator("#program").click()
        detail.locator("#program-search").fill("длинное")
        assert detail.locator(".program-option:visible").count() == 1
        assert page.locator("dialog").evaluate("el=>el.scrollWidth<=el.clientWidth")
        page.screenshot(path=str(OUT / f"catalog-{width}.png"), full_page=True)
        page.keyboard.press("Escape")
        assert page.locator("dialog[open]").count() == 1
        assert detail.locator("#program").evaluate("el=>el===el.getRootNode().activeElement")
        page.evaluate("updateState('sensor.washer_state','running')")
        assert detail.locator("#toggle-label").inner_text() == "Пауза"
        page.emulate_media(reduced_motion="reduce")
        assert detail.locator(".laundry").evaluate("el=>getComputedStyle(el).animationName") == "none"
        detail.locator("#show-details").click()
        assert detail.locator("#active-program").inner_text() == "Смешанная"
        assert detail.locator("#active-fields").inner_text().find("Выключено") >= 0
        assert page.locator("dialog").evaluate("el=>el.scrollWidth<=el.clientWidth")
        page.screenshot(path=str(OUT / f"details-{width}.png"), full_page=True)
        page.keyboard.press("Escape")
        page.locator("dialog").wait_for(state="detached")
        assert page.locator("dialog").count() == 0
        assert page.locator("#washer button").evaluate("el=>el===el.getRootNode().activeElement")
        assert page.evaluate("listenerCount()") == 0
        assert page.evaluate("serviceCalls.length") == 0
        assert not errors, errors
        results.append({"width": width, "responsive_focus_reduced_motion": "PASS"})
        page.close()

    page = browser.new_page(viewport={"width": 390, "height": 900})
    page.goto(ROOT + "?lang=en&mode=more", wait_until="networkidle")
    page.wait_for_function("window.fixtureReady")
    page.evaluate("document.body.classList.add('dark')")
    page.evaluate("document.querySelector('home-assistant').dispatchEvent(new CustomEvent('hass-more-info',{detail:{entityId:'sensor.washer_state'},bubbles:true,composed:true}))")
    detail = page.locator("haier-laundry-detail")
    detail.locator("#status").wait_for(state="visible")
    assert detail.locator("#status").inner_text() == "Idle"
    assert "Controlled on the appliance panel" in detail.locator("#child-lock-label").inner_text()
    page.screenshot(path=str(OUT / "english-dark-390.png"), full_page=True)
    page.once("dialog", lambda dialog: dialog.dismiss())
    detail.locator("#start").click()
    assert page.evaluate("serviceCalls.length") == 0
    page.once("dialog", lambda dialog: dialog.accept())
    detail.locator("#start").click()
    page.wait_for_function("serviceCalls.length===1")
    assert page.evaluate("serviceCalls[0]") == ["button", "press", {"entity_id": "button.washer_laundry_start"}]
    detail.locator("#native").click()
    page.locator("dialog").wait_for(state="detached")
    assert page.locator("dialog").count() == 0
    assert page.evaluate("nativeEvents.at(-1).haierNative") is True
    page.evaluate("window.failLookup=true;document.querySelector('home-assistant').dispatchEvent(new CustomEvent('hass-more-info',{detail:{entityId:'sensor.washer_state'},bubbles:true,composed:true}))")
    page.wait_for_function("nativeEvents.length===2")
    assert page.locator("dialog").count() == 0
    assert page.evaluate("listenerCount()") == 0
    results.append({"english_dark_confirmation_native_routing_fallback": "PASS"})
    browser.close()
    print(json.dumps(results, ensure_ascii=False))
