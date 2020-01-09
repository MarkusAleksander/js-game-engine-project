import Component from "./Component.js";
import Utilities from "./../../Globals/Utilities.js";

const Translation = function Translation(data) {
    // * Positional
    this.currentPosition =
        data.position ||
        Utilities.Vector3({
            x: 0,
            y: 0,
            z: 0,
        });
    this.initialPosition = this.currentPosition;
    this.nextPosition = this.currentPosition;
    this.previousPosition = this.currentPosition;

    // * Rotational

    this.upVector = data.upVector || new THREE.Vector3({ x: 0, y: 1, z: 0 });

    // * Current Rotation Vector
    this.currentRotation =
        data.rotation ||
        new THREE.Vector3({
            x: 0,
            y: 0,
            z: 0,
        });

    debugger;

    // * World Quaternion
    this.WorldQuaternion = new THREE.Quaternion();
    this.WorldQuaternion.copy(this.currentRotation);

    this.initialRotation = this.currentRotation;
    this.nextRotation = this.currentRotation;
    this.previousRotation = this.currentRotation;

    Component.call(this, "Translation");

    return this;
};

Translation.prototype = Object.create(Component.prototype);
Translation.prototype.constructor = Translation;

export default Translation;
