import EngineManager from './Engine/Engine.js';
import GraphicsManager from './Graphics/Graphics.js';
import ActorManager from './Actors/ActorManager.js';

(function main() {

    // * Main render function
    // TODO - its currently only Graphics here - can we leave this in the graphics manager and retrieve it later?
    const render = function render() {
        Graphics.render();
    }


    // * -----------------------------------
    // *    SYSTEM CONSTRUCTION
    // * -----------------------------------

    // * Construct Engine Manager
    const Engine = new EngineManager(
        {
            managerName: 'EngineManager'
        },
        render
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
        Graphics.moveCameraTo({ x: 0, y: 0, z: 100 });

        // * Initialise Actor Manager
        ActorMgr.initialise();
    }


    // * -----------------------------------
    // *    SCENE CREATION
    // * -----------------------------------
    {
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
