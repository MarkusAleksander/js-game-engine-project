import KEYCODES from '../Controller/KeyCodes.js';

const applyControllers = function applyControllers(actor, Controller, camera) {
    // * Controller setup

    // * Move Actor
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

    let lockTarget = true;

    let minPolarAngle = 0;
    let maxPolarAngle = Math.PI;

    // * Move Camera
    Controller.registerInputEvent(KEYCODES.key_RIGHT, "keydown", function onKeyDown() {
        camera.moveCameraBy({ x: 1 }, 0.1);
        if (lockTarget) {
            camera.setCameraTargetTo({ x: 0, y: 0, z: 0 });
        }
    });
    Controller.registerInputEvent(KEYCODES.key_LEFT, "keydown", function onKeyDown() {
        camera.moveCameraBy({ x: 1 }, -0.1);
        if (lockTarget) {
            camera.setCameraTargetTo({ x: 0, y: 0, z: 0 });
        }
    });
    Controller.registerInputEvent(KEYCODES.key_UP, "keydown", function onKeyDown() {
        camera.moveCameraBy({ y: 1 }, 0.1);
        if (lockTarget) {
            camera.setCameraTargetTo({ x: 0, y: 0, z: 0 });
        }
    });
    Controller.registerInputEvent(KEYCODES.key_DOWN, "keydown", function onKeyDown() {
        camera.moveCameraBy({ y: 1 }, -0.1);
        if (lockTarget) {
            camera.setCameraTargetTo({ x: 0, y: 0, z: 0 });
        }
    });

}

export default applyControllers;
