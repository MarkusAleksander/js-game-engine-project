import gEvent from './Event.js';

const EventManager = function EventManager() {
    this.events = {};
}

EventManager.prototype.registerEvent = function registerEvent(eventName) {
    if (this.events[eventName]) { return; }
    this.events[eventName] = new gEvent({ name: eventName });
}

EventManager.prototype.dispatchEvent = function dispatchEvent(eventName, eventArgs) {
    if (!this.events[eventName]) { return; }

    this.events[eventName].callbacks.forEach(function forEachCallback(callback) {
        callback(eventArgs);
    });
}

EventManager.prototype.addEventListener = function addEventListener(eventName, callback) {
    if (!this.events[eventName]) {return;}

    this.events[eventName].registerCallback(callback);
}

const EventMgr = new EventManager();

export default EventMgr;
