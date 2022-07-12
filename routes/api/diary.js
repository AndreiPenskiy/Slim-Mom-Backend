const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiAddProductSchema } = require("../../models/specificDay");
const { diary: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiAddProductSchema),
  ctrlWrapper(ctrl.addProduct)
);

router.delete("/:productId", ctrlWrapper(ctrl.deleteProductById));

router.get("/:date", auth, ctrlWrapper(ctrl.getAll));

module.exports = router;
