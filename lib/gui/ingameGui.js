import Context2D from "../renderer/Context2D.js";
import DebugOverlayGui from "./overlay/DebugOverlayGui.js";

export default class IngameGui {
  constructor(mcIn) {
    this.mc = mcIn;
    this.overlayDebug = new DebugOverlayGui(this.mc);
  }

  renderIngameGui() {
    Context2D.drawText('IngameGui is rendering', 2, 6);

    if(this.mc.gameSettings.showDebugInfo) {
      this.overlayDebug.render();
    }
  }

  reset() {}
}