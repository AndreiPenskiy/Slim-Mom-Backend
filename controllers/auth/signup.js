const { Conflict } = require("http-errors");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password, parameters, calculator } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }

  const userInfo = { name, email };
  if (Object.keys(parameters).length !== 0) {
    userInfo.parameters = parameters;
    userInfo.calories = calculator.calories;
    userInfo.notAllowedProducts = calculator.notRecomendate;
  }
  const newUser = await new User({ ...userInfo });
  newUser.setPassword(password);
  const newUserCreated = await newUser.save();
  const payload = {
    id: newUserCreated._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(newUserCreated._id, {
    token,
    verify: true,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        name,
        email,
        parameters: Object.keys(parameters).length !== 0 ? parameters : null,
        ...calculator,
      },
    },
  });
};

module.exports = signup;
