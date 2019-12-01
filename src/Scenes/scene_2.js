import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES } from '../Actors/ActorTypes/ActorTypes.js';
import KEYCODES from './../Controller/KeyCodes.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr, Controller) {

    let ActorGridSize = 3,
        actorSize = 2,
        actorOffset = 1

    for (let i = 0; i < ActorGridSize; i++) {
        for (let j = 0; j < ActorGridSize; j++) {
            for (let k = 0; k < ActorGridSize; k++) {
                let actor = ActorMgr.createMeshActor({
                    actorType: MESH_ACTOR_TYPES.PRIMITIVE,
                    meshData: {
                        meshType: MESH_TYPES.BOX,
                        geometry: {
                            width: actorSize,
                            height: actorSize,
                            depth: actorSize
                        },
                        materialData: {
                            color: "0xffffff",
                            textureData: {
                                textures: [
                                    "src/Textures/brickwall.jpg"
                                ],
                                settings: {
                                    type: MATERIAL_TYPES.LAMBERT
                                }
                            }
                        }
                    },
                    position: {
                        x: k * (actorSize + actorOffset) - ActorGridSize,
                        y: j * (actorSize + actorOffset) - ActorGridSize,
                        z: i * (actorSize + actorOffset) - ActorGridSize
                    }
                });

                let x = Math.random() * 0.05 - 0.025,
                    y = Math.random() * 0.05 - 0.025,
                    z = Math.random() * 0.05 - 0.025

                actor.addUpdateFunction(function () {
                    this.rotateActorBy({
                        x: x,
                        y: y,
                        z: z
                    })
                });

                ActorMgr.registerActor(actor);
                Graphics.addActorToScene(actor);
                actor.setActiveStatus(true);
            }
        }
    }

    let light = ActorMgr.createLightActor({
        type: LIGHT_ACTOR_TYPES.AMBIENT,
        color: 0xaaaaaa,
        intensity: 2
    });

    ActorMgr.registerActor(light);
    Graphics.addActorToScene(light);
    light.setActiveStatus(true);

    // * Controller setup
    Controller.registerInputEvent(KEYCODES.key_W, "keydown", function onKeyDown() {
        console.log("W Key is down!");
    });
    Controller.registerInputEvent(KEYCODES.key_S, "keydown", function onKeyDown() {
        console.log("S Key is down!");
    });
    Controller.registerInputEvent(KEYCODES.key_A, "keydown", function onKeyDown() {
        console.log("A Key is down!");
    });
    Controller.registerInputEvent(KEYCODES.key_D, "keydown", function onKeyDown() {
        console.log("D Key is down!");
    });

}

export default createScene;
