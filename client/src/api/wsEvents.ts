export const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';

export const events = {
  [EVENT_SEND_MESSAGE](socket: SocketIOClient.Socket, message: any) {
    console.log('Message received: ', message);
  }
}
