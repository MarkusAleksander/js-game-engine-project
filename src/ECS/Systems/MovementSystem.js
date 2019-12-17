import System from './System.js';

const MovementSystem = function MovementSystem() {

    System.call(this, {
        components: ["Translation"]
    });

    return this;
}

MovementSystem.prototype = Object.create(System.prototype);
MovementSystem.prototype.constructor = MovementSystem;

export default MovementSystem;
