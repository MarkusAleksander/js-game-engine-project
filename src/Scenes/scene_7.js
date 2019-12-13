import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES, MATERIAL_REPEAT_TYPES, ACTOR_TYPES } from '../Globals/ActorTypes.js';
import applyController from './sceneControllers.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr, Controller) {

    // * -----------------------------------
    // *    Create player actor
    // * -----------------------------------
    let Player = ActorMgr.createActor({
        type: ACTOR_TYPES.GLTF,
        settings: {
            asset: "assets/solus_the_knight/scene.gltf",
            scale: 0.01,
            castShadow: true,
            receiveShadow: true,
            animationSpeed: 0.33,
            animationAliases: {
                idle: "Solus_Rig|anim_idle",
                walk: "Solus_Rig|anim_walk_in_place"
            },
            onload: () => {
                ActorMgr.registerActor(Player);
                Graphics.addActorToScene(Player);
                Player.setActiveStatus(true);
                window.Player = Player;
            }
        }
    });

    applyController(Player, Controller, Graphics.getCamera());
    // * Position Camera

    Graphics.getCamera().moveCameraTo({ x: -5, y: 5, z: 5 });
    Graphics.getCamera().setCameraTargetTo({ x: 0, y: 0, z: 0 });


    // * -----------------------------------
    // *    Create Size Cube
    // * -----------------------------------
    let SizeCube = ActorMgr.createActor({
        type: ACTOR_TYPES.MESH,
        settings: {
            meshType: MESH_ACTOR_TYPES.PRIMITIVE,
            geometry: {
                type: MESH_TYPES.BOX,
                data: {
                    width: 1,
                    height: 1,
                    depth: 1
                }
            },
            material: {
                color: 0xffffff,
                textures: [
                    "src/Textures/side-1.jpg",
                    "src/Textures/side-2.jpg",
                    "src/Textures/side-3.jpg",
                    "src/Textures/side-4.jpg",
                    "src/Textures/side-5.jpg",
                    "src/Textures/side-6.jpg"
                ],
                textureTypes: {
                    type: MATERIAL_TYPES.LAMBERT
                }
            },
            sceneData: {
                position: {
                    x: 0,
                    y: 0.5,
                    z: 0
                }
            }
        }
    });

    ActorMgr.registerActor(SizeCube);
    Graphics.addActorToScene(SizeCube);
    SizeCube.setActiveStatus(true);

    // * -----------------------------------
    // *    Create Room
    // * -----------------------------------

    let RoomSize = 20,
        RoomHeight = 3;

    // debugger;
    let Room = ActorMgr.createActor({
        type: ACTOR_TYPES.MESH,
        settings: {
            meshType: MESH_ACTOR_TYPES.PRIMITIVE,
            geometry: {
                type: MESH_TYPES.BOX,
                data: {
                    width: RoomSize,
                    height: RoomHeight,
                    depth: RoomSize
                }
            },
            material: {
                color: 0xffffff,
                textures: "src/Textures/brickwall.jpg",
                textureTypes: [{
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 6,
                    wrapVtimes: 1,
                    side: MATERIAL_FACE_TYPES.BACK
                }, {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 6,
                    wrapVtimes: 1,
                    side: MATERIAL_FACE_TYPES.BACK
                }, {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 4,
                    wrapVtimes: 4,
                    side: MATERIAL_FACE_TYPES.BACK
                }, {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 4,
                    wrapVtimes: 4,
                    side: MATERIAL_FACE_TYPES.BACK
                }, {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 6,
                    wrapVtimes: 1,
                    side: MATERIAL_FACE_TYPES.BACK
                }, {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 6,
                    wrapVtimes: 1,
                    side: MATERIAL_FACE_TYPES.BACK
                }]
            },
            sceneData: {
                position: {
                    x: 0,
                    y: RoomHeight / 2,
                    z: 0
                }
            }
        }
    });

    ActorMgr.registerActor(Room);
    Graphics.addActorToScene(Room);
    Room.setActiveStatus(true);

    // * -----------------------------------
    // *    Create LIGHT
    // * -----------------------------------
    let Light = ActorMgr.createLightActor({
        type: ACTOR_TYPES.LIGHT,
        settings: {
            lightType: LIGHT_ACTOR_TYPES.DIRECTIONAL,
            color: 0xffffff,
            intensity: 2.5,
            sceneData: {
                position: {
                    x: -30,
                    y: 30,
                    z: 30
                },
                target: {
                    x: 0, y: 0, z: 0
                }
            }
        }
    });

    let ambientLight = ActorMgr.createLightActor({
        type: ACTOR_TYPES.LIGHT,
        settings: {
            lightType: LIGHT_ACTOR_TYPES.AMBIENT,
            color: 0xffffff,
            intensity: 0.3
        }
    });

    ActorMgr.registerActor(ambientLight);
    Graphics.addActorToScene(ambientLight);
    ambientLight.setActiveStatus(true);

    ActorMgr.registerActor(Light);
    Graphics.addActorToScene(Light);
    Light.setActiveStatus(true);


    window.Light = Light;
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


    Room.getActorObject().receiveShadow = true;

    Graphics.getScene().add(new THREE.AxesHelper(10));

}

export default createScene;
