import System from './System.js';

const PhysicsSystem = function PhysicsSystem() {

    System.call(this, {
        components: ["Translation", "Physics"]
    });

    let _self = this;

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation"),
                physics = entity.getComponent("Physics");

            translation.nextPosition = physics.currentPosition;
            translation.nextRotation = physics.currentRotation;
        });
    }

    return this;
}

PhysicsSystem.prototype = Object.create(System.prototype);
PhysicsSystem.prototype.constructor = PhysicsSystem;

export default PhysicsSystem;
