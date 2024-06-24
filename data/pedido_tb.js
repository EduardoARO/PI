const database = 'BancoPI';
const collection = 'pedido_tb';

// Selecionar o banco de dados
use(database);

// Criar a coleção com as configurações especificadas
db.createCollection(collection, {
  capped: false,
  autoIndexId: true,
  validationLevel: 'strict',
  validationAction: 'error',
  validator: {
    "$jsonSchema": {
      "bsonType": "object",
      "required": ["name", "email", "itensDoCarrinho", "createdAt"],
      "properties": {
        "name": {
          "bsonType": "string",
          "description": "Nome do usuário"
        },
        "email": {
          "bsonType": "string",
          "description": "Email do usuário"
        },
        "itensDoCarrinho": {
          "bsonType": "array",
          "items": {
            "bsonType": "object",
            "required": ["name", "quantity", "price"],
            "properties": {
              "name": {
                "bsonType": "string",
                "description": "Nome do item"
              },
              "quantity": {
                "bsonType": "int",
                "description": "Quantidade do item"
              },
              "price": {
                "bsonType": "double",
                "description": "Preço do item"
              }
            }
          }
        },
        "valor_total": {
          "bsonType": "double",
          "description": "Valor total do pedido"
        },
        "createdAt": {
          "bsonType": "date",
          "description": "Data de criação do pedido"
        }, 
        "paymentMethod": {
          "bsonType": "string",
          "enum": ["Cartao", "Pix"],
          "description": "Método de pagamento"
        }
      }
    }
  }
});
