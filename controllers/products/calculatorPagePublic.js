const { calculatorPage } = require("../../utils");

const calculatorPagePublic = async (req, res) => {
  const { parameters } = req.body;

  const { calories, notAllowedFood } = await calculatorPage(parameters);

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

module.exports = calculatorPagePublic;
