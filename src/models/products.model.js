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

  return result;
};

const insertProduct = async ({ name }) => {
  await connection.connection(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
};

module.exports = { getAllProducts, getProductById, insertProduct };
