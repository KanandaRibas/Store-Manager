const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getAllProducts();

  return { type: null, message: products };
};

const getProductById = async (id) => {
  const [product] = await productsModel.getProductById(id);
  if (!product) return { type: 404, message: 'Product not found' };

  return { type: null, message: product };
};

const insertProduct = async (name) => {
  const id = await productsModel.insertProduct(name);
  const [insertByName] = await productsModel.getProductById(id);
  
  return { type: null, message: insertByName };
};

module.exports = { getProducts, getProductById, insertProduct };
