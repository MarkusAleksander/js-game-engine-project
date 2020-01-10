import Component from "./Component.js";

const Render = function Render(data) {
    this.renderable = data.renderable || new THREE.Object3D();
    this.hasLoaded = false;
    this.isLoading = false;
    this.type = data.type || "unknown";

    this.renderData = {
        isVisible: data.isVisible || false,
        src: data.src || "",
        scale: data.scale || 1,
        castShadow: data.castShadow || false,
        receiveShadow: data.receiveShadow || false,
    };

    if (data.geometry) {
        let geometry = data.geometry;

        this.renderData.type = geometry.type || {};
        this.renderData.geometry = geometry.data || {};
        this.renderData.material = data.material || {};
    }

    if (data.light) {
        debugger;
        let light = data.light;

        this.renderData.light = light || {};
    }

    Component.call(this, "Render");

    return this;
};

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

export default Render;
