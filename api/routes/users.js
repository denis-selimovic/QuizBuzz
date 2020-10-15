const express = require('express');
const router = express.Router();
const { auth } = require('../common/auth');

// Ovako se poziva ruta koja zahtjeva jwt
// ako je user autentifikovan nalazi se u objektu req kao req.user
router.get('/', auth, async (req, res) => {
  res.status(200).json('OK');
});

router.get('/ok', async (req, res) => {
  res.status(200).json('OK');
});

module.exports = router;
