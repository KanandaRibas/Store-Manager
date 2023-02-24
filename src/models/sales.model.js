const connection = require('./db/connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  console.log('chamou o insert sales do model');
  return insertId;
};

const getSaleId = async () => {
  const [[{ id }]] = await connection.execute(
    'SELECT max(id) AS id FROM StoreManager.sales',
  );
  console.log('model', id);
   return id;
 };

const insertSalesProducts = async ({ productId, quantity }) => {
  const id = await getSaleId();
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
  console.log('terminou insert sales products model');
};

module.exports = { insertSales, insertSalesProducts };