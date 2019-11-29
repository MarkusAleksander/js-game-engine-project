import { LIGHT_TYPES } from './LightTypes.js';
import LightPrototype from './Light.js';

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

        // TODO - Improve construction - note - color is different for hemi
        const light = new LightPrototype({
            id: this.cAuID++,
            color: settings.color,
            intensity: settings.intensity,
            position: settings.position,
            target: settings.target
        });

        let lightObj = null;

        switch (settings.type) {
        case LIGHT_TYPES.DIRECTIONAL:
            lightObj = new THREE.DirectionalLight(light.getColor(), light.getIntensity());
            break;
        case LIGHT_TYPES.AMBIENT:
            lightObj = new THREE.AmbientLight(light.getColor(), light.getIntensity());
            break;
        case LIGHT_TYPES.HEMISPHERE:
            lightObj = new THREE.HemisphereLight(settings.skyColor, settings.groundColor, light.getIntensity);
            break;
        default:
            break;
        }

        light.attachLightObject(lightObj);

        return light;
    }

}

export default LightFactory;
