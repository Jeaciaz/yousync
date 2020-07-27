import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Index() {
  const [roomKey, setRoomKey] = useState('');
  const [newUsername, setNewUsername] = useState(localStorage.getItem('username') || '');
  const [redirect, setRedirect] = useState('');

  return redirect ? <Redirect to={redirect} /> : (
    <>
      <form onSubmitCapture={() => setRedirect(roomKey)}>
        <input type="text" value={roomKey} onChange={e => setRoomKey(e.currentTarget.value)} />
        <button>Перейти</button>
      </form>
      <form onSubmitCapture={() => localStorage.setItem('username', newUsername)}>
        <div>Поменять юзернейм</div>
        <input type="text" value={newUsername} onChange={e => setNewUsername(e.currentTarget.value)} />
        <button>Сменить</button>
      </form>
    </>
  );
}