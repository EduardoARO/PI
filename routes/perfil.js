const express = require('express');
const router = express.Router();

// Rota GET para renderizar a página do perfil
router.get('/perfil', async (req, res) => {
    try {
        const user = req.session.user; // Supondo que o usuário logado está na sessão
        if (!user) {
            return res.status(401).send('Usuário não está autenticado.');
        }

        // Buscando apenas os pedidos do usuário logado
        const pedidos = await req.db.collection('pedido_tb').find({ email: user.email }).toArray();
        
        res.render('perfil', { user, pedidos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados.');
    }
});

module.exports = router;
