import ECS from './ECS.js';

// * -----------------------------------
// *    ENTITY FACTORY
// * -----------------------------------
const EntityFactory = function EntityFactory() {

    // * -----------------------------------
    // *    ENTITY FACTORY PROPERTIES
    // * -----------------------------------
    this.nextEntityUID = 1;

    // * -----------------------------------
    // *    ENTITY FACTORY METHODS
    // * -----------------------------------
    this.createEntity = function createEntity(entityData) {
        // * Create Entity
        let entity = new ECS.Entity(this.nextEntityUID++);

        // * Loop through Components
        if (Array.isArray(entityData.components)) {
            entityData.components.forEach(function addComponent(componentData) {
                // * Add component if chosen one exists
                let component = ECS.Components[componentData.name];

                if (component) {
                    entity.addComponent(new component(componentData.data), entity.getUID());
                }
            });
        }

        return entity;
    }

}

export default EntityFactory;
