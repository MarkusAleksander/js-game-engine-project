import {
    MESH_TYPES,
    MESH_TEMPLATES,
    LIGHT_ACTOR_TYPES,
    MATERIAL_TYPES,
    MATERIAL_FACE_TYPES,
    MATERIAL_REPEAT_TYPES,
} from "../Globals/ActorTypes.js";
import Utilities from "../Globals/Utilities.js";

const RenderableFactory = function RenderableFactory() {
    this.textureLoader = new THREE.TextureLoader();
    this.GLTFLoader = new THREE.GLTFLoader();

    this.loadByGLTF = function loadByGLTF(settings, onload, onError) {
        this.GLTFLoader.load(
            settings.src,
            (gltf) => {
                let scene = gltf.scene;

                scene.scale.set(settings.scale, settings.scale, settings.scale);
                scene.traverse((item) => {
                    if (item.isMesh) {
                        item.castShadow = settings.castShadow;
                        item.receiveShadow = settings.receiveShadow;
                    }
                });
                scene.add(new THREE.AxesHelper(3 / settings.scale));

                onload(gltf, scene);
            },
            undefined,
            onError
        );
    };

    this.loadSimpleMesh = function loadSimpleMesh(settings, onload) {
        let type = settings.type,
            geometry = settings.geometry,
            material = settings.material;

        // * Build Geometry
        switch (type) {
            case MESH_TYPES.BOX:
                geometry = Object.assign(MESH_TEMPLATES.BOX, geometry);
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
                geometry = Object.assign(MESH_TEMPLATES.PLANE, geometry);
                geometry = new THREE.PlaneBufferGeometry(
                    geometry.width,
                    geometry.height,
                    geometry.widthSegments,
                    geometry.heightSegments
                );
                material = this.buildMaterial(material, 1);
                break;
            case MESH_TYPES.CIRCLE:
                geometry = Object.assign(MESH_TEMPLATES.CIRCLE, geometry);
                geometry = new THREE.CircleBufferGeometry(
                    geometry.radius,
                    geometry.segments,
                    geometry.thetaStart,
                    geometry.thetaLength
                );
                material = this.buildMaterial(material, 1);
                break;
            case MESH_TYPES.CONE:
                geometry = Object.assign(MESH_TEMPLATES.CONE, geometry);
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
                geometry = Object.assign(MESH_TEMPLATES.CYLINDER, geometry);
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
                geometry = Object.assign(MESH_TEMPLATES.SPHERE, geometry);
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
                geometry = Object.assign(MESH_TEMPLATES.TORUS, geometry);
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

        let scene = new THREE.Mesh(geometry, material);
        scene.add(new THREE.AxesHelper());

        scene.castShadow = settings.castShadow;
        scene.receiveShadow = settings.receiveShadow;

        onload(scene);
    };

    this.createLight = function createLight(settings, onload) {
        // TODO - Improve construction - note - color is different for hemi
        // const light = new LightActor({
        //     id: this.cAuID++,
        //     color: settings.color,
        //     intensity: settings.intensity,
        //     position: settings.position,
        //     target: settings.target
        // });
        let light = settings.light;
        let data = light.data;

        let lightObj = null;

        switch (light.type) {
            case LIGHT_ACTOR_TYPES.DIRECTIONAL:
                lightObj = new THREE.DirectionalLight(
                    light.color,
                    light.intensity
                );
                lightObj.castShadow = settings.castShadow;
                break;
            case LIGHT_ACTOR_TYPES.AMBIENT:
                lightObj = new THREE.AmbientLight(data.color, data.intensity);
                break;
            case LIGHT_ACTOR_TYPES.HEMISPHERE:
                lightObj = new THREE.HemisphereLight(
                    light.skyColor,
                    light.groundColor,
                    light.intensity
                );
                break;
            default:
                break;
        }

        lightObj.add(new THREE.AxesHelper());

        onload(lightObj);
    };

    this.buildMaterial = function buildMaterial(data, numSides) {
        let color = data.color,
            textures = data.textures,
            textureTypes = data.textureTypes;

        let textureData =
            data.textureData !== undefined ? data.textureData : {};
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
                    materialData.push(
                        this.createMaterial(textures[i], textureTypes[i])
                    );
                } else {
                    materialData.push(
                        this.createMaterial(textures[i], textureTypes)
                    );
                }
            }
        } else if (textures && !Array.isArray(textures)) {
            if (Array.isArray(textureTypes)) {
                materialData = [];
                for (let i = 0; i < textureTypes.length; i++) {
                    materialData.push(
                        this.createMaterial(textures, textureTypes[i])
                    );
                }
            } else if (!Array.isArray(textureTypes)) {
                materialData = this.createMaterial(textures, textureTypes);
            }

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
    };

    this.createMaterial = function createMaterial(
        textureString,
        textureSettings
    ) {
        if (
            textureSettings === null ||
            textureSettings.type == MATERIAL_TYPES.NONE
        ) {
            return null;
        }

        // * Begin to Load texture
        let texture = this.textureLoader.load(textureString);

        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = 16;
        // TODO - Can this be changed to improve rendering?
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // * Repeat texture
        let wrapU, // * S == U in UV
            wrapV, // * T == V in UV
            wrapUtimes =
                textureSettings.wrapUtimes !== undefined
                    ? textureSettings.wrapUtimes
                    : 1,
            wrapVtimes =
                textureSettings.wrapVtimes !== undefined
                    ? textureSettings.wrapVtimes
                    : 1;

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
            wireframe:
                textureSettings.wireframe !== undefined
                    ? textureSettings.wireframe
                    : false,
            color:
                textureSettings.color !== undefined
                    ? textureSettings.color
                    : 0xffffff,
            side: side,
            flatShading:
                textureSettings.flatShading !== undefined
                    ? textureSettings.flatShading
                    : false,
        };

        // debugger;
        let shininess =
            textureSettings.shininess !== undefined
                ? textureSettings.shininess
                : 30;
        // let roughness = textureSettings.roughness !== undefined ? textureSettings.roughness : 0;
        let emissive =
            textureSettings.emissive !== undefined
                ? textureSettings.emissive
                : 0x000000;

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
    };
};

const RenderFactory = new RenderableFactory();

export default RenderFactory;
