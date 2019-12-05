import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import ActorPrototype from './ActorTypes/ActorPrototype.js';
import ActorFactory from './ActorFactory.js';
import { ACTOR_TYPES } from '../Globals/ActorTypes.js';

import Utilities from './../Globals/Utilities.js';

// * -----------------------------------
// *    ACTOR MANAGER
// * -----------------------------------
const ActorManager = function ActorManager(data) {

    // * -----------------------------------
    // *    ACTOR MANAGER PROPERTIES
    // * -----------------------------------

    // * List of in game Actors
    this.actorList = [];
    // * List of registered in game Actors
    this.registeredActorList = [];
    // * Reference to the ActorFactory
    this.ActorFactory = null;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    ACTOR MANAGER METHODS
    // * -----------------------------------

    // * Override initialise function
    this.initialise = function initialise() {
        // * Create the Actor Factory
        this.ActorFactory = new ActorFactory();

        // * Call to base to do any prototype based initialising
        ManagerPrototype.prototype.initialise.call(this);
    }

    // * Update method
    this.update = function update(tDelta) {
        Utilities.outputDebug('Updating Actor Manager');

        // * Update all registered Actors
        this.registeredActorList.forEach((actor) => {
            actor.update(tDelta);
        });
    }


    // * ------- ACTOR MANAGEMENT METHODS ------- * //

    // * Create Actor
    this.createActor = function createActor(settings) {
        let newActor = this.ActorFactory.createActor(settings);

        this.actorList.push(newActor);
        return newActor;
    }

    // * Add Actor to List
    this.addActor = function addActor(actor) {
        this.actorList.push(actor);
    }

    // * Create a Mesh Actor
    this.createMeshActor = function createMeshActor(settings) {
        let meshActor = this.ActorFactory.createActor(settings, ACTOR_TYPES.MESH);

        if (!meshActor) { return; }

        this.addActor(meshActor);

        return meshActor;
    }

    // * Create a Light Actor
    this.createLightActor = function createLightActor(settings) {
        let lightActor = this.ActorFactory.createActor(settings, ACTOR_TYPES.LIGHT);

        if (!lightActor) { return; }

        this.addActor(lightActor);

        return lightActor;
    }

    // * Register Actor
    this.registerActor = function registerActor(actor) {
        if (!(actor instanceof ActorPrototype)) {
            Utilities.outputDebug('Actor not instance of ActorPrototype!');
            return;
        }
        this.registeredActorList.push(actor);
        actor.setRegisteredStatus(true);
    }

    // * Deregister Actor
    // TODO - By object or ID or both?
    this.deregisterActor = function deregisterActor(actorID) {
        let idx = this.registeredActorList.findIndex((actor) => { return actorID === actor.getID(); });

        // * Check actor found
        if (idx < 0) {
            Utilities.outputDebug('Actor not found when trying deregister.');
            return;
        }

        let actor = this.registeredActorList[idx];

        // * Check Actor has been deactivated
        if (actor.getActiveStatus()) {
            Utilities.outputDebug('Actor not deactivated before deregistration.');
            return;
        }

        // * Deregister Actor
        actor.setRegisteredStatus(false);

        // * Remove Actor from Registered list
        this.registeredActorList.splice(idx, 1);
    }

    // * Remove Actor (destroy)
    // TODO - By object or ID or both?
    this.removeActor = function removeActor(actorID) {
        let idx = this.registeredActorList.findIndex((actor) => { return actorID === actor.getID(); });

        // * Check actor found
        if (idx < 0) {
            Utilities.outputDebug('Actor not found when trying remove.');
            return;
        }

        let actor = this.registeredActorList[idx];

        // * Check actor has been deactivated and deregistered
        if (actor.getActiveStatus() || actor.getRegisteredStatus()) {
            Utilities.outputDebug('Actor not properly deactivated or deregistered');
            return;
        }

        // * Remove actor
        // TODO - Implement clean up process
        this.actorList.splice(idx, 1);
    }
}

ActorManager.prototype = Object.create(ManagerPrototype.prototype);
ActorManager.prototype.constructor = ActorManager;

export default ActorManager;
