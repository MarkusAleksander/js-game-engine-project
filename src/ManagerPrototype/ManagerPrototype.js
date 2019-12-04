import Utilities from './../Globals/Utilities.js';

// * -----------------------------------
// *    PROTOTYPE MANAGER CLASS
// * -----------------------------------
const ManagerPrototype = function ManagerPrototype(data) {

    // * -----------------------------------
    // *    PROTOTYPE MANAGER CLASS PROPERTIES
    // * -----------------------------------

    this.isInitialised = false;
    this.managerName = data && data.managerName !== undefined ? data.managerName : 'prototype';
}

// * -----------------------------------
// *    PROTOTYPE MANAGER METHODS
// * -----------------------------------

// * Initialise the Manager
ManagerPrototype.prototype.initialise = function initialise() {
    Utilities.outputDebug('Initialising Manager: ' + this.managerName);
    this.isInitialised = true;
}

// * Update the Manager
ManagerPrototype.prototype.update = function update() {
    Utilities.outputDebug(
        this.isInitialised
            ? 'Updating Manager: ' + this.managerName
            : this.managerName + ' - Manager not initialised!' /* TODO - THROW ERROR */
    );
}

export default ManagerPrototype;
