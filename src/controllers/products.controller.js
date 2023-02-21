const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();
  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(404).json({ message });
  
  return res.status(200).json(...message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);
  if (type) return res.status(type).json({ message });
  
  return res.status(201).json(message);
};

module.exports = { getProducts, getProductById, insertProduct };
