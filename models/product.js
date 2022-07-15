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
    height: Joi.number().required(),
    age: Joi.number().required(),
    currentWeight: Joi.number().required(),
    desiredWeight: Joi.number().required(),
    bloodType: Joi.string().required(),
  },
});

const Product = model("product", productSchema);

module.exports = { Product, joiParametersSchema };
