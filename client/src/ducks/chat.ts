import api from "../api";
import {Thunk} from "../store";

const ADD_MESSAGE = 'yousync/chat/ADD_MESSAGE';
const SET_MESSAGE_LIST = 'yousync/chat/SET_MESSAGE_LIST';

export type Message = {
  author: string,
  text: string
}

interface ActionAddMessage {
  type: typeof ADD_MESSAGE,
  author: string,
  text: string
}

interface ActionSetMessageList {
  type: typeof SET_MESSAGE_LIST,
  list: Message[]
}

type ChatAction = ActionAddMessage | ActionSetMessageList;

const defaultState: ChatState = {
  messages: []
}

export type ChatState = {
  messages: Message[]
}

export default function reducer (state = { ...defaultState }, action: ChatAction) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, 
          {
            author: action.author,
            text: action.text
          }
        ]
      };
    case SET_MESSAGE_LIST:
      return {
        ...state,
        messages: action.list
      }
    default:
      return state;
  }
}

export function addMessage(author: string, text: string): ChatAction {
  return {
    author,
    text,
    type: ADD_MESSAGE
  }
}

export function setMessageList(list: Message[]): ChatAction {
  return {
    list,
    type: SET_MESSAGE_LIST
  }
}

export function resetMessageList(roomKey: string): Thunk {
  return async function (dispatch) {
    const { data } = await api.get(`rooms/${roomKey}/`);

    dispatch(setMessageList(data.chatMessages));
  }
}
