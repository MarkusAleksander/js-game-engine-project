import System from './System.js';
import Utilities from '../../Globals/Utilities.js';

const MovementSystem = function MovementSystem() {

    System.call(this, {
        components: ["Translation"]
    });

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation");

            translation.previousPosition = translation.currentPosition;
            translation.currentPosition = translation.nextPosition;
            // debugger;
            translation.previousRotation = translation.currentRotation;
            translation.currentRotation = translation.nextRotation;
            translation.nextRotation = new THREE.Quaternion();
        });
    }

    this.moveBy = function moveBy(vector, distance, entityUID) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        let translation = entity.getComponent("Translation");

        translation._rotationVector.copy(vector).applyQuaternion(translation.currentRotation);
        translation.nextPosition.add(translation._rotationVector.multiplyScalar(distance));
    }

    this.moveTo = function moveTo(location, entityUID) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        let translation = entity.getComponent("Translation");

        translation.nextPosition = location;
    }

    this.rotateBy = function rotateBy(vector, degrees, entityUID) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        let quat = new THREE.Quaternion();

        quat.setFromAxisAngle(new THREE.Vector3(
            vector.x || 0,
            vector.y || 0,
            vector.z || 0
        ), Utilities.degToRad(degrees));

        entity.getComponent("Translation").nextRotation = quat.normalize();

    }

    this.rotateTo = function rotateTo(rotation, entityUID) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        // TODO
    }

    return this;
}

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
