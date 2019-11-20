const ACTOR_TYPES = {
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

const ACTOR_TEMPLATES = {
    BOX: {
        width: 1,
        height: 1,
        depth: 1,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
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
    PLANE: {},
    SHAPE: {},
    SPHERE: {},
    TORUS: {},
    TUBE: {},
    EDGES: {},
}