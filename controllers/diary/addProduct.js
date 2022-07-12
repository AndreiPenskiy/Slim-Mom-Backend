const { SpecificDay } = require("../../models");
const { BadRequest } = require("http-errors");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const { title } = req.body;

  const verifyProduct = await SpecificDay.findOne({ title });

  if (verifyProduct) {
    throw new BadRequest("Product already add");
  }
  const productToAdd = await SpecificDay.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: { productToAdd },
  });
};

module.exports = addProduct;
