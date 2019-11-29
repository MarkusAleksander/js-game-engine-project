import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES } from '../Actors/ActorTypes/ActorTypes.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr) {
    /*
    *   Actor Creation Process
    *   1. Create actor using ActorMgr.createActor
    *   2. Register Actor with ActorMgr (returns ID)
    *   3. Optional - Set Active Status
    *   4. Optional - Set update function
    *   5. Add Actor to scene
    */


    // * Create Player Actor
    let Player = ActorMgr.createMeshActor({
        actorType: MESH_ACTOR_TYPES.PRIMITIVE,
        meshData: {
            meshType: MESH_TYPES.BOX,
            geometry: {
                width: 2,
                height: 3,
                depth: 5,
                widthSegments: 1,
                heightSegments: 1,
                depthSegments: 1
            },
            materialData: {
                color: "0xffffff",
                texture: "src/Textures/brickwall.jpg"
                // bumpMap: "src/Textures/brickwall.jpg"
            }
        },
        position: {
            x: 0, y: 0, z: 5
        }
    });

    // * Register created actor
    ActorMgr.registerActor(Player);

    // * Add some updates to the actor
    Player.addUpdateFunction(function () {
        this.rotateActorBy({ x: 0.01, y: 0.02, z: -0.01 });
    });

    Player.addUpdateFunction(function () {
        this.moveActorBy({ x: 0.05 });
        if (this.getPosition().x > 5) {
            this.moveActorTo({ x: -5 });
        }
    });

    Player.addUpdateFunction(function () {
        // debugger;
        // let newColor = "0x" + (parseInt(this.getMaterialColor(), 16) + 1).toString(16);

        // this.updateMaterialColor(newColor);
    });

    // * Add Actor to Scene
    Graphics.addActorToScene(Player);

    // * Set Player to be Active
    Player.setActiveStatus(true);

    // * Actor Removal process
    // Player.setActiveStatus(false);
    // Graphics.removeActorFromScene(Player);
    // ActorMgr.deregisterActor(Player.getID());


    // * Create a light
    let Light = ActorMgr.createLightActor({
        type: LIGHT_ACTOR_TYPES.DIRECTIONAL,
        position: { x: -10, y: 10, z: 10 },
        intensity: 3.0,
        color: 0xffffff
    });

    // debugger;
    // * Register Light
    ActorMgr.registerActor(Light);

    // Light.addUpdateFunction(function () {
    //     this.moveLightBy({ x: 0.1 });
    //     if (this.getPosition().x > 10) {
    //         this.moveLightTo({ x: -10 });
    //     }
    // });

    // * Add light to Scene
    Graphics.addActorToScene(Light);

    // * Set light to active (switch it on)
    Light.setActiveStatus(true);

    // let ambientLight = Graphics.createLight({
    //     type: LIGHT_TYPES.AMBIENT,
    //     intensity: 2.0,
    //     color: 0x404040
    // });

    // Graphics.registerLight(ambientLight);
    // Graphics.addLightToScene(ambientLight);
    // ambientLight.setActiveStatus(true);

    // let hemisphereLight = Graphics.createLight({
    //     type: LIGHT_TYPES.HEMISPHERE,
    //     intensity: 1,
    //     skyColor: 0xffffff,
    //     groundColor: 0xffffff
    // })

    // Graphics.registerLight(hemisphereLight);
    // Graphics.addLightToScene(hemisphereLight);
    // hemisphereLight.setActiveStatus(true);

    // * Removal process
    // Light.setActiveStatus(false);
    // Graphics.removeLightFromScene(Light);
    // Graphics.deregisterLight(Light.getID());
}

export default createScene;
