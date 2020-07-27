const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';
const EVENT_JOIN_ROOM = 'EVENT_JOIN_ROOM';

const events = {
  [EVENT_SEND_MESSAGE](io, socket, message) {
    console.log('Message received: ', message);
    console.log(socket.rooms);

    Object.keys(socket.rooms).forEach(room => {
      socket.to(room).emit(EVENT_SEND_MESSAGE, message)
    });
  },
  [EVENT_JOIN_ROOM](io, socket, message) {
    console.log('User joined room: ', message);

    socket.join(message.roomKey);
  }
}

module.exports = {
  events
}
