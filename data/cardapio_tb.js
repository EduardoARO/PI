const database = 'BancoPI';
const collection = 'cardapio_tb';

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
            required: ["name", "price", "photo", "createdAt", "description"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "Nome do item do cardápio, obrigatório e deve ser uma string"
                },
                price: {
                    bsonType: "double",
                    minimum: 0,
                    description: "Preço do item, obrigatório e deve ser um número positivo"
                },
                photo: {
                    bsonType: "string",
                    pattern: "^(http|https):\\/\\/.+\\.(jpg|jpeg|png)$",
                    description: "URL da foto do item, obrigatório e deve ser uma URL válida de imagem"
                },
                createdAt: {
                    bsonType: "date",
                    description: "Data de criação do item, obrigatório e deve ser uma data"
                },
                description: {
                    bsonType: "string",
                    description: "Descrição do item do cardápio, obrigatório e deve ser uma string"
                }
            }
        }
    }
});

// Exemplo de inserção de um documento na coleção cardapio
db.cardapio_tb.insertOne({
    name: "Torta de chocolate",
    price: 29.99,
    photo: "https://example.com/torta-de-chocolate.jpg",
    createdAt: new Date(),
    description: "Deliciosa torta de chocolate com recheio cremoso"
});
