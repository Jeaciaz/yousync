const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';
const EVENT_JOIN_ROOM = 'EVENT_JOIN_ROOM';

const RoomController = require('../controllers/RoomController');

const events = {
  async [EVENT_SEND_MESSAGE](socket, message) {
    console.log('Message received: ', message);
    if (socket.rooms.length === 1) {
      throw new Error('Client is not in a room!');
    }

    const room = Object.keys(socket.rooms)[1];
    console.log(socket.rooms);

    socket.to(room).emit(EVENT_SEND_MESSAGE, message);
    RoomController.sendChatMessage(await RoomController.getRoom(room), message.author, message.message);
  },
  [EVENT_JOIN_ROOM](socket, message) {
    console.log('User joined room: ', message);

    socket.join(message);
  }
}

module.exports = {
  events
}
