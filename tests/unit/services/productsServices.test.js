const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { products, product1, id, newProduct, name, } = require('../mock/products.mock');

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

      const response = await productsService.getProductById(id);

      expect(response).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "insertProduct"', async function () {
    it('Cadastro de um produto pelo nome', async function () {
      const result = { type: null, message: newProduct }

      sinon.stub(productsModel, 'insertProduct').resolves(undefined);
      sinon.stub(productsModel, 'getByName').resolves([newProduct]);

      const response = await productsService.insertProduct(name);

      expect(response).to.be.deep.equal(result);
    });
  });

});
