// /whatsapp-bot/server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Update with the port you want to use

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whatsapp-bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Message schema
const messageSchema = new mongoose.Schema({
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// CRUD operations

// Create
app.post('/messages', (req, res) => {
  const { text } = req.body;
  const newMessage = new Message({ text });

  newMessage.save((err, savedMessage) => {
    if (err) {
      res.status(500).json({ error: 'Error saving message' });
    } else {
      res.json(savedMessage);
    }
  });
});

// Read (Get all messages)
app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching messages' });
    } else {
      res.json(messages);
    }
  });
});

// Delete
app.delete('/messages/:id', (req, res) => {
  const { id } = req.params;

  Message.findByIdAndDelete(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting message' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
