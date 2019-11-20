import EngineManager from './Engine/Engine.js';
import GraphicsManager from './Graphics/Graphics.js';
import ActorManager from './Actors/ActorManager.js';

(function main() {

    // * Main render logic
    const render = function render() {
        console.log('rendering...');
        Graphics.render();
    }

    // * Construct systems
    const Engine = new EngineManager(
        { managerName: 'EngineManager' },
        render
    );

    const Graphics = new GraphicsManager(
        { managerName: 'GraphicsManager', canvasID: '#canvas' }
    );

    const ActorMgr = new ActorManager(
        { managerName: 'ActorManager' }
    );

    // * Initialise
    Engine.initialise();
    Graphics.initialise({
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.2,
        far: 200
    });

    ActorMgr.initialise();
    let Player = ActorMgr.createActor({
        name: 'Player',
        meshData: {
            type: 'CUBE',
            dimensions: { x: 1, y: 1, z: 1 }
        },
        materialData: {
            color: 0x44aa88
        },
        position: { x: 0, y: 0, z: 0 }
    });

    ActorMgr.registerActor(Player);
    Player.setActiveStatus(true);
    // * Override Actor update function
    Player.update = function update() {
        this.actorMesh.rotation.x += 0.01;
        this.actorMesh.rotation.y += 0.01;
    }
    Graphics.addActorToScene(Player);

    // * Set up Camera
    Graphics.moveCameraTo({ x: 0, y: 0, z: 5 });

    Engine.registerUpdater(Graphics.update.bind(Graphics));
    Engine.registerUpdater(ActorMgr.update.bind(ActorMgr));

    // * Run
    Engine.start();

})();
