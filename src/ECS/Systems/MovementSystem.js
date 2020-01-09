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

                translation.previousPosition = translation.currentPosition;
                translation.currentPosition = translation.nextPosition;
                _self.updatePosition = true;

                if (animation) {
                    animation.nextAnimation = "walk";
                }

                // * Move is done
                velocity.isMoving = false;
            }

            let _q = new THREE.Quaternion(),
                _d = 0;

            if (velocity.isRotating) {
                _q.setFromAxisAngle(
                    velocity.rotationalVelocity.get("rotationVector"),
                    Utilities.degToRad(
                        velocity.rotationalVelocity.get("degree")
                    )
                );
                _q.normalize();

                velocity.isRotating = false;
            }

            _self.rotate(_q, translation);
        });
    };

    this.move = function move(vector, distance, translationComponent) {
        _v1.copy(vector).applyQuaternion(translationComponent.WorldQuaternion);

        translationComponent.nextPosition.add(_v1.multiplyScalar(distance));
    };

    this.rotate = function rotate(quat, translationComponent) {
        translationComponent.previousRotation =
            translationComponent.currentRotation;

        translationComponent.currentRotation =
            translationComponent.nextRotation;

        translationComponent.nextRotation = quat;
        translationComponent.WorldQuaternion.multiply(quat).normalize();
    };

    return this;
};

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
