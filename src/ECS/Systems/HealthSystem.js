import System from './System.js';

const HealthSystem = function HealthSystem() {

    System.call(this, {
        components: ["Health"]
    });

    return this;
}

HealthSystem.prototype = Object.create(System.prototype);
HealthSystem.prototype.constructor = HealthSystem;

export default HealthSystem;
