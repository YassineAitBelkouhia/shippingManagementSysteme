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
      // console.log(deliveries);
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

driverSchema.methods.claimDelivery = function (id) {
  let driver = this;
  Delivery.findByIdAndUpdate(id, { $set: { isClaimed: true } })
    .exec()
    .then((delivery) => {
      delivery.isClaimed = true;
      driver.delivery = delivery._id;
      driver.save();
      console.log(delivery);
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    })
    .then(() => {
      console.log("Success");
    });
};

driverSchema.methods.deliveryRetrieved = function (id) {
  let driver = this;
  Delivery.findByIdAndUpdate(id, { $set: { isRetrieved: true } })
    .exec()
    .then((delivery) => {
      delivery.isRetrieved = true;
      delivery.save();
      console.log(delivery);
      driver.delivery = undefined;
      driver.save();
    })
    .catch((error) => {
      console.log(`Error : ${error.message}`);
    })
    .then(() => {
      console.log("Delivery Retrieved");
    });
};

module.exports = mongoose.model("Driver", driverSchema);
