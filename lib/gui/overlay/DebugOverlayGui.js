import Context2D from "../../renderer/Context2D.js";
import AbstractGui from "../AbstractGui.js";

export default class DebugOverlayGui extends AbstractGui {
  constructor(mc) {
    this.mc = mc;
  }

  render() {
    Context2D.drawText('Debug Overlay is rendering', this.width / 2, 16);
  }
}