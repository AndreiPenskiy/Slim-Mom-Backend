const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema({
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: {
    type: Object,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
  },
});

const joiParametersSchema = Joi.object({
  parameters: {
    height: Joi.string().required(),
    age: Joi.string().required(),
    currentWeight: Joi.string().required(),
    desiredWeight: Joi.string().required(),
    bloodType: Joi.string().required(),
  },
});

const Product = model("product", productSchema);

module.exports = { Product, joiParametersSchema };
