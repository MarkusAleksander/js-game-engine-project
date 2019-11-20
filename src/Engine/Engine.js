import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

const EngineManager = function EngineManager(data, render) {

    ManagerPrototype.call(this, data);

    // * List of update functions
    this.updateList = [];
    // * Current Unique Updater ID
    this.cUuID = 1;

    // * Start the Engine
    this.start = function start() {
        if (this.isInitialised) {
            // .. do start
            this.update();
        }
    }

    // * Register updater functions to the engine
    this.registerUpdater = function registerUpdater(updateFunction) {
        let id = this.cUuID++;

        this.updateList.push({
            update: updateFunction,
            id: id
        });
        // * return id
        return id;
    }

    // * remove updater by ID
    this.removeUpdater = function removeUpdater(updateID) {
        // TODO: write function
    }

    // * Render
    this.render = render;

    // * Update
    this.update = function update() {
        //console.log('running updates..');
        this.updateList.forEach(function forEachUpdate(updateItem) {
            updateItem.update();
        });
        // console.log('running render...');
        this.render();

        //console.log('end running updates...');
        // * run update loop again
        // requestAnimationFrame(this.update.bind(this));
    }

}

EngineManager.prototype = Object.create(ManagerPrototype.prototype);
EngineManager.prototype.constructor = EngineManager;

export default EngineManager;
