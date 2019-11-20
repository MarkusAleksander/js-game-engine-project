import ManagerPrototype from '../ManagerPrototype/ManagerPrototype.js';

// * ------------------- Graphics Manager
const GraphicsManager = function GraphicsManager(data) {

    this.scene = null;
    this.renderer = null;
    this.canvasID = data.canvasID !== undefined ? data.canvasID : '';
    this.camera = null;
    this.shouldUpdateRenderAspect = false;

    ManagerPrototype.call(this, data);

    // * Override initialise function
    this.initialise = function initialise(cameraData) {
        console.log('initialising graphics manager');

        this.createScene();
        this.createRenderer();
        this.createCamera(cameraData);

        window.addEventListener('resize', () => {
            // TODO - Still skewing
            this.setUpdateRenderAspectStatus(true);
            this.setShouldRenderResize(true);
        });

        this.isInitialised = true;
    }

    // ? Get Graphics Engine (if needed to interact with directly)
    this.getGraphicsEngine = function getGraphicsEngine() {
        return this.GRAPHICS_LIBRARY;
    }

    // * Scene setup
    this.createScene = function createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xAAAAAA);
    }

    this.getScene = function getScene() {
        return this.scene;
    }

    this.addActorToScene = function addActorToScene(actor) {
        this.scene.add(actor.getActorMesh());
    }

    // * Renderer setup
    this.createRenderer = function createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector(this.canvasID) });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    this.getRenderer = function getRenderer() {
        return this.renderer;
    }

    this.setUpdateRenderAspectStatus = function setUpdateRenderAspectStatus(status) {
        this.shouldUpdateRenderAspect = status;
    }

    this.setShouldRenderResize = function setShouldRenderResize(status) {
        this.shouldResizeRenderer = status;
    }

    // * Render
    this.render = function render() {

        // TODO - Still skewing
        if (this.shouldUpdateRenderAspect) {
            let canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.setUpdateRenderAspectStatus(false);
        }

        // TODO - Still skewing
        if (this.shouldResizeRenderer) {
            let canvas = this.renderer.domElement;
            let width = window.innerWidth;
            let height = window.innerHeight;
            let needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                this.renderer.setSize(width, height);
            }
            this.setShouldRenderResize(false);
        }

        // * Doing render
        this.renderer.render(this.scene, this.camera);
    }

    // TODO - Export camera to a separate module, handled by the Graphics?

    // * Camera
    this.createCamera = function createCamera(cameraData) {
        let settings = [
            cameraData.fov !== undefined ? cameraData.fov : 75,
            cameraData.aspect !== undefined ? cameraData.aspect : window.innerWidth / window.innerHeight,
            cameraData.near !== undefined ? cameraData.near : 0.1,
            cameraData.far !== undefined ? cameraData.far : 500
        ]

        this.camera = new THREE.PerspectiveCamera(...settings);
    }

    this.getCamera = function getCamera() {
        return this.camera;
    }

    // * Move camera TO location
    this.moveCameraTo = function moveCameraTo(moveTo) {
        this.camera.position.x = moveTo.x !== undefined ? moveTo.x : this.camera.position.x;
        this.camera.position.y = moveTo.y !== undefined ? moveTo.y : this.camera.position.y;
        this.camera.position.z = moveTo.z !== undefined ? moveTo.z : this.camera.position.z;
    }

    // * Move camera BY
    this.moveCameraBy = function moveCameraBy(moveBy) {
        this.camera.position.x = moveBy.x !== undefined ? this.camera.position.x + moveBy.x : this.camera.position.x;
        this.camera.position.y = moveBy.y !== undefined ? this.camera.position.y + moveBy.y : this.camera.position.y;
        this.camera.position.z = moveBy.z !== undefined ? this.camera.position.z + moveBy.z : this.camera.position.z;
    }
}

GraphicsManager.prototype = Object.create(ManagerPrototype.prototype);
GraphicsManager.prototypeconstructor = GraphicsManager;

export default GraphicsManager;
