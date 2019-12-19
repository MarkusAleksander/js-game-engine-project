import System from './System.js';

const BaseSystem = function BaseSystem() {

    System.call(this, {
        components: ["Base"]
    });

    let _self = this;

    this.setActiveState = function setActiveState(status, entityUID) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        entity.getComponent("Base").isActive = status;

        status ? this.onActivated(entity) : this.onDeactivated(entity);
    }

    this.onActivated = function onActivated(entity) {
        entity.getComponent("Base").onActivated();
    }

    this.onDeactivated = function onDeactivated(entity) {
        entity.getComponent("Base").onDeactivated();
    }

    return this;

}

BaseSystem.prototype = Object.create(System.prototype);
BaseSystem.prototype.constructor = BaseSystem;

export default BaseSystem;
