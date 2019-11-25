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

    // * Actor Update Function List
    this.actorUpdateFunctions = [];

    // * Actor position and rotation
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };

    // * -----------------------------------
    // *    ACTOR PROTOTYPE METHODS
    // * -----------------------------------

    // * Set Actor Activity Status
    this.setActiveStatus = function setActiveStatus(status) {
        this.isActive = status;
    }

    // * Get Current Actor Active Status
    this.getActiveStatus = function getActiveStatus() {
        return this.isActive;
    }

    // * Actor Update Function
    this.update = function update() {
        // * Only update if Active
        if (!this.isActive) return;
        Utilities.outputDebug('updating actor: ' + this.uID);

        // * Run registered update functions
        this.actorUpdateFunctions.forEach((fn) => {
            fn()
        });

        // * Synchronise Actor Mesh
        this.updateMesh();
    }

    // * Add update function to Actor
    this.addUpdateFunction = function addUpdateFunction(fn) {
        this.actorUpdateFunctions.push(fn.bind(this));
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
        this.position.x = loc.x !== undefined ? loc.x : this.position.x;
        this.position.y = loc.y !== undefined ? loc.y : this.position.y;
        this.position.z = loc.z !== undefined ? loc.z : this.position.z;
    }

    // * Move Relatively
    this.moveActorBy = function moveActorBy(loc) {
        this.position.x = loc.x !== undefined ? loc.x + this.position.x : this.position.x;
        this.position.y = loc.y !== undefined ? loc.y + this.position.y : this.position.y;
        this.position.z = loc.z !== undefined ? loc.z + this.position.z : this.position.z;
    }

    // * Rotate Absolutely
    this.rotateActorTo = function rotateActorTo(rot) {
        this.rotation.x = rot.x !== undefined ? rot.x : this.rotation.x;
        this.rotation.y = rot.y !== undefined ? rot.y : this.rotation.y;
        this.rotation.z = rot.z !== undefined ? rot.z : this.rotation.z;
    }

    // * Rotation Relatively
    this.rotateActorBy = function rotateActorBy(rot) {
        this.rotation.x = rot.x !== undefined ? rot.x + this.rotation.x : this.rotation.x;
        this.rotation.y = rot.y !== undefined ? rot.y + this.rotation.y : this.rotation.y;
        this.rotation.z = rot.z !== undefined ? rot.z + this.rotation.z : this.rotation.z;
    }

    // * Update mesh position and rotation
    this.updateMesh = function updateMesh() {
        this.actorMesh.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );

        this.actorMesh.rotation.set(
            this.rotation.x,
            this.rotation.y,
            this.rotation.z
        );
    }

    // * Get Current Actor Position
    this.getPosition = function getPosition() {
        return this.position;
    }

    // * Get Current Actor Rotation
    this.getRotation = function getRotation() {
        return this.rotation;
    }
}

export default ActorPrototype;
