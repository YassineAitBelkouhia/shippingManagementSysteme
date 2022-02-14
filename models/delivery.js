"Use Strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  deliverySchema = new Schema(
    {
      isInternational: {
        type: Boolean,
        required: true,
      },
      isRetrieved: {
        type: Boolean,
        default: false,
      },
      isClaimed: {
        type: Boolean,
        default: false,
      },
      weight: {
        type: Number,
        required: true,
        min: [1, "too light"],
        max: [1600, "too heavy"],
      },
      description: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
      },
      destination: {
        continent: {
          type: String,
          required: true,
          lowercase: true,
        },
        country: {
          type: String,
          required: true,
          lowercase: true,
        },
        address: {
          type: String,
          required: true,
          lowercase: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );

deliverySchema.virtual("correspondingvehicule").get(function () {
  if (this.weight < 200) return "car";
  else if (this.weight < 800) return "small truck";
  else return "big truck";
});

deliverySchema.methods.getCost = function () {
  if (this.isInternational) {
    switch (this.destination.continent) {
      case "europe":
        return { cost: (this.weight * 160) / 10, currency: "euro" };
      case "america":
        return { cost: (this.weight * 220) / 9, currency: "dollar" };
      case "asia":
        return { cost: (this.weight * 240) / 1.46, currency: "yuan" };
      case "australia":
        return {
          cost: (this.weight * 260) / 6.63,
          currency: "australian dollar",
        };
      default:
        return {
          cost: (this.weight * 200) / 9,
          currency: "dollar",
        };
    }
  } else {
    return {
      cost: this.weight > 3 ? (this.weight - 3) * 5 + 120 : this.weight * 40,
      currency: "morrocan dh",
    };
  }
};

module.exports = mongoose.model("Delivery", deliverySchema);
