"Use Strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Delivery = require("./delivery"),
  driverSchema = new Schema({
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
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    vehicule: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    delivery: { type: Schema.Types.ObjectId, ref: "Delivery" },
  });

driverSchema.methods.getCorrespondingDeliveries = function () {
  let driver = this;
  Delivery.find({
    correspondingvehicule: driver.vehicule,
    isClaimed: false,
  })
    .exec()
    .then((deliveries) => {
      return deliveries;
    })
    .catch((error) => {
      console.log(
        `Error getting corresponding deliveries ERROR: ${error.message} `
      );
    })
    .then(() => {
      console.log("Data fetched successfully");
    });
};

driver.methods.claimDelevery = function (id) {
  let driver = this;
  Delivery.findOne({ _id: id })
    .exec()
    .then((delivery) => {
      console.log(delivery);
      delivery.isClaimed = true;
      driver.delivery = delivery;
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    })
    .then(() => {
      console.log("Success");
    });
};

driver.methods.deliveryRetrieved = function (id) {
  let driver = this;
  Delivery.findOne({ _id: id })
    .exec()
    .then((delivery) => {
      delivery.isRetrieved = true;
      driver.delivery = undefined;
    })
    .catch((error) => {
      console.log(`Error : ${error.message}`);
    })
    .then(() => {
      console.log("Shipping Retrieved");
    });
};

module.exports = mongoose.model("Driver", driverSchema);
