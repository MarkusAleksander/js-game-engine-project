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
                        "src/Textures/brickwall.jpg"
                    ],
                    settings: {
                        type: MATERIAL_TYPES.LAMBERT
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
        actor.moveActorBy({ z: -0.05 });
    });
    Controller.registerInputEvent(KEYCODES.key_S, "keydown", function onKeyDown() {
        // * Backward
        actor.moveActorBy({ z: 0.05 });
    });
    Controller.registerInputEvent(KEYCODES.key_A, "keydown", function onKeyDown() {
        // * Rotate Left
        actor.rotateActorBy({ y: 0.05 });
    });
    Controller.registerInputEvent(KEYCODES.key_D, "keydown", function onKeyDown() {
        // * Rotate Right
        actor.rotateActorBy({ y: -0.05 });
    });

}

export default createScene;
