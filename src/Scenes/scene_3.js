import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES } from '../Actors/ActorTypes/ActorTypes.js';
import KEYCODES from '../Controller/KeyCodes.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr, Controller) {

    let actorSize = 2;

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
                        // "src/Textures/brickwall.jpg"
                        "src/Textures/side-1.jpg", //
                        "src/Textures/side-2.jpg",
                        "src/Textures/side-3.jpg",
                        "src/Textures/side-4.jpg",
                        "src/Textures/side-5.jpg",
                        "src/Textures/side-6.jpg"
                    ],
                    settings: {
                        type: MATERIAL_TYPES.BASIC
                    }
                }
            }
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    });

    window.actor = actor;

    ActorMgr.registerActor(actor);
    Graphics.addActorToScene(actor);
    actor.setActiveStatus(true);

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
        // * Forward
        actor.moveActorBy({ z: 1 }, 0.1);
    });
    Controller.registerInputEvent(KEYCODES.key_S, "keydown", function onKeyDown() {
        // * Backward
        actor.moveActorBy({ z: -1 }, 0.1);
    });
    Controller.registerInputEvent(KEYCODES.key_A, "keydown", function onKeyDown() {
        // * Rotate Left
        actor.rotateActorBy({ y: 1 }, 5);
    });
    Controller.registerInputEvent(KEYCODES.key_D, "keydown", function onKeyDown() {
        // * Rotate Right
        actor.rotateActorBy({ y: 1 }, -5);
    });

}

export default createScene;
