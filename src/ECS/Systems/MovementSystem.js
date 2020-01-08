import System from "./System.js";
import Utilities from "../../Globals/Utilities.js";

const MovementSystem = function MovementSystem() {
    System.call(this, {
        components: ["Translation", "Velocity"],
    });

    let _self = this;
    let _v1 = Utilities.Vector3({ x: 0, y: 0, z: 0 });

    this.updatePosition = false;
    this.updateRotation = false;

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation");
            let velocity = entity.getComponent("Velocity");

            // * Only need to update Translation is there's velocity
            if (!velocity) return;

            // debugger;

            if (velocity.isMoving) {
                _self.move(
                    velocity.positionCurrentVelocity.get("direction"),
                    velocity.positionCurrentVelocity.get("distance"),
                    translation
                );

                translation.previousPosition = translation.currentPosition;
                translation.currentPosition = translation.nextPosition;
                _self.updatePosition = true;
            }

            // if (velocity.isRotating) {
            translation.previousRotation = translation.currentRotation;
            translation.currentRotation = translation.nextRotation;
            translation.nextRotation = new THREE.Quaternion();
            //     this.updateRotation = true;
            // }
        });
    };

    this.move = function move(vector, distance, translationComponent) {
        _v1.copy(vector).applyQuaternion(translationComponent.currentRotation);

        translationComponent.nextPosition.add(_v1.multiplyScalar(distance));
    };

    // this.moveBy = function moveBy(vector, distance, entityUID) {
    //     let entity = this.EntityList.get(entityUID);

    //     if (!entity) {
    //         return;
    //     }

    //     let translation = entity.getComponent("Translation");

    //     translation._rotationVector
    //         .copy(vector)
    //         .applyQuaternion(translation.currentRotation);
    //     translation.nextPosition.add(
    //         translation._rotationVector.multiplyScalar(distance)
    //     );
    // };

    // this.moveTo = function moveTo(location, entityUID) {
    //     let entity = this.EntityList.get(entityUID);

    //     if (!entity) {
    //         return;
    //     }

    //     let translation = entity.getComponent("Translation");

    //     translation.nextPosition = location;
    // };

    // this.rotateBy = function rotateBy(vector, degrees, entityUID) {
    //     let entity = this.EntityList.get(entityUID);

    //     if (!entity) {
    //         return;
    //     }

    //     let quat = new THREE.Quaternion();

    //     quat.setFromAxisAngle(
    //         new THREE.Vector3(vector.x || 0, vector.y || 0, vector.z || 0),
    //         Utilities.degToRad(degrees)
    //     );

    //     entity.getComponent("Translation").nextRotation = quat.normalize();
    // };

    // this.rotateTo = function rotateTo(rotation, entityUID) {
    //     let entity = this.EntityList.get(entityUID);

    //     if (!entity) {
    //         return;
    //     }

    //     // TODO
    // };

    return this;
};

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
