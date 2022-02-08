"Use Strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  adminSchema = new Schema({
    name: {
      first: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      last: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model("Admin", adminSchema);
