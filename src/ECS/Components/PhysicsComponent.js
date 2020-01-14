import Component from "./Component.js";
import Utilities from "./../../Globals/Utilities.js";

const Physics = function Physics(data) {
    this.physicsObject = data.physicsObject;

    Component.call(this, "Physics");

    return this;
};

Physics.prototype = Object.create(Component.prototype);
Physics.prototype.constructor = Physics;

export default Physics;
