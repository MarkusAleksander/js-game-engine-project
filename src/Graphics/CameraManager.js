import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

// * -----------------------------------
// *    CAMERA MANAGER
// * -----------------------------------
const CameraManager = function CameraManager(data) {

    // * -----------------------------------
    // *    CAMERA MANAGER PROPERTIES
    // * -----------------------------------

    // * Camera Object
    this.Camera = null;

    this.fov = data.fov !== undefined ? data.fov : 75;
    this.aspect = data.aspect !== undefined ? data.aspect : window.innerWidth / window.innerHeight;
    this.near = data.near !== undefined ? data.near : 0.1;
    this.far = data.far !== undefined ? data.far : 500;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    CAMERA MANAGER METHODS
    // * -----------------------------------
    this.initialise = function initialise(data) {
        // debugger;
        this.Camera = new THREE.PerspectiveCamera(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
    }

    // * Move camera to location (absolute positioning)
    this.moveCameraTo = function moveCameraTo(loc) {
        let c = this.Camera;

        c.position.set(
            loc.x !== undefined ? loc.x : c.position.x,
            loc.y !== undefined ? loc.y : c.position.y,
            loc.z !== undefined ? loc.z : c.position.z
        );
    }

    // * Set Camera Target
    this.setCameraTargetTo = function setCameraTargetTo(target) {
        // debugger;
        this.Camera.lookAt(
            target.x !== undefined ? target.x : 0,
            target.y !== undefined ? target.y : 0,
            target.z !== undefined ? target.z : 0
        );
    }

    // * Move camera by distance (relative positioning)
    this.moveCameraBy = function moveCameraBy(vector, distance) {
        let c = this.Camera;

        c.translateOnAxis(new THREE.Vector3(
            vector.x !== undefined ? vector.x + vector.x : 0,
            vector.y !== undefined ? vector.y + vector.y : 0,
            vector.z !== undefined ? vector.z + vector.z : 0
        ), distance);
    }

    // * Get current rotation
    this.getCameraRotation = function getCameraRotation() {
        return this.Camera.rotation;
    }

    // * Get current position
    this.getCameraPosition = function getCameraPosition() {
        return this.Camera.position;
    }

    // * Get camera object
    this.getCamera = function getCamera() {
        return this.Camera;
    }

    // * Update Camera Render Aspect Ratio
    this.updateProjectionMatrix = function updateProjectionMatrix() {
        this.Camera.aspect = window.innerWidth / window.innerHeight;
        this.Camera.updateProjectionMatrix();
    }
}

CameraManager.prototype = Object.create(ManagerPrototype.prototype);
CameraManager.prototype.constructor = CameraManager;

export default CameraManager;
