import gEvent from './Event.js';

const EventManager = function EventManager() {

    this.events = {};
}

EventManager.prototype.registerEvent = function registerEvent(eventName) {
    this.events[eventName] = new gEvent({ name: eventName });
}

EventManager.prototype.dispatchEvent = function dispatchEvent(eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function forEachCallback(callback) {
        callback(eventArgs);
    });
}

EventManager.prototype.addEventListener = function addEventListener(eventName, callback) {
    this.events[eventName].registerCallback(callback);
}

const EventMgr = new EventManager();

export default EventMgr;
