import EventManager from "./../EventSystem/EventManager.js";
import Utilities from "./../Globals/Utilities.js";
import { KEYCODES, INPUT_MODES } from "../Globals/KeyCodes.js";

const createScene = function createScene(Graphics, EntityMgr, Controller) {
    // debugger;
    let Player = EntityMgr.createEntity({
        components: [
            {
                name: "Base",
                data: {
                    onActivated: function() {
                        if (this.isActive) {
                            EventManager.dispatchEvent(
                                "add_renderable",
                                Player.getComponent("Render").renderable
                            );
                        }
                    },
                    onDeactivated: function() {
                        Graphics.removeRenderableFromScene(
                            Player.getComponent("Render").renderable
                        );
                    },
                },
            },
            {
                name: "Health",
                data: {
                    value: 500,
                },
            },
            {
                name: "Translation",
                data: {
                    position: Utilities.Vector3({ x: -1, y: 0, z: 0 }),
                    rotation: new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        Math.PI
                    ),
                },
            },
            {
                name: "Velocity",
                data: {
                    positionVelocity: new Map([
                        [
                            "direction",
                            Utilities.Vector3({
                                x: 0,
                                y: 0,
                                z: -1,
                            }),
                        ],
                        ["distance", 0],
                    ]),
                },
            },
            {
                name: "Render",
                data: {
                    type: "load",
                    src: "assets/solus_the_knight/scene.gltf",
                    scale: 0.01,
                    castShadow: true,
                    receiveShadow: true,
                },
            },
            {
                name: "Animation",
                data: {
                    animationSpeed: 0.33,
                    animationAliases: new Map([
                        ["idle", "Solus_Rig|anim_idle"],
                        ["walk", "Solus_Rig|anim_walk_in_place"],
                    ]),
                },
            },
            {
                name: "Control",
                data: {
                    controls: new Map([
                        [
                            KEYCODES.key_W,
                            [
                                "keydown",
                                function() {
                                    // * Forward
                                    let velocity = Player.getComponent(
                                        "Velocity"
                                    );
                                    if (!velocity) return;
                                    velocity.directionalVelocity = new Map([
                                        [
                                            "direction",
                                            Utilities.Vector3({
                                                x: 0,
                                                y: 0,
                                                z: -1,
                                            }),
                                        ],
                                        ["distance", 0.0245],
                                    ]);
                                },
                            ],
                        ],
                        [
                            KEYCODES.key_S,
                            [
                                "keydown",
                                function() {
                                    // * Forward
                                    let velocity = Player.getComponent(
                                        "Velocity"
                                    );
                                    if (!velocity) return;
                                    velocity.directionalVelocity = new Map([
                                        [
                                            "direction",
                                            Utilities.Vector3({
                                                x: 0,
                                                y: 0,
                                                z: 1,
                                            }),
                                        ],
                                        ["distance", 0.0245],
                                    ]);
                                },
                            ],
                        ],
                        [
                            KEYCODES.key_A,
                            [
                                "keydown",
                                function() {
                                    let velocity = Player.getComponent(
                                        "Velocity"
                                    );
                                    if (!velocity) return;
                                    velocity.rotationalVelocity = new Map([
                                        [
                                            "rotationVector",
                                            Utilities.Vector3({
                                                x: 0,
                                                y: 1,
                                                z: 0,
                                            }),
                                        ],
                                        ["degree", 2],
                                    ]);
                                },
                            ],
                        ],
                        [
                            KEYCODES.key_D,
                            [
                                "keydown",
                                function() {
                                    let velocity = Player.getComponent(
                                        "Velocity"
                                    );
                                    if (!velocity) return;
                                    velocity.rotationalVelocity = new Map([
                                        [
                                            "rotationVector",
                                            Utilities.Vector3({
                                                x: 0,
                                                y: 1,
                                                z: 0,
                                            }),
                                        ],
                                        ["degree", -2],
                                    ]);
                                },
                            ],
                        ],
                    ]),
                },
            },
        ],
    });

    window.Player = Player;

    EntityMgr.registerEntity(Player);
    EntityMgr.activateEntity(Player.getUID());

    EventManager.addEventListener("die", function onDie(e) {
        EntityMgr.deregisterEntity(e.getUID());
    });

    Graphics.getCamera().moveCameraTo({ x: -5, y: 5, z: 5 });
    Graphics.getCamera().setCameraTargetTo({ x: 0, y: 0, z: 0 });
    Graphics.getScene().add(new THREE.AxesHelper(10));

    window.Graphics = Graphics;
};

export default createScene;
