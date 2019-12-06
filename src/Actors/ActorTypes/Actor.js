import ActorPrototype from './ActorPrototype.js';

// * -----------------------------------
// *    MESH ACTOR
// * -----------------------------------
const Actor = function Actor(data) {

    // * -----------------------------------
    // *    MESH ACTOR PROPERTIES
    // * -----------------------------------

    ActorPrototype.call(this, data);


    // * -----------------------------------
    // *    MESH ACTOR METHODS
    // * -----------------------------------
}

Actor.prototype = Object.create(ActorPrototype.prototype);
Actor.prototype.constructor = Actor;

export default Actor;
