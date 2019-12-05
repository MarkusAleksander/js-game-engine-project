/*
*   main.js
*   Entry point of the Game Engine - Here the Running Modes are set, the Managers are created and Initialised, the Scene is created and the Engine is Run()
*/
import EngineManager from './Engine/EngineManager.js';
import GraphicsManager from './Graphics/GraphicsManager.js';
import ActorManager from './Actors/ActorManager.js';
import ControllerManager from './Controller/ControllerManager.js';

import Utilities from './Globals/Utilities.js';
import { DEBUG_MODE, PROD_MODE, SINGLE_FRAME_RENDER, CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON, PERFORMANCE_DETAIL_OFF } from './Globals/Globals.js';

import createScene from './Scenes/scene_4.js';

// * -----------------------------------
// *    MAIN
// * -----------------------------------
(function main() {

    // * Check scene function exists
    if (!createScene || typeof createScene !== "function") {
        Utilities.outputDebug('Scene Creation function does not exist');
        return;
    }

    // * Main Render function
    // * Leaving this here before system set up so that Managers are not dependent on another being first
    // * And other functions can be called from here aswell
    const render = function render() {
        GraphicsMgr.render();
    }

    // * Setup running modes
    Utilities.setRunningMode(PROD_MODE);
    Utilities.setRenderMode(CONTINUOUS_FRAME_RENDER);
    Utilities.setPerformanceMode(PERFORMANCE_DETAIL_OFF);


    // * -----------------------------------
    // *    SYSTEM CONSTRUCTION
    // * -----------------------------------

    // * Construct Engine Manager
    const EngineMgr = new EngineManager(
        {
            managerName: 'EngineManager',
            renderFn: render,
            timeStep: 1000 / 60
        },
    );

    // * Construct Graphics Manager
    const GraphicsMgr = new GraphicsManager(
        {
            managerName: 'GraphicsManager',
            canvasID: '#canvas'
        }
    );

    // * Construct Actor Manager
    const ActorMgr = new ActorManager(
        {
            managerName: 'ActorManager'
        }
    );

    // * Construct Controller Manager
    const ControllerMgr = new ControllerManager(
        {
            managerName: "ControllerManager"
        }
    )


    // * -----------------------------------
    // *    SYSTEM INITIALISATIONS
    // * -----------------------------------
    // * Initialise Engine Manager
    EngineMgr.initialise();

    // * Initialise Graphics Manager
    GraphicsMgr.initialise({
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100
    });

    // * Initialise Actor Manager
    ActorMgr.initialise();

    // * Initialise Controller Manager
    ControllerMgr.initialise();


    // * -----------------------------------
    // *    SCENE CREATION
    // * -----------------------------------
    createScene(GraphicsMgr, ActorMgr, ControllerMgr);

    // * Register Other Manager updaters to the Engine
    let GraphicsManagerUpdaterID = EngineMgr.registerUpdater(GraphicsMgr.update.bind(GraphicsMgr));
    let ActorManagerUpdaterID = EngineMgr.registerUpdater(ActorMgr.update.bind(ActorMgr));
    let ControllerManagerUpdaterID = EngineMgr.registerUpdater(ControllerMgr.update.bind(ControllerMgr));


    // * -----------------------------------
    // *    ENGINE READY AND GO
    // * -----------------------------------
    EngineMgr.start();

})();
