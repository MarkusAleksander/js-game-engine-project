import ActorPrototype from './ActorTypes/ActorPrototype.js';
import LightActor from './ActorTypes/LightActor.js';
import { ACTOR_TYPES, MESH_ACTOR_TYPES, MESH_TYPES, MESH_TEMPLATES, LIGHT_ACTOR_TYPES } from './ActorTypes/ActorTypes.js';
import Utilities from '../Globals/Utilities.js';

// * -----------------------------------
// *    ACTOR FACTORY
// * -----------------------------------
const ActorFactory = function ActorFactory() {

    // * -----------------------------------
    // *    ACTOR FACTORY PROPERTIES
    // * -----------------------------------

    // * Current Actor Unique ID
    this.cAuID = 1;


    // * -----------------------------------
    // *    ACTOR FACTORY METHODS
    // * -----------------------------------

    // * Create Actor
    this.createActor = function createActor(settings, actorType) {

        let newActor = null;

        // * Switch to Actor building path
        switch (actorType) {
        case ACTOR_TYPES.MESH:
            newActor = this.createMeshActor(settings);
            break;
        case ACTOR_TYPES.LIGHT:
            newActor = this.createLightActor(settings);
            break;
        default:
            return null;
        }

        if (!newActor) {
            Utilities.outputDebug("Failed to create actor: ", settings);
            return null;
        }

        return newActor;
    }

    this.createMeshActor = function createMeshActor(settings) {

        // * Check compatible settings
        let isValidSettings = this.isValidActorSettings(settings);

        // * Do not continue if not valid object
        if (!isValidSettings) {
            // * Throw error
            return null;
        }

        // * Create Actor
        const actor = new ActorPrototype(settings);

        let actorMesh = null;

        // * Build Mesh
        if (settings.actorType === MESH_ACTOR_TYPES.PRIMITIVE) {
            actorMesh = this.buildPrimitiveMesh(settings.meshData);
        }
        if (settings.actorType === MESH_ACTOR_TYPES.CUSTOM) {
            actorMesh = this.buildCustomMesh(settings.meshData);
        }

        // * Assign mesh to Actor object
        actor.setActorObject(actorMesh);

        // * Set sceneData (location, position)
        if (
            settings.sceneData !== undefined &&
            settings.sceneData !== null &&
            typeof settings.sceneData === "object" &&
            !Array.isArray(settings.sceneData) &&
            Object.keys(settings.sceneData).length > 0
        ) {
            this.setSceneDataForActor(actor, settings.sceneData);
        }

        // * Assign an ID when complete
        actor.uID = this.cAuID++;

        return actor;
    }

    this.createLightActor = function createLightActor(settings) {
        // TODO - Improve construction - note - color is different for hemi
        const light = new LightActor({
            id: this.cAuID++,
            color: settings.color,
            intensity: settings.intensity,
            position: settings.position,
            target: settings.target
        });

        let lightObj = null;

        switch (settings.type) {
        case LIGHT_ACTOR_TYPES.DIRECTIONAL:
            lightObj = new THREE.DirectionalLight(light.getColor(), light.getIntensity());
            break;
        case LIGHT_ACTOR_TYPES.AMBIENT:
            lightObj = new THREE.AmbientLight(light.getColor(), light.getIntensity());
            break;
        case LIGHT_ACTOR_TYPES.HEMISPHERE:
            lightObj = new THREE.HemisphereLight(settings.skyColor, settings.groundColor, light.getIntensity);
            break;
        default:
            break;
        }
        light.setActorObject(lightObj);

        return light;
    }

    // * Check if Actor settings meet the standard baseline for required data
    this.isValidActorSettings = function isValidActorSettings(meshData) {
        let isValidObject = false;

        // * Check settings is a valid object and that it's not empty
        if (
            meshData === undefined ||
            meshData === null ||
            typeof meshData !== "object" ||
            Array.isArray(meshData) ||
            Object.keys(meshData).length === 0
        ) {
            return isValidObject;
        }

        // * Check we have a actor type to work with
        if (
            !meshData.actorType ||
            meshData.actorType !== MESH_ACTOR_TYPES.PRIMITIVE &&
            meshData.actorType !== MESH_ACTOR_TYPES.CUSTOM
        ) {
            return isValidObject;
        }

        // * Check we have mesh data to work with
        if (
            !meshData.meshData ||
            typeof meshData.meshData !== "object" ||
            Array.isArray(meshData.meshData) ||
            Object.keys(meshData.meshData).length === 0
        ) {
            return isValidObject;
        }

        // * Check we have the appropriate geometry and mesh type in the data
        if (
            !meshData.meshData.meshType ||
            typeof meshData.meshData.meshType !== "string" ||
            (!meshData.meshData.meshType ||
                typeof meshData.meshData.geometry !== "object" ||
                Array.isArray(meshData.meshData.geometry) ||
                Object.keys(meshData.meshData.geometry).length === 0)
        ) {
            return isValidObject;
        }

        // * All checks passed
        isValidObject = true;

        return isValidObject;
    }

    // * Build Primitive Mesh
    this.buildPrimitiveMesh = function buildPrimitiveMesh(meshData) {
        let geometry = this.createGeometry(meshData.meshType, Object.assign(MESH_TEMPLATES.BOX, meshData.geometry)),
            material = this.createMaterial(meshData.material);

        // TODO - Better Material handling
        //debugger;

        return new THREE.Mesh(geometry, material);

    }

    // * Build custom mesh
    this.buildCustomMesh = function buildCustomMesh(settings) {
        // TODO
    }

    // * Control point for Creating Primitive Geometry
    this.createGeometry = function createGeometry(meshType, data) {

        let geometry;

        switch (meshType) {
        case MESH_TYPES.BOX:
        {
            geometry = this.createBoxGeometry(data);
            break;
        }
        default:
        }

        return geometry;
    }

    // * Create Box Geometry
    this.createBoxGeometry = function createBoxGeometry(data) {
        return new THREE.BoxBufferGeometry(
            data.width.x,
            data.height.y,
            data.depth.z,
            data.widthSegments,
            data.heightSegments,
            data.depthSegments
        );
    }

    // * Create Material
    this.createMaterial = function createMaterial(data) {
        let materialColor = data !== undefined ? data : { color: 0x000000 };

        const material = new THREE.MeshStandardMaterial({
            color: materialColor.color
        });

        return material;
    }

    this.setSceneDataForActor = function setSceneDataForActor(actor, sceneData) {
        // TODO - Improve this - needs to update by Actor Method, not direct on the mesh
        if (sceneData.position) {
            actor.moveActorTo({
                x: sceneData.position.x || 0,
                y: sceneData.position.y || 0,
                z: sceneData.position.z || 0
            });
        }
        if (sceneData.rotation) {
            actor.rotateActorTo({
                x: sceneData.rotation.x || 0,
                y: sceneData.rotation.y || 0,
                z: sceneData.rotation.z || 0
            });
        }
    }

    // * Set Initial Position
    // TODO - Required?
    this.setInitialPosition = function setInitialPosition(data, actor) {
        actor.position.x = data.x !== undefined ? data.x : 0;
        actor.position.y = data.y !== undefined ? data.y : 0;
        actor.position.z = data.z !== undefined ? data.z : 0
    }

    // * Set Initial Rotation
    // TODO - Required?
    this.setInitialRotation = function setInitialRotation(data, actor) {
        // TODO
    }

}

export default ActorFactory;
