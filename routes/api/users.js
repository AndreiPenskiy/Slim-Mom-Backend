const express = require("express");
const { users: ctrl } = require("../../controllers");
const { validation, auth, ctrlWrapper } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

module.exports = router;