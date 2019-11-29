import ActorPrototype from './ActorPrototype.js';

const LightActor = function LightActor(data) {

    // * Light specific properties
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
    }

    // * Move Target Relatively
    this.moveTargetBy = function moveTargetBy(loc) {
        this.target.x = loc.x !== undefined ? loc.x + this.target.x : this.position.x;
        this.target.y = loc.y !== undefined ? loc.y + this.target.y : this.position.y;
        this.target.z = loc.z !== undefined ? loc.z + this.target.z : this.position.z;
    }

    // * Update intensity
    this.updateIntensity = function updateIntensity(int) {
        this.desiredIntensity = int;
        if (this.isActive) {
            this.currentIntensity = this.desiredIntensity;
        }
    }

    // * Update color
    this.updateColor = function updateColor(color) {
        this.color = color;
    }

    // * get intensity
    this.getIntensity = function getIntensity() {
        return this.currentIntensity;
    }


    // * get color
    this.getColor = function getColor() {
        return this.color;
    }

    // * get target
    this.getTarget = function getTarget() {
        return this.target;
    }

    // * Update mesh position and rotation
    this.syncAttachedObject = function syncAttachedObject() {
        // debugger;
        this.attachedObject.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );

        // debugger;
        // this.lightObj.target.set(
        //     this.target.x,
        //     this.target.y,
        //     this.target.z
        // );

        this.attachedObject.intensity = this.currentIntensity;
        // debugger;
        this.attachedObject.color.set(this.color);
    }
}

LightActor.prototype = Object.create(ActorPrototype.prototype);
LightActor.prototype.constructor = LightActor;

export default LightActor;
