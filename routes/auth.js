const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Rota GET para renderizar a página de login ou a página principal logada
router.get('/', (req, res) => {
  if (req.session.user) {
    res.render('index', { user: req.session.user });
  } else {
    res.render('index', { user: null });
  }
});

// Rota POST para processar o login
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await req.db.collection('user_tb').findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      req.session.user = { id: user._id, email: user.email, name: user.name };
      return res.redirect('/');
    }
  }

  res.render('index', { error: 'Email ou senha incorretos!', user: null });
});

// Rota GET para processar o logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
