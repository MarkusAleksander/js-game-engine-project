/* eslint-disable no-lone-blocks */
import EngineManager from './Engine/Engine.js';
import GraphicsManager from './Graphics/Graphics.js';
import ActorManager from './Actors/ActorManager.js';

import Utilities from './Globals/Utilities.js';
import { DEBUG_MODE, PROD_MODE, SINGLE_FRAME_RENDER, CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON, PERFORMANCE_DETAIL_OFF } from './Globals/Globals.js';

(function main() {

    // * Main render function
    // TODO - its currently only Graphics here - can we leave this in the graphics manager and retrieve it later?
    const render = function render() {
        Graphics.render();
    }

    // * Setup running modes
    Utilities.setRunningMode(DEBUG_MODE);
    Utilities.setRenderMode(SINGLE_FRAME_RENDER);
    Utilities.setPerformanceMode(PERFORMANCE_DETAIL_ON);


    // * -----------------------------------
    // *    SYSTEM CONSTRUCTION
    // * -----------------------------------

    // * Construct Engine Manager
    const Engine = new EngineManager(
        {
            managerName: 'EngineManager',
            renderFn: render,
            timeStep: 1000 / 60
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


    // * -----------------------------------
    // *    SYSTEM INITIALISATIONS
    // * -----------------------------------
    {
        // * Initialise Engine Manager
        Engine.initialise();

        // * Initialise Graphics Manager
        Graphics.initialise({
            fov: 40,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 2000
        });

        // * Position Camera
        Graphics.moveCameraTo({ x: 0, y: 0, z: 50 });

        // * Initialise Actor Manager
        ActorMgr.initialise();
    }


    // * -----------------------------------
    // *    SCENE CREATION
    // * -----------------------------------
    {
        /*
        *   Actor Creation Process
        *   1. Create actor using ActorMgr.createActor
        *   2. Register Actor with ActorMgr (returns ID)
        *   3. Optional - Set Active Status
        *   4. Optional - Set update function
        *   5. Add Actor to scene
        */

        // * Create Player Actor
        let Player = ActorMgr.createActor({
            name: 'Player',
            meshData: {
                type: 'CUBE',
                dimensions: { x: 4, y: 4, z: 4 }
            },
            materialData: {
                color: 0x44aa88
            },
            initialPosition: { x: 0, y: 0, z: 0 }
        });

        ActorMgr.registerActor(Player);
        Player.setActiveStatus(true);
        Player.update = function update() {
            this.actorMesh.rotation.x += 0.01;
            this.actorMesh.rotation.y += 0.01;
        }

        // * Add Actor to Scene
        Graphics.addActorToScene(Player);
    }


    // * -----------------------------------
    // *    ENGINE READY AND GO
    // * -----------------------------------
    Engine.registerUpdater(Graphics.update.bind(Graphics));
    Engine.registerUpdater(ActorMgr.update.bind(ActorMgr));

    // * Run
    Engine.start();

})();
