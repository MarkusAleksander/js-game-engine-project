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
                _self.createRenderable(entity);
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

    this.createRenderable = function createRenderable(entity) {
        let render = entity.getComponent("Render");
        let translation = entity.getComponent("Translation");
        let animation = entity.getComponent("Animation");

        if (render.type == "load") {
            // * Load by GLTF
            render.isLoading = true;

            this.GLTFLoader.load(
                render.src,
                (gltf) => {
                    // debugger;
                    let scene = gltf.scene;

                    scene.scale.set(render.scale, render.scale, render.scale);
                    scene.traverse((item) => {
                        if (item.isMesh) {
                            item.castShadow = render.castShadow;
                            item.receiveShadow = render.receiveShadow
                        }
                    });
                    scene.add(new THREE.AxesHelper(3 / render.scale));

                    render.isLoading = false;
                    render.hasLoaded = true;
                    render.renderable = scene;

                    if (translation) {
                        render.renderable.position.set(
                            translation.initialPosition.x || 0,
                            translation.initialPosition.y || 0,
                            translation.initialPosition.z || 0
                        );
                        render.renderable.applyQuaternion(translation.initialRotation);
                    }

                    if (animation) {
                        animation.animations = gltf.animations;
                    }

                    EventManager.dispatchEvent("add_renderable", render.renderable);
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
