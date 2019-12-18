import System from './System.js';
import EventManager from './../../EventSystem/EventManager.js';

const RenderSystem = function RenderSystem() {

    System.call(this, {
        components: ["Translation", "Render"]
    });


    let _self = this;

    this.GLTFLoader = new THREE.GLTFLoader();

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {

            let translation = entity.getComponent("Translation"),
                render = entity.getComponent("Render");

            if (render.isLoading) {
                return;
            }

            if (!render.hasLoaded && !render.isLoading) {
                _self.createRenderable(render, translation);
                return;
            }
            // debugger;
            render.renderable.position.set(
                translation.currentPosition.x || 0,
                translation.currentPosition.y || 0,
                translation.currentPosition.z || 0
            );
            render.renderable.applyQuaternion(translation.currentRotation);

        });
    }

    this.createRenderable = function createRenderable(renderData, translationData) {
        if (renderData.type == "load") {
            // * Load by GLTF
            renderData.isLoading = true;

            this.GLTFLoader.load(
                renderData.src,
                (gltf) => {
                    // debugger;
                    let scene = gltf.scene;

                    scene.scale.set(renderData.scale, renderData.scale, renderData.scale);
                    scene.traverse((item) => {
                        if (item.isMesh) {
                            item.castShadow = renderData.castShadow;
                            item.receiveShadow = renderData.receiveShadow
                        }
                    });
                    scene.add(new THREE.AxesHelper(3 / renderData.scale));

                    scene.position.set(
                        translationData.initialPosition.x || 0,
                        translationData.initialPosition.y || 0,
                        translationData.initialPosition.z || 0
                    );
                    scene.applyQuaternion(translationData.initialRotation);

                    renderData.isLoading = false;
                    renderData.hasLoaded = true;
                    renderData.renderable = scene;

                    EventManager.dispatchEvent("add_renderable", renderData.renderable);
                },
                undefined,
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    return this;
}

RenderSystem.prototype = Object.create(System.prototype);
RenderSystem.prototype.constructor = RenderSystem;

export default RenderSystem;
