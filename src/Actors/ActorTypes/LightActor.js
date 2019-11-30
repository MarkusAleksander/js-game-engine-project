import ActorPrototype from './ActorPrototype.js';

// * -----------------------------------
// *    LIGHT ACTOR
// * -----------------------------------
const LightActor = function LightActor(data) {

    // * -----------------------------------
    // *    LIGHT ACTOR PROPERTIES
    // * -----------------------------------

    this.target = { x: 0, y: 0, z: 0 };
    // * Desired intensity setting
    this.desiredIntensity = data.intensity !== undefined ? data.intensity : 1;
    // * Actual intensity setting
    this.currentIntensity = 0;
    // * Light color
    //  TODO - different color properties by light
    this.color = data.color !== undefined ? data.color : 0xffffff;

    ActorPrototype.call(this, data);

    // * -----------------------------------
    // *    LIGHT ACTOR METHODS
    // * -----------------------------------

    // * Set light Activity Status
    this.setActiveStatus = function setActiveStatus(status) {
        LightActor.prototype.setActiveStatus.call(this, status);
        if (this.isActive) {
            // * Switch on
            this.currentIntensity = this.desiredIntensity;
        } else {
            // * Switch off
            this.currentIntensity = 0;
        }
    }

    // * Move Target Absolutely
    this.moveTargetTo = function moveTargetTo(loc) {
        this.target.x = loc.x !== undefined ? loc.x : this.target.x;
        this.target.y = loc.y !== undefined ? loc.y : this.target.y;
        this.target.z = loc.z !== undefined ? loc.z : this.target.z;
        this.needsUpdate = true;
    }

    // * Move Target Relatively
    this.moveTargetBy = function moveTargetBy(loc) {
        this.target.x = loc.x !== undefined ? loc.x + this.target.x : this.position.x;
        this.target.y = loc.y !== undefined ? loc.y + this.target.y : this.position.y;
        this.target.z = loc.z !== undefined ? loc.z + this.target.z : this.position.z;
        this.needsUpdate = true;
    }

    // * Update intensity
    this.updateIntensity = function updateIntensity(int) {
        this.desiredIntensity = int;
        if (this.isActive) {
            this.currentIntensity = this.desiredIntensity;
        }
        this.needsUpdate = true;
    }

    // * Update color
    this.updateColor = function updateColor(color) {
        this.color = color;
        this.needsUpdate = true;
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

    // * Update mesh position and rotation
    this.syncAttachedObject = function syncAttachedObject() {

        LightActor.prototype.syncAttachedObject.call(this);
        // TODO

        // debugger;
        // this.attachedObject.position.set(
        //     this.position.x,
        //     this.position.y,
        //     this.position.z
        // );

        // debugger;
        // this.lightObj.target.set(
        //     this.target.x,
        //     this.target.y,
        //     this.target.z
        // );

        this.attachedObject.intensity = this.currentIntensity;
        this.currentIntensity = this.attachedObject.intensity;

        this.attachedObject.color.set(this.color);
        this.color = this.attachedObject.color;
    }
}

LightActor.prototype = Object.create(ActorPrototype.prototype);
LightActor.prototype.constructor = LightActor;

export default LightActor;
