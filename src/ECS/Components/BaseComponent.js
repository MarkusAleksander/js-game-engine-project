import Component from './Component.js';

// * -----------------------------------
// *    Base COMPONENT
// * -----------------------------------
const Base = function Base(data) {

    // * -----------------------------------
    // *    Base COMPONENT PROPERTIES
    // * -----------------------------------
    this.isActive = false;
    this.onActivated = data.onActivated || function () { };
    this.onDeactivated = data.onDeactivated || function () { };

    // * Set Component Name
    Component.call(this, "Base");

    return this;
}

Base.prototype = Object.create(Component.prototype);
Base.prototype.constructor = Base;

export default Base;
