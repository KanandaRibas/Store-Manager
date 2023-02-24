const connection = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)',
    [id],
  );
  console.log('product by id', result);
  return result;
};

const insertProduct = async (name) => {
await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
};

const getByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = (?)',
    [name],
  );

  return result;
};

module.exports = { getAllProducts, getProductById, insertProduct, getByName };
