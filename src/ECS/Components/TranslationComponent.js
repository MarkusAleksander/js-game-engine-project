import Component from './Component.js';
import Utilities from './../../Globals/Utilities.js';

const Translation = function Translation(data) {

    this.currentPosition = data.position || Utilities.Vector3({ x: 0, y: 0, z: 0 });
    this.initialPosition = this.currentPosition;
    this.nextPosition = this.currentPosition;
    this.previousPosition = this.currentPosition;

    this.currentRotation = data.rotation || new THREE.Quaternion();
    this.initialRotation = this.currentRotation;
    this.nextRotation = this.currentRotation;
    this.previousRotation = this.currentRotation;

    this._rotationVector = new THREE.Vector3();

    Component.call(this, "Translation");

    return this;
}

Translation.prototype = Object.create(Component.prototype);
Translation.prototype.constructor = Translation;

export default Translation;
