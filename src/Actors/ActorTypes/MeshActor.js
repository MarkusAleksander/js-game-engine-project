/*
*   MeshActor.js
*   Class for Mesh based Actors in the scene
*/
import ActorPrototype from './ActorPrototype.js';
import Utilities from '../../Globals/Utilities.js';

// * -----------------------------------
// *    MESH ACTOR
// * -----------------------------------
const MeshActor = function MeshActor(data) {

    // * -----------------------------------
    // *    MESH ACTOR PROPERTIES
    // * -----------------------------------

    // TODO - Checking for undefined isn't very useful for deep objects, needs reworking
    this.materialColor = data.material !== undefined
        ? Utilities.checkUndefinedAndReturn(data.material.color, 0xffffff)
        : 0xffffff;

    ActorPrototype.call(this, data);


    // * -----------------------------------
    // *    MESH ACTOR METHODS
    // * -----------------------------------

    // * Update Material Color
    // TODO - needed?
    this.updateMaterialColor = function updateMaterialColor(col) {
        this.materialColor = col;
    }
    // TODO - ?
    this.getMaterialColor = function getMaterialColor() {
        return this.materialColor;
    }

}

MeshActor.prototype = Object.create(ActorPrototype.prototype);
MeshActor.prototype.constructor = MeshActor;

export default MeshActor;
