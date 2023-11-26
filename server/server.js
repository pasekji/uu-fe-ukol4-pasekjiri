const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const mockData = require('./mockData');
let shoppingLists = mockData.shoppingLists;
let users = mockData.users;

app.use(cors());
app.use(express.json());

app.get('/api/shopping-lists', (req, res) => {
    const userId = req.query.userId;
    const visibleLists = shoppingLists.filter(list => list.owner === userId || list.members.includes(userId));
    res.json(visibleLists);
});

app.post('/api/shopping-lists', (req, res) => {
  const newList = { ...req.body, id: Date.now() };
  shoppingLists.push(newList);
  res.status(201).json(newList);
});

app.put('/api/shopping-lists/:id', (req, res) => {
    const { id } = req.params;
    const index = shoppingLists.findIndex(list => list.id === Number(id));
    if (index >= 0) {
      shoppingLists[index] = { ...shoppingLists[index], ...req.body };
      res.json(shoppingLists[index]);
    } else {
      res.status(404).send('List not found');
    }
});

app.delete('/api/shopping-lists/:id', (req, res) => {
  const { id } = req.params;
  shoppingLists = shoppingLists.filter(list => list.id !== Number(id));
  res.status(204).send();
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; 