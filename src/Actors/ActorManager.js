import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import ActorPrototype from './Actor.js';
import ActorFactory from './ActorFactory.js';

const ActorManager = function ActorManager(data) {

    ManagerPrototype.call(this, data);

    // * List of in game Actors
    this.actorList = [];
    // * Reference to the ActorFactory
    this.ActorFactory = null;

    this.initialise = function initialise() {
        console.log('initialisg actor manager');
        this.ActorFactory = new ActorFactory();
        this.isInitialised = true;
    }

    // * Create an actor
    this.createActor = function createActor(settings) {
        return this.ActorFactory.createActor(settings);
    }

    // * Register Actor
    this.registerActor = function registerActor(actorObj) {
        if (!(actorObj instanceof ActorPrototype)) {
            console.log('Actor not instance of ActorPrototype!');
            return;
        }
        this.actorList.push({
            actor: actorObj,
            id: actorObj.getID
        });
        actorObj.setRegisterStatus(true);
    }

    this.removeActor = function removeActor(id) {
        // TODO: write function
    }

    this.update = function update() {
        console.log('Updating Actor Manager');
        this.actorList.forEach(function forEachUpdate(updateItem) {
            updateItem.actor.update();
        });
    }

}

ActorManager.prototype = Object.create(ManagerPrototype.prototype);
ActorManager.prototype.constructor = ActorManager;

export default ActorManager;
