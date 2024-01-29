// src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages, onDelete }) => {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          {message.text}
          <button onClick={() => onDelete(message.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
