import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES, MATERIAL_REPEAT_TYPES } from '../Actors/ActorTypes/ActorTypes.js';
import applyController from './sceneControllers.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr, Controller) {

    // * -----------------------------------
    // *    Create player actor
    // * -----------------------------------
    let PlayerSize = 2;

    let Player = ActorMgr.createMeshActor({
        actorType: MESH_ACTOR_TYPES.PRIMITIVE,
        meshData: {
            meshType: MESH_TYPES.BOX,
            geometry: {
                width: PlayerSize,
                height: PlayerSize,
                depth: PlayerSize
            },
            materialData: {
                color: "0xffffff",
                textureData: {
                    textures: [
                        // "src/Textures/brickwall.jpg"
                        "src/Textures/side-1.jpg", //
                        "src/Textures/side-2.jpg",
                        "src/Textures/side-3.jpg",
                        "src/Textures/side-4.jpg",
                        "src/Textures/side-5.jpg",
                        "src/Textures/side-6.jpg"
                    ],
                    settings: {
                        type: MATERIAL_TYPES.LAMBERT
                    }
                }
            }
        },
        position: {
            x: 0,
            y: PlayerSize / 2,
            z: 0
        }
    });

    ActorMgr.registerActor(Player);
    Graphics.addActorToScene(Player);
    Player.setActiveStatus(true);
    applyController(Player, Controller, Graphics.getCamera());
    window.Player = Player;

    // * -----------------------------------
    // *    Create Ground
    // * -----------------------------------

    let groundSize = 20;

    // debugger;
    let Ground = ActorMgr.createMeshActor({
        actorType: MESH_ACTOR_TYPES.PRIMITIVE,
        meshData: {
            meshType: MESH_TYPES.PLANE,
            geometry: {
                width: groundSize,
                height: groundSize
            },
            materialData: {
                color: "0xffffff",
                textureData: {
                    texture: "src/Textures/brickwall.jpg",
                    settings: {
                        type: MATERIAL_TYPES.LAMBERT,
                        wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                        wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                        wrapUtimes: 4,
                        wrapVtimes: 4
                    }
                }
            }
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        rotation: {
            x: Math.PI / -2,
            y: 0,
            z: 0
        }
    });

    ActorMgr.registerActor(Ground);
    Graphics.addActorToScene(Ground);
    Ground.setActiveStatus(true);

    // * -----------------------------------
    // *    Create LIGHT
    // * -----------------------------------
    // debugger;
    let Light = ActorMgr.createLightActor({
        type: LIGHT_ACTOR_TYPES.DIRECTIONAL,
        color: 0xffffff,
        intensity: 1.5,
        position: {
            x: -10,
            y: 20,
            z: -20
        },
        target: {
            x: 0, y: 0, z: 0
        }
    });

    ActorMgr.registerActor(Light);
    Graphics.addActorToScene(Light);
    Light.setActiveStatus(true);

    // debugger;
    window.Light = Light;
    // debugger;
    Light.getActorObject().castShadow = true;
    Light.getActorObject().shadow.camera.near = 0;
    Light.getActorObject().shadow.camera.far = 100;
    Light.getActorObject().shadow.camera.left = -50;
    Light.getActorObject().shadow.camera.right = 50;
    Light.getActorObject().shadow.camera.top = 50;
    Light.getActorObject().shadow.camera.bottom = -50;
    // Light.getActorObject().shadow.bias = 0.0001;

    Light.getActorObject().shadow.camera.updateProjectionMatrix();

    Light.getActorObject().shadow.mapSize.width = 1024;
    Light.getActorObject().shadow.mapSize.height = 1024;


    Player.getActorObject().castShadow = true;
    Player.getActorObject().receiveShadow = true;
    Ground.getActorObject().receiveShadow = true;


}

export default createScene;
