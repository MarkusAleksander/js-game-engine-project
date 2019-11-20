// * ------------------- Generic System Manager Prototype
const ManagerPrototype = function ManagerPrototype(data) {
    this.isInitialised = false;
    this.isUpdating = false; // ? needed?
    this.managerName = data && data.managerName !== undefined ? data.managerName : 'prototype';
}

ManagerPrototype.prototype.initialise = function initialise() {
    console.log('initialising Manager: ' + this.managerName);
    this.isInitialised = true;
}

ManagerPrototype.prototype.update = function update() {
    if (this.isInitialised) {
        console.log('updating Manager: ' + this.managerName);
    } else {
        console.log(this.managerName + ' - Manager not initialised!');
        // * throw error
    }
}

export default ManagerPrototype;
