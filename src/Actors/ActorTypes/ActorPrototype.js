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
    this.attachedObject = null;
    // * Has the actor been Registered to the Actor Manager?
    this.isRegistered = false;
    // * Check if needs update - initially true as all objects may need to update to their new scene requirements
    this.needsUpdate = true;

    // * Actor Update Function List
    this.actorUpdateFunctions = [];

    // * Actor position and rotation
    this.position = {
        x: data.position !== undefined ? data.position.x : 0,
        y: data.position !== undefined ? data.position.y : 0,
        z: data.position !== undefined ? data.position.z : 0
    };
    this.rotation = {
        x: data.rotation !== undefined ? data.rotation.x : 0,
        y: data.rotation !== undefined ? data.rotation.y : 0,
        z: data.rotation !== undefined ? data.rotation.z : 0
    };
}

// * -----------------------------------
// *    ACTOR PROTOTYPE METHODS
// * -----------------------------------

// * Set Actor Activity Status
ActorPrototype.prototype.setActiveStatus = function setActiveStatus(status) {
    this.isActive = status;
}

// * Get Current Actor Active Status
ActorPrototype.prototype.getActiveStatus = function getActiveStatus() {
    return this.isActive;
}

// * Actor Update Function
ActorPrototype.prototype.update = function update() {
    // * Only update if Active
    if (!this.isActive) { return; }
    Utilities.outputDebug('updating actor: ' + this.uID);

    // * Run registered update functions
    this.actorUpdateFunctions.forEach((fn) => {
        fn()
    });

    // * Synchronise Attached Actor Object if required
    if (this.needsUpdate) {
        this.syncAttachedObject();
        // * Set update to false
        this.needsUpdate = false;
    }

}

// * Update actor position and rotation
ActorPrototype.prototype.syncAttachedObject = function syncAttachedObject() {
    this.attachedObject.position.set(
        this.position.x,
        this.position.y,
        this.position.z
    );

    this.position = this.attachedObject.position;

    this.attachedObject.rotation.set(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
    );

    this.rotation = this.attachedObject.rotation;
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
ActorPrototype.prototype.setRegisteredStatus = function setRegisteredStatus(status) {
    this.isRegistered = status;
}

// * Check if Registered
ActorPrototype.prototype.getRegisteredStatus = function getRegisteredStatus() {
    return this.isRegistered;
}

// * ------- ACTOR MANIPULATION ------- * //

// * Move Absolutely
ActorPrototype.prototype.moveActorTo = function moveActorTo(loc) {
    this.position.x = loc.x !== undefined ? loc.x : this.position.x;
    this.position.y = loc.y !== undefined ? loc.y : this.position.y;
    this.position.z = loc.z !== undefined ? loc.z : this.position.z;
    this.needsUpdate = true;
}

// * Move Relatively
ActorPrototype.prototype.moveActorBy = function moveActorBy(loc) {
    this.position.x = loc.x !== undefined ? loc.x + this.position.x : this.position.x;
    this.position.y = loc.y !== undefined ? loc.y + this.position.y : this.position.y;
    this.position.z = loc.z !== undefined ? loc.z + this.position.z : this.position.z;
    this.needsUpdate = true;
}

// * Rotate Absolutely
ActorPrototype.prototype.rotateActorTo = function rotateActorTo(rot) {
    this.rotation.x = rot.x !== undefined ? rot.x : this.rotation.x;
    this.rotation.y = rot.y !== undefined ? rot.y : this.rotation.y;
    this.rotation.z = rot.z !== undefined ? rot.z : this.rotation.z;
    this.needsUpdate = true;
}

// * Rotation Relatively
ActorPrototype.prototype.rotateActorBy = function rotateActorBy(rot) {
    this.rotation.x = rot.x !== undefined ? rot.x + this.rotation.x : this.rotation.x;
    this.rotation.y = rot.y !== undefined ? rot.y + this.rotation.y : this.rotation.y;
    this.rotation.z = rot.z !== undefined ? rot.z + this.rotation.z : this.rotation.z;
    this.needsUpdate = true;
}

// * Get Current Actor Position
ActorPrototype.prototype.getPosition = function getPosition() {
    return this.position;
}

// * Get Current Actor Rotation
ActorPrototype.prototype.getRotation = function getRotation() {
    return this.rotation;
}

export default ActorPrototype;
