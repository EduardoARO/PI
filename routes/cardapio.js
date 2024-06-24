const express = require('express');
const router = express.Router();

// Rota GET para renderizar a página de cardápio
router.get('/cardapio', async (req, res) => {
  try {
    const cardapio = await req.db.collection('cardapio_tb').find().toArray();
    res.render('cardapio', { cardapio, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o cardápio no banco de dados.');
  }
});

module.exports = router;
