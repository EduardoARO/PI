const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET;

let db;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(mongoUri);
    console.log('Connected to Database');
    db = client.db('BancoPI');

    // Configurações de middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true
    }));

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));

    // Middleware para adicionar a referência do banco de dados às requisições
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Rotas
    app.use('/', require('./routes/auth'));
    app.use('/', require('./routes/cadastro')(db));
    app.use('/', require('./routes/admin'));
    app.use('/', require('./routes/cardapio'));
    app.use('/', require('./routes/carrinho'));
    app.use('/', require('./routes/sobreNos'));
    app.use('/', require('./routes/perfil'));

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database. Error:', error);
    process.exit(1); // Sair do processo com erro
  }
}

connectToMongoDB();
