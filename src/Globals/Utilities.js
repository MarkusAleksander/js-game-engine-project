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
        degToRad: _degToRad
    }

})();

export default Utilities;
