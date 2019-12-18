import System from './System.js';

const AnimationSystem = function AnimationSystem() {

    System.call(this, {
        components: ["Animation", "Render"]
    });

    let _self = this;

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            let animation = entity.getComponent("Animation");

            if (!animation.isReady) {
                if (animation.animations.length) {
                    _self.setupAnimations(entity);
                }
                return;
            }
            animation.animationMixer.update(dT * 0.002 * animation.animationSpeed);

        });
    }

    this.setupAnimations = function setupAnimations(entity) {

        let animation = entity.getComponent("Animation"),
            render = entity.getComponent("Render");

        if (!render.hasLoaded) { return; }

        let animations = {};

        animation.animations.forEach(function (anim) {
            animations[anim.name] = anim;
        });

        // * Create mixer
        animation.animationMixer = new THREE.AnimationMixer(render.renderable);
        animation.animationAliases.forEach(function forEachAnimation(animName, animKey) {
            animation.animationActions.set(
                animKey,
                animation.animationMixer.clipAction(
                    animations[animName]
                ));
        });

        animation.isReady = true;

        this.setAnimation(entity.getUID(), "idle");

    }

    this.setAnimation = function setAnimation(entityUID, animationName) {
        let entity = this.EntityList.get(entityUID);

        if (!entity) { return; }

        let animation = entity.getComponent("Animation");

        let requestedAnimationAction = animation.animationActions.get(animationName);

        if (!requestedAnimationAction) { return; }

        let from = animation.animationActions.get(animation.currentAnimation);


        requestedAnimationAction.enabled = true;
        requestedAnimationAction.reset();
        requestedAnimationAction.play();

        from.crossFadeTo(requestedAnimationAction, 200 / 1000, true);

        animation.previousAnimation = animation.currentAnimation;
        animation.currentAnimation = animationName;

    }
}

AnimationSystem.prototype = Object.create(System.prototype);
AnimationSystem.prototype.constructor = AnimationSystem;

export default AnimationSystem;
