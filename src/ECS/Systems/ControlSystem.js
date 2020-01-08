import System from "./System.js";
import ControllerMgr from "./../../Controller/ControllerManager.js";

const ControlSystem = function ControlSystem() {
    System.call(this, {
        components: ["Control"],
    });

    let _self = this;

    // * Ensure only one Control component is ever used

    this.addEntity = function addEntity(entity) {
        // TODO Could be improved?
        if (this.EntityList.length) {
            return;
        }

        System.prototype.addEntity.call(this, entity);

        let controlComponent = entity.getComponent("Control");

        controlComponent.controls.forEach(function(data, keyCode) {
            ControllerMgr.registerInputEvent(keyCode, ...data);
        });
    };

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
