import System from './System.js';

const MovementSystem = function MovementSystem() {

    System.call(this, {
        components: ["Translation"]
    });

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation");

            translation.previousPosition = translation.currentPosition;
            translation.previousRotation = translation.currentRotation;

            translation.currentPosition = translation.nextPosition;
            translation.currentRotation = translation.nextRotation;
        });
    }

    this.moveBy = function moveBy(vector, distance) { }

    this.moveTo = function moveTo(location) { }

    this.rotateBy = function rotateBy(rotation) { }

    this.rotateTo = function rotateTo(rotation) { }

    return this;
}

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
