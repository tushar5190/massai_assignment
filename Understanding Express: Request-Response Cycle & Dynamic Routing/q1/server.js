const express = require('express');
const app = express();
const port = 3000;

app.get('/home', (req, res) => {
  res.send('<h1>Welcome to Home Page</h1>');
});

app.get('/aboutus', (req, res) => {
  res.json({ message: 'Welcome to About Us' });
});

app.get('/contactus', (req, res) => {
  res.json({
    contact: {
      email: 'contact@company.com',
      phone: '123-456-7890',
    },
  });
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
