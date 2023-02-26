const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { products, product1, newProduct} = require('../mock/products.mock');

describe('Testa a camada service para a rota "/products"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada service para a função "getProducts"', function () {
    it('Lista todos os produtos cadastrados', async function () {
      const result = { type: null, message: products }

      sinon.stub(productsModel, 'getAllProducts').resolves(products);

      const response = await productsService.getProducts();

      expect(response).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "getProductById"', async function () {
    it('Consulta um produto pelo Id', async function () {
      const result = { type: null, message: product1 }

      sinon.stub(productsModel, 'getProductById').resolves([product1]);

      const response = await productsService.getProductById(product1.id);

      expect(response).to.be.deep.equal(result);
    });
    it('retorna um erro caso o produto não exista', async function () {
      
      sinon.stub(productsModel, 'getProductById').resolves([]);
     
      const result = await productsService.getProductById('a');
      
      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });
  });

  describe('Testa a camada service para a função "insertProduct"', async function () {
    it('Cadastro de um produto pelo nome', async function () {

      sinon.stub(productsModel, 'insertProduct').resolves(4);
      sinon.stub(productsModel, 'getProductById').resolves([newProduct]);

      const response = await productsService.insertProduct(newProduct.name);

      expect(response.type).to.equal(null);
      expect(response.message).to.be.deep.equal(newProduct);
    });
  });

});
