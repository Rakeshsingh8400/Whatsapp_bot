// /whatsapp-bot/client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the server on component mount
    axios.get('http://localhost:3001/messages') // Update with your backend endpoint
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);

  const handleAddMessage = (text) => {
    // Add message to the server and update the state
    axios.post('http://localhost:3001/messages', { text }) // Update with your backend endpoint
      .then((response) => setMessages([...messages, response.data]))
      .catch((error) => console.error('Error adding message:', error));
  };

  const handleDeleteMessage = (id) => {
    // Delete message from the server and update the state
    axios.delete(`http://localhost:3001/messages/${id}`) // Update with your backend endpoint
      .then(() => setMessages(messages.filter((message) => message.id !== id)))
      .catch((error) => console.error('Error deleting message:', error));
  };

  return (
    <div>
      <h1>WhatsApp Bot</h1>
      <MessageList messages={messages} onDelete={handleDeleteMessage} />
      <AddMessageForm onAdd={handleAddMessage} />
    </div>
  );
};

export default App;
