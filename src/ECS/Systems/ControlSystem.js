import System from "./System.js";
import ControllerMgr from "./../../Controller/ControllerManager.js";

const ControlSystem = function ControlSystem() {
    System.call(this, {
        components: ["Control"],
    });

    let _self = this;

    this.update = function update(dT) {
        // this.EntityList.forEach(function forEachEntity(entity) {
        //     // .. Do something with current input
        // });
    };

    return this;
};

ControlSystem.prototype = Object.create(System.prototype);
ControlSystem.prototype.constructor = ControlSystem;

export default ControlSystem;
