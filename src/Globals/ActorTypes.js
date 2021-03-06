// TODO - This file needs reworking

export const ACTOR_TYPES = {
    MESH: "mesh",
    LIGHT: "light",
    GLTF: "gltf"
};

export const MESH_ACTOR_TYPES = {
    PRIMITIVE: "primitive",
    CUSTOM: "custom"
}

export const LIGHT_ACTOR_TYPES = {
    DIRECTIONAL: "directional_light",
    AMBIENT: "ambient_light",
    HEMISPHERE: "hemisphere_light",
    POINT: "point_light",
    SPOT: "spot_light",
    RECTAREA: "rectarea_light"
}

export const MESH_TYPES = {
    BOX: "box",
    CIRCLE: "circle",
    CONE: "cone",
    CYLINDER: "cylinder",
    EXTRUDE: "extrude",
    LATHE: "lathe",
    PLANE: "plane",
    SHAPE: "shape",
    SPHERE: "sphere",
    TORUS: "torus",
    TUBE: "tube",
    EDGES: "edges",
    LINE: "line"
}

export const MESH_TEMPLATES = {
    BOX: {
        width: 1,
        height: 1,
        depth: 1,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    },
    CIRCLE: {
        radius: 1,
        segments: 8,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    },
    CONE: {
        radius: 1,
        height: 1,
        radialSegments: 8,
        heightSegments: 1,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    },
    CYLINDER: {
        radiusTop: 1,
        radiusBottom: 1,
        height: 1,
        radialSegments: 8,
        heightSegments: 1,
        openEnded: false,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    },
    PLANE: {
        width: 1,
        height: 1,
        widthSegments: 1,
        heightSegments: 1
    },
    SPHERE: {
        radius: 1,
        widthSegments: 8,
        heightSegments: 6,
        phiStart: 0,
        phiLength: 2 * Math.PI,
        thetaStart: 0,
        thetaLength: 2 * Math.PI
    },
    TORUS: {
        radius: 1,
        tube: 0.4,
        radialSegments: 8,
        tubularSegments: 6,
        arc: 2 * Math.PI
    }
}

export const MATERIAL_TYPES = {
    STANDARD: "standard",
    BASIC: "basic",
    PHONG: "phong",
    NORMAL: "normal",
    LAMBERT: "lambert",
    NONE: "none"
}

export const MATERIAL_FACE_TYPES = {
    FRONT: "front",
    BACK: "back",
    BOTH: "both"
}

export const MATERIAL_REPEAT_TYPES = {
    CLAMP: "clamp",
    REPEAT: "repeat",
    MIRRORREPEAT: "mirror_repeat"
}
