const salesService = require('../services/sales.service');

const insertSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSales(sales);
  if (type) return res.status(404).json({ message });
  
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();
  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(404).json({ message });
  
  return res.status(200).json(message);
};

module.exports = { insertSales, getSales, getSaleById };
