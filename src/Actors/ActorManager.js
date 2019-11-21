import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import ActorPrototype from './Actor.js';
import ActorFactory from './ActorFactory.js';

import Utilities from './../Globals/Utilities.js';

// * -----------------------------------
// *    ACTOR MANAGER
// * -----------------------------------
const ActorManager = function ActorManager(data) {

    // * -----------------------------------
    // *    GRAPHICS MANAGER PROPERTIES
    // * -----------------------------------

    // * List of in game Actors
    this.actorList = [];
    // * Reference to the ActorFactory
    this.ActorFactory = null;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    GRAPHICS MANAGER METHODS
    // * -----------------------------------

    // * Override initialise function
    this.initialise = function initialise() {
        // * Create the Actor Factory
        this.ActorFactory = new ActorFactory();

        // * Call to base to do any prototype based initialising
        ManagerPrototype.prototype.initialise.call(this);
    }

    // * Update method
    this.update = function update() {
        Utilities.outputDebug('Updating Actor Manager');

        // * Update all registered Actors
        this.actorList.forEach(function forEachUpdate(updateItem) {
            updateItem.actor.update();
        });
    }


    // * ------- ACTOR MANAGEMENT METHODS ------- * //

    // * Create Actor
    this.createActor = function createActor(settings) {
        return this.ActorFactory.createActor(settings);
    }

    // * Register Actor
    this.registerActor = function registerActor(actorObj) {
        if (!(actorObj instanceof ActorPrototype)) {
            Utilities.outputDebug('Actor not instance of ActorPrototype!');
            return;
        }
        this.actorList.push({
            actor: actorObj,
            id: actorObj.getID
        });
        actorObj.setRegisterStatus(true);
    }

    // * Deregister Actor
    this.deregisterActor = function deregisterActor(actorObj) {
        // TODO
    }

    // * Remove Actor
    this.removeActor = function removeActor(id) {
        let idx = this.actorList.findIndex((actor) => { return actor.id === id });

        if (idx > -1) {
            this.actorList.splice(idx, 1);
        }
    }

}

ActorManager.prototype = Object.create(ManagerPrototype.prototype);
ActorManager.prototype.constructor = ActorManager;

export default ActorManager;
