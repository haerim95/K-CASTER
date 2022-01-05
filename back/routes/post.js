const express = require('express');
const router = express.Router();
router.post('/', (req, res) => {
  res.json({ id: 4, content: 'hello4' });
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
