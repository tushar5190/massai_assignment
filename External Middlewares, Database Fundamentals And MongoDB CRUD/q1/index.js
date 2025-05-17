const express = require('express');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5,
  message: { error: 'Too many requests, please try again later.' },
});

app.use('/api/limited', limiter);

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
