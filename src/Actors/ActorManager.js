/*
*   ActorManager.js
*   Management Class for all Actors within the game. Provides interface to build, register, deregister and remove Actors
*/
import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

import ActorPrototype from './ActorTypes/ActorPrototype.js';
import ActorFactory from './ActorFactory.js';
import { ACTOR_TYPES } from '../Globals/ActorTypes.js';

import Utilities from './../Globals/Utilities.js';

// TODO - Implement an index map? Would likely improve performance for a large list that is often accessed, but would need to be updated for each addition /

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
    // * index map of registered Actors
    this.actorIndexMap = new Map();
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

        ManagerPrototype.prototype.initialise.call(this);
    }

    // * Update method
    this.update = function update(tDelta) {
        ManagerPrototype.prototype.update.call(this);

        // * Update all registered Actors
        this.registeredActorList.forEach((actor) => {
            actor.update(tDelta);
        });
    }


    // * ------- ACTOR CREATION METHODS ------- * //

    // * Create Actor
    this.createActor = function createActor(actorObjectSettings) {
        let newActor = this.ActorFactory.createActor(actorObjectSettings);

        if (!newActor) {
            Utilities.outputDebug('Failed to create Actor');
            return null;
        }

        this.actorList.push(newActor);
        return newActor;
    }

    // * Create a Mesh Actor
    this.createMeshActor = function createMeshActor(settings) {
        let meshActor = this.ActorFactory.createActor(settings, ACTOR_TYPES.MESH);

        if (!meshActor) { return null; }

        this.addActor(meshActor);

        return meshActor;
    }

    // * Create a Light Actor
    this.createLightActor = function createLightActor(settings) {
        let lightActor = this.ActorFactory.createActor(settings, ACTOR_TYPES.LIGHT);

        if (!lightActor) { return null; }

        this.addActor(lightActor);

        return lightActor;
    }


    // * ------- ACTOR MANAGEMENT METHODS ------- * //

    // * Add Actor to List
    this.addActor = function addActor(actor) {
        if (!(actor instanceof ActorPrototype)) {
            Utilities.outputDebug('Actor not instance of ActorPrototype!');
            return;
        }
        this.actorList.push(actor);
    }

    // * Register Actor
    this.registerActor = function registerActor(actor) {
        if (!(actor instanceof ActorPrototype)) {
            Utilities.outputDebug('Actor not instance of ActorPrototype!');
            return;
        }
        this.registeredActorList.push(actor);
        actor.setRegisteredStatus(true);
        this.buildActorIndexMap();
    }

    // * Deregister Actor
    this.deregisterActorByID = function deregisterActorByID(actorID) {
        let actor = this.getRegisteredActorByID(actorID);

        if (!actor) { return; }

        // * Check Actor has been deactivated
        if (actor.getActiveStatus()) {
            Utilities.outputDebug('Actor not deactivated before deregistration.');
            return;
        }

        // * Deregister Actor
        actor.setRegisteredStatus(false);
        // * Remove Actor from Registered list
        this.registeredActorList.splice(idx, 1);

        this.buildActorIndexMap();
    }

    // * Remove Actor (Destroy)
    this.removeActorByID = function removeActorByID(actorID) {
        let idx = this.registeredActorList.findIndex((actor) => { return actorID === actor.getID(); });

        if (idx < 0) {
            Utilities.outputDebug('Actor not found');
            return;
        }

        let actor = this.actorList[idx];

        // * Check actor has been deactivated and deregistered
        if (actor.getActiveStatus() || actor.getRegisteredStatus()) {
            Utilities.outputDebug('Actor not properly deactivated or deregistered');
            return;
        }

        // * Remove actor
        // TODO - Implement clean up process
        this.actorList.splice(idx, 1);
    }

    // * Get Unregistered Actors by ID
    this.getUnregisteredActorByID = function getUnregisteredActorById(actorID) {
        let idx = this.registeredActorList.findIndex((actor) => { return actorID === actor.getID() && !actor.isRegistered; });

        if (idx < 0) {
            Utilities.outputDebug('Actor not found');
            return null;
        }

        return this.registeredActorList[idx];
    }

    // * Get Registered Actor by ID
    this.getRegisteredActorByID = function getRegisteredActorByID(actorID) {
        let actor = this.actorIndexMap.get(actorID);

        if (!actor) {
            Utilities.outputDebug('Actor not found');
            return null;
        }

        return actor;
    }

    // * ------- ACTOR MANAGEMENT METHODS ------- * //

    // * Creat an index map to save searching through the array everytime we need to access an Actor
    // * The only caveat is that the index map needs to be rebuilt each time and actor is removed or added
    this.buildActorIndexMap = function buildActorIndexMap() {
        // * Reset the map
        this.actorIndexMap.clear();

        // * Build the map
        this.registeredActorList.forEach((actor) => {
            this.actorIndexMap.set(actor.uID, actor);
        });

    }
}

ActorManager.prototype = Object.create(ManagerPrototype.prototype);
ActorManager.prototype.constructor = ActorManager;

export default ActorManager;
