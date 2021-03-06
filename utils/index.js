const { Product } = require("../models");

const canculatorCalories = ({ age, height, currentWeight, desiredWeight }) => {
  return Math.round(
    10 * +currentWeight +
      6.25 * +height -
      5 * +age -
      161 -
      10 * (+currentWeight - +desiredWeight)
  );
};

const getNotAllowed = ({ bloodType, foodList }) => {
  return [
    ...new Set(
      foodList
        .filter((product) => product.groupBloodNotAllowed[bloodType])
        .map((product) => product.categories[0])
    ),
  ];
};

async function calculatorPage(parameters) {
  const calories = canculatorCalories(parameters);
  const foodList = await Product.find();
  const notAllowedFood = getNotAllowed({
    bloodType: parameters.bloodType,
    foodList,
  });
  return {
    calories,
    notAllowedFood,
  };
}

const convertKcal = async (title, weightToConvert) => {
  const product = await Product.findOne({ "title.ua": title });

  const { calories, weight } = product;
  const productKcal = Math.round((calories / weight) * weightToConvert);
  return productKcal;
};

module.exports = {
  canculatorCalories,
  getNotAllowed,
  calculatorPage,
  convertKcal,
};
