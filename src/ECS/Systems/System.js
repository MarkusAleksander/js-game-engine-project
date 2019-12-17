const System = function System(systemData) {

    this.Components = systemData.components;
    this.EntityList = new Map();
}

System.prototype.getEntityFromList = function getEntityFromList(entity) {
    return this.EntityList.get(entity.getUID());
}

System.prototype.addEntity = function addEntity(entity) {
    if (this.getEntityFromList(entity)) { return; }

    let i = this.Components.length;

    while (i > 0 && i--) {
        // * Break if Entity doesn't have all the required components
        if (entity.hasComponent(this.Components[i])) { return; }
    }

    this.EntityList.set(entity.getUID(), entity);
}

System.prototype.removeEntity = function removeEntity(entityUID) {
    if (!this.EntityList.has(entityUID)) { return; }
    this.EntityList.delete(entityUID);
}

System.prototype.update = function update() {
    // * Do update
}

export default System;
