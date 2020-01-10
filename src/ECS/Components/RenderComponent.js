import Component from "./Component.js";

const Render = function Render(data) {
    this.renderable = data.renderable || new THREE.Object3D();
    this.hasLoaded = false;
    this.isLoading = false;
    this.type = data.type || "unknown";

    this.meshData = {
        isVisible: data.isVisible || false,
        src: data.src || "",
        scale: data.scale || 1,
        castShadow: data.castShadow || false,
        receiveShadow: data.receiveShadow || false,
        type:
            data.geometry !== undefined
                ? data.geometry.type || "unknown"
                : "unknown",
        geometry: data.geometry !== undefined ? data.geometry.data || {} : {},
        material: data.material !== undefined ? data.material || {} : {},
    };

    Component.call(this, "Render");

    return this;
};

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

export default Render;
