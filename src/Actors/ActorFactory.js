import LightActor from './ActorTypes/LightActor.js';
import MeshActor from './ActorTypes/MeshActor.js';

import Actor from './ActorTypes/Actor.js';

import { ACTOR_TYPES, MESH_ACTOR_TYPES, MESH_TYPES, MESH_TEMPLATES, LIGHT_ACTOR_TYPES, MATERIAL_TYPES, MATERIAL_FACE_TYPES, MATERIAL_REPEAT_TYPES } from '../Globals/ActorTypes.js';
import Utilities from '../Globals/Utilities.js';

// * -----------------------------------
// *    ACTOR FACTORY
// * -----------------------------------
const ActorFactory = function ActorFactory() {

    // * -----------------------------------
    // *    ACTOR FACTORY PROPERTIES
    // * -----------------------------------

    // * Current Actor Unique ID
    this.nextUID = 1;
    // * Texture loader
    this.textureLoader = new THREE.TextureLoader();
    // * GLTF Loader
    this.gltfLoader = new THREE.GLTFLoader();


    // * -----------------------------------
    // *    ACTOR FACTORY METHODS
    // * -----------------------------------

    // * Create Actor
    this.createActor = function createActor(actorObjectSettings) {

        let newActor = null;

        if (!actorObjectSettings.type) {
            Utilities.outputDebug('No Actor type specified');
            return null;
        }

        const actor = new Actor({
            id: this.nextUID++
            // actor: newActor[0],
            // objectMap: newActor[1],
            // updateMap: newActor[2]
        });

        // * Switch to Actor building path
        // TODO - better naming than buildObjects
        /*newActor = */
        this.buildObjects(
            actorObjectSettings, actor
        );

        // actor.

        // debugger;

        // if (!newActor[0]) {
        //     Utilities.outputDebug("Failed to create actor: ", actorObjectSettings);
        //     return null;
        // }
        // debugger;

        let rootObjSettings = actorObjectSettings.settings;

        if (rootObjSettings.sceneData && rootObjSettings.sceneData.position) {
            actor.moveActorTo(rootObjSettings.sceneData.position);
        }

        if (rootObjSettings.sceneData && rootObjSettings.sceneData.rotation) {
            actor.rotateActorTo(rootObjSettings.sceneData.rotation);
        }

        return actor;
    }

    this.buildObjects = function buildObjects(data, actor, id, objMap, updateMap) {

        // TODO - Build Reference map for each item on the object
        // debugger;
        // * Set up object
        let obj;

        if (!id) { id = 0 }

        id = String(id);

        if (!objMap) { objMap = new Map(); }

        if (!updateMap) { updateMap = new Map(); }

        // * Build object
        if (data.type && data.settings) {
            obj = this.createObjectByType(
                data.type,
                data.settings,
                actor
            )
        }

        // * If failed
        if (!obj) { return; }

        objMap.set(id, obj);

        if (data.settings.updates && data.settings.updates.length) {
            updateMap.set(id, [data.settings.updates, obj]);
        }

        // * Loop through children
        if (data.children && Array.isArray(data.children)) {
            for (let i = 0; i < data.children.length; i++) {
                let childObj = this.buildObjects(data.children[i], undefined, String(id) + String(i), objMap, updateMap);

                if (childObj) {
                    obj.add(childObj[0]);
                }
            }
        }

        actor.setActorObject(obj);
        actor.objectMap = objMap;
        actor.updateMap = updateMap;

        // return [obj, objMap, updateMap];

    }

    this.createObjectByType = function createObjectByType(type, settings, actor) {
        let newObj = null;

        switch (type) {
        case ACTOR_TYPES.MESH:
            // * Create a Mesh Actor
            newObj = this.createMesh(settings);
            break;
        case ACTOR_TYPES.LIGHT:
            // * Create a Light Actor
            newObj = this.createLight(settings);
            break;
        case ACTOR_TYPES.GLTF:
            newObj = this.loadByGLTF(settings, actor);
            break
        default:
            // * Don't create anything
            break;
        }

        return newObj;
    }

    this.createMesh = function createMesh(settings) {

        // * Check compatible settings
        let isValidSettings = true; // this.isValidMeshActorSettings(settings);

        // * Do not continue if not valid object
        if (!isValidSettings) {
            // * Throw error
            return null;
        }

        // * Create Actor
        // const actor = new MeshActor(settings);

        let actorMesh = null;

        // * Build Mesh
        if (settings.meshType === MESH_ACTOR_TYPES.PRIMITIVE) {
            actorMesh = this.buildPrimitiveMesh(settings);
        }
        if (settings.meshType === MESH_ACTOR_TYPES.CUSTOM) {
            actorMesh = this.buildCustomMesh(settings);
        }

        actorMesh.add(new THREE.AxesHelper(3));

        // * Assign mesh to Actor object
        // actor.setActorObject(actorMesh);

        // * Assign an ID when complete
        // actor.uID = this.cAuID++;

        return actorMesh;
    }

    this.createLight = function createLight(settings) {
        // TODO - Improve construction - note - color is different for hemi
        // const light = new LightActor({
        //     id: this.cAuID++,
        //     color: settings.color,
        //     intensity: settings.intensity,
        //     position: settings.position,
        //     target: settings.target
        // });

        let lightObj = null;

        switch (settings.lightType) {
        case LIGHT_ACTOR_TYPES.DIRECTIONAL:
            lightObj = new THREE.DirectionalLight(settings.color, settings.intensity);
            break;
        case LIGHT_ACTOR_TYPES.AMBIENT:
            lightObj = new THREE.AmbientLight(settings.color, settings.intensity);
            break;
        case LIGHT_ACTOR_TYPES.HEMISPHERE:
            lightObj = new THREE.HemisphereLight(settings.skyColor, settings.groundColor, light.getIntensity);
            break;
        default:
            break;
        }

        lightObj.add(new THREE.AxesHelper(5));

        // light.setActorObject(lightObj);

        return lightObj;
    }

    // * Load by GLTF
    this.loadByGLTF = function loadByGLTF(settings, actor) {
        // let obj = {};

        // TODO - draco loader?

        this.gltfLoader.load(
            settings.asset,
            (gltf) => {
                let scene = gltf.scene;

                scene.scale.set(settings.scale, settings.scale, settings.scale);
                scene.traverse((item) => {
                    item.castShadow = true;
                    item.receiveShadow = true;
                });
                actor.setActorObject(scene);
                settings.onload();
            },
            undefined,
            (error) => {
                console.log(error);
            }
        );

        return {};
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
    this.buildPrimitiveMesh = function buildPrimitiveMesh(settings) {

        let geometry = settings.geometry,
            material = settings.material,
            transformation = settings.transformation;

        // * Build Geometry
        switch (geometry.type) {
        case MESH_TYPES.BOX:
            geometry = Object.assign(MESH_TEMPLATES.BOX, geometry.data);
            geometry = new THREE.BoxBufferGeometry(
                geometry.width,
                geometry.height,
                geometry.depth,
                geometry.widthSegments,
                geometry.heightSegments,
                geometry.depthSegments
            );
            material = this.buildMaterial(material, 6);
            break;
        case MESH_TYPES.PLANE:
            geometry = Object.assign(MESH_TEMPLATES.PLANE, geometry.data);
            geometry = new THREE.PlaneBufferGeometry(
                geometry.width,
                geometry.height,
                geometry.widthSegments,
                geometry.heightSegments
            );
            material = this.buildMaterial(material, 1);
            break;
        case MESH_TYPES.CIRCLE:
            geometry = Object.assign(MESH_TEMPLATES.CIRCLE, geometry.data);
            geometry = new THREE.CircleBufferGeometry(
                geometry.radius,
                geometry.segments,
                geometry.thetaStart,
                geometry.thetaLength

            );
            material = this.buildMaterial(material, 1);
            break;
        case MESH_TYPES.CONE:
            geometry = Object.assign(MESH_TEMPLATES.CONE, geometry.data);
            geometry = new THREE.ConeBufferGeometry(
                geometry.radius,
                geometry.height,
                geometry.radialSegments,
                geometry.heightSegments,
                geometry.openEnded,
                geometry.thetaStart,
                geometry.thetaLength
            );
            material = this.buildMaterial(material, 2);
            break;
        case MESH_TYPES.CYLINDER:
            geometry = Object.assign(MESH_TEMPLATES.CYLINDER, geometry.data);
            geometry = new THREE.CylinderBufferGeometry(
                geometry.radiusTop,
                geometry.radiusBottom,
                geometry.height,
                geometry.radialSegments,
                geometry.heightSegments,
                geometry.openEnded,
                geometry.thetaStart,
                geometry.thetaLength
            );
            material = this.buildMaterial(material, 2);
            break;
        case MESH_TYPES.SPHERE:
            geometry = Object.assign(MESH_TEMPLATES.SPHERE, geometry.data);
            geometry = new THREE.SphereBufferGeometry(
                geometry.radius,
                geometry.widthSegments,
                geometry.heightSegments,
                geometry.phiStart,
                geometry.phiLength,
                geometry.thetaStart,
                geometry.thetaLength
            );
            material = this.buildMaterial(material, 1);
            break;
        case MESH_TYPES.TORUS:
            geometry = Object.assign(MESH_TEMPLATES.TORUS, geometry.data);
            geometry = new THREE.CylinderBufferGeometry(
                geometry.radius,
                geometry.tube,
                geometry.radialSegments,
                geometry.tubularSegments,
                geometry.arc
            );
            material = this.buildMaterial(material, 1);
            break;
        default:
            break;
        }

        let newMesh = new THREE.Mesh(geometry, material);

        // debugger;
        if (transformation && transformation.position) {
            newMesh.position.set(
                transformation.position.x,
                transformation.position.y,
                transformation.position.z
            );
        }
        if (transformation && transformation.rotation) {
            newMesh.rotation.set(
                transformation.rotation.x,
                transformation.rotation.y,
                transformation.rotation.z
            );
        }

        return newMesh;
    }

    // * Build custom mesh
    this.buildCustomMesh = function buildCustomMesh(settings) {
        // TODO
    }

    // * Build Material
    this.buildMaterial = function buildMaterial(data, numSides) {
        // debugger;
        // debugger;
        let color = data.color,
            textures = data.textures,
            textureTypes = data.textureTypes;

        let textureData = data.textureData !== undefined ? data.textureData : {};
        // let bumpMapData = data.bumpMapData !== undefined ? data.bumpMapData : null;

        let materialData;

        // * Check settings data as array
        if (textureTypes && Array.isArray(textureTypes)) {
            let idx = 0;

            // * ensure there are enough settings for each side, populate from the beginning
            while (textureTypes.length < numSides) {
                textureTypes.push(textureTypes[idx]);
                idx++;
            }
        }

        // * Check if passed texture data is in Array format or not
        if (textures && Array.isArray(textures)) {
            let idx = 0;

            // * Material data should be an array
            materialData = [];

            // * if provided data is less than the number of mesh sides, then duplicate content
            while (textures.length < numSides) {
                textures.push(textures[idx]);
                idx++;
            }

            for (let i = 0; i < textures.length; i++) {
                // * is settings an array or single item?
                if (Array.isArray(textureTypes)) {
                    materialData.push(this.createMaterial(textures[i], textureTypes[i]));
                } else {
                    materialData.push(this.createMaterial(textures[i], textureTypes));
                }
            }
        } else if (textures && !Array.isArray(textures)) {
            materialData = this.createMaterial(textures, textureTypes);

            return materialData;
        }

        if (!materialData && color) {
            materialData = new THREE.MeshBasicMaterial({ color: color });
        }


        // TODO - Improve
        // if (color) {
        //     if (Array.isArray(materialData)) {
        //         for (let i = 0; i < materialData.length; i++) {
        //             materialData[i].color.set(color);
        //         }
        //     } else {
        //         materialData.color.set(color);
        //     }
        // }

        return materialData;
        // return materials;

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

    // TODO - This is texture creation rather than "material"
    this.createMaterial = function createMaterial(textureString, textureSettings) {

        if (textureSettings === null || textureSettings.type == MATERIAL_TYPES.NONE) { return null; }

        // * Begin to Load texture
        let texture = this.textureLoader.load(textureString);

        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = 16;
        // TODO - Can this be changed to improve rendering?
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // * Repeat texture
        let wrapU, // * S == U in UV
            wrapV, // * T == V in UV
            wrapUtimes = textureSettings.wrapUtimes !== undefined ? textureSettings.wrapUtimes : 1,
            wrapVtimes = textureSettings.wrapVtimes !== undefined ? textureSettings.wrapVtimes : 1;

        texture.repeat.set(wrapUtimes, wrapVtimes);

        // TODO - Offset and Rotation

        switch (textureSettings.wrapU) {
        case MATERIAL_REPEAT_TYPES.CLAMP:
            wrapU = THREE.ClampToEdgeWrapping;
            break;
        case MATERIAL_REPEAT_TYPES.REPEAT:
            wrapU = THREE.RepeatWrapping;
            break;
        case MATERIAL_REPEAT_TYPES.MIRRORREPEAT:
            wrapU = THREE.MirroredRepeatWrapping;
            break;
        default:
            wrapU = THREE.ClampToEdgeWrapping;
            break;
        }
        texture.wrapS = wrapU;

        switch (textureSettings.wrapV) {
        case MATERIAL_REPEAT_TYPES.CLAMP:
            wrapV = THREE.ClampToEdgeWrapping;
            break;
        case MATERIAL_REPEAT_TYPES.REPEAT:
            wrapV = THREE.RepeatWrapping;
            break;
        case MATERIAL_REPEAT_TYPES.MIRRORREPEAT:
            wrapV = THREE.MirroredRepeatWrapping;
            break;
        default:
            wrapV = THREE.ClampToEdgeWrapping;
            break;
        }
        texture.wrapT = wrapV;

        // * Material side to apply to
        let side;

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
            side = THREE.FrontSide;
            break;
        }

        let newObj = {
            map: texture,
            wireframe: textureSettings.wireframe !== undefined ? textureSettings.wireframe : false,
            color: textureSettings.color !== undefined ? textureSettings.color : 0xffffff,
            side: side,
            flatShading: textureSettings.flatShading !== undefined ? textureSettings.flatShading : false
        }

        // debugger;
        let shininess = textureSettings.shininess !== undefined ? textureSettings.shininess : 30;
        // let roughness = textureSettings.roughness !== undefined ? textureSettings.roughness : 0;
        let emissive = textureSettings.emissive !== undefined ? textureSettings.emissive : 0x000000;

        let material;

        switch (textureSettings.type) {
        case MATERIAL_TYPES.STANDARD:
            material = new THREE.MeshStandardMaterial(newObj);
            break;
        case MATERIAL_TYPES.LAMBERT:
            // * Matte finish material
            newObj.emissive = emissive;

            material = new THREE.MeshLambertMaterial(newObj);
            break;
        case MATERIAL_TYPES.NORMAL:
            // * Normal mapping - not affected by light
            material = new THREE.MeshNormalMaterial();
            break;
        case MATERIAL_TYPES.PHONG:
            // * Shiny finish

            newObj.shininess = shininess;
            newObj.emissive = emissive;
            // newObj.specular = specular;

            material = new THREE.MeshStandardMaterial(newObj);
            break;
        case MATERIAL_TYPES.BASIC:
            material = new THREE.MeshBasicMaterial(newObj);
            break;
        default:
            material = new THREE.MeshBasicMaterial();
            break;
        }

        return material;
    }

}

export default ActorFactory;
