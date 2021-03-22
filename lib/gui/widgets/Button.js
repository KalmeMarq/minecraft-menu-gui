import AbstractButton from "./AbstractButton.js";

export default class Button extends AbstractButton {
  constructor(x, y, width, height, title, onPressFunc) {
    super(x, y, width, height, title);
    this.onPressFunc = onPressFunc;
  }

  onPress() {
    this.onPressFunc(this);
  }
}