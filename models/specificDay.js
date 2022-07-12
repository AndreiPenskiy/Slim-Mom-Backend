const { Schema, model } = require("mongoose");
const Joi = require("joi");

const specificDaySchema = Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    weight: { type: Number, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddProductSchema = Joi.object({
  date: Joi.string().required(),
  title: Joi.string().required(),
  weight: Joi.number().required(),
});

const SpecificDay = model("specificDay", specificDaySchema);

module.exports = { SpecificDay, joiAddProductSchema };
