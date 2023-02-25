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
    await salesModel.insertSalesProducts(id, sale);
  });
  return { type: null, message: { id, itemsSold: sales } };
};

const getSales = async () => {
  const sales = await salesModel.findSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.findSalesProducts(id);
  if (!sale.length) return { type: 404, message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = { insertSales, getSales, getSaleById };
