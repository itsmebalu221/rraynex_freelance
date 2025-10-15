const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const REG_FILE = path.join(__dirname, 'build', 'luxe_registrations.txt');

app.post('/api/luxe-register', (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  const line = `${new Date().toISOString()}\t${email}\n`;
  fs.appendFile(REG_FILE, line, err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save registration' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Luxe registration server running on port ${PORT}`);
});
