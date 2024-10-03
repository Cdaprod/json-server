const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/config/routes') {
    const routesPath = path.join(__dirname, '..', 'config', 'routes.json');
    fs.writeFileSync(routesPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Routes updated successfully' });
  } else {
    next();
  }
};