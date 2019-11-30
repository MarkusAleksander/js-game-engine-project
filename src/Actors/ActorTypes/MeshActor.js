import ActorPrototype from './ActorPrototype.js';

// * -----------------------------------
// *    MESH ACTOR
// * -----------------------------------
const MeshActor = function MeshActor(data) {

    // * -----------------------------------
    // *    MESH ACTOR PROPERTIES
    // * -----------------------------------

    this.materialColor = data.meshData.materialData !== undefined ? data.meshData.materialData.color !== undefined ? data.meshData.materialData.color : 0xffffff : 0xffffff;

    ActorPrototype.call(this, data);


    // * -----------------------------------
    // *    MESH ACTOR METHODS
    // * -----------------------------------

    this.updateMaterialColor = function updateMaterialColor(col) {
        this.materialColor = col;
        this.needsUpdate = true;
    }

    this.getMaterialColor = function getMaterialColor() {
        return this.materialColor;
    }

    this.syncAttachedObject = function () {
        MeshActor.prototype.syncAttachedObject.call(this);
        if (this.attachedObject.material.color) {
            this.attachedObject.material.color.set(parseInt(this.materialColor));

            // * Ensure object is in correct sync with attached
            this.materialColor = this.attachedObject.material.color;
        }
    }

}

MeshActor.prototype = Object.create(ActorPrototype.prototype);
MeshActor.prototype.constructor = MeshActor;

export default MeshActor;
