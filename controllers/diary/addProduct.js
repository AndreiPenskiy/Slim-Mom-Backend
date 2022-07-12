const { SpecificDay } = require("../../models");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const productToAdd = await SpecificDay.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: { productToAdd },
  });
};

module.exports = addProduct;
