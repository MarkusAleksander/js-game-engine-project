/*
*   LightActor.js
*   Class for Light based Actors in the scene
*/
import ActorPrototype from './ActorPrototype.js';
import Utilities from '../../Globals/Utilities.js';

// * -----------------------------------
// *    LIGHT ACTOR
// * -----------------------------------
const LightActor = function LightActor(data) {

    // * -----------------------------------
    // *    LIGHT ACTOR PROPERTIES
    // * -----------------------------------

    // * Light target / direction
    this.target = new THREE.Vector3();
    // * Desired intensity setting
    this.desiredIntensity = Utilities.checkUndefinedAndReturn(data.intensity, 1);
    // * Actual intensity setting
    this.currentIntensity = 0;
    // * Light color
    this.color = Utilities.checkUndefinedAndReturn(data.color, 0xffffff);
    //  TODO - different light properties are available

    ActorPrototype.call(this, data);

    // * -----------------------------------
    // *    LIGHT ACTOR METHODS
    // * -----------------------------------

    // * Set light Activity Status
    this.setActiveStatus = function setActiveStatus(status) {
        LightActor.prototype.setActiveStatus.call(this, status);
        this.updateIntensity(this.desiredIntensity);
    }

    // * Move Target Absolutely
    this.moveTargetTo = function moveTargetTo(loc) {
        this.attachedObject.target.set(
            Utilities.checkUndefinedAndReturn(loc.x, this.target.x),
            Utilities.checkUndefinedAndReturn(loc.y, this.target.y),
            Utilities.checkUndefinedAndReturn(loc.z, this.target.z),
        );
        this.target = this.attachedObject.target;
    }

    // * Move Target Relatively
    this.moveTargetBy = function moveTargetBy(loc) {
        this.attachedObject.target.set(
            Utilities.checkUndefinedAndReturn(loc.x + this.target.x, this.position.x),
            Utilities.checkUndefinedAndReturn(loc.y + this.target.y, this.position.y),
            Utilities.checkUndefinedAndReturn(loc.z + this.target.z, this.position.z)
        );
        this.target = this.attachedObject.target;
    }

    // * Update intensity
    this.updateIntensity = function updateIntensity(int) {
        this.desiredIntensity = int;
        if (this.isActive) {
            this.attachedObject.intensity = this.desiredIntensity;
        }
    }

    // * Update color
    this.updateColor = function updateColor(color) {
        this.attachedObject.color.set(color);
    }

    // * Get current intensity
    this.getIntensity = function getIntensity() {
        return this.currentIntensity;
    }

    // * Get color
    this.getColor = function getColor() {
        return this.color;
    }

    // * Get target
    this.getTarget = function getTarget() {
        return this.target;
    }
}

LightActor.prototype = Object.create(ActorPrototype.prototype);
LightActor.prototype.constructor = LightActor;

export default LightActor;
