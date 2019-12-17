/*
*   EngineManager.js
*   Management Class for the System, Main Game loop is located here and other Managers update functions are called from here
*/
import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

import Utilities from '../Globals/Utilities.js';
import { CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON } from '../Globals/Globals.js';

// * -----------------------------------
// *    ENGINE MANAGER
// * -----------------------------------
const EngineManager = function EngineManager(data) {

    // * -----------------------------------
    // *    ENGINE MANAGER PROPERTIES
    // * -----------------------------------

    // * List of updater functions
    this.updaterList = [];
    // * Next Unique ID for Registered Updater Functions
    this.nextUID = 1;
    // * Render function
    this.render = Utilities.checkUndefinedAndReturn(data.renderFn, function () { });
    // * Desired time step
    this.timeStep = Utilities.checkUndefinedAndReturn(data.timeStep, 1000 / 60);
    // * Number of frames rendererd
    this.numberFramesRendered = 0;
    // * Time variables for controlling system Framerate
    this.loopTimeStart = 0;
    this.loopTimeThen = 0;
    // * Is engine running?
    this.running = false;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    ENGINE MANAGER METHODS
    // * -----------------------------------

    // * Start the Engine
    this.start = function start() {
        if (this.isInitialised) {
            Utilities.outputDebug('Starting engine');
            this.loopTimeThen = performance.now();
            this.running = true;
            this.update(0);
        }
    }

    // * Register updater functions to the engine
    this.registerUpdater = function registerUpdater(updaterFunction) {
        let id = this.nextUID++;

        this.updaterList.push({
            updater: updaterFunction,
            id: id
        });

        // * Return id
        return id;
    }

    // * remove updater by ID
    this.removeUpdater = function removeUpdater(updateID) {
        let idx = this.updaterList.findIndex(function findIndex(el) {
            return el.id === updateID;
        });

        if (idx !== -1) {
            this.updaterList.splice(idx, 1);
        }
    }

    // * Get current number of frames rendered
    this.getNumberOfFramesRendered = function getNumberOfFramesRendered() {
        return this.numberFramesRendered;
    }

    this.lastTime = 0;
    this.timeSinceLastRender = 0;

    this.delta = 0;

    // * Main Update Loop
    this.update = function update(timeStamp) {

        ManagerPrototype.prototype.update.call(this);

        let _self = this;
        // * Request the next animation frame

        if (this.running) {
            requestAnimationFrame(_self.update.bind(_self));
        }

        // * Get current timestamp
        this.loopTimeStart = timeStamp;

        // * Get time since last render
        this.delta = this.loopTimeStart - this.loopTimeThen;

        // * If it's time to render, then do so
        if (this.delta >= this.timeStep) {

            // * Set Then time for next render - Correct time interval difference
            this.loopTimeThen = this.loopTimeStart - this.delta % this.timeStep;

            Utilities.outputDebug('Running Updates');

            // * Update all registered Update Items and pass in delta
            this.updaterList.forEach((updateItem) => {
                updateItem.updater(this.delta);
            });

            Utilities.outputDebug('Running Render');

            // * Run registered render function
            this.render();

            // * Update framecount
            this.numberFramesRendered++;

            Utilities.outputDebug('End Running Updates');
        }
    }
}

EngineManager.prototype = Object.create(ManagerPrototype.prototype);
EngineManager.prototype.constructor = EngineManager;

export default EngineManager;
