const express = require('express');
const { Low, JSONFile } = require('lowdb');
const app = express();
const port = 3000;

app.use(express.json());

const db = new Low(new JSONFile('db.json'));

async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = { dishes: [] };
    await db.write();
  }
}

app.post('/dishes', async (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Please provide name, price, and category' });
  }

  const newDish = {
    id: db.data.dishes.length + 1,
    name,
    price,
    category,
  };

  db.data.dishes.push(newDish);
  await db.write();

  res.status(201).json(newDish);
});

app.get('/dishes', async (req, res) => {
  await db.read();
  res.json(db.data.dishes);
});

app.get('/dishes/:id', async (req, res) => {
  await db.read();
  const dish = db.data.dishes.find(d => d.id === parseInt(req.params.id));
  if (!dish) {
    return res.status(404).json({ error: 'Dish not found' });
  }
  res.json(dish);
});

app.put('/dishes/:id', async (req, res) => {
  await db.read();
  const { name, price, category } = req.body;
  const dishIndex = db.data.dishes.findIndex(d => d.id === parseInt(req.params.id));

  if (dishIndex === -1) {
    return res.status(404).json({ error: 'Dish not found' });
  }

  const updatedDish = {
    ...db.data.dishes[dishIndex],
    name: name || db.data.dishes[dishIndex].name,
    price: price || db.data.dishes[dishIndex].price,
    category: category || db.data.dishes[dishIndex].category,
  };

  db.data.dishes[dishIndex] = updatedDish;
  await db.write();

  res.json(updatedDish);
});

app.delete('/dishes/:id', async (req, res) => {
  await db.read();
  const dishIndex = db.data.dishes.findIndex(d => d.id === parseInt(req.params.id));

  if (dishIndex === -1) {
    return res.status(404).json({ error: 'Dish not found' });
  }

  db.data.dishes.splice(dishIndex, 1);
  await db.write();

  res.status(204).send();
});

app.get('/dishes/get', async (req, res) => {
  const { name } = req.query;
  await db.read();

  const matchingDishes = db.data.dishes.filter(dish =>
    dish.name.toLowerCase().includes(name.toLowerCase())
  );

  if (matchingDishes.length > 0) {
    return res.json(matchingDishes);
  }

  res.status(404).json({ message: 'No dishes found' });
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
