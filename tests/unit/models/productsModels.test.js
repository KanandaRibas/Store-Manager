const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');
const { products, product1, id, newProduct, name } = require('../mock/products.mock');

describe('Testa a camada model para a rota "/products"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada model para a função "getAllProducts"', function () {
    it('Lista os produtos cadastrados', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const response = await productsModel.getAllProducts();
      expect(response).to.be.deep.equal(products);
    });
  });
  
  describe('Testa a camada model para a função "getProductById"', function () {
    it('Consulta um produto por Id', async function () {
      sinon.stub(connection, 'execute').resolves([product1]);

      const response = await productsModel.getProductById(id);
      expect(response).to.be.deep.equal(product1);
    });
  });

  describe('Testa a camada model para a função "insertProduct"', function () {
    it('Cadastro de um produto pelo nome', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const response = await productsModel.insertProduct(name);
      expect(response).to.be.equal(3);
    });
  });
  
});
