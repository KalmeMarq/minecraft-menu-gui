import BooleanOption from "./settings/BooleanOption.js";

export const HIDE_GUI = new BooleanOption('Hide GUI', (settings) => {
  return settings.hideGUI;
}, (settings, optionValues) => {
  settings.hideGUI = optionValues;
})