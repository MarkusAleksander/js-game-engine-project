import ECS from './ECS.js';
import EntityFactory from './EntityFactory.js';

const EntityManager = function EntityManager() {

    this.EntityFactory = new EntityFactory();

    this.EntityList = new Map();
    this.RegisteredEntityList = new Map();

    this.createEntity = function createEntity(entityData) {
        let entity = this.EntityFactory(entityData);

        this.EntityList.set(entity.getUID(), entity);

        return entity;
    }

    this.registerEntity = function registerEntity(entity) {
        if (this.RegisteredEntityList.has(entity.getUID())) { return; }

        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.addEntity(entity);
        });

        this.RegisteredEntityList.set(entity.getUID(), entity);
    }

    this.deregisterEntity = function deregisterEntity(entityUID) {
        if (this.RegisteredEntityList.has(entityUID)) { return; }

        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.removeEntity(entityUID);
        });

        this.RegisteredEntityList.delete(entityUID);
    }

    this.update = function update(dT) {
        // * Update systems
        Object.values(ECS.Systems).forEach(function forEachSystem(system) {
            system.update();
        });
    }

    this.addComponentToEntity = function addComponentToEntity(entity, component, data) {
        // TODO
    }

}

export default EntityManager;
