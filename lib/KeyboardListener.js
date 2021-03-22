import { ClipboardHelper } from "./ClipboardHelper.js";
import InputMappings from "./utils/InputMappings.js";
import ScreenShotHelper from "./utils/ScreenShotHelper.js";

export default class KeyboardListener {
  constructor(minecraftIn) {
    this.mc = minecraftIn;
    this.clipboardHelper = new ClipboardHelper();
  }

  onKeyEvent(key, action, modifiers) {
    const iguieventlistener = this.mc.currentScreen;

    if(iguieventlistener !== null) {
      if(action != 1) {
        if(action == 0) iguieventlistener.keyReleased(key, modifiers);
      } else {
        iguieventlistener.keyPressed(key, modifiers);

        if(key == 'Escape') {
          
        }
      }
    }

    if(key == 'F2' && action == 0) {
      ScreenShotHelper.saveScreenshot(this.mc.mccanvas.canvas);
    }
    
    if(key == 'F3' && action == 0) {
      this.mc.gameSettings.showDebugInfo = !this.mc.gameSettings.showDebugInfo;
    }
  }

  getClipboardString() {
    return this.clipboardHelper.getClipboardString();
  }

  setClipboardString(string) {
    this.clipboardHelper.setClipboardString(string);
  }

  setupCallbacks() {
    InputMappings.setKeyCallbacks((key, action, modifiers) => {
      this.onKeyEvent(key, action, modifiers);
    })
  }
}