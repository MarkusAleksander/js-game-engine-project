import EventMgr from './../EventSystem/EventManager.js';

const createScene = function createScene(Graphics, EntityMgr, Controller) {

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
                    position: { x: 0, y: 0, z: 0 }
                }
            }
        ]
    });

    EntityMgr.registerEntity(Player);

    EventMgr.addEventListener("die", function (e) {
        EntityMgr.deregisterEntity(e.getUID());
    });

}

export default createScene;
