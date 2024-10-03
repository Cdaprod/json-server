const express = require('express');
const bodyParser = require('body-parser');
const cronManager = require('./cronManager');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/cron/add', (req, res) => {
    const { name, schedule, task } = req.body;
    cronManager.addJob(name, schedule, task);
    res.json({ message: 'Cron job added successfully' });
});

app.post('/cron/remove', (req, res) => {
    const { name } = req.body;
    cronManager.removeJob(name);
    res.json({ message: 'Cron job removed successfully' });
});

app.get('/cron/list', (req, res) => {
    res.json(cronManager.jobs);
});

app.listen(port, () => {
    console.log(`Cron manager running at http://localhost:${port}`);
});