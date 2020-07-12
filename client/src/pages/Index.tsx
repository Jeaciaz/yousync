import React, { useState } from 'react';
import { sendEvent, initSocket } from '../api/wsApi';
import { EVENT_SEND_MESSAGE } from '../api/wsEvents';

export default function Index() {
  const [message, setMessage] = useState('');

  React.useEffect(initSocket, []);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    sendEvent(EVENT_SEND_MESSAGE, message);
    setMessage('');
  }

  return (
    <form onSubmit={submitForm}>
      <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)} />
      <input type="button" value="Send message" />
    </form>
  )
}
