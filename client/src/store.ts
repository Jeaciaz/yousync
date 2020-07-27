import {createStore, combineReducers, applyMiddleware, Action} from 'redux';
import chat, { ChatState } from './ducks/chat';
import thunk, {ThunkAction} from 'redux-thunk';

const store = createStore(combineReducers({ chat }), applyMiddleware(thunk));

export default store;

export type RootState = {
  chat: ChatState
}

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;