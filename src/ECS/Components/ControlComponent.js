import Component from "./Component.js";
import ControllerMgr from "./../../Controller/ControllerManager.js";

const Control = function Control(data) {
    this.controls = data.controls;
    this.playerControlled = true;

    // * Register Controls with Manager
    this.controls.forEach(function forEachControl(v, k) {
        ControllerMgr.registerInputEvent(k, ...v);
    });

    Component.call(this, "Control");

    return this;
};

Control.prototype = Object.create(Component.prototype);
Control.prototype.constructor = Control;

export default Control;
