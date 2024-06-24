const express = require('express');
const router = express.Router();

// Rota GET para renderizar a página 
router.get('/sobreNos', (req, res) => {
  res.render('sobreNos',{ user: req.session.user });
});
  
module.exports = router;