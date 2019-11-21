import Utilities from './../Globals/Utilities.js';

// * ------------------- Generic System Manager Prototype
const ManagerPrototype = function ManagerPrototype(data) {
    this.isInitialised = false;
    this.isUpdating = false; // ? needed?
    this.managerName = data && data.managerName !== undefined ? data.managerName : 'prototype';
}

ManagerPrototype.prototype.initialise = function initialise() {
    Utilities.outputDebug('initialising Manager: ' + this.managerName);
    this.isInitialised = true;
}

ManagerPrototype.prototype.update = function update() {
    if (this.isInitialised) {
        Utilities.outputDebug('Updating Manager: ' + this.managerName);
    } else {
        Utilities.outputDebug(this.managerName + ' - Manager not initialised!');
        // TODO: Throw assertion
    }
}

export default ManagerPrototype;
