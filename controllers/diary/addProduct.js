const { SpecificDay } = require("../../models");
const { BadRequest } = require("http-errors");
const { convertKcal } = require("../../utils/");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const { title, weight } = req.body;
  console.log(title);

  const verifyProduct = await SpecificDay.findOne({ title });

  if (verifyProduct) {
    throw new BadRequest("Product already add");
  }

  const productKcal = await convertKcal(title, weight);
  console.log(productKcal);
  const productToAdd = await SpecificDay.create({
    ...req.body,
    kcal: productKcal,
    owner: _id,
  });
  res.status(201).json({
    status: "succes",
    code: 201,
    data: { productToAdd },
  });
};

module.exports = addProduct;
