module.exports = (req, res, next) => {
  const saleProducts = req.body;
  const hasQuantity = saleProducts
    .every(({ quantity }) => (quantity !== undefined && quantity !== null));
  if (!hasQuantity) {
    return res.status(400).json(
      { message: '"quantity" is required' },
    ); 
  }
  const numberQuantity = saleProducts.every(({ quantity }) => (quantity > 0));
  if (!numberQuantity) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
    ); 
  }
  next();
};