/*
*   ControllerManager.js
*   Management Class for User Input. User inputs are registered here with keycode, eventType and callback function
*/
import ManagerPrototype from './../ManagerPrototype/ManagerPrototype.js';

import Utilities from '../Globals/Utilities.js';
import { INPUT_MODES } from '../Globals/KeyCodes.js';

// * -----------------------------------
// *    CONTROLLER MANAGER
// * -----------------------------------
const ControllerManager = function ControllerManager(data) {

    // * -----------------------------------
    // *    CONTROLLER MANAGER PROPERTIES
    // * -----------------------------------

    // * List of inputs
    this.inputs = [];
    // * Pointer to self for window event listeners
    let _self = this;

    ManagerPrototype.call(this, data);

    // * -----------------------------------
    // *    CONTROLLER MANAGER METHODS
    // * -----------------------------------

    // TODO - Support mouse input, mouse move, mouse scroll, keyup events

    // * Register an input key with type and callback
    this.registerInputEvent = function registerInputEvent(keyCode, eventType, fn, mode) {
        this.inputs.push({
            keyCode: keyCode,
            eventType: eventType,
            eventObj: new ControllerManager.KeyInputEvent(keyCode, eventType, fn, mode)
        });
    }

    // * Update the Controller to check for current user inputs
    this.update = function update(tDelta) {
        this.inputs.forEach((k) => {
            if (k.eventObj.getActiveStatus()) {
                k.eventObj.runEvent(tDelta);
            }
        });
    }

    // * Update the Key Status on User event
    this.updateKeyStatus = function updateKeyStatus(e) {
        let activeEvent = this.inputs.find(function findKey(el) {
            let o = el.eventObj;

            return o.getKeyCode() == e.keyCode;
        });


        if (activeEvent) {
            activeEvent.eventObj.setActiveStatus(e.type);
        }
    }

    // * Register event listeners
    window.addEventListener("keydown", _self.updateKeyStatus.bind(_self));
    window.addEventListener("keyup", _self.updateKeyStatus.bind(_self));
}

// * Key event Class wrapper - handle state of the key
ControllerManager.KeyInputEvent = function KeyInputEvent(keyCode, eventType, fn, mode) {
    this.keyCode = keyCode;
    this.eventType = eventType;
    this.isPhysicallyActive = false; // * Physical state of the key
    this.isVirtualActive = false; // * Virtual state of the key
    this.eventFn = fn;
    this.mode = Utilities.checkUndefinedAndReturn(mode, INPUT_MODES.CONTINUOUS);

    //  * Get phyiscal state of the key
    this.getActiveStatus = function getActiveStatus() {
        return this.isPhysicallyActive;
    }

    // * Set the active status of the key
    this.setActiveStatus = function setActiveStatus(eventType) {
        let result = this.eventType == eventType;

        if (this.isPhysicallyActive != result) { this.isVirtualActive = result; }

        this.isPhysicallyActive = result;
    }

    // * Run associated event
    this.runEvent = function runEvent() {

        // * Don't run if virtually inactive
        if (!this.isVirtualActive) { return; }

        this.eventFn();
        // * If should be single, set virtual state to off
        if (this.mode == INPUT_MODES.SINGLE) {
            this.isVirtualActive = false;
        }
    }

    // * Get event type
    this.getEventType = function getEventType() {
        return this.eventType;
    }

    // * Get key code
    this.getKeyCode = function getKeyCode() {
        return this.keyCode;
    }
}

ControllerManager.prototype = Object.create(ManagerPrototype.prototype);
ControllerManager.prototype.constructor = ControllerManager;

export default ControllerManager;
