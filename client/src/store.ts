import { createStore, combineReducers } from 'redux';
import chat, { ChatState } from './ducks/chat';

const store = createStore(combineReducers({ chat }));

export default store;

export type RootState = {
  chat: ChatState
}