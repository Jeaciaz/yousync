import React, { useState } from 'react';
import { initSocket, sendEvent } from '../api/wsApi';
import { EVENT_SEND_MESSAGE, EVENT_JOIN_ROOM } from '../api/wsEvents';
import { useParams } from 'react-router-dom';
import { Message, useChat } from "../store";
import { useQuery } from "react-query";
import { getChat } from "../api/chat";

interface UrlParams {
    roomKey: string
}

export default function Room() {
  const [message, setMessage] = useState('');
  const { roomKey } = useParams<UrlParams>();
  const { data: chatData, isLoading: isLoadingChat, error: loadingChatError } = useQuery(['chat', roomKey], getChat, { refetchOnMount: false, refetchOnWindowFocus: false });
  const chat = useChat();
  
  // Set chat from query
  React.useEffect(() => {
    chat.setMessageList(chatData);
  }, [roomKey, isLoadingChat, chatData]);
  
  // Init WebSocket
  React.useEffect(() => {
    initSocket();
    sendEvent(EVENT_JOIN_ROOM, roomKey);
  }, [roomKey]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    sendEvent(EVENT_SEND_MESSAGE, { author: localStorage.getItem('username'), text: message });
    chat.addMessage(localStorage.getItem('username') || 'anon', message);
    setMessage('');
  }
  
  if (isLoadingChat) {
    return <div>Loading...</div>;
  } else if (loadingChatError) {
    return <div>Error while loading chat: {JSON.parse(loadingChatError)}</div>
  }
  
  return (
    <form onSubmitCapture={submitForm}>
      <ul>
        { chat.messageList && chat.messageList.map((message: Message, index: number) => (
          <li key={index}>[{ message.author }] { message.text }</li>
        )) }
      </ul>
      <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)} />
      <input type="button" value="Send message" />
    </form>
  )
}
