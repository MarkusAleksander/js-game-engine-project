import { LIGHT_TYPES } from './LightTypes.js';

// TODO - Improve

// * -----------------------------------
// *    LIGHT FACTORY
// * -----------------------------------
const LightFactory = function LightFactory() {

    // * -----------------------------------
    // *    LIGHT FACTORY PROPERTIES
    // * -----------------------------------

    // * Current Light Unique ID
    this.cAuID = 1;


    // * -----------------------------------
    // *    LIGHT FACTORY METHODS
    // * -----------------------------------

    this.createLight = function createLight(settings) {
        let light = null;

        switch (settings.type) {
            case LIGHT_TYPES.DIRECTIONAL_LIGHT:
                light = new THREE.DirectionalLight(settings.color, settings.intensity);
                break;
            default:
                break;
        }

        light.position.set(
            settings.position.x,
            settings.position.y,
            settings.position.z
        )

        return light;
    }

}

export default LightFactory;