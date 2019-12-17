import Component from './Component.js';

// * -----------------------------------
// *    COMPONENT
// * -----------------------------------
const Health = function Health(data) {

    // * -----------------------------------
    // *    COMPONENT PROPERTIES
    // * -----------------------------------

    // * Unique ID
    this.value = data.value || 100;

    // * Set Component Name
    Component.call(this, "Health");

    return this;
}

Health.prototype = Object.create(Component.prototype);
Health.prototype.constructor = Health;

// * -----------------------------------
// *    COMPONENT METHODS
// * -----------------------------------

export default Health;
