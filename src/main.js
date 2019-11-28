/* eslint-disable no-invalid-this */
/* eslint-disable func-names */
/* eslint-disable no-lone-blocks */
import EngineManager from './Engine/Engine.js';
import GraphicsManager from './Graphics/Graphics.js';
import ActorManager from './Actors/ActorManager.js';

import Utilities from './Globals/Utilities.js';
import { DEBUG_MODE, PROD_MODE, SINGLE_FRAME_RENDER, CONTINUOUS_FRAME_RENDER, PERFORMANCE_DETAIL_ON, PERFORMANCE_DETAIL_OFF } from './Globals/Globals.js';
import { ACTOR_TYPES, MESH_TYPES } from './Actors/ActorTypes.js';
import { LIGHT_TYPES } from './Graphics/LightTypes.js';

(function main() {

    // * Main render function
    // TODO - its currently only Graphics here - can we leave this in the graphics manager and retrieve it later?
    const render = function render() {
        Graphics.render();
    }

    // * Setup running modes
    Utilities.setRunningMode(PROD_MODE);
    Utilities.setRenderMode(CONTINUOUS_FRAME_RENDER);
    Utilities.setPerformanceMode(PERFORMANCE_DETAIL_ON);


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
        Graphics.moveCameraTo({ x: 0, y: 0, z: 15 });

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
            actorType: ACTOR_TYPES.PRIMITIVE,
            meshData: {
                meshType: MESH_TYPES.BOX,
                geometry: {
                    width: 2,
                    height: 2,
                    depth: 2,
                    widthSegments: 3,
                    heightSegments: 3,
                    depthSegments: 3
                },
                material: {
                    color: 0xff0000
                }
            },
            sceneData: {
                position: { x: 0, y: 0, z: 0 }
            }
        });

        // * Register created actor
        ActorMgr.registerActor(Player);

        // * Add some updates to the actor
        Player.addUpdateFunction(function () {
            this.rotateActorBy({ x: 0.01, y: 0.02, z: -0.01 });
        });
        // Player.addUpdateFunction(function () {
        //     this.moveActorBy({ x: 0.05 });
        //     if (this.getPosition().x > 10) {
        //         this.moveActorTo({ x: -10 });
        //     }
        // });

        // * Add Actor to Scene
        Graphics.addActorToScene(Player);

        // * Set Player to be Active
        Player.setActiveStatus(true);

        // * Actor Removal process
        // Player.setActiveStatus(false);
        // Graphics.removeActorFromScene(Player);
        // ActorMgr.deregisterActor(Player.getID());


        // * Create a light
        let Light = Graphics.createLight({
            type: LIGHT_TYPES.DIRECTIONAL,
            position: { x: 10, y: 10, z: 10 },
            intensity: 1.0,
            color: 0xffffff
        });

        // * Register Light
        Graphics.registerLight(Light);

        Light.addUpdateFunction(function () {
            this.moveLightBy({ y: 0.05 });
            if (this.getPosition().y > 10) {
                this.moveLightTo({ y: -10 });
            }
        });

        // * Add light to Scene
        Graphics.addLightToScene(Light);

        // * Set light to active (switch it on)
        Light.setActiveStatus(true);

        // * Removal process
        // Light.setActiveStatus(false);
        // Graphics.removeLightFromScene(Light);
        // Graphics.deregisterLight(Light.getID());
    }


    // * -----------------------------------
    // *    ENGINE READY AND GO
    // * -----------------------------------
    Engine.registerUpdater(Graphics.update.bind(Graphics));
    Engine.registerUpdater(ActorMgr.update.bind(ActorMgr));

    // * Run
    Engine.start();

})();
