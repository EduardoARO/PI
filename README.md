# Projeto Doceria Ponto Doce.

Este projeto foi criado e desenvolvido com o intuito de introduzir uma microempresa do mercado gastronômico ao âmbito virtual, foram implementadas diferentes usabilidades para o site, dentre as mais importantes: cadastro de usuários, dashboard de administrador, sistema de pagamento virtual.

## Implementação do projeto:

Para que o projeto funcione de forma correta, certifique-se de realizar os seguintes passos a seguir:

### Clonagem dos dados;

O primeiro passo trata-se de clonar o meu repositório para seu ambiente local. Abra seu terminal e utilize o comando a seguir:

```bash
git clone git@github.com:eduardoARO/PontoDoce.git
```

### Instalação das dependências;

Em seguida, abra a pasta do projeto e instale as dependências do mesmo, utilize o comando:

```bash
npm install
```

### Variáveis de Ambiente;

Após verificar que todas as dependências estão devidamente instaladas, crie um arquivo `.env` na pasta do projeto, adicionando as seguintes variáveis:

```makefile
PORT=<porta>
MONGODB_URI=<urlmongo>
SESSION_SECRET=<chave secreta>
EMAIL_USER=<email do user>
EMAIL_PASS=<senha do email>
```

### Inicialização.

Estamos quase lá! Após realizar esses passos seu projeto já deve estar pronto para ser iniciado, para iniciá-lo insira os comandos na ordem indicada abaixo:

```bash
node createAdminUser.js
```

```bash
nodemon app.js
```

## Observações e conclusão.

Esse projeto foi criado com o propósito de avaliação do Projeto Interdisciplinar na instituição de ensino FATEC - Prof. João Mod, em Guaratinguetá.
Ele se baseou em uma estrutura backend na linguagem Node.js, expressRoutes e mongoDB, além disso, foi essencial o uso do bodyParser; Já no frontend, foi utilizado o framework de estilização do Bootstrap, além de estilização própria em CSS, as imagens do cardápio são importadas via url do imgur e armazenadas no banco.