import ManagerPrototype from './../ManagerPrototype/ManagerPrototype.js';

const ControllerManager = function ControllerManager(data) {

    // * List of inputs
    this.inputs = [];

    ManagerPrototype.call(this, data);

    // * Register an input
    this.registerInputEvent = function (keyCode, eventType, fn) {
        // * if key is active, do function
        this.inputs.push({
            keyCode: keyCode,
            eventType: eventType,
            eventObj: new ControllerManager.KeyInputEvent(keyCode, eventType, fn)
        });
    }

    // * on update
    this.update = function update() {
        this.inputs.forEach(function (k) {
            if (k.eventObj.getActiveStatus()) {
                k.eventObj.runEvent();
            }
        });
    }

    this.updateKeyStatus = function updateKeyStatus(event) {
        let activeEvent = this.inputs.find(function (el) {
            let o = el.eventObj;

            return o.getKeyCode() == event.keyCode;
        });

        if (activeEvent) {
            activeEvent.eventObj.setActiveStatus(event.type);
        }
    }

    let self = this;

    window.addEventListener("keydown", self.updateKeyStatus.bind(self));
    window.addEventListener("keyup", self.updateKeyStatus.bind(self));

}


ControllerManager.prototype = Object.create(ManagerPrototype.prototype);

ControllerManager.KeyInputEvent = function KeyInputEvent(keyCode, eventType, fn) {
    this.keyCode = keyCode;
    this.eventType = eventType;
    this.isActive = false; // * physical state
    this.isVirtualActive = false; // TODO virtual state
    this.eventFn = fn;

    this.getActiveStatus = function getActiveStatus() {
        //  * Check input
        return this.isActive;
    }

    this.setActiveStatus = function setActiveStatus(eventType) {
        this.isActive = this.eventType == eventType;
    }

    this.runEvent = function runEvent() {
        this.eventFn();
    }

    this.getEventType = function getEventType() {
        return this.eventType;
    }

    this.getKeyCode = function getKeyCode() {
        return this.keyCode;
    }
}

ControllerManager.prototype.constructor = ControllerManager;

export default ControllerManager;
