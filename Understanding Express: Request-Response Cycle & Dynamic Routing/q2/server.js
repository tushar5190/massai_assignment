const express = require('express');
const app = express();
const port = 3000;

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' }
];

app.get('/users/get', (req, res) => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  res.json(user);
});

app.get('/users/list', (req, res) => {
  res.json(users);
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
