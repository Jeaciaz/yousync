import { chatStore } from '../store';

export const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';
export const EVENT_JOIN_ROOM = 'EVENT_JOIN_ROOM';

export const events = {
  [EVENT_SEND_MESSAGE](message: any) {
    chatStore.getState().addMessage(message.author, message.text);
  }
}
