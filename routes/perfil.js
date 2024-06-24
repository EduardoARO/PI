const express = require('express');
const router = express.Router();

// Rota GET para renderizar a página do perfil
router.get('/perfil', async (req, res) => {
    try {
        const users = await req.db.collection('user_tb').find().toArray();
        const pedidos = await req.db.collection('pedido_tb').find().toArray();
        res.render('perfil', { users, pedidos, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados.');
    }
});

module.exports = router;
