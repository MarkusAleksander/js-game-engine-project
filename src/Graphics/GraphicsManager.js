/*
*   GraphicsManager.js
*   Main interfrace for the 3D Graphics Library and rendering to the screen. Also interface for the Camera Manager
*/
import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';
import CameraManager from './CameraManager.js';
import Utilities from '../Globals/Utilities.js';
import EventManager from './../EventSystem/EventManager.js';

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
    this.canvasID = Utilities.checkUndefinedAndReturn(data.canvasID, '');
    // * Camera Object
    this.CameraManager = null;
    // * Should Update Aspect Ratio?
    this.shouldUpdateRenderAspect = false;
    // * Should Resize Renderer?
    this.shouldResizeRenderer = false;
    // * World background color
    this.worldBackgroundColor = Utilities.checkUndefinedAndReturn(data.backgroundColor, 0xAAAAAA);

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
    this.addRenderableToScene = function addRenderableToScene(renderable) {
        // if (actor.getRegisteredStatus()) {
        this.Scene.add(renderable);
        // }
    }

    // * Remove Actor from Scene
    this.removeRenderableFromScene = function removeRenderableFromScene(actor) {
        this.Scene.remove(renderable);
    }


    // * ------- UPDATE METHODS ------- * //

    this.update = function update() {
        ManagerPrototype.prototype.update.call(this);

        this.CameraManager.update();
    }


    // * ------- RENDERER METHODS ------- * //

    // * Create Renderer
    this.createRenderer = function createRenderer() {
        this.Renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector(this.canvasID)
            // antialias: true
        });
        this.Renderer.antialias = true;
        this.Renderer.gammaFactor = 2.2;
        this.Renderer.gammaOutput = true;
        this.Renderer.shadowMap.enabled = true;
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        // this.Renderer.physicallyCorrectLights = true;
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

    EventManager.registerEvent('add_renderable');
    EventManager.addEventListener('add_renderable', this.addRenderableToScene.bind(this));
}

GraphicsManager.prototype = Object.create(ManagerPrototype.prototype);
GraphicsManager.prototype.constructor = GraphicsManager;

export default GraphicsManager;
