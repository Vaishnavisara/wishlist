const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxLnSmKR62kxIuSb58SzOapfL11k5txsSChxl_k6pKVr7QdVNqvtzKS9whiRkHzv4pk/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );
    const result = await response.text();
    res.send(result);
  } catch (error) {
    res.status(500).send('Error forwarding request');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});