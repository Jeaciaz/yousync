import React, { useState } from 'react';
import { initSocket, sendEvent } from '../api/wsApi';
import { EVENT_SEND_MESSAGE, EVENT_JOIN_ROOM } from '../api/wsEvents';
import * as chatActions from '../ducks/chat';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';

const mapStateToProps = (state: RootState) => ({
  messages: state.chat.messages
});

function Room(props: { messages: chatActions.Message[], addMessage: typeof chatActions.addMessage }) {
  const [message, setMessage] = useState('');
  const roomKey = useParams<string>();

  React.useEffect(() => {
    initSocket();
    sendEvent(EVENT_JOIN_ROOM, roomKey);
  }, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date();

    sendEvent(EVENT_SEND_MESSAGE, { author: localStorage.getItem('username'), message, time });
    props.addMessage('me', message, time);
    setMessage('');
  }

  return (
    <form onSubmitCapture={submitForm}>
      <ul>
        { props.messages.map(message => (
          <li key={message.time + message.message}>[{message.time.toLocaleTimeString()}] { message.author }: { message.message }</li>
        )) }
      </ul>
      <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)} />
      <input type="button" value="Send message" />
    </form>
  )
}

export default connect(mapStateToProps, chatActions)(Room);
