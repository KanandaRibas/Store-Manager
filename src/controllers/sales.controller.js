const salesService = require('../services/sales.service');

const insertSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSales(sales);
  if (type) return res.status(404).json({ message });
  
  return res.status(201).json(message);
};

module.exports = { insertSales };
