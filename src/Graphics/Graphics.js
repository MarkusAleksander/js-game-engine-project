import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import Utilities from './../Globals/Utilities.js';

// * -----------------------------------
// *    GRAPHICS MANAGER
// * -----------------------------------
const GraphicsManager = function GraphicsManager(data) {

    // * -----------------------------------
    // *    GRAPHICS MANAGER PROPERTIES
    // * -----------------------------------

    // * Scene Object
    this.Scene = null;
    // * Renderer Object
    this.Renderer = null;
    // * Canvas ID
    this.canvasID = data.canvasID !== undefined ? data.canvasID : '';
    // * Camera Object
    this.Camera = null;
    // * Should Update Aspect Ratio?
    this.shouldUpdateRenderAspect = false;
    // * Should Resize Renderer?
    this.shouldResizeRenderer = false;

    ManagerPrototype.call(this, data);


    // * -----------------------------------
    // *    GRAPHICS MANAGER METHODS
    // * -----------------------------------

    // * Override initialise function
    this.initialise = function initialise(cameraData) {
        // * Set up scene, render and camera
        this.createScene();
        this.createRenderer();
        this.createCamera(cameraData);

        // * Update render aspect ratio and render size on window resize
        window.addEventListener('resize', () => {
            this.setUpdateRenderAspectStatus(true);
            this.setShouldRenderResize(true);
        });

        // * Call to base to do any prototype based initialising
        ManagerPrototype.prototype.initialise.call(this);
    }


    // * ------- SCENE METHODS ------- * //

    // * Scene creation
    this.createScene = function createScene() {
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color(0xAAAAAA);
    }

    // * Get Scene
    this.getScene = function getScene() {
        return this.Scene;
    }

    // * Add Actor to the Scene
    this.addActorToScene = function addActorToScene(actor) {
        if (actor.getRegisteredStatus()) {
            this.Scene.add(actor.getActorObject());
        }
    }

    // * Remove Actor from Scene
    this.removeActorFromScene = function removeActorFromScene(actor) {
        this.Scene.remove(actor.getActorObject());
    }

    // * ------- RENDERER METHODS ------- * //

    // * Create Renderer
    this.createRenderer = function createRenderer() {
        this.Renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(this.canvasID),
            antialias: true,
            gammaFactor: 2.2,
            gammaOutput: true
        });
        this.Renderer.shadowMap.enabled = true;
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // * Get Renderer
    this.getRenderer = function getRenderer() {
        return this.Renderer;
    }

    // * Determine Render Aspect Ratio should update?
    this.setUpdateRenderAspectStatus = function setUpdateRenderAspectStatus(status) {
        this.shouldUpdateRenderAspect = status;
    }

    // * Determine Render Resize should update?
    this.setShouldRenderResize = function setShouldRenderResize(status) {
        this.shouldResizeRenderer = status;
    }

    // * Update Render Aspect Ratio
    this.updateRenderAspectRatio = function updateRenderAspectRatio() {
        this.Camera.aspect = window.innerWidth / window.innerHeight;
        this.Camera.updateProjectionMatrix();
        this.setUpdateRenderAspectStatus(false);
    }

    // * Update Render Resize
    this.updateRenderResize = function updateRenderResize() {
        let canvas = this.Renderer.domElement;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            this.Renderer.setSize(width, height);
        }
        this.setShouldRenderResize(false);
    }

    // * Main Update Function
    this.render = function render() {

        if (this.shouldUpdateRenderAspect) {
            this.updateRenderAspectRatio();
        }

        if (this.shouldResizeRenderer) {
            this.updateRenderResize();
        }

        // * Do render
        this.Renderer.render(this.Scene, this.Camera);
    }

    // * ------- CAMERA METHODS ------- * //
    // TODO - Export camera to a separate module, handled by the Graphics?

    // * Create Camera
    this.createCamera = function createCamera(cameraData) {
        let settings = [
            cameraData.fov !== undefined ? cameraData.fov : 75,
            cameraData.aspect !== undefined ? cameraData.aspect : window.innerWidth / window.innerHeight,
            cameraData.near !== undefined ? cameraData.near : 0.1,
            cameraData.far !== undefined ? cameraData.far : 500
        ]

        this.Camera = new THREE.PerspectiveCamera(...settings);
    }

    // * Get Camera
    this.getCamera = function getCamera() {
        return this.Camera;
    }

    // * Move camera to location (absolute positioning)
    this.moveCameraTo = function moveCameraTo(loc) {
        this.Camera.position.x = loc.x !== undefined ? loc.x : this.Camera.position.x;
        this.Camera.position.y = loc.y !== undefined ? loc.y : this.Camera.position.y;
        this.Camera.position.z = loc.z !== undefined ? loc.z : this.Camera.position.z;
    }

    // * Set Camera Target
    this.setCameraTargetTo = function setCameraTargetTo(target) {
        this.Camera.lookAt(target.x, target.y, target.z);
    }

    // * Move camera by distance (relative positioning)
    this.moveCameraBy = function moveCameraBy(loc) {
        this.Camera.position.x = loc.x !== undefined ? this.Camera.position.x + loc.x : this.Camera.position.x;
        this.Camera.position.y = loc.y !== undefined ? this.Camera.position.y + loc.y : this.Camera.position.y;
        this.Camera.position.z = loc.z !== undefined ? this.Camera.position.z + loc.z : this.Camera.position.z;
    }
}

GraphicsManager.prototype = Object.create(ManagerPrototype.prototype);
GraphicsManager.prototypeconstructor = GraphicsManager;

export default GraphicsManager;
