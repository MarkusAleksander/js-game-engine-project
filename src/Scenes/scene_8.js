import EventManager from "./../EventSystem/EventManager.js";
import Utilities from "./../Globals/Utilities.js";
import { KEYCODES, INPUT_MODES } from "../Globals/KeyCodes.js";
import {
    MESH_TYPES,
    MATERIAL_TYPES,
    MATERIAL_REPEAT_TYPES,
    LIGHT_ACTOR_TYPES,
} from "../Globals/ActorTypes.js";

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
                                                z: 1,
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
                                                z: -1,
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
            {
                name: "Physics",
                data: {},
            },
        ],
    });

    let Ground = EntityMgr.createEntity({
        components: [
            {
                name: "Base",
                data: {
                    onActivated: function() {
                        if (this.isActive) {
                            EventManager.dispatchEvent(
                                "add_renderable",
                                Ground.getComponent("Render").renderable
                            );
                        }
                    },
                    onDeactivated: function() {
                        Graphics.removeRenderableFromScene(
                            Ground.getComponent("Render").renderable
                        );
                    },
                },
            },
            {
                name: "Translation",
                data: {
                    position: Utilities.Vector3({ x: 0, y: 0, z: 0 }),
                    rotation: new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(-1, 0, 0),
                        Math.PI / 2
                    ),
                },
            },
            {
                name: "Render",
                data: {
                    type: "simple",
                    scale: 1,
                    castShadow: false,
                    receiveShadow: true,
                    geometry: {
                        type: MESH_TYPES.PLANE,
                        data: {
                            width: 20,
                            height: 20,
                        },
                    },
                    material: {
                        color: 0xffffff,
                        textures: "src/Textures/brickwall.jpg",
                        textureTypes: {
                            type: MATERIAL_TYPES.LAMBERT,
                            wrapU: MATERIAL_REPEAT_TYPES.REPEAT,
                            wrapV: MATERIAL_REPEAT_TYPES.REPEAT,
                            wrapUtimes: 4,
                            wrapVtimes: 4,
                        },
                    },
                },
            },
        ],
    });

    let Light = EntityMgr.createEntity({
        components: [
            {
                name: "Base",
                data: {
                    onActivated: function() {
                        if (this.isActive) {
                            EventManager.dispatchEvent(
                                "add_renderable",
                                Light.getComponent("Render").renderable
                            );
                        }
                    },
                    onDeactivated: function() {
                        Graphics.removeRenderableFromScene(
                            Light.getComponent("Render").renderable
                        );
                    },
                },
            },
            {
                name: "Translation",
                data: {
                    position: Utilities.Vector3({ x: 2, y: 2, z: 0 }),
                },
            },
            {
                name: "Render",
                data: {
                    type: "light",
                    scale: 1,
                    castShadow: true,
                    receiveShadow: false,
                    light: {
                        type: LIGHT_ACTOR_TYPES.DIRECTIONAL,
                        data: {
                            color: 0xffcccc,
                            intensity: 1,
                            target: { x: 0, y: 0, z: 0 },
                        },
                    },
                },
            },
        ],
    });

    let AmbientLight = EntityMgr.createEntity({
        components: [
            {
                name: "Base",
                data: {
                    onActivated: function() {
                        if (this.isActive) {
                            EventManager.dispatchEvent(
                                "add_renderable",
                                AmbientLight.getComponent("Render").renderable
                            );
                        }
                    },
                    onDeactivated: function() {
                        Graphics.removeRenderableFromScene(
                            AmbientLight.getComponent("Render").renderable
                        );
                    },
                },
            },
            {
                name: "Render",
                data: {
                    type: "light",
                    scale: 1,
                    castShadow: true,
                    receiveShadow: false,
                    light: {
                        type: LIGHT_ACTOR_TYPES.AMBIENT,
                        data: {
                            color: 0xffaabb,
                            intensity: 0.9,
                        },
                    },
                },
            },
        ],
    });

    window.Player = Player;
    window.Ground = Ground;
    window.Light = AmbientLight;

    EntityMgr.registerEntity(Player);
    EntityMgr.activateEntity(Player.getUID());

    EntityMgr.registerEntity(Ground);
    EntityMgr.activateEntity(Ground.getUID());

    EntityMgr.registerEntity(Light);
    EntityMgr.activateEntity(Light.getUID());

    EntityMgr.registerEntity(AmbientLight);
    EntityMgr.activateEntity(AmbientLight.getUID());

    EventManager.addEventListener("die", function onDie(e) {
        EntityMgr.deregisterEntity(e.getUID());
    });

    Graphics.getCamera().moveCameraTo({ x: -5, y: 5, z: 5 });
    Graphics.getCamera().setCameraTargetTo({ x: 0, y: 0, z: 0 });
    Graphics.getScene().add(new THREE.AxesHelper(10));

    window.Graphics = Graphics;
};

export default createScene;
