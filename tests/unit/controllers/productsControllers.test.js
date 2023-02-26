const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { products, product1, newProduct } = require('../mock/products.mock');

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

  describe('Testa a camada controller para a função "getProductById"', function () {
    it('Lista um produto por Id', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: null, message: product1 });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product1);
    });
  });
  describe('Testa a camada controller para a função "insertProduct"', function () {
    it('Cadastra um novo produto', async function () {
      const req = {
        body: { name: newProduct.name }
      }
      const res = {};
      const result = newProduct;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertProduct').resolves({ type: null, message: result });

      await productsController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(result);
    });
  });
});
 