const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// Middleware para verificar se o usuário é admin
router.use((req, res, next) => {
    // Se o usuário for admin, permita o acesso a todas as rotas
    if (req.session.user && req.session.user.email === 'admin@gmail.com') {
        next();
    } else {
        // Se o usuário não for admin, permita o acesso apenas às rotas públicas (não-administrativas)
        const publicRoutes = ['/carrinho', '/adicionar-carrinho', '/carrinho/incrementar', '/carrinho/decrementar', '/carrinho/remover', '/carrinho/checkout', '/carrinho/sucesso', '/cardapio', '/sobreNos', '/perfil']; // Rotas públicas
        if (publicRoutes.includes(req.path)) {
            next();
        } else {
            res.redirect('/');
        }
    }
});

// Rota GET para renderizar a página de administração
router.get('/admin', async (req, res) => {
    try {
        const users = await req.db.collection('user_tb').find().toArray();
        const menuItems = await req.db.collection('cardapio_tb').find().toArray();
        const pedidos = await req.db.collection('pedido_tb').find().toArray();
        res.render('admin', { users, menuItems, pedidos, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados.');
    }
});

// Rota POST para adicionar um novo usuário
router.post('/admin/usuarios/add', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await req.db.collection('user_tb').insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(), // Adiciona o campo createdAt
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar usuário.');
    }
});

// Rota POST para editar um usuário
router.post('/admin/usuarios/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updateFields = { name, email };
        if (hashedPassword) updateFields.password = hashedPassword;
        await req.db.collection('user_tb').updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao editar usuário.');
    }
});

// Rota POST para excluir um usuário
router.post('/admin/usuarios/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.collection('user_tb').deleteOne({ _id: new ObjectId(id) });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir usuário.');
    }
});

// Rota POST para adicionar um novo item no cardápio
router.post('/admin/cardapio/add', async (req, res) => {
    const { name, price, photo, description } = req.body;
    
    try {
        await req.db.collection('cardapio_tb').insertOne({
            name,
            price: parseFloat(price),
            photo,
            createdAt: new Date(),
            description,
        });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar item do cardápio.');
    }
});

// Rota POST para editar um item do cardápio
router.post('/admin/cardapio/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, photo, description } = req.body;
    try {
        await req.db.collection('cardapio_tb').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price: parseFloat(price), photo, description } }
        );
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao editar item do cardápio.');
    }
});

// Rota POST para excluir um item do cardápio
router.post('/admin/cardapio/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.collection('cardapio_tb').deleteOne({ _id: new ObjectId(id) });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir item do cardápio.');
    }
});

// Rota POST para excluir um pedido do banco
router.post('/admin/pedidos/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.collection('pedido_tb').deleteOne({ _id: new ObjectId(id) });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir pedido do banco.');
    }
});

module.exports = router;
