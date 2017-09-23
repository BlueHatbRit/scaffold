const events = require("events");

let eventRegistry = new events.EventEmitter();
eventRegistry.setMaxListeners(100);

module.exports = eventRegistry;
