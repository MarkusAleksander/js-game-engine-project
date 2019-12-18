import Component from './Component.js';

const Render = function Render(data) {

    this.isVisible = data.isVisible || false;
    this.renderable = data.renderable || new THREE.Object3D();
    this.src = data.src || "";
    this.scale = data.scale || 1;
    this.castShadow = data.castShadow || false;
    this.receiveShadow = data.receiveShadow || false;
    this.type = data.type || "unknown";
    this.hasLoaded = false;
    this.isLoading = false;

    Component.call(this, "Render");

    return this;
}

Render.prototype = Object.create(Component.prototype);
Render.prototype.constructor = Render;

export default Render;
