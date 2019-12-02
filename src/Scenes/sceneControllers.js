import KEYCODES from '../Controller/KeyCodes.js';

const applyControllers = function applyControllers(actor, Controller) {
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

export default applyControllers;
