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

                settings.isLoading = false;
                settings.hasLoaded = true;
                settings.renderable = scene;

                onload(gltf);
            },
            undefined,
            onError
        );
    };

    this.loadSimpleMesh = function loadSimpleMesh() {};
};

const RenderFactory = new RenderableFactory();

export default RenderFactory;
