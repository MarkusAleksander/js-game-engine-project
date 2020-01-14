/*
 *   main.js
 *   Entry point of the Game Engine - Here the Running Modes are set, the Managers are created and Initialised, the Scene is created and the Engine is Run()
 */
import EngineMgr from "./Engine/EngineManager.js";
import GraphicsMgr from "./Graphics/GraphicsManager.js";
import ActorMgr from "./Actors/ActorManager.js";
import ControllerMgr from "./Controller/ControllerManager.js";

import EntityMgr from "./ECS/EntityManager.js";

import Utilities from "./Globals/Utilities.js";
import {
    DEBUG_MODE,
    PROD_MODE,
    SINGLE_FRAME_RENDER,
    CONTINUOUS_FRAME_RENDER,
    PERFORMANCE_DETAIL_ON,
    PERFORMANCE_DETAIL_OFF,
} from "./Globals/Globals.js";

import createScene from "./Scenes/scene_8.js";
import PhysicsMgr from "./Physics/PhysicsManager.js";

// * -----------------------------------
// *    MAIN
// * -----------------------------------
(function main() {
    // * Check scene function exists
    if (!createScene || typeof createScene !== "function") {
        Utilities.outputDebug("Scene Creation function does not exist");
        return;
    }

    // * Main Render function
    // * Leaving this here before system set up so that Managers are not dependent on another being first
    // * And other functions can be called from here aswell
    const render = function render() {
        GraphicsMgr.render();
    };

    // * Setup running modes
    Utilities.setRunningMode(PROD_MODE);
    Utilities.setRenderMode(CONTINUOUS_FRAME_RENDER);
    Utilities.setPerformanceMode(PERFORMANCE_DETAIL_OFF);

    // * -----------------------------------
    // *    SYSTEM INITIALISATIONS
    // * -----------------------------------
    // * Initialise Engine Manager
    EngineMgr.initialise({
        renderFn: render,
        timeStep: 1000 / 60,
    });

    // * Initialise Graphics Manager
    GraphicsMgr.initialise({
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
    });

    // * Initialise Physics
    PhysicsMgr.initialise();

    // * Initialise Actor Manager
    ActorMgr.initialise();

    // * Initialise Controller Manager
    ControllerMgr.initialise();

    // * Initialise Entity Manager
    EntityMgr.initialise();

    // * -----------------------------------
    // *    SCENE CREATION
    // * -----------------------------------
    // createScene(GraphicsMgr, ActorMgr, ControllerMgr);
    createScene(GraphicsMgr, EntityMgr, ControllerMgr);

    // * Register Other Manager updaters to the Engine
    let GraphicsManagerUpdaterID = EngineMgr.registerUpdater(
        GraphicsMgr.update.bind(GraphicsMgr)
    );
    let ActorManagerUpdaterID = EngineMgr.registerUpdater(
        ActorMgr.update.bind(ActorMgr)
    );
    let ControllerManagerUpdaterID = EngineMgr.registerUpdater(
        ControllerMgr.update.bind(ControllerMgr)
    );
    let PhysicsManagerUpdaterID = EngineMgr.registerUpdater(
        PhysicsMgr.update.bind(PhysicsMgr)
    );
    let ECSManagerUpdaterID = EngineMgr.registerUpdater(
        EntityMgr.update.bind(EntityMgr)
    );

    // * -----------------------------------
    // *    ENGINE READY AND GO
    // * -----------------------------------
    EngineMgr.start();
})();
