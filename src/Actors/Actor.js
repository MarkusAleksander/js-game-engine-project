import Utilities from './../Globals/Utilities.js';

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
    // * Reference to the Actor Mesh Object
    this.actorMesh = null;
    // * Has the actor been Registered to the Actor Manager?
    this.isRegistered = false;


    // * -----------------------------------
    // *    ACTOR PROTOTYPE METHODS
    // * -----------------------------------

    // * Set Actor Activity Status
    this.setActiveStatus = function setActiveStatus(status) {
        this.isActive = status;
    }

    // * Actor Update Function
    this.update = function update() {
        // * Only update if Active
        if (this.isActive) {
            Utilities.outputDebug('updating actor: ' + this.uID);
            // * do something
        }
    }

    // * Get ID
    this.getID = function getID() {
        return this.uID;
    }

    // * Get Mesh Object
    this.getActorMesh = function getActorMesh() {
        return this.actorMesh;
    }

    // * Set Registered Status
    this.setRegisteredStatus = function setRegisteredStatus(status) {
        this.isRegistered = status;
    }


    // * ------- ACTOR MANIPULATION ------- * //

    // TODO - Store position and rotation on Actor and update after?

    // * Move Absolutely
    this.moveActorTo = function moveActorTo(loc) {
        this.actorMesh.position.x = loc.x !== undefined ? loc.x : this.actorMesh.position.x;
        this.actorMesh.position.y = loc.y !== undefined ? loc.y : this.actorMesh.position.y;
        this.actorMesh.position.z = loc.z !== undefined ? loc.z : this.actorMesh.position.z;
    }

    // * Move Relatively
    this.moveActorBy = function moveActorBy(loc) {
        this.actorMesh.position.x = loc.x !== undefined ? loc.x + this.actorMesh.position.x : this.actorMesh.position.x;
        this.actorMesh.position.y = loc.y !== undefined ? loc.y + this.actorMesh.position.y : this.actorMesh.position.y;
        this.actorMesh.position.z = loc.z !== undefined ? loc.z + this.actorMesh.position.z : this.actorMesh.position.z;
    }

    // * Rotate Absolutely
    this.rotateActorTo = function rotateActorTo(rot) {
        this.actorMesh.rotation.x = rot.x !== undefined ? rot.x : this.actorMesh.rotation.x;
        this.actorMesh.rotation.y = rot.y !== undefined ? rot.y : this.actorMesh.rotation.y;
        this.actorMesh.rotation.z = rot.z !== undefined ? rot.z : this.actorMesh.rotation.z;
    }

    // * Rotation Relatively
    this.rotateActorBy = function rotateActorBy(rot) {
        this.actorMesh.rotation.x = rot.x !== undefined ? rot.x + this.actorMesh.rotation.x : this.actorMesh.rotation.x;
        this.actorMesh.rotation.y = rot.y !== undefined ? rot.y + this.actorMesh.rotation.y : this.actorMesh.rotation.y;
        this.actorMesh.rotation.z = rot.z !== undefined ? rot.z + this.actorMesh.rotation.z : this.actorMesh.rotation.z;
    }

    // * Get Current Actor Position
    this.getPosition = function getPosition() {
        return this.actorMesh.position;
    }
}

export default ActorPrototype;
