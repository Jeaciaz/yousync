import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Index() {
  const [roomKey, setRoomKey] = useState('');
  const [redirect, setRedirect] = useState('');

  return redirect ? <Redirect to={redirect} /> : (
    <form onSubmitCapture={e => setRedirect(roomKey)}>
      <input type="text" value={roomKey} onChange={e => setRoomKey(e.currentTarget.value)} />
      <button>Перейти</button>
    </form>
  );
}