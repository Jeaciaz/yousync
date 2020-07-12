const ADD_MESSAGE = 'yousync/chat/ADD_MESSAGE';
const EDIT_MESSAGE = 'yousync/chat/EDIT_MESSAGE';
const DELETE_MESSAGE = 'yousync/chat/DELETE_MESSAGE';
const NOOP = 'yousync/chat/NOOP';

export type Message = {
  author: string,
  message: string,
  time: Date
}

type ChatAction = 
  | { type: typeof ADD_MESSAGE, author: string, message: string, time: Date }
  | { type: typeof EDIT_MESSAGE, index: number, newMessage: string }
  | { type: typeof DELETE_MESSAGE, index: number }
  | { type: typeof NOOP };

const defaultState: ChatState = {
  messages: []
}

export type ChatState = {
  messages: Message[]
}

export default function reducer (state = { ...defaultState }, action: ChatAction = { type: NOOP }) {
  switch (action.type) {
    case ADD_MESSAGE:
      console.log(state);
      return {
        ...state,
        messages: [...state.messages, 
          {
            author: action.author,
            message: action.message,
            time: action.time
          }
        ]
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message, index) => index === action.index ? action.newMessage : message)
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message, index) => index !== action.index)
      };
    default:
      return state;
  }
}

export function addMessage(author: string, message: string, time: Date): ChatAction {
  return {
    author,
    message,
    time,
    type: ADD_MESSAGE
  }
}

export function editMessage(index: number, newMessage: string): ChatAction {
  return {
    index,
    newMessage,
    type: EDIT_MESSAGE
  }
}

export function deleteMessage(index: number): ChatAction {
  return {
    index,
    type: DELETE_MESSAGE
  }
}
