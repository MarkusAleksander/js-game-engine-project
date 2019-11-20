const ActorPrototype = function ActorPrototype(data) {
    // * Unique id
    this.uID = data.id;
    // * Give actor a name if required
    this.name = data.name !== undefined ? data.name : data.id;
    // * set Actor to initially inactive
    this.isActive = false;
    // * actorMeshObj
    this.actorMesh = null;
    // * is registered
    this.isRegistered = false;

    // * set active status
    this.setActiveStatus = function setActiveStatus(status) {
        this.isActive = status;
    }

    // * update actor
    this.update = function update() {
        if (this.isActive) {
            console.log('updating actor: ' + this.uID);
            // * do something
        }
    }

    this.getID = function getID() {
        return this.uID;
    }

    this.getActorMesh = function getActorMesh() {
        return this.actorMesh;
    }

    this.setRegisterStatus = function setRegisterStatus(status) {
        this.isRegistered = status;
    }

    // * movement
    this.moveTo = function moveTo(moveTo) {
        this.actorMesh.position.x = moveTo.x !== undefined ? moveTo.x : this.actorMesh.position.x;
        this.actorMesh.position.y = moveTo.y !== undefined ? moveTo.y : this.actorMesh.position.y;
        this.actorMesh.position.z = moveTo.z !== undefined ? moveTo.z : this.actorMesh.position.z;
    }

    this.moveBy = function moveBy(moveBy) {
        this.actorMesh.position.x = moveBy.x !== undefined ? moveBy.x + this.actorMesh.position.x : this.actorMesh.position.x;
        this.actorMesh.position.y = moveBy.y !== undefined ? moveBy.y + this.actorMesh.position.y : this.actorMesh.position.y;
        this.actorMesh.position.z = moveBy.z !== undefined ? moveBy.z + this.actorMesh.position.z : this.actorMesh.position.z;
    }

    this.getPosition = function getPosition() {
        return {
            x: this.actor.x,
            y: this.actor.y,
            z: this.actor.z
        }
    }
}

export default ActorPrototype;
