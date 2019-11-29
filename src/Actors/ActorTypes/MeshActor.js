import ActorPrototype from './ActorPrototype.js';

// * -----------------------------------
// *    MESH ACTOR
// * -----------------------------------
const MeshActor = function MeshActor(data) {

    // * -----------------------------------
    // *    MESH ACTOR PROPERTIES
    // * -----------------------------------

    this.materialColor = data.meshData.materialData !== undefined ? data.meshData.materialData.color !== undefined ? data.meshData.materialData.color : 0x000000 : 0x000000;

    ActorPrototype.call(this, data);


    // * -----------------------------------
    // *    MESH ACTOR METHODS
    // * -----------------------------------

    this.updateMaterialColor = function updateMaterialColor(col) {
        this.materialColor = col;
    }

    this.getMaterialColor = function getMaterialColor() {
        return this.materialColor;
    }

    this.syncAttachedObject = function () {
        MeshActor.prototype.syncAttachedObject.call(this);
        this.attachedObject.material.color.set(parseInt(this.materialColor));
    }

}

MeshActor.prototype = Object.create(ActorPrototype.prototype);
MeshActor.prototype.constructor = MeshActor;

export default MeshActor;
