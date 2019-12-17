// * -----------------------------------
// *    ENTITY
// * -----------------------------------
const Entity = function Entity(UID) {

    // * -----------------------------------
    // *    ENTITY PROPERTIES
    // * -----------------------------------

    // * Unique ID
    this.UID = UID;
    // * Component Map
    this.Components = new Map();

    // * Update prototype count
    Entity.prototype._count++;

    return this;
}

// * Prototype count to keep track of Entities
Entity.prototype._count = 0;

// * -----------------------------------
// *    ENTITY METHODS
// * -----------------------------------

// * Add a Component to the Entity
Entity.prototype.addComponent = function addComponent(component) {
    // * Check component doesn't already exist
    if (this.getComponent(component.getName())) { return; }

    this.Components.set(component.getName(), component);

    return this;
}

// * Remove a Component from the Entity
Entity.prototype.removeComponent = function removeComponent(componentName) {
    this.Components.delete(componentName);

    return this;
}

// * Get Component
Entity.prototype.getComponent = function getComponent(componentName) {
    return this.Components.get(componentName);
}

// * Has Component
Entity.prototype.hasComponent = function hasComponent(componentName) {
    return this.Components.has(componentName);
}

// * Update through components
Entity.prototype.update = function update(dT) {
    this.Components.forEach(function forEachComponent(component) {
        component.update(dT);
    });
}

Entity.prototype.getUID = function getUID() {
    return this.UID;
}

// * Print (debug)
Entity.prototype.print = function print() {
    console.log(
        "EntityID:" + this.UID
    );
    this.Components.forEach(function forEachComponent(component) {
        console.log(
            JSON.stringify(component)
        )
    });

    return this;
}

export default Entity;
