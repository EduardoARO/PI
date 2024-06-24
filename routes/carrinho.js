const express = require('express');
const router = express.Router();

// Rota GET para renderizar a página de carrinho
router.get('/carrinho', async (req, res) => {
  try {
    const carrinho = req.session.carrinho || [];
    const cardapio = await req.db.collection('cardapio_tb').find().toArray();

    // Calcular o valor total do carrinho
    const valor_total = carrinho.reduce((total, itemCarrinho) => {
      const item = cardapio.find(i => i.name === itemCarrinho.name);
      return total + (item.price * itemCarrinho.quantity);
    }, 0);

    res.render('carrinho', { carrinho, cardapio, valor_total, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar itens do carrinho no banco de dados.');
  }
});

// Rota POST para adicionar item ao carrinho pelo nome
router.post('/adicionar-carrinho', async (req, res) => {
  try {
    const { itemName } = req.body;
    if (!req.session.carrinho) {
      req.session.carrinho = [];
    }

    // Verifica se o item já está no carrinho
    const itemIndex = req.session.carrinho.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
      // Incrementa a quantidade se o item já estiver no carrinho
      req.session.carrinho[itemIndex].quantity += 1;
    } else {
      // Adiciona o item com quantidade 1 se não estiver no carrinho
      const item = await req.db.collection('cardapio_tb').findOne({ name: itemName });
      req.session.carrinho.push({ name: itemName, quantity: 1, price: item.price });
    }

    res.redirect('/carrinho');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar item ao carrinho.');
  }
});

// Rota POST para incrementar a quantidade de um item
router.post('/carrinho/incrementar', async (req, res) => {
  const { itemName } = req.body;
  const itemIndex = req.session.carrinho.findIndex(item => item.name === itemName);
  if (itemIndex > -1) {
    req.session.carrinho[itemIndex].quantity += 1;
  }
  res.redirect('/carrinho');
});

// Rota POST para decrementar a quantidade de um item
router.post('/carrinho/decrementar', async (req, res) => {
  const { itemName } = req.body;
  const itemIndex = req.session.carrinho.findIndex(item => item.name === itemName);
  if (itemIndex > -1) {
    req.session.carrinho[itemIndex].quantity -= 1;
    if (req.session.carrinho[itemIndex].quantity <= 0) {
      req.session.carrinho.splice(itemIndex, 1); // Remove o item se a quantidade for 0
    }
  }
  res.redirect('/carrinho');
});

// Rota POST para remover um item do carrinho
router.post('/carrinho/remover', async (req, res) => {
  const { itemName } = req.body;
  req.session.carrinho = req.session.carrinho.filter(item => item.name !== itemName);
  res.redirect('/carrinho');
});

// Rota POST para finalizar a compra
router.post('/carrinho/checkout', async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(400).send('Usuário não logado.');
    }

    const itensDoCarrinho = req.session.carrinho || [];
    const { paymentMethod } = req.body;

    if (itensDoCarrinho.length === 0) {
      return res.status(400).send('Carrinho vazio.');
    }

    if (!paymentMethod) {
      return res.status(400).send('Método de pagamento não selecionado.');
    }

    // Calcular o valor total do pedido
    const valor_total = itensDoCarrinho.reduce((total, itemCarrinho) => {
      return total + (itemCarrinho.price * itemCarrinho.quantity);
    }, 0);

    await req.db.collection('pedido_tb').insertOne({
      name: user.name,
      email: user.email,
      itensDoCarrinho: itensDoCarrinho,
      valor_total: valor_total,
      paymentMethod: paymentMethod,
      createdAt: new Date()
    });

    req.session.carrinho = []; // Limpar o carrinho após a finalização da compra
    res.redirect('/carrinho/sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar o pedido.');
  }
});


// Rota GET para a página de sucesso
router.get('/carrinho/sucesso', (req, res) => {
  res.render('sucesso', { user: req.session.user });
});

module.exports = router;
