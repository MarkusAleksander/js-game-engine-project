import Component from './Component.js';
import Utilities from './../../Globals/Utilities.js';

const Physics = function Physics(data) {

    this.physicsObject = data.physicsObject;

    this.currentPosition = Utilities.Vector3({ x: 0, y: 0, z: 0 });
    this.currentRotation = Utilities.Vector3({ x: 0, y: 0, z: 0 });

    Component.call(this, "Physics");

    return this;
}

Physics.prototype = Object.create(Component.prototype);
Physics.prototype.constructor = Physics;

export default Physics;
