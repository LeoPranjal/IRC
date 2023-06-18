const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/savemessage', (req, res) => {
  const message = req.body.message;

  // Read the existing messages from the JSON file
  const messagesData = fs.readFileSync('public/messages.json');
  const messages = JSON.parse(messagesData).messages;

  // Add the new message
  messages.push(message);

  // Update the JSON file with the new messages
  fs.writeFileSync('public/messages.json', JSON.stringify({ messages: messages }));

  // Send a response
  res.json({ success: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
app.post('/removemessage', (req, res) => {
    const index = req.body.index;
  
    // Read the existing messages from the JSON file
    const messagesData = fs.readFileSync('public/messages.json');
    const messages = JSON.parse(messagesData).messages;
  
    // Check if the index is valid
    if (index >= 0 && index < messages.length) {
      // Remove the message at the specified index
      messages.splice(index, 1);
  
      // Update the JSON file with the updated messages
      fs.writeFileSync('public/messages.json', JSON.stringify({ messages: messages }));
  
      // Send a response
      res.json({ success: true });
    } else {
      // Invalid index
      res.status(400).json({ success: false, error: 'Invalid index' });
    }
  });
  
