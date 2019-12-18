import Component from './Component.js';
import Utilities from './../../Globals/Utilities.js';

const Translation = function Translation(data) {

    this.currentPosition = data.position || Utilities.Vector3({ x: 0, y: 0, z: 0 });
    this.currentRotation = data.rotation || Utilities.Vector3({ x: 0, y: 0, z: 0 });

    this.nextPosition = this.currentPosition;
    this.nextRotation = this.currentRotation;

    this.previousPosition = this.currentPosition;
    this.previousRotation = this.currentRotation;

    Component.call(this, "Translation");

    return this;
}

Translation.prototype = Object.create(Component.prototype);
Translation.prototype.constructor = Translation;

export default Translation;
