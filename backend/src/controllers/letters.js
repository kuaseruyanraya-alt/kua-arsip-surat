const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// In-memory store for demo
const Letters = [];
let idSeq = 1;

router.post('/', (req, res) => {
  const { type, date, data } = req.body;
  const letter = {
    id: idSeq++,
    type,
    date,
    data: data || {},
    status: 'draft',
    created_at: new Date().toISOString()
  };
  Letters.push(letter);
  res.json(letter);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const letter = Letters.find(l => l.id === id);
  if (!letter) return res.status(404).json({ error: 'Not found' });
  res.json(letter);
});

// generate simple PDF-like HTML using EJS template and return rendered HTML (for demo)
router.post('/:id/generate-pdf', (req, res) => {
  const id = Number(req.params.id);
  const letter = Letters.find(l => l.id === id);
  if (!letter) return res.status(404).json({ error: 'Not found' });

  // render template matching type if exists, fallback to generic
  const templateName = letter.type || 'generic';
  res.render(templateName, { letter }, (err, html) => {
    if (err) {
      return res.status(500).json({ error: 'Render error', details: err.message });
    }
    // For demo, return HTML. In real app convert to PDF buffer (puppeteer).
    res.send(html);
  });
});

module.exports = router;
