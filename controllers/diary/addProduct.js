const { SpecificDay } = require("../../models");
const { convertKcal } = require("../../utils/");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const { title, weight } = req.body;

  const productKcal = await convertKcal(title, weight);

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
