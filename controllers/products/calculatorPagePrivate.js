const { canculatorCalories, getNotAllowed } = require("../../utils");
const { User } = require("../../models");

const calculatorPagePrivate = async (req, res) => {
  const { _id } = req.user;
  const { parameters } = await User.findById(_id);

  const calories = canculatorCalories(parameters);
  const notAllowedFood = getNotAllowed({
    bloodType: parameters.bloodType,
    foodList: [],
  });

  //     "ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ЖІНКАМ
  // 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)"

  res.json({
    status: "success",
    code: 200,
    data: {
      calories:
        calories > 0 ? calories : "Curren weight is less then disire weight",
      notAllowedFood,
    },
  });
};

module.exports = calculatorPagePrivate;
