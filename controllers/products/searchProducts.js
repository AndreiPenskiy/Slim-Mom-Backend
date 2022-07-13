const { Product } = require("../../models/product");
const { createError } = require("../../helpers/createError");


const searchProducts = async (req, res, next) => {
  try {
   
      const {title} = req.query;
        console.log(title);
      const result = await Product.find(
    
          { "title.ua": { $regex: title} }, {'title.ua':1}
    );

    if (!result.length) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = searchProducts;
