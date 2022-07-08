const canculatorCalories = ({ age, height, currentWeight, desiredWeight }) => {
  return (
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight)
  );
};

const getNotAllowed = ({ bloodType, foodList }) => {
  return ["apple"];
};

module.exports = {
  canculatorCalories,
  getNotAllowed,
};
