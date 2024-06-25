const database = 'BancoPI';
const collection = 'user_tb';

// Selecionar o banco de dados
use(database);

// Criar a coleção com as configurações especificadas
db.createCollection(collection, {
  capped: false,
  autoIndexId: true,
  validationLevel: 'strict',
  validationAction: 'error',
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "createdAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "Nome do usuário, obrigatório e deve ser uma string"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Email do usuário, obrigatório e deve ser uma string no formato de email"
        },
        password: {
          bsonType: "string",
          description: "Senha do usuário, obrigatório e deve ser uma string"
        },
        createdAt: {
          bsonType: "date",
          description: "Data de criação do usuário, obrigatório e deve ser uma data"
        },
      }
    }
  },
});

// Inserir um exemplo de documento na coleção
db.user_tb.insertOne({
  name: "Admin",
  email: "admin@gmail.com",
  password: "123", // Aqui está a adição do campo senha
  createdAt: new Date(),
});
