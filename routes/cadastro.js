const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  // Rota GET para renderizar a página de registro
  router.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });
  
  router.post('/cadastro', async (req, res) => {
    const { nome, email, password } = req.body;

    const userExists = await db.collection('user_tb').findOne({ $or: [{ name: nome }, { email }] });
    if (userExists) {
      return res.render('cadastro', { error: 'Usuário ou email já cadastrado!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: nome,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    try {
      await db.collection('user_tb').insertOne(newUser);
      req.session.user = { id: newUser._id, email: newUser.email, name: newUser.name };
      res.redirect('/perfil');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.render('cadastro', { error: 'Erro ao cadastrar usuário. Tente novamente.' });
    }
  });

  return router;
};
