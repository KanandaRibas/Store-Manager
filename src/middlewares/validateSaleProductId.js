module.exports = (req, res, next) => {
  const saleProducts = req.body;
  const hasProductId = saleProducts
    .every(({ productId }) => (productId !== undefined && productId !== null));
  if (!hasProductId) {
    return res.status(400).json(
      { message: '"productId" is required' },
    ); 
  }
  next();
};