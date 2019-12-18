import EventMgr from './../EventSystem/EventManager.js';
import Utilities from './../Globals/Utilities.js';

const createScene = function createScene(Graphics, EntityMgr, Controller) {
    // debugger;
    let Player = EntityMgr.createEntity({
        components: [
            {
                name: "Health",
                data: {
                    value: 500
                }
            },
            {
                name: "Translation",
                data: {
                    position: Utilities.Vector3({ x: -1, y: 0, z: 0 }),
                    rotation: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
                }
            },
            {
                name: "Render",
                data: {
                    type: "load",
                    src: 'assets/solus_the_knight/scene.gltf',
                    scale: 0.01,
                    castShadow: true,
                    receiveShadow: true
                }
            },
            {
                name: "Animation",
                data: {
                    animationSpeed: 0.33,
                    animationAliases: new Map([
                        ["idle", "Solus_Rig|anim_idle"],
                        ["walk", "Solus_Rig|anim_walk_in_place"]
                    ])
                }
            }
        ]
    });

    window.Player = Player;

    EntityMgr.registerEntity(Player);

    EventMgr.addEventListener("die", function onDie(e) {
        EntityMgr.deregisterEntity(e.getUID());
    });


    Graphics.getCamera().moveCameraTo({ x: -5, y: 5, z: 5 });
    Graphics.getCamera().setCameraTargetTo({ x: 0, y: 0, z: 0 });
    Graphics.getScene().add(new THREE.AxesHelper(10));

    window.Graphics = Graphics;
}

export default createScene;
