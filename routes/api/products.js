const express = require("express");
const { products: ctrl } = require("../../controllers");
const { auth, ctrlWrapper } = require("../../middlewares");

const router = express.Router();

router.post(
  "/calculatorPagePublic",
  // validation(joiCalculatorPage),
  ctrlWrapper(ctrl.calculatorPagePublic)
);

router.post(
  "/calculatorPagePrivate",
  auth,
  ctrlWrapper(ctrl.calculatorPagePrivate)
);

module.exports = router;
