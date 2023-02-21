const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/products.controller');
const validateInsertProduct = require('./middlewares/validateInsertProduct');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/products', validateInsertProduct, productsController.insertProduct);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;