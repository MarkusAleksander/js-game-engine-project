import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

import Utilities from './../Globals/Utilities.js';
import { CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON } from '../Globals/Globals.js';

const EngineManager = function EngineManager(data) {

    ManagerPrototype.call(this, data);

    // * List of update functions
    this.updateList = [];
    // * Current Unique Updater ID
    this.cUuID = 1;
    // * Render function
    this.render = data.renderFn;
    // * desired time step
    this.timeStep = data.timeStep;

    // * Start the Engine
    this.start = function start() {
        if (this.isInitialised) {
            Utilities.outputDebug('Starting engine');
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

        // * Return id
        return id;
    }

    // * remove updater by ID
    this.removeUpdater = function removeUpdater(updateID) {
        let idx = this.updateList.findIndex(function findIndex(el) {
            return el.id === updateID;
        });

        if (idx !== -1) {
            this.updateList.splice(idx, 1);
        }
    }


    // * Update
    this.update = function update() {

        let timeStart, timeEnd;

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            timeStart = performance.now();
        }

        Utilities.outputDebug('Running Updates');

        this.updateList.forEach(function forEachUpdate(updateItem) {
            updateItem.update();
        });

        Utilities.outputDebug('Running Render');

        this.render();

        Utilities.outputDebug('End Running Updates');

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            timeEnd = performance.now();
        }

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            let timeTaken = timeEnd - timeStart;

            console.log('Time to update: ' + timeTaken + '. Desired time step: ' + this.timeStep + '. Time left available to render: ' + (this.timeStep - timeTaken));
        }

        if (Utilities.getRenderMode() === CONTINUOUS_FRAME_RENDER) {
            // * Run the update again
            requestAnimationFrame(this.update.bind(this));
        }
    }

}

EngineManager.prototype = Object.create(ManagerPrototype.prototype);
EngineManager.prototype.constructor = EngineManager;

export default EngineManager;
