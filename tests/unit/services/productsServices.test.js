const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { products } = require('../mock/products.mock');

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
});
