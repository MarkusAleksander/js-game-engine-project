import Component from './Component.js';

const gAnimation = function gAnimation(data) {

    this.animations = [];
    this.animationAliases = data.animationAliases || new Map();
    this.animationSpeed = data.animationSpeed || 1;
    this.isReady = false;
    this.animationMixer = null; //new THREE.AnimationMixer();
    this.animationActions = new Map();
    this.currentAnimation = data.currentAnimation || "idle";
    this.previousAnimation = this.currentAnimation;

    Component.call(this, "Animation");

    return this;
}

gAnimation.prototype = Object.create(Component.prototype);
gAnimation.prototype.constructor = gAnimation;

export default gAnimation;
