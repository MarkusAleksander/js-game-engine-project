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
                _self.createRenderable(render);
                return;
            }

            render.renderable.position.set(
                translation.currentPosition.x || 0,
                translation.currentPosition.y || 0,
                translation.currentPosition.z || 0
            );
            render.renderable.rotation.set(
                translation.currentRotation.x || 0,
                translation.currentRotation.y || 0,
                translation.currentRotation.z || 0
            );

        });
    }

    this.createRenderable = function createRenderable(renderData) {
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
