import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import CameraManager from './CameraManager.js';

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
    this.CameraManager = null;
    // * Should Update Aspect Ratio?
    this.shouldUpdateRenderAspect = false;
    // * Should Resize Renderer?
    this.shouldResizeRenderer = false;
    // * World background color
    this.worldBackgroundColor = data.backgroundColor !== undefined ? data.backgroundColor : 0xAAAAAA

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
        this.Scene.background = new THREE.Color(this.worldBackgroundColor);
    }

    // * Get Scene
    this.getScene = function getScene() {
        return this.Scene;
    }


    // * ------- SCENE ACTOR METHODS ------- * //

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
        this.CameraManager.updateProjectionMatrix();
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

    // * Render Function
    this.render = function render() {

        if (this.shouldUpdateRenderAspect) {
            this.updateRenderAspectRatio();
        }

        if (this.shouldResizeRenderer) {
            this.updateRenderResize();
        }

        // * Do render
        this.Renderer.render(this.Scene, this.CameraManager.getCamera());
    }


    // * ------- CAMERA METHODS ------- * //

    // * Create Camera
    this.createCamera = function createCamera(cameraData) {
        // * Set up Camera
        this.CameraManager = new CameraManager(cameraData);
        this.CameraManager.initialise();
        window.Camera = this.CameraManager.getCamera();
    }

    // * Get Camera
    this.getCamera = function getCamera() {
        return this.CameraManager;
    }


    // * ------- UPDATE METHOD ------- * //
    // this.update = function update() {
    //     this.CameraManager.update.call(this.CameraManager);
    // }
}

GraphicsManager.prototype = Object.create(ManagerPrototype.prototype);
GraphicsManager.prototype.constructor = GraphicsManager;

export default GraphicsManager;
