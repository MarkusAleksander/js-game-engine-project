import System from './System.js';
import EventMgr from './../../EventSystem/EventManager.js';

const HealthSystem = function HealthSystem() {

    System.call(this, {
        components: ["Health"]
    });

    let _self = this;

    EventMgr.registerEvent('die');

    this.update = function update(dT) {
        this.EntityList.forEach(function forEachEntity(entity) {
            // debugger;
            let health = entity.getComponent("Health");

            // * Decrease Health
            health.value = health.value < 0 ? 0 : health.value -= 1;

            if (health.value <= 0) {
                _self.die.call(null, entity);
            }
        });
    }

    this.die = function die(data) {
        EventMgr.dispatchEvent('die', data);
    }

    return this;
}

HealthSystem.prototype = Object.create(System.prototype);
HealthSystem.prototype.constructor = HealthSystem;

export default HealthSystem;
