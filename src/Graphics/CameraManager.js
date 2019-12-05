/*
*   CameraManager.js
*   Interface for the Camera Object (accessed via the Graphics Manager)
*/
import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import Utilities from '../Globals/Utilities.js';

// * -----------------------------------
// *    CAMERA MANAGER
// * -----------------------------------
const CameraManager = function CameraManager(data) {

    // * -----------------------------------
    // *    CAMERA MANAGER PROPERTIES
    // * -----------------------------------

    // * Camera Object
    this.Camera = null;
    this.fov = Utilities.checkUndefinedAndReturn(data.fov, 75);
    this.aspect = Utilities.checkUndefinedAndReturn(data.aspect, window.innerWidth / window.innerHeight);
    this.near = Utilities.checkUndefinedAndReturn(data.near, 0.1);
    this.far = Utilities.checkUndefinedAndReturn(data.far, 500);

    ManagerPrototype.call(this, data);

    // * Note - rotaion calculation taken from THREE js Orbit Controls

    // * For caching and calculating camera angling
    this.offset = new THREE.Vector3();
    this.quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0));
    this.quatInverse = this.quat.clone().inverse();

    // this.position = new THREE.Vector3();

    this.lastPosition = new THREE.Vector3();
    this.lastQuaternion = new THREE.Quaternion();

    this.target = new THREE.Vector3(0, 0, 0);

    this.Spherical = new THREE.Spherical();
    this.SphericalDelta = new THREE.Spherical();

    // * Horizontal rotating (Azimuth)
    this.maxThetaAngle = Infinity;
    this.minThetaAngle = -Infinity;

    // * Vertical rotating (Polar)
    this.maxPhiAngle = Math.PI;
    this.minPhiAngle = 0; // * -Math.PI

    this.rotateStart = new THREE.Vector2();
    this.rotateEnd = new THREE.Vector2();
    this.rotateDelta = new THREE.Vector2();

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

    this.update = function update(data) {
        // this.prototype.update();

        let position = this.Camera.position;

        this.offset.copy(position).sub(this.target);
        this.offset.applyQuaternion(this.quat);

        this.Spherical.setFromVector3(this.offset);

        // * Apply damping here if required
        this.Spherical.theta += this.SphericalDelta.theta;
        this.Spherical.phi += this.SphericalDelta.phi;

        // * Restrict theta and phi
        this.Spherical.theta = Math.max(this.minThetaAngle, Math.min(this.maxThetaAngle, this.Spherical.theta));
        this.Spherical.phi = Math.max(this.minPhiAngle, Math.min(this.maxPhiAngle, this.Spherical.phi));

        this.Spherical.makeSafe();

        this.Spherical.radius = Math.max(0, Math.min(20, this.Spherical.radius));

        // * If panning - move target by panOffset

        this.offset.setFromSpherical(this.Spherical);
        this.offset.applyQuaternion(this.quatInverse);

        position.copy(this.target).add(this.offset);

        this.Camera.lookAt(this.target);

        // * Reset spherical data - add damping here
        this.SphericalDelta.set(0, 0, 0);

        if (
            this.lastPosition.distanceToSquared(this.Camera.position) > 0.00001 ||
            8 * (1 - this.lastQuaternion.dot(this.Camera.quaternion)) > 0.00001
        ) {
            this.lastPosition.copy(this.Camera.position);
            this.lastQuaternion.copy(this.Camera.quaternion);
        }

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

    this.moveCameraVertically = function moveCameraVertically(angle) {
        this.SphericalDelta.phi -= angle;
    }

    this.moveCameraHorizontally = function moveCameraHorizontally(angle) {
        this.SphericalDelta.theta -= angle;
    }

    // TODO - Improve name
    this.moveCamera = function moveCamera(x, y) {
        this.rotateStart.set(this.Camera.position.x, this.Camera.position.y);

        // debugger;
        this.rotateEnd.set(this.Camera.position.x + x, this.Camera.position.y + y);

        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(1);

        // * should pass in canvas element, not window
        this.moveCameraHorizontally(2 * Math.PI * this.rotateDelta.x / window.innerHeight);
        this.moveCameraVertically(2 * Math.PI * this.rotateDelta.y / window.innerHeight);

        this.rotateStart.copy(this.rotateEnd);
    }

    // * Set Camera Target
    this.setCameraTargetTo = function setCameraTargetTo(target) {
        this.target.set(target.x, target.y, target.z);
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
