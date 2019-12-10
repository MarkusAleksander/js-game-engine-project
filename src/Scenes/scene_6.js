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
            scale: 0.05,
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

    Graphics.getCamera().moveCameraTo({ x: -15, y: 15, z: 15 });
    Graphics.getCamera().setCameraTargetTo({ x: 0, y: 0, z: 0 });

    // * -----------------------------------
    // *    Create Ground
    // * -----------------------------------

    let groundSize = 20;

    let Ground = ActorMgr.createActor({
        type: ACTOR_TYPES.MESH,
        settings: {
            meshType: MESH_ACTOR_TYPES.PRIMITIVE,
            geometry: {
                type: MESH_TYPES.PLANE,
                data: {
                    width: groundSize,
                    height: groundSize
                }
            },
            material: {
                color: 0xffffff,
                textures: "src/Textures/brickwall.jpg",
                textureTypes: {
                    type: MATERIAL_TYPES.LAMBERT,
                    wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                    wrapUtimes: 4,
                    wrapVtimes: 4
                }
            },
            transformation: {
                rotation: {
                    x: Math.PI / -2,
                    y: 0,
                    z: 0
                }
            },
            sceneData: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        }
    });

    ActorMgr.registerActor(Ground);
    Graphics.addActorToScene(Ground);
    Ground.setActiveStatus(true);

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


    Ground.getActorObject().receiveShadow = true;

    Graphics.getScene().add(new THREE.AxesHelper(10));

}

export default createScene;
