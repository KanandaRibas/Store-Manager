const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getAllProducts();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  if (!product.length) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const insertProduct = async (name) => {
  const product = await productsModel.insertProduct(name);

  return { type: null, message: product };
};

module.exports = { getProducts, getProductById, insertProduct };
