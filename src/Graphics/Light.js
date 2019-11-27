import Utilities from './../Globals/Utilities.js';

// * -----------------------------------
// *    LIGHT PROTOTYPE
// * -----------------------------------
const LightPrototype = function LightPrototype(data) {

    // * -----------------------------------
    // *    LIGHT PROTOTYPE PROPERTIES
    // * -----------------------------------

    // * Unique id
    this.uID = data.id;
    // * Light Name (default is id)
    this.name = data.name !== undefined ? data.name : data.id;
    // * Light active status
    this.isActive = false;
    // * Is light on
    this.isSwitchedOn = false;
    // * Light object
    this.lightObj = null;
    // * Is registered
    this.isRegistered = false;

    // * Light Update function
    this.updateFunctions = [];

    // * light position target
    this.position = { x: 0, y: 0, z: 0 };
    this.target = { x: 0, y: 0, z: 0 };
    this.intensity = data.intensity !== undefined ? data.intensity : 0;
    this.color = data.color !== undefined ? data.color : 0xffffff;


    // * -----------------------------------
    // *    LIGHT PROTOTYPE METHODS
    // * -----------------------------------

    // * Set light Activity Status
    this.setActiveStatus = function setActiveStatus(status) {
        this.isActive = status;
    }

    // * Get Current light Active Status
    this.getActiveStatus = function getActiveStatus() {
        return this.isActive;
    }

    // * light Update Function
    this.update = function update() {
        // * Only update if Active
        if (!this.isActive) { return; }
        Utilities.outputDebug('updating light: ' + this.uID);

        // * Run registered update functions
        this.updateFunctions.forEach((fn) => {
            fn()
        });

        // * Synchronise Actor Mesh
        this.updateLight();
    }

    // * Add update function to light
    this.addUpdateFunction = function addUpdateFunction(fn) {
        this.updateFunctions.push(fn.bind(this));
    }

    // * Get ID
    this.getID = function getID() {
        return this.uID;
    }

    // * Get Mesh Object
    this.getLightObject = function getLightObject() {
        return this.lightObj;
    }

    // * Set Registered Status
    this.setRegisteredStatus = function setRegisteredStatus(status) {
        this.isRegistered = status;
    }

    // * Attach light
    this.attachLightObject = function attachLightObject(lightObj) {
        this.lightObj = lightObj;
    }

    // * Get Light
    this.getLightObject = function getLightObject() {
        this.lightObj;
    }

    // * ------- LIGHT MANIPULATION ------- * //

    // * Move Absolutely
    this.moveLightTo = function moveLightTo(loc) {
        this.position.x = loc.x !== undefined ? loc.x : this.position.x;
        this.position.y = loc.y !== undefined ? loc.y : this.position.y;
        this.position.z = loc.z !== undefined ? loc.z : this.position.z;
    }

    // * Move Relatively
    this.moveLightBy = function moveLightBy(loc) {
        this.position.x = loc.x !== undefined ? loc.x + this.position.x : this.position.x;
        this.position.y = loc.y !== undefined ? loc.y + this.position.y : this.position.y;
        this.position.z = loc.z !== undefined ? loc.z + this.position.z : this.position.z;
    }

    // * Move Target Absolutely
    this.moveLightTargetTo = function moveLightTargetTo(loc) {
        this.target.x = loc.x !== undefined ? loc.x : this.target.x;
        this.target.y = loc.y !== undefined ? loc.y : this.target.y;
        this.target.z = loc.z !== undefined ? loc.z : this.target.z;
    }

    // * Move Target Relatively
    this.moveLightTargetBy = function moveLightTargetBy(loc) {
        this.target.x = loc.x !== undefined ? loc.x + this.target.x : this.position.x;
        this.target.y = loc.y !== undefined ? loc.y + this.target.y : this.position.y;
        this.target.z = loc.z !== undefined ? loc.z + this.target.z : this.position.z;
    }

    // * Update intensity
    this.updateIntensity = function updateIntensity(int) {
        this.intensity = int;
    }

    // * get intensity
    this.getIntensity = function getIntensity() {
        return this.intensity;
    }

    // * Update color
    this.updateColor = function updateColor(color) {
        this.color = color;
    }

    // * get color
    this.getColor = function getColor() {
        return this.color;
    }

    // * Update mesh position and rotation
    this.updateLight = function updateLight() {
        this.lightObj.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        );

        this.lightObj.target.set(
            this.target.x,
            this.target.y,
            this.target.z
        );

        this.lightObj.intensity = this.intensity;
        this.lightObj.color = this.color;
    }
}

export default LightPrototype;
