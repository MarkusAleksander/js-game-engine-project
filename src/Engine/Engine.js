/* eslint-disable consistent-this */
import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

import Utilities from './../Globals/Utilities.js';
import { CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON } from '../Globals/Globals.js';

// * -----------------------------------
// *    ENGINE MANAGER
// * -----------------------------------
const EngineManager = function EngineManager(data) {

    // * -----------------------------------
    // *    ENGINE MANAGER PROPERTIES
    // * -----------------------------------

    // * List of update functions
    this.updateList = [];
    // * Current Unique Updater ID
    this.cUuID = 1;
    // * Render function
    this.render = data.renderFn;
    // * desired time step
    this.timeStep = data.timeStep;
    // * max time step
    this.maxTimeStep = data.maxTimeStep;
    // * Number of frames rendererd
    this.numberFramesRendered = 0;

    // * frame details
    this.timeStart = 0;
    this.timeEnd = 0;
    this.timeTaken = 0;
    this.timeLeft = 0;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    ENGINE MANAGER METHODS
    // * -----------------------------------

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

    // * Get current number of frames
    this.getNumberOfFramesRendered = function getNumberOfFramesRendered() {
        return this.numberFramesRendered;
    }

    // * Main Update Loop
    this.update = function update() {

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            this.timeStart = performance.now();
        }

        Utilities.outputDebug('Running Updates');

        // * Update all registered Update Items
        this.updateList.forEach(function forEachUpdate(updateItem) {
            updateItem.update();
        });

        Utilities.outputDebug('Running Render');

        // * Run registered render function
        this.render();

        // * Update framecount
        this.numberFramesRendered++;

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            console.log(this.numberFramesRendered);
        }

        Utilities.outputDebug('End Running Updates');

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            this.timeEnd = performance.now();
        }

        if (Utilities.getPerformanceMode() === PERFORMANCE_DETAIL_ON) {
            this.timeTaken = this.timeEnd - this.timeStart;
            this.timeLeft = this.timeStep - this.timeTaken;

            console.log(
                'Time to update: ' + this.timeTaken +
                '. Desired time step: ' + this.timeStep +
                '. Max time step: ' + this.maxTimeStep +
                '. Time left available to render: ' + this.timeLeft);
        }

        // TODO - Improve engine loop and ensure frame rate is being acheived correctly

        if (Utilities.getRenderMode() === CONTINUOUS_FRAME_RENDER) {
            // * Run the update again
            let _self = this;

            window.setTimeout(function updateTimeout() {
                requestAnimationFrame(_self.update.bind(_self));
            }, this.timeStep);
        }
    }

}

EngineManager.prototype = Object.create(ManagerPrototype.prototype);
EngineManager.prototype.constructor = EngineManager;

export default EngineManager;
