import Component from './Component.js';

const Translation = function Translation(data) {

    this.position = data.position || { x: 0, y: 0, z: 0 };
    this.rotation = data.rotation || { x: 0, y: 0, z: 0 };

    Component.call(this, "Translation");

    return this;
}

Translation.prototype = Object.create(Component.prototype);
Translation.prototype.constructor = Translation;

export default Translation;
