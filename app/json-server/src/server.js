const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Database setup
const db = new sqlite3.Database('./db/data.sqlite');

// Middleware
const middlewares = require('./middlewares');
app.use(middlewares);

// Routes
app.get('/is-docker', (req, res) => {
  res.json({ isDocker: true });
});

app.get('/config/routes.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'config', 'routes.json'));
});

app.post('/api/config/routes', (req, res) => {
  fs.writeFile(path.join(__dirname, 'config', 'routes.json'), JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update routes' });
    } else {
      res.json({ message: 'Routes updated successfully' });
    }
  });
});

app.post('/api/:resource', (req, res) => {
  const { resource } = req.params;
  const data = req.body;

  db.run(`INSERT INTO ${resource} (data) VALUES (?)`, JSON.stringify(data), function(err) {
    if (err) {
      res.status(500).json({ error: 'Failed to add data' });
    } else {
      res.json({ message: 'Data added successfully', id: this.lastID });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});