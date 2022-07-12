const { SpecificDay } = require("../../models");

const getAll = async (req, res) => {
  const { date } = req.query;
  const products = await SpecificDay.find({ date });
  res.json({
    status: "success",
    code: 200,
    data: { products },
  });
};

module.exports = getAll;
