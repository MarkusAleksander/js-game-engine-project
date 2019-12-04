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

    // TODO
    // * - Set velocity , then update position internally based on that?
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
}

// * Rotate Absolutely
ActorPrototype.prototype.rotateActorTo = function rotateActorTo(rot) {
    let o = this.attachedObject;

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
    // TODO
    // return this.position;
    return this.attachedObject.position;
}

// * Get Current Actor Rotation
ActorPrototype.prototype.getRotation = function getRotation() {
    // TODO
    // return this.rotation;
}

export default ActorPrototype;
