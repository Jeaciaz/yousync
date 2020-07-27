import React, { useState } from 'react';
import { initSocket, sendEvent } from '../api/wsApi';
import { EVENT_SEND_MESSAGE, EVENT_JOIN_ROOM } from '../api/wsEvents';
import * as chatActions from '../ducks/chat';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';

interface DispatchProps {
    addMessage: (author: string, text: string) => void,
    resetMessageList: (roomKey: string) => void
}

const mapStateToProps = (state: RootState) => ({
  messages: state.chat.messages
});

const mapDispatchToProps: DispatchProps = {
    addMessage: chatActions.addMessage,
    resetMessageList: chatActions.resetMessageList
};

interface UrlParams {
    roomKey: string
}

function Room(props: { messages: chatActions.Message[], addMessage: typeof chatActions.addMessage, resetMessageList: typeof chatActions.resetMessageList }) {
  const [message, setMessage] = useState('');
  const { roomKey } = useParams<UrlParams>();

  React.useEffect(() => {
    console.log(roomKey);
    props.resetMessageList(roomKey);
    initSocket();
    sendEvent(EVENT_JOIN_ROOM, roomKey);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    sendEvent(EVENT_SEND_MESSAGE, { author: localStorage.getItem('username'), message });
    props.addMessage(localStorage.getItem('username') || 'anon', message);
    setMessage('');
  }

  return (
    <form onSubmitCapture={submitForm}>
      <ul>
        { props.messages.map((message, index) => (
          <li key={index}>[{ message.author }] { message.text }</li>
        )) }
      </ul>
      <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)} />
      <input type="button" value="Send message" />
    </form>
  )
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Room);
