const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.sqlite');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path.startsWith('/api/')) {
    const resource = req.path.split('/')[2];
    db.run(`INSERT INTO ${resource} (data) VALUES (?)`, JSON.stringify(req.body), function(err) {
      if (err) {
        res.status(500).json({ error: 'Failed to add data' });
      } else {
        res.json({ message: 'Data added successfully', id: this.lastID });
      }
    });
  } else {
    next();
  }
};