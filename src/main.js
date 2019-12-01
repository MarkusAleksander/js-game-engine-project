/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
/* eslint-disable no-lone-blocks */
import EngineManager from './Engine/Engine.js';
import GraphicsManager from './Graphics/Graphics.js';
import ActorManager from './Actors/ActorManager.js';
import ControllerManager from './Controller/Controller.js';

// import createScene from './Scenes/scene_1.js';

import Utilities from './Globals/Utilities.js';
import { DEBUG_MODE, PROD_MODE, SINGLE_FRAME_RENDER, CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON, PERFORMANCE_DETAIL_OFF } from './Globals/Globals.js';
import createScene from './Scenes/scene_3.js';

(function main() {

    // * Check scene function exists
    if (!createScene || typeof createScene !== "function") {
        console.log('Scene Creation function does not exist');
        return;
    }

    // * Main render function
    // TODO - its currently only Graphics here - can we leave this in the graphics manager and retrieve it later?
    const render = function render() {
        Graphics.render();
    }

    // * Setup running modes
    Utilities.setRunningMode(PROD_MODE);
    Utilities.setRenderMode(CONTINUOUS_FRAME_RENDER);
    Utilities.setPerformanceMode(PERFORMANCE_DETAIL_OFF);


    // * -----------------------------------
    // *    SYSTEM CONSTRUCTION
    // * -----------------------------------

    // * Construct Engine Manager
    const Engine = new EngineManager(
        {
            managerName: 'EngineManager',
            renderFn: render,
            timeStep: 1000 / 60,
            maxTimeStep: 1000 / 30 // TODO - actually required? - probably not
        },
    );

    // * Construct Graphics Manager
    const Graphics = new GraphicsManager(
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
    const Controller = new ControllerManager(
        {
            managerName: "ControllerManager"
        }
    )


    // * -----------------------------------
    // *    SYSTEM INITIALISATIONS
    // * -----------------------------------
    {
        // * Initialise Engine Manager
        Engine.initialise();

        // * Initialise Graphics Manager
        Graphics.initialise({
            fov: 60,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 100
        });

        // * Position Camera
        Graphics.moveCameraTo({ x: -15, y: 15, z: 15 });
        Graphics.setCameraTargetTo({ x: 0, y: 0, z: 0 });

        // * Initialise Actor Manager
        ActorMgr.initialise();
    }

    // * Load scene async and run engine

    // * Scene to load
    // * BREAKING DEV TOOLS
    // let currentHash = location.hash !== "" ? location.hash.slice(1) : "1";
    // let sceneNum = Number(currentHash);

    // if (isNaN(sceneNum)) {
    //     sceneNum = 1;
    // }

    // // * import dynamically
    // import("./Scenes/scene_" + sceneNum + ".js")
    //     // TODO - on success or error
    //     .then((module) => {
    //         // * -----------------------------------
    //         // *    SCENE CREATION
    //         // * -----------------------------------
    //         module.default(Graphics, ActorMgr);

    //         // * -----------------------------------
    //         // *    ENGINE READY AND GO
    //         // * -----------------------------------
    //         Engine.registerUpdater(Graphics.update.bind(Graphics));
    //         Engine.registerUpdater(ActorMgr.update.bind(ActorMgr));

    //         // * Run
    //         Engine.start();
    //     });

    // * -----------------------------------
    // *    SCENE CREATION
    // * -----------------------------------
    createScene(Graphics, ActorMgr, Controller);

    // * -----------------------------------
    // *    ENGINE READY AND GO
    // * -----------------------------------
    Engine.registerUpdater(Graphics.update.bind(Graphics));
    Engine.registerUpdater(ActorMgr.update.bind(ActorMgr));
    Engine.registerUpdater(Controller.update.bind(Controller));

    // * Run
    Engine.start();

})();
