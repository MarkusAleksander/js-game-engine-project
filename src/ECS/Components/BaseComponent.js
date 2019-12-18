import Component from './Component.js';

// * -----------------------------------
// *    Base COMPONENT
// * -----------------------------------
const Base = function Base(data) {

    // * -----------------------------------
    // *    Base COMPONENT PROPERTIES
    // * -----------------------------------
    this.isActive = false;

    // * Set Component Name
    Component.call(this, "Base");

    return this;
}

Base.prototype = Object.create(Component.prototype);
Base.prototype.constructor = Base;

export default Base;
