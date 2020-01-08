/*
 *   ControllerManager.js
 *   Management Class for User Input. User inputs are registered here with keycode, eventType and callback function
 */
import ManagerPrototype from "./../ManagerPrototype/ManagerPrototype.js";

import EventMgr from "./../EventSystem/EventManager.js";

import Utilities from "../Globals/Utilities.js";
import { INPUT_MODES } from "../Globals/KeyCodes.js";

// * -----------------------------------
// *    CONTROLLER MANAGER
// * -----------------------------------
const ControllerManager = function ControllerManager(data) {
    // * -----------------------------------
    // *    CONTROLLER MANAGER PROPERTIES
    // * -----------------------------------

    // * List of inputs
    this.inputs = new Map();

    // * List of Active Inputs
    // this.activeInputs = new Map();

    // * Pointer to self for window event listeners
    let _self = this;

    ManagerPrototype.call(this, data);

    // * -----------------------------------
    // *    CONTROLLER MANAGER METHODS
    // * -----------------------------------

    // TODO - Support mouse input, mouse move, mouse scroll, keyup events

    // * Register an input key with type and callback
    this.registerInputEvent = function registerInputEvent(
        keyCode,
        eventType,
        fn,
        mode
    ) {
        if (this.inputs.has(keyCode)) {
            Utilities.outputDebug("Overwriting Input! : " + keyCode);
        }
        this.inputs.set(
            keyCode,
            new ControllerManager.KeyInputEvent(keyCode, eventType, fn, mode)
        );
    };

    // * Update the Controller to check for current user inputs
    this.update = function update() {
        this.inputs.forEach((k) => {
            if (k.getActiveStatus()) {
                k.update();
            }
        });
    };

    // this.getActiveInputs = function getActiveInputs() {
    //     return this.activeInputs;
    // };

    // this.addInputToActiveList = function addInputToActiveList(data) {
    //     this.activeInputs.set(data.keyCode, [data.pActive, data.vActive]);
    // };

    // this.removeInputFromActiveList = function removeInputFromActiveList(data) {
    //     this.activeInputs.delete(data.keyCode);
    // };

    // this.removeInputFromVActiveList = function removeInputFromVActiveList(
    //     data
    // ) {
    //     let arr = this.activeInputs.get(data.keyCode);

    //     if (arr) {
    //         arr[1] = false;
    //     }

    //     this.activeInputs.set(data.keyCode, arr);
    // };

    // * Update the Key Status on User event
    this.updateKeyStatus = function updateKeyStatus(e) {
        let activeEvent = this.inputs.get(e.keyCode);

        if (activeEvent) {
            activeEvent.setActiveStatus(e.type);
        }
    };

    // * Register event listeners
    window.addEventListener("keydown", _self.updateKeyStatus.bind(_self));
    window.addEventListener("keyup", _self.updateKeyStatus.bind(_self));

    // EventMgr.addEventListener(
    //     "input_register_active",
    //     this.addInputToActiveList
    // );
    // EventMgr.addEventListener(
    //     "input_deregister_active",
    //     this.removeInputFromActiveList
    // );
    // EventMgr.addEventListener(
    //     "input_deregister_vactive",
    //     this.removeInputFromVActiveList
    // );
};

// * Key event Class wrapper - handle state of the key
ControllerManager.KeyInputEvent = function KeyInputEvent(
    keyCode,
    eventType,
    fn,
    mode
) {
    this.keyCode = keyCode;
    this.eventType = eventType;
    this.isPhysicallyActive = false; // * Physical state of the key
    this.isVirtualActive = false; // * Virtual state of the key
    this.eventFn = fn;
    this.mode = Utilities.checkUndefinedAndReturn(mode, INPUT_MODES.CONTINUOUS);

    //  * Get phyiscal state of the key
    this.getActiveStatus = function getActiveStatus() {
        return this.isPhysicallyActive;
    };

    // * Set the active status of the key
    this.setActiveStatus = function setActiveStatus(eventType) {
        let result = this.eventType === eventType;

        if (this.isPhysicallyActive !== result) {
            this.isVirtualActive = result;
        }

        this.isPhysicallyActive = result;

        this.isPhysicallyActive
            ? EventMgr.dispatchEvent("input_register_active", {
                  keyCode: this.keyCode,
              })
            : EventMgr.dispatchEvent("input_deregister_active", {
                  keyCode: this.keyCode,
              });
    };

    // * Run associated event
    this.update = function update() {
        // * Don't run if virtually inactive
        if (!this.isVirtualActive) {
            return;
        }

        this.eventFn();

        // * If should be single, set virtual state to off
        if (this.mode === INPUT_MODES.SINGLE) {
            this.isVirtualActive = false;
            EventMgr.dispatchEvent("input_deregister_vactive", {
                keyCode: this.keyCode,
            });
        }
    };

    // * Get event type
    this.getEventType = function getEventType() {
        return this.eventType;
    };

    // * Get key code
    this.getKeyCode = function getKeyCode() {
        return this.keyCode;
    };
};

ControllerManager.prototype = Object.create(ManagerPrototype.prototype);
ControllerManager.prototype.constructor = ControllerManager;

// * Construct Controller Manager
const ControllerMgr = new ControllerManager({
    managerName: "ControllerManager",
});

export default ControllerMgr;
