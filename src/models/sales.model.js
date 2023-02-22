const connection = require('./db/connection');

const insertSales = async () => {
 const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  console.log(insertId);
  return insertId;
};

const insertSalesProducts = async ({ productId, quantity }) => {
  const id = await insertSales();
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
};

module.exports = { insertSales, insertSalesProducts };