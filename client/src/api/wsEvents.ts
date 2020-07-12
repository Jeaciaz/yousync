import store from "../store";
import { addMessage } from "../ducks/chat";

export const EVENT_SEND_MESSAGE = 'EVENT_SEND_MESSAGE';
export const EVENT_JOIN_ROOM = 'EVENT_JOIN_ROOM';

export const events = {
  [EVENT_SEND_MESSAGE](message: any) {
    store.dispatch(addMessage(message.author || 'anon', message.message, new Date(Date.parse(message.time))));
  }
}
