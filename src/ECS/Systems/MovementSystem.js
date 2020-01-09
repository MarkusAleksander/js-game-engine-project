import System from "./System.js";
import Utilities from "../../Globals/Utilities.js";

const MovementSystem = function MovementSystem() {
    System.call(this, {
        components: ["Translation"],
    });

    let _self = this;
    let _v1 = Utilities.Vector3({ x: 0, y: 0, z: 0 });

    this.updatePosition = false;
    this.updateRotation = false;

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation"),
                velocity = entity.getComponent("Velocity"),
                animation = entity.getComponent("Animation");

            // * Pre velocity updates
            translation.previousPosition = translation.currentPosition;
            translation.currentPosition = translation.nextPosition;

            translation.previousRotation = translation.currentRotation;
            translation.currentRotation = translation.nextRotation;

            // * Only need to update Translation is there's velocity
            if (!velocity) return;

            if (animation) {
                animation.nextAnimation = "idle";
            }

            if (velocity.isMoving) {
                _self.move(
                    velocity.positionCurrentVelocity.get("direction"),
                    velocity.positionCurrentVelocity.get("distance"),
                    translation
                );

                _self.updatePosition = true;

                if (animation) {
                    animation.nextAnimation = "walk";
                }

                // * Move is done
                velocity.isMoving = false;
            }

            // * Rotations

            if (velocity.isRotating) {
                translation.nextRotation.setFromAxisAngle(
                    velocity.rotationalVelocity.get("rotationVector"),
                    Utilities.degToRad(
                        velocity.rotationalVelocity.get("degree")
                    )
                );
                translation.nextRotation.normalize();

                _self.rotate(translation.nextRotation, translation);

                velocity.isRotating = false;
            }
        });
    };

    this.move = function move(vector, distance, translation) {
        _v1.copy(vector).applyQuaternion(translation.WorldQuaternion);
        translation.nextPosition.add(_v1.multiplyScalar(distance));
    };

    this.rotate = function rotate(quat, translation) {
        translation.WorldQuaternion.multiply(quat).normalize();
        translation.nextRotation = new THREE.Quaternion();
    };

    return this;
};

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
