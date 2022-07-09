const { calculatorPage } = require("../../utils");
const { User } = require("../../models");

const calculatorPagePrivate = async (req, res) => {
  const { _id } = req.user;
  const { parameters } = req.body;
  const { calories, notAllowedFood } = await calculatorPage(parameters);

  await User.findByIdAndUpdate(_id, {
    calories,
    parameters,
    notAllowedProducts: notAllowedFood,
  });

  res.json({
    status: "success",
    code: 200,
    data: {
      calories:
        calories > 0
          ? calories
          : "You filled one of the field with 0 or less. Try something else, please",
      notAllowedFood,
    },
  });
};

module.exports = calculatorPagePrivate;
