import { DEBUG_MODE, SINGLE_FRAME_RENDER, PERFORMANCE_DETAIL_ON } from './Globals.js';

const Utilities = (function Utilities() {

    // * Utility data with defaults
    var data = {
        runningMode: DEBUG_MODE,
        renderMode: SINGLE_FRAME_RENDER,
        performanceMode: PERFORMANCE_DETAIL_ON
    }


    // * -----------------------------------
    // *    SYSTEM UTILITIES
    // * -----------------------------------

    // * Set current running mode
    function _setRunningMode(mode) {
        data.runningMode = mode;
    }

    function _getRunningMode() {
        return data.runningMode
    }

    // * Output debug messages
    function _outputDebug(message) {
        if (_getRunningMode() === DEBUG_MODE) {
            console.log(message);
        }
    }

    // * Render Mode
    function _setRenderMode(mode) {
        data.renderMode = mode;
    }

    function _getRenderMode() {
        return data.renderMode;
    }

    // * Performance Mode
    function _setPerformanceMode(mode) {
        data.performanceMode = mode;
    }

    function _getPerformanceMode() {
        return data.performanceMode;
    }

    // * -----------------------------------
    // *    MATHS
    // * -----------------------------------

    // * Rad to Deg
    function _radToDeg(radians) {
        return radians * (180 / Math.PI);
    }

    // * Deg to Rad
    function _degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    // * Vector3 Interface
    function _vector3(vec = { x: 0, y: 0, z: 0 }) {
        return new THREE.Vector3(
            vec.x !== undefined ? vec.x : 0,
            vec.y !== undefined ? vec.y : 0,
            vec.z !== undefined ? vec.z : 0
        );
    }

    // * Vector2 Interface
    function _vector2(vec = { x: 0, y: 0 }) {
        return new THREE.Vector2(
            vec.x !== undefined ? vec.x : 0,
            vec.y !== undefined ? vec.y : 0
        );
    }

    // * -----------------------------------
    // *    HELPERS
    // * -----------------------------------

    // * Check if undefined and return item or predefined value
    function _checkUndefinedAndReturn(itemToCheck, returnIfUndefined) {
        return itemToCheck !== undefined ? itemToCheck : returnIfUndefined;
    }

    return {
        // * -----------------------------------
        // *    SYSTEM UTILITIES
        // * -----------------------------------
        setRunningMode: _setRunningMode,
        getRunningMode: _getRunningMode,

        setRenderMode: _setRenderMode,
        getRenderMode: _getRenderMode,

        setPerformanceMode: _setPerformanceMode,
        getPerformanceMode: _getPerformanceMode,

        outputDebug: _outputDebug,

        // * -----------------------------------
        // *    MATHS
        // * -----------------------------------
        radToDeg: _radToDeg,
        degToRad: _degToRad,
        Vector3: _vector3,
        Vector2: _vector2,

        // * -----------------------------------
        // *    HELPERS
        // * -----------------------------------
        checkUndefinedAndReturn: _checkUndefinedAndReturn
    }

})();

export default Utilities;
