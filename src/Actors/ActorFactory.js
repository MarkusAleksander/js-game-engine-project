import LightActor from './ActorTypes/LightActor.js';
import MeshActor from './ActorTypes/MeshActor.js';
import { ACTOR_TYPES, MESH_ACTOR_TYPES, MESH_TYPES, MESH_TEMPLATES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES } from './ActorTypes/ActorTypes.js';
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
    // * Texture loader
    this.textureLoader = new THREE.TextureLoader();


    // * -----------------------------------
    // *    ACTOR FACTORY METHODS
    // * -----------------------------------

    // * Create Actor
    this.createActor = function createActor(settings, actorType) {

        let newActor = null;

        // * Switch to Actor building path
        switch (actorType) {
            case ACTOR_TYPES.MESH:
                // * Create a Mesh Actor
                newActor = this.createMeshActor(settings);
                break;
            case ACTOR_TYPES.LIGHT:
                // * Create a Light Actor
                newActor = this.createLightActor(settings);
                break;
            default:
                // * Don't create anything
                break;
        }

        if (!newActor) {
            Utilities.outputDebug("Failed to create actor: ", settings);
            return null;
        }

        return newActor;
    }

    this.createMeshActor = function createMeshActor(settings) {

        // * Check compatible settings
        let isValidSettings = this.isValidMeshActorSettings(settings);

        // * Do not continue if not valid object
        if (!isValidSettings) {
            // * Throw error
            return null;
        }

        // * Create Actor
        const actor = new MeshActor(settings);

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

    // * Check if Mesh Actor settings meet the required data
    this.isValidMeshActorSettings = function isValidMeshActorSettings(meshData) {
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

    // * Check if Light Actor settings meet the required data
    this.isValidLightActorSettings = function isValidLightActorSettings(lightData) {
        // TODO
    }


    // * -----------------------------------
    // *    MESH ACTOR BUILDING METHODS
    // * -----------------------------------

    // * Build Primitive Mesh
    this.buildPrimitiveMesh = function buildPrimitiveMesh(meshData) {
        let geometry = this.createGeometry(meshData.meshType, Object.assign(MESH_TEMPLATES.BOX, meshData.geometry)),
            material = this.createMaterial(meshData.materialData);

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
                geometry = this.createBoxGeometry(data);
                break;
            default:
                break;
        }

        return geometry;
    }

    // * Create Box Geometry
    this.createBoxGeometry = function createBoxGeometry(data) {
        // TODO - Does this really need it's own function?
        return new THREE.BoxBufferGeometry(
            data.width,
            data.height,
            data.depth,
            data.widthSegments,
            data.heightSegments,
            data.depthSegments
        );
    }

    // * Create Material
    this.createMaterial = function createMaterial(data) {
        let textureData = data.textureData !== undefined ? data.textureData : null;
        let bumpMapData = data.bumpMapData !== undefined ? data.bumpMapData : null;

        let materials = [];

        if (textureData.textures && Array.isArray(textureData.textures)) {

            let textures = textureData.textures;

            for (let i = 0; i < textures.length; i++) {

                let textureSettings = textureData.settings[i];

                // * Begin to Load texture
                let texture = this.textureLoader.load(textures[i]);

                texture.encoding = THREE.sRGBEncoding;
                texture.anisotropy = 16;
                texture.minFilter = THREE.LinearMipmapLinearFilter;

                // * Material side
                let side = THREE.FrontSide;

                if (textureSettings.side) {
                    switch (textureSettings.side) {
                        case MATERIAL_FACE_TYPES.FRONT:
                            side = THREE.FrontSide;
                            break;
                        case MATERIAL_FACE_TYPES.BACK:
                            side = THREE.BackSide;
                            break;
                        case MATERIAL_FACE_TYPES.BOTH:
                            side = THREE.DoubleSide;
                            break;
                        default:
                            break;
                    }
                }

                let newObj = {
                    map: texture,
                    wireframe: textureSettings.wireframe !== undefined ? textureSettings.wireframe : false,
                    color: textureSettings.color !== undefined ? textureSettings.color : 0xffffff,
                    side: side
                }

                let shininess = textureSettings.shininess !== undefined ? textureSettings.shininess : 30;
                // let roughness = textureSettings.roughness !== undefined ? textureSettings.roughness : 0;
                let emissive = textureSettings.emissive !== undefined ? textureSettings.emissive : 0x000000;

                switch (textureSettings.type) {
                    case MATERIAL_TYPES.STANDARD:
                        materials.push(new THREE.MeshStandardMaterial(newObj));
                        break;
                    case MATERIAL_TYPES.LAMBERT:
                        // * Matte finish material
                        newObj.emissive = emissive;

                        materials.push(new THREE.MeshLambertMaterial(newObj));
                        break;
                    case MATERIAL_TYPES.NORMAL:
                        // * Normal mapping - not affected by light
                        materials.push(new THREE.MeshNormalMaterial());
                        break;
                    case MATERIAL_TYPES.PHONG:
                        // * Shiny finish

                        newObj.shininess = shininess;
                        newObj.emissive = emissive;
                        // newObj.specular = specular;

                        materials.push(new THREE.MeshStandardMaterial(newObj));
                        break;
                    case MATERIAL_TYPES.BASIC:
                        materials.push(new THREE.MeshStandardMaterial(newObj));
                        break;
                    default:
                        break;
                }
            }
        }

        return materials;

        // // * For bump map
        // if (bumpMap) {
        //     bumpMap = this.textureLoader.load(bumpMap);
        //     this.textureLoader.crossOrigin = true;
        //     materialOptions.bumpMap = bumpMap;
        // }

        // * specular: hex
        // * shininess - def 30
        // * bumpMap - texture

        // wireframe: true option

    }

}

export default ActorFactory;
