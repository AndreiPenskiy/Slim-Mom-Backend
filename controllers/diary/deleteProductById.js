const { SpecificDay } = require("../../models");
const { NotFound } = require("http-errors");

const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  const removedProduct = await SpecificDay.findByIdAndRemove(productId);
  if (!removedProduct) {
    throw new NotFound(`Product with id=${productId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: { removedProduct },
  });
};

module.exports = deleteProductById;
