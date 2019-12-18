import Component from './Component.js';

// * -----------------------------------
// *    HEALTH COMPONENT
// * -----------------------------------
const Health = function Health(data) {

    // * -----------------------------------
    // *    HEALTH COMPONENT PROPERTIES
    // * -----------------------------------

    this.value = data.value || 100;

    // * Set Component Name
    Component.call(this, "Health");

    return this;
}

Health.prototype = Object.create(Component.prototype);
Health.prototype.constructor = Health;

export default Health;
