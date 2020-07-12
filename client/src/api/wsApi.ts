import openSocket from 'socket.io-client';
import { events } from './wsEvents';

let socket: SocketIOClient.Socket;

export function initSocket() {
  socket = openSocket('http://localhost:8000');

  Object.keys(events).forEach(eventName => {
    socket.on(eventName, (msg: any) => {
      events[eventName as keyof typeof events](socket, msg);
    });
  });
}

export function sendEvent(eventName: keyof typeof events, msg: any) {
  socket.emit(eventName, msg);
}