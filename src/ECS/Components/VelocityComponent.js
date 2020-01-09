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

    this.rotationCurrentVelocity =
        data.rotationVelocity ||
        new Map([
            [
                "rotationVector",
                Utilities.Vector3({
                    x: 0,
                    y: 1, // * default to up
                    z: 0,
                }),
            ],
            ["degree", 0],
        ]);

    this.isMoving = this.positionCurrentVelocity.get("distance") !== 0;
    this.isRotating = this.rotationCurrentVelocity.get("degree") !== 0;

    Component.call(this, "Velocity");

    return this;
};

Velocity.prototype = Object.create(Component.prototype);
Velocity.prototype.constructor = Velocity;

Object.defineProperty(Velocity.prototype, "directionalVelocity", {
    get() {
        return this.positionCurrentVelocity;
    },

    set(data) {
        let nDir = data.get("direction"),
            nDis = data.get("distance");

        this.isMoving = false;

        this.positionCurrentVelocity.set("direction", nDir);
        this.positionCurrentVelocity.set("distance", nDis);

        if (
            nDis !== 0 &&
            !this.positionCurrentVelocity.get("direction").equals(
                Utilities.Vector3({
                    x: 0,
                    y: 0,
                    z: 0,
                })
            )
        ) {
            this.isMoving = true;
        }
    },
});

Object.defineProperty(Velocity.prototype, "rotationalVelocity", {
    get() {
        return this.rotationCurrentVelocity;
    },
    set(data) {
        let nVec = data.get("rotationVector"),
            nDeg = data.get("degree");

        this.isRotating = false;

        this.rotationCurrentVelocity.set("rotationVector", nVec);
        this.rotationCurrentVelocity.set("degree", nDeg);

        if (
            nDeg !== 0 &&
            !this.rotationCurrentVelocity.get("rotationVector").equals(
                Utilities.Vector3({
                    x: 0,
                    y: 0,
                    z: 0,
                })
            )
        ) {
            this.isRotating = true;
        }
    },
});

export default Velocity;
