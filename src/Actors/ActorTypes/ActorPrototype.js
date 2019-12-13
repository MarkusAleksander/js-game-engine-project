/*
*   ActorPrototype.js
*   Base class for all Actors in the scene - contains all movement, rotation and state logic
*/
import Utilities from '../../Globals/Utilities.js';

// * -----------------------------------
// *    ACTOR PROTOTYPE
// * -----------------------------------
const ActorPrototype = function ActorPrototype(data) {

    // * -----------------------------------
    // *    ACTOR PROTOTYPE PROPERTIES
    // * -----------------------------------

    // * Unique id
    this.uID = data.id;
    // * Actor Name (default is id)
    this.name = data.name !== undefined ? data.name : data.id;
    // * Actor Active Status (is it recieving and processing updates?)
    this.isActive = false;
    // * Reference to the Actor Attached Object (in this case, the THREE JS object)
    this.attachedObject = data.actor !== undefined ? data.actor : null;
    // * Has the actor been Registered to the Actor Manager?
    this.isRegistered = false;
    // * Check if needs update - initially true as all objects may need to update to their new scene requirements
    this.needsUpdate = true;

    // * Actor Update Function List
    this.actorUpdateFunctions = [];

    // * Object Map
    this.objectMap = data.objectMap !== undefined ? data.objectMap : new Map();
    // * Update Map
    this.updateMap = data.updateMap !== undefined ? data.updateMap : new Map();

    this.state = "idle";
    this.prevState = this.state;

    // * Animations
    this.animations = {};
    this.currentAnimation = "idle";
    this.animationMixer = null;
    this.animationAliases = {};
    // * Adjust animation speed
    this.animationSpeed = 1;
    this.animationActions = new Map();

    // TODO
    // * - Set velocity , then update position internally based on that?
}

// * -----------------------------------
// *    ACTOR PROTOTYPE METHODS
// * -----------------------------------

// * Set Actor Activity Status
ActorPrototype.prototype.setActiveStatus = function setActiveStatus(activeState) {
    this.isActive = activeState;
}

// * Get Current Actor Active Status
ActorPrototype.prototype.getActiveStatus = function getActiveStatus() {
    return this.isActive;
}

// * Actor Update Function
ActorPrototype.prototype.update = function update(dT) {
    // * Only update if Active
    if (!this.isActive) { return; }
    Utilities.outputDebug('Updating Actor: ' + this.uID);

    // * Run registered update functions
    this.actorUpdateFunctions.forEach((fn) => {
        // TODO - retest
        fn()
    });

    // debugger;
    this.updateMap.forEach((updates) => {
        updates[0].forEach((fn) => {
            fn.call(updates[1]);
        });
    });
    // debugger;
    if (this.animationMixer) {
        this.animationMixer.update(dT * 0.002 * this.animationSpeed);
    }

    this.prevState = this.state;
    // TODO - improve animation state

    if (this.state === "idle" && this.currentAnimation !== "idle") {
        this.setAnimation("idle");
    }

    this.state = "idle";

    // this.isMoving = false;
}

// * Add update function to Actor
ActorPrototype.prototype.addUpdateFunction = function addUpdateFunction(fn) {
    this.actorUpdateFunctions.push(fn.bind(this));
}

// * Get ID
ActorPrototype.prototype.getID = function getID() {
    return this.uID;
}

// * Set Attached Object
ActorPrototype.prototype.setActorObject = function setActorObject(actorObj) {
    this.attachedObject = actorObj;
}

// * Get Attached Object
ActorPrototype.prototype.getActorObject = function getActorObject() {
    return this.attachedObject;
}

// * Set Registered Status
ActorPrototype.prototype.setRegisteredStatus = function setRegisteredStatus(registeredStatus) {
    this.isRegistered = registeredStatus;
}

// * Check if Registered
ActorPrototype.prototype.getRegisteredStatus = function getRegisteredStatus() {
    return this.isRegistered;
}

// * ------- ACTOR MANIPULATION ------- * //

// * Move Absolutely
ActorPrototype.prototype.moveActorTo = function moveActorTo(loc) {
    let o = this.attachedObject;

    o.position.set(
        loc.x !== undefined ? loc.x : o.position.x,
        loc.y !== undefined ? loc.y : o.position.y,
        loc.z !== undefined ? loc.z : o.position.z
    );
}

// * Move Relatively on Axis
ActorPrototype.prototype.moveActorBy = function moveActorBy(vector, distance) {
    let o = this.attachedObject;

    o.translateOnAxis(new THREE.Vector3(
        vector.x !== undefined ? vector.x : 0,
        vector.y !== undefined ? vector.y : 0,
        vector.z !== undefined ? vector.z : 0
    ), distance);

    this.state = "moving";
    if (this.prevState !== this.state) {
        this.setAnimation("walk");
    }
}

// * Rotate Absolutely
ActorPrototype.prototype.rotateActorTo = function rotateActorTo(rot) {
    let o = this.attachedObject;

    // TODO - Should be a quaternion
    o.rotation.x = rot.x !== undefined ? rot.x : o.x;
    o.rotation.y = rot.y !== undefined ? rot.y : o.y;
    o.rotation.z = rot.z !== undefined ? rot.z : o.z;
}

// * Rotation Relatively
ActorPrototype.prototype.rotateActorBy = function rotateActorBy(vector, rotation) {
    let o = this.attachedObject,
        quat = new THREE.Quaternion();

    quat.setFromAxisAngle(new THREE.Vector3(
        vector.x !== undefined ? vector.x : 0,
        vector.y !== undefined ? vector.y : 0,
        vector.z !== undefined ? vector.z : 0
    ), Utilities.degToRad(rotation));

    o.applyQuaternion(quat.normalize());
}

// * Get Current Actor Position
ActorPrototype.prototype.getPosition = function getPosition() {
    return this.attachedObject.position;
}

// * Get Current Actor Rotation
ActorPrototype.prototype.getRotation = function getRotation() {
    return this.attachedObject.rotation;
}

// * Add animations
ActorPrototype.prototype.addAnimations = function addAnimations(animations, animationAliases, animationSpeed) {
    animations.forEach((anim) => {
        this.animations[anim.name] = anim;
    });
    // TODO - Merge with predefined animation names
    this.animationAliases = animationAliases;
    this.animationMixer = new THREE.AnimationMixer(this.getActorObject());
    this.animationSpeed = animationSpeed;

    // TODO - all clips - for the moment, just idle

    // TODO - convert to map for animation naming
    for (let animationName in this.animationAliases) {
        if (this.animationAliases.hasOwnProperty(animationName)) {
            this.animationActions.set(animationName, this.animationMixer.clipAction(this.animations[this.animationAliases[animationName]]));
        }
    }

    this.setAnimation("idle");

    // debugger;

    // let clip = this.animations[this.animationAliases.idle];
    // let action = this.animationMixer.clipAction(clip);

    // action.play();

    // * Get clips
    // this.animationMixer

}

ActorPrototype.prototype.setAnimation = function setAnimation(animName) {

    let requestedAnimation = this.animationActions.get(animName);

    if (requestedAnimation) {
        requestedAnimation.enabled = true;
        requestedAnimation.reset();
        requestedAnimation.play();
        // debugger;
        let from = this.animationActions.get(this.currentAnimation);

        let crossfadeTime = 200;

        from.crossFadeTo(requestedAnimation, crossfadeTime / 1000, true);
    }

    this.currentAnimation = animName;
}

export default ActorPrototype;
