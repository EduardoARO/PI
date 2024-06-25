const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = (db) => {
  // Configuração do transporte de e-mail
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // ou outro serviço de e-mail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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

      // Configuração do e-mail
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: 'Bem-Vindo!',
        text: `Bem-Vindo, ${newUser.name}!`,
        html: `<h1>Bem-Vindo, <strong>${newUser.name}</strong>!</h1> <br>
            <p>Obrigado pelo seu cadastro em nossa página. Bom apetite!</p>`
      };

      // Enviar e-mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar e-mail:', error);
        } else {
          console.log('E-mail enviado: ' + info.response);
        }
      });

      res.redirect('/perfil');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.render('cadastro', { error: 'Erro ao cadastrar usuário. Tente novamente.' });
    }
  });

  return router;
};
