import { MESH_ACTOR_TYPES, MESH_TYPES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES } from '../Actors/ActorTypes/ActorTypes.js';

// * -----------------------------------
// *    SCENE CREATION
// * -----------------------------------
const createScene = function createScene(Graphics, ActorMgr) {
    /*
    *   Actor Creation Process
    *   1. Create actor using ActorMgr.createActor
    *   2. Register Actor with ActorMgr (returns ID)
    *   3. Optional - Set Active Status
    *   4. Optional - Set update function
    *   5. Add Actor to scene
    */


    // * Create Player Actor
    let Player = ActorMgr.createMeshActor({
        actorType: MESH_ACTOR_TYPES.PRIMITIVE,
        meshData: {
            meshType: MESH_TYPES.BOX,
            geometry: {
                width: 3,
                height: 3,
                depth: 3,
                widthSegments: 2,
                heightSegments: 2,
                depthSegments: 2
            },
            materialData: {
                color: "0xffffff",
                // TODO - specify sides?
                textureData: {
                    textures: [
                        "src/Textures/side-1.jpg", // * x +
                        "src/Textures/side-2.jpg", // * x -
                        "src/Textures/side-3.jpg" // * y +
                        // "src/Textures/side-4.jpg", // * y -
                        // "src/Textures/side-5.jpg" // * z +
                        // "src/Textures/side-6.jpg" // * z -
                    ],
                    settings: [{
                        type: MATERIAL_TYPES.NONE
                    }, {
                        type: MATERIAL_TYPES.BASIC,
                        side: MATERIAL_FACE_TYPES.BACK
                    }]
                    // settings: [{
                    //     type: MATERIAL_TYPES.LAMBERT,
                    //     side: MATERIAL_FACE_TYPES.FRONT
                    // }, {
                    //     type: MATERIAL_TYPES.BASIC,
                    //     wireframe: true,
                    // }, {
                    //     type: MATERIAL_TYPES.PHONG,
                    //     shininess: 130
                    // }, {
                    //     type: MATERIAL_TYPES.LAMBERT,
                    //     side: MATERIAL_FACE_TYPES.FRONT
                    // }, {
                    //     type: MATERIAL_TYPES.NORMAL
                    // }, {
                    //     type: MATERIAL_TYPES.PHONG,
                    //     side: MATERIAL_FACE_TYPES.BACK,
                    //     emissive: 0xff0000
                    // }]
                }
                // bumpMapData: {
                //     bumpMaps: ["src/Textures/brickwall.jpg"]
                // }
            }
        },
        position: {
            x: 0, y: 0, z: 5
        }
    });

    // * Register created actor
    ActorMgr.registerActor(Player);

    // * Add some updates to the actor
    Player.addUpdateFunction(function () {
        // this.rotateActorBy({ x: 0.01, y: 0.01, z: -0.01 });
        this.rotateActorBy({ y: 0.01 })
    });

    Player.addUpdateFunction(function () {
        // this.moveActorBy({ x: 0.05 });
        // if (this.getPosition().x > 5) {
        //     this.moveActorTo({ x: -5 });
        // }
    });

    Player.addUpdateFunction(function () {
        // debugger;
        // let newColor = "0x" + (parseInt(this.getMaterialColor(), 16) + 1).toString(16);

        // this.updateMaterialColor(newColor);
    });

    // * Add Actor to Scene
    Graphics.addActorToScene(Player);

    // * Set Player to be Active
    Player.setActiveStatus(true);

    // * Actor Removal process
    // Player.setActiveStatus(false);
    // Graphics.removeActorFromScene(Player);
    // ActorMgr.deregisterActor(Player.getID());


    // * Create a light
    let directionalLight = ActorMgr.createLightActor({
        type: LIGHT_ACTOR_TYPES.DIRECTIONAL,
        position: { x: -10, y: 10, z: 10 },
        intensity: 2.0,
        color: 0xf8f8f8
    });

    let ambientLight = ActorMgr.createLightActor({
        type: LIGHT_ACTOR_TYPES.AMBIENT,
        color: 0xaaaaaa,
        intensity: 1
    })

    // debugger;
    // * Register Light
    ActorMgr.registerActor(directionalLight);
    ActorMgr.registerActor(ambientLight);

    // Light.addUpdateFunction(function () {
    //     this.moveLightBy({ x: 0.1 });
    //     if (this.getPosition().x > 10) {
    //         this.moveLightTo({ x: -10 });
    //     }
    // });

    // * Add light to Scene
    Graphics.addActorToScene(directionalLight);
    Graphics.addActorToScene(ambientLight);

    // * Set light to active (switch it on)
    directionalLight.setActiveStatus(true);
    ambientLight.setActiveStatus(true);


    // Graphics.addLightToScene(ambientLight);

    // let hemisphereLight = Graphics.createLight({
    //     type: LIGHT_TYPES.HEMISPHERE,
    //     intensity: 1,
    //     skyColor: 0xffffff,
    //     groundColor: 0xffffff
    // })

    // Graphics.registerLight(hemisphereLight);
    // Graphics.addLightToScene(hemisphereLight);
    // hemisphereLight.setActiveStatus(true);

    // * Removal process
    // Light.setActiveStatus(false);
    // Graphics.removeLightFromScene(Light);
    // Graphics.deregisterLight(Light.getID());
}

export default createScene;
