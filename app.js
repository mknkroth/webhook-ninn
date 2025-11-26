const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('----------------------------');
  console.log('Time:    ', new Date().toISOString());
  console.log('Method:  ', req.method);
  console.log('URL:     ', req.originalUrl);
  console.log('Headers: ', req.headers);
  console.log('Body:    ', req.body);
  console.log('----------------------------');
  next();
});

app.all('/webhook/ninn', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST method is allowed for /webhook/ninn');
  }
  next();
});

app.post('/webhook/ninn', (req, res) => {
  console.log('✅ Received POST /webhook/ninn:', req.body);
  res.status(200).send('Webhook received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on http://localhost:${PORT}`);
});
