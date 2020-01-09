import System from "./System.js";
import EventManager from "./../../EventSystem/EventManager.js";
import RenderFactory from "./../../Renderable/RenderableFactory.js";

const RenderSystem = function RenderSystem() {
    System.call(this, {
        components: ["Render", "Translation"],
    });

    let _self = this;

    // this.GLTFLoader = new THREE.GLTFLoader();

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let translation = entity.getComponent("Translation"),
                render = entity.getComponent("Render");

            if (render.isLoading) {
                // * Don't do anything if loading
                return;
            }

            if (!render.hasLoaded && !render.isLoading) {
                // * If the render hasn't loaded, and isn't in the process of doing so, it needs to be loaded
                _self.createRenderable(entity);
                return;
            }

            // * Update the renderable with the position and rotation data
            render.renderable.position.set(
                translation.currentPosition.x || 0,
                translation.currentPosition.y || 0,
                translation.currentPosition.z || 0
            );
            render.renderable.applyQuaternion(translation.currentRotation);
        });
    };

    this.createRenderable = function createRenderable(entity) {
        let render = entity.getComponent("Render");
        let translation = entity.getComponent("Translation");
        let animation = entity.getComponent("Animation");
        let base = entity.getComponent("Base");

        if (render.type === "load") {
            // * Load by GLTF
            render.isLoading = true;

            RenderFactory.loadByGLTF(
                render,
                (gltf) => {
                    if (translation) {
                        render.renderable.position.set(
                            translation.initialPosition.x || 0,
                            translation.initialPosition.y || 0,
                            translation.initialPosition.z || 0
                        );
                        render.renderable.applyQuaternion(
                            translation.initialRotation
                        );
                    }

                    if (animation) {
                        animation.animations = gltf.animations;
                    }

                    if (base.isActive) {
                        EventManager.dispatchEvent(
                            "add_renderable",
                            render.renderable
                        );
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

            return;
        }

        if (render.type === "simple") {
            render.isLoading = true;

            RenderFactory.loadSimpleMesh();

            render.hasLoaded = true;
        }
    };

    return this;
};

RenderSystem.prototype = Object.create(System.prototype);
RenderSystem.prototype.constructor = RenderSystem;

export default RenderSystem;
