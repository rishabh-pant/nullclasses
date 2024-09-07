const express = require('express');
const router = express.Router();
const fs = require('fs');

// Vulnerable to SQL Injection
router.get('/user', (req, res) => {
  const userId = req.query.id;
  // Unsafe query
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  res.send('Query: ' + query);
});

// Vulnerable to Cross-Site Scripting (XSS)
router.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`);
});

// Vulnerable to Cross-Site Request Forgery (CSRF)
router.post('/submit', (req, res) => {
  const data = req.body.data;
  res.send(`Data received: ${data}`);
});

// Vulnerable to Insecure Direct Object Reference (IDOR)
router.get('/file', (req, res) => {
  const fileName = req.query.file;
  // Unsafe file read
  fs.readFile(`./files/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('File not found');
    }
    res.send(data);
  });
});

// Vulnerable to Security Misconfiguration
router.get('/config', (req, res) => {
  res.sendFile(path.join(__dirname, 'config.json'));
});

// Vulnerable to Sensitive Data Exposure
router.get('/secret', (req, res) => {
  res.json({ secret: 'SuperSecretKey12345' });
});

module.exports = router;
