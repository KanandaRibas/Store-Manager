const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');
const { products } = require('../mock/products.mock');

describe('Testa a camada model para a rota "/products"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada model para a função "getAllProducts"', function () {
    it('Lista os produtos cadastradas', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const response = await productsModel.getAllProducts();
      expect(response).to.be.deep.equal(products);
    });
  });
});
