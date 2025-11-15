const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { parseNIK } = require('./utils/nik');
const lettersController = require('./controllers/letters');

const app = express();
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// simple routes
app.post('/api/parse-nik', (req, res) => {
  const { nik } = req.body;
  const parsed = parseNIK(nik);
  if (!parsed) return res.status(400).json({ error: 'Invalid NIK' });
  res.json(parsed);
});

app.use('/api/letters', lettersController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on', PORT));
