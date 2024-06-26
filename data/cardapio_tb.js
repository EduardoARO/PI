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
                    bsonType: ["double", "int"],
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


db.cardapio_tb.insertOne({
    name: "Queridinho",
    price: 4.99,
    photo: "https://i.imgur.com/Bk1cZhr.png",
    createdAt: new Date(),
    description: "Brigadeiro de Ninho recheado com Nutella"
});

db.cardapio_tb.insertOne({
    name: "Brigadeiro",
    price: 3.99,
    photo: "https://i.imgur.com/2RAvBvt.png",
    createdAt: new Date(),
    description: "Brigadeiro cremoso que derrete na boca"
});

db.cardapio_tb.insertOne({
    name: "Bolo Fatia",
    price: 14.5,
    photo: "https://i.imgur.com/0bo2Mb1.png",
    createdAt: new Date(),
    description: "Fatia de bolo de chocolate com ganache de chocolate meio-amargo"
});

db.cardapio_tb.insertOne({
    name: "Brownie",
    price: 8.99,
    photo: "https://i.imgur.com/0yTgeT4.png",
    createdAt: new Date(),
    description: "Brownie denso feito de chocolate meio amargo e cacau 100%"
});

db.cardapio_tb.insertOne({
    name: "Pé de Moleque",
    price: 4.99,
    photo: "https://i.imgur.com/9OiPR9C.png",
    createdAt: new Date(),
    description: "Pé de moleque de caramelo salgado com mix de castanhas"
});

db.cardapio_tb.insertOne({
    name: "Canjiquinha",
    price: 7.5,
    photo: "https://i.imgur.com/nVBwGOi.png",
    createdAt: new Date(),
    description: "Canjiquinha cremosa e saborosa"
});

db.cardapio_tb.insertOne({
    name: "Cural",
    price: 6.99,
    photo: "https://i.imgur.com/O7eV6R0.png",
    createdAt: new Date(),
    description: "Cural bom"
});

db.cardapio_tb.insertOne({
    name: "Bolo de chocolate",
    price: 89.99,
    photo: "https://i.imgur.com/jQ8t1XZ.png",
    createdAt: new Date(),
    description: "Bolo de chocolate, mousse de chocolate e brigadeiro"
});