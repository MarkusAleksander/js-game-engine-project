import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES, MATERIAL_REPEAT_TYPES, ACTOR_TYPES } from '../Globals/ActorTypes.js';
import applyController from './sceneControllers.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr, Controller) {
    // * -----------------------------------
    // *    Create player actor
    // * -----------------------------------
    let PlayerSize = 2;

    let Player = ActorMgr.createActor(
        {
            type: ACTOR_TYPES.MESH,
            settings: {
                meshType: MESH_ACTOR_TYPES.PRIMITIVE,
                geometry: {
                    type: MESH_TYPES.BOX,
                    data: {
                        width: PlayerSize,
                        height: PlayerSize,
                        depth: PlayerSize,
                        widthSegments: 25,
                        heightSegments: 25
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
                transformation: {
                    position: new THREE.Vector3(0, 0, 0)
                },
                sceneData: {
                    position: new THREE.Vector3(0, PlayerSize / 2, 0)
                }
            },
            children: [
                {
                    type: ACTOR_TYPES.MESH,
                    settings: {
                        meshType: MESH_ACTOR_TYPES.PRIMITIVE,
                        geometry: {
                            type: MESH_TYPES.SPHERE,
                            data: {
                                radius: PlayerSize / 2
                            }
                        },
                        material: {
                            color: 0xffffff
                        },
                        transformation: {
                            position: new THREE.Vector3(0, PlayerSize * 2, 0)
                        },
                        updates: [
                            function () {
                                this.rotation.z += 0.05;
                            }
                        ]
                    },
                    children: [
                        {
                            type: ACTOR_TYPES.MESH,
                            settings: {
                                meshType: MESH_ACTOR_TYPES.PRIMITIVE,
                                geometry: {
                                    type: MESH_TYPES.SPHERE,
                                    data: {
                                        radius: PlayerSize / 2
                                    }
                                },
                                material: {
                                    color: 0xffffff
                                },
                                transformation: {
                                    position: new THREE.Vector3(0, PlayerSize * 2, 0)
                                }
                            }
                        }
                    ]
                },
                {
                    type: ACTOR_TYPES.MESH,
                    settings: {
                        meshType: MESH_ACTOR_TYPES.PRIMITIVE,
                        geometry: {
                            type: MESH_TYPES.SPHERE,
                            data: {
                                radius: PlayerSize / 2
                            }
                        },
                        material: {
                            color: 0xffffff
                        },
                        transformation: {
                            position: new THREE.Vector3(0, PlayerSize * 2, 0)
                        },
                        updates: [
                            function () {
                                this.rotation.z -= 0.05;
                            }
                        ]
                    },
                    children: [
                        {
                            type: ACTOR_TYPES.MESH,
                            settings: {
                                meshType: MESH_ACTOR_TYPES.PRIMITIVE,
                                geometry: {
                                    type: MESH_TYPES.SPHERE,
                                    data: {
                                        radius: PlayerSize / 2
                                    }
                                },
                                material: {
                                    color: 0xffffff
                                },
                                transformation: {
                                    position: new THREE.Vector3(0, PlayerSize * 2, 0)
                                }
                            }
                        }
                    ]
                }
            ]
        }
    );

    // TODO - Add actor as child of actor

    ActorMgr.registerActor(Player);
    Graphics.addActorToScene(Player);
    Player.setActiveStatus(true);
    applyController(Player, Controller, Graphics.getCamera());
    window.Player = Player;

    // * Position Camera
    Graphics.getCamera().moveCameraTo({ x: -15, y: 15, z: 15 });
    Graphics.getCamera().setCameraTargetTo(Player.getPosition());

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
            intensity: 1.5,
            sceneData: {
                position: {
                    x: -10,
                    y: 20,
                    z: -20
                },
                target: {
                    x: 0, y: 0, z: 0
                }
            }
        }
    });

    ActorMgr.registerActor(Light);
    Graphics.addActorToScene(Light);
    Light.setActiveStatus(true);

    Light.addUpdateFunction(function () {
        // this.moveActorBy({ x: 1, y: 0, z: 0 }, 0.1);
        // this.rotateActorBy({ x: 0, y: 0, z: 1 }, -0.5);
    });

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


    Player.getActorObject().castShadow = true;
    Player.getActorObject().receiveShadow = true;
    Ground.getActorObject().receiveShadow = true;

    Graphics.getScene().add(new THREE.AxesHelper(10));

}

export default createScene;
