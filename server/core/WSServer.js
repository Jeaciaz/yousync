const socket = require('socket.io');
const { events } = require('./wsEvents');

class WSServer {
  constructor(http) {
    const io = socket(http);
    io.on('connection', socket => {
      console.log('user connected');

      Object.keys(events).forEach(eventName => {
        socket.on(eventName, msg => events[eventName](io, socket, msg));
      });
    });
  }
}

module.exports = WSServer;