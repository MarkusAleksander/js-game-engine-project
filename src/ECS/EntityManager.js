import ECS from "./ECS.js";
import EntityFactory from "./EntityFactory.js";
import ManagerPrototype from "../ManagerPrototype/ManagerPrototype.js";

const EntityManager = function EntityManager(data) {
    this.EntityFactory = new EntityFactory();

    this.EntityList = new Map();
    this.RegisteredEntityList = new Map();

    ManagerPrototype.call(this, data);

    this.createEntity = function createEntity(entityData) {
        let entity = this.EntityFactory.createEntity(entityData);

        this.EntityList.set(entity.getUID(), entity);

        return entity;
    };

    this.registerEntity = function registerEntity(entity) {
        if (this.RegisteredEntityList.has(entity.getUID())) {
            return;
        }

        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.addEntity(entity);
        });

        this.RegisteredEntityList.set(entity.getUID(), entity);
    };

    this.deregisterEntity = function deregisterEntity(entityUID) {
        if (!this.RegisteredEntityList.has(entityUID)) {
            return;
        }

        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.removeEntity(entityUID);
        });

        this.RegisteredEntityList.delete(entityUID);
    };

    this.activateEntity = function activateEntity(entityUID) {
        if (!this.RegisteredEntityList.has(entityUID)) {
            return;
        }
        ECS.Systems.BaseSystem.setActiveState(true, entityUID);
    };

    this.deactiveEntity = function deactiveEntity(entityUID) {
        if (!this.RegisteredEntityList.has(entityUID)) {
            return;
        }

        ECS.Systems.BaseSystem.setActiveState(false, entityUID);
    };

    this.update = function update(dT) {
        // * Update systems
        // debugger;
        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.update(dT);
        });
    };

    this.addComponentToEntity = function addComponentToEntity(
        entity,
        component,
        data
    ) {
        // TODO
    };
};

EntityManager.prototype = Object.create(ManagerPrototype.prototype);
EntityManager.prototype.constructor = EntityManager;

const EntityMgr = new EntityManager({
    managerName: "EntityManager",
});

export default EntityMgr;
