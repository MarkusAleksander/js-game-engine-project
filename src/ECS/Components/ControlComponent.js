import Component from "./Component.js";
import ControllerMgr from "./../../Controller/ControllerManager.js";

const Control = function Control(data) {
    this.controls = data.controls;
    this.playerControlled = true;
    this.controls = data.controls;

    Component.call(this, "Control");

    return this;
};

Control.prototype = Object.create(Component.prototype);
Control.prototype.constructor = Control;

export default Control;
