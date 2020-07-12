const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';

const events = {
  [EVENT_SEND_MESSAGE](io, socket, message) {
    console.log('Message received: ' + message);

    io.emit(EVENT_SEND_MESSAGE, message);
  }
}

module.exports = {
  events
}
