const salesModel = require('../models/sales.model');

const insertSales = async (sales) => {
  await salesModel.insertSales;
  await Promise.all(sales.map(async (sale) => salesModel.insertSalesProducts(sale)));

  return { type: null, message: 'sale' };
};

module.exports = { insertSales };