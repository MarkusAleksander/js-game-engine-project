import Component from './Component.js';

const gAnimation = function gAnimation(data) {

    Component.call(this, "Animation");

    return this;
}

gAnimation.prototype = Object.create(Component.prototype);
gAnimation.prototype.constructor = gAnimation;

export default gAnimation;
