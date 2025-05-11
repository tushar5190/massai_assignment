const express = require('express');
const { Low, JSONFile } = require('lowdb');
const app = express();
const port = 3000;

app.use(express.json());

const db = new Low(new JSONFile('db.json'));

async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = { books: [] };
    await db.write();
  }
}

app.post('/books', async (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Please provide title, author, and year' });
  }

  const newBook = {
    id: db.data.books.length + 1,
    title,
    author,
    year,
  };

  db.data.books.push(newBook);
  await db.write();

  res.status(201).json(newBook);
});

app.get('/books', async (req, res) => {
  await db.read();
  res.json(db.data.books);
});

app.get('/books/:id', async (req, res) => {
  await db.read();
  const book = db.data.books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

app.put('/books/:id', async (req, res) => {
  await db.read();
  const { title, author, year } = req.body;
  const bookIndex = db.data.books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const updatedBook = {
    ...db.data.books[bookIndex],
    title: title || db.data.books[bookIndex].title,
    author: author || db.data.books[bookIndex].author,
    year: year || db.data.books[bookIndex].year,
  };

  db.data.books[bookIndex] = updatedBook;
  await db.write();

  res.json(updatedBook);
});

app.delete('/books/:id', async (req, res) => {
  await db.read();
  const bookIndex = db.data.books.findIndex(b => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  db.data.books.splice(bookIndex, 1);
  await db.write();

  res.status(204).send();
});

app.get('/books/search', async (req, res) => {
  const { author, title } = req.query;
  await db.read();

  let matchingBooks = db.data.books;

  if (author) {
    matchingBooks = matchingBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    matchingBooks = matchingBooks.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (matchingBooks.length > 0) {
    return res.json(matchingBooks);
  }

  res.status(404).json({ message: 'No books found' });
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
