const gEvent = function gEvent(eventData) {
    this.name = eventData.name;
    this.callbacks = [];
}

gEvent.prototype.registerCallback = function registerCallback(callback) {
    this.callbacks.push(callback);
}

export default gEvent;
