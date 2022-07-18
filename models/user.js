const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const emailRegexp = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const nameRegexp = /^[а-яА-ЯёЁєЄґҐїЇіІ' a-zA-Z]+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      // match: nameRegexp,
      minLength: 2,
      maxLength: 16,
    },

    password: {
      type: String,
      minlength: 8,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },

    calories: {
      type: Number,
      default: null,
    },

    parameters: {
      type: Object,
      default: {
        age: "0",
        height: "0",
        currentWeight: "0",
        desiredWeight: "0",
        bloodType: "1",
      },
    },
    notAllowedProducts: {
      type: Array,
      default: [],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// pattern(nameRegexp)
const joiSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  parameters: Joi.object({
    height: Joi.number(),
    age: Joi.number(),
    currentWeight: Joi.number(),
    desiredWeight: Joi.number(),
    bloodType: Joi.string(),
  })
    .not()
    .required(),
  calculator: Joi.object({
    calories: Joi.number(),
    notRecomendate: Joi.array(),
  }),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
  joiLoginSchema,
};
