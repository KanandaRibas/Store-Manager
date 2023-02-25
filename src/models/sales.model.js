// const camelize = require('camelize');
const connection = require('./db/connection');

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertSalesProducts = async (id, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
};

const findSales = async () => {
  const [result] = await connection.execute(
    `SELECT 
      s.id AS saleId, s.date, p.product_id AS productId, p.quantity
  FROM
      StoreManager.sales s
          INNER JOIN
      StoreManager.sales_products p ON p.sale_id = s.id
  ORDER BY s.id ASC`,
  );
  return (result);
};

const findSalesProducts = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      s.date, p.product_id AS productId, p.quantity
  FROM
      StoreManager.sales s
          INNER JOIN
      StoreManager.sales_products p ON p.sale_id = s.id
  HAVING s.id = (?)
  ORDER BY s.id ASC`, // corrigir - query com erro
    [id],
  );
  console.log('terminou findsalesproducts sales_products model result:', result);
  return (result);
};

module.exports = { insertSales, insertSalesProducts, findSales, findSalesProducts };