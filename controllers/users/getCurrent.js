const getCurrent = async (req, res) => {
  const { name, email, calories, notAllowedProducts } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        calories,
        notAllowedProducts,
      },
    },
  });
};

module.exports = getCurrent;
