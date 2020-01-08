import Component from "./Component.js";
import Utilities from "./../../Globals/Utilities.js";

const Velocity = function Velocity(data) {
    this.positionCurrentVelocity =
        data.positionVelocity ||
        new Map([
            [
                "direction",
                Utilities.Vector3({
                    x: 0,
                    y: 0,
                    z: 1,
                }),
            ],
            ["distance", 0],
        ]);

    // TODO - Use setter / getter so that isMoving can be updated

    // this.rotationCurrentVelocity =
    //     data.rotationVelocity ||
    //     Utilities.Vector3({
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //     });

    this.isMoving = this.positionCurrentVelocity.get("distance") !== 0;

    // this.isRotating = !this.rotationCurrentVelocity.equals(
    //     Utilities.Vector3({
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //     })
    // );

    Component.call(this, "Velocity");

    return this;
};

Velocity.prototype = Object.create(Component.prototype);
Velocity.prototype.constructor = Velocity;

export default Velocity;
