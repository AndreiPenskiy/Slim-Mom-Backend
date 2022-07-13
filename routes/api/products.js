const express = require("express");
const { products: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiParametersSchema } = require("../../models/product");

const router = express.Router();

router.post(
  "/calculatorPagePublic",
  validation(joiParametersSchema),
  ctrlWrapper(ctrl.calculatorPagePublic)
);

router.post(
  "/calculatorPagePrivate",
  auth,
  validation(joiParametersSchema),
  ctrlWrapper(ctrl.calculatorPagePrivate)
);


// router.get('/', auth, ctrlWrapper(ctrl.searchProducts)); 
router.get("/search", auth, ctrlWrapper(ctrl.searchProducts));

module.exports = router;
