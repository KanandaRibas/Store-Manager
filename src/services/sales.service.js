const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const validateSales = async (sales) => {
  const validSales = await Promise.all(sales
    .map(async (sale) => {
      const product = await productsModel.getProductById(sale.productId);
      if (!product.length) { return null; }
      return sale;
    }));
  if (validSales.some((e) => e === null)) return null;
  return validSales;
};

const insertSales = async (sales) => {
  const validSales = await validateSales(sales);
  if (!validSales) return { type: 404, message: 'Product not found' };
  const id = await salesModel.insertSales();
  validSales.map(async (sale) => {
    await salesModel.insertSalesProducts(sale);
  });
  return { type: null, message: { id, itemsSold: sales } };
};

module.exports = { insertSales };
