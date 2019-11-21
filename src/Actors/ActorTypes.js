export const ACTOR_TYPES = {
    BOX: "box",
    CIRCLE: "box",
    CONE: "cone",
    CYLINDER: "cylinder",
    EXTRUDE: "extrude",
    LATHE: "lathe",
    PLANE: "plane",
    SHAPE: "shape",
    SPHERE: "sphere",
    TORUS: "torus",
    TUBE: "tube",
    EDGES: "edges"
}

export const ACTOR_TEMPLATES = {
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
    // EXTRUDE: {},
    // LATHE: {},
    PLANE: {
        width: 1,
        height: 1,
        widthSegments: 1,
        heightSegments: 1
    },
    // SHAPE: {
    // },
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
    // TUBE: {},
    // EDGES: {}
}
