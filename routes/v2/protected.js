const express = require('express');
const router = express.Router();
const { verificarToken } = require('../../middleware/auth');

// Add a protected route
router.get('/protected-endpoint', verificarToken, (req, res) => {
  res.status(200).json({ message: "This is a protected endpoint", user: req.body.loggedUserName });
});

module.exports = router;