const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { products } = require('../mock/products.mock');

describe('Testa a camada controller para a rota "/products"', function () {

  afterEach(function () { sinon.restore() });

  describe('Testa a camada controller para a função "getProducts"', function () {
    it('Lista todos os produtos cadastrados', async function () {
      const req = {};
      const res = {};
      
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves({ type: 200, message: products });

      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(products);
    });
  });
});
 