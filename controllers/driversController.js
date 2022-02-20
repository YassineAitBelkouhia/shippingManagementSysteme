"Use Strict";

const Driver = require("../models/driver"),
  Delivery = require("../models/delivery"),
  getDriverParams = (body) => {
    return {
      name: {
        first: body.name.first,
        last: body.name.last,
      },
      email: body.email,
      password: body.password,
      vehicule: body.vehicule,
    };
  };

module.exports = {
  getAllDrivers: (req, res) => {
    Driver.find({})
      .exec()
      .then((drivers) => {
        console.log(drivers);
        res.send(drivers);
      })
      .catch((error) => {
        console.log(`Error fetching drivers: ${error.message}`);
      });
  },

  create: (req, res) => {
    let driverParams = getDriverParams(req.body);
    Driver.create(driverParams)
      .then((driver) => {
        req.flash(
          "success",
          `Driver ${driver.name.first} ${driver.name.last} account created successfully`
        );
        let message = req.flash("success");
        console.log(message);

        res.send({ driver, message });
      })
      .catch((error) => {
        console.log(`Error saving driver: ${error.message}`);
        req.flash(
          "error",
          `Failed to create account because: ${error.message}`
        );
        let message = req.flash("error");
        console.log(message);
        res.send(message);
      });
  },

  update: (req, res) => {
    let driverId = req.params.id,
      driverParams = getDriverParams(req.body);

    Driver.findByIdAndUpdate(driverId, {
      $set: driverParams,
    })
      .exec()
      .then((driver) => {
        res.send(driver);
      })
      .catch((error) => {
        console.log(`Error updating driver by ID:${error.message}`);
      })
      .then(() => {
        console.log("Updated Succesfully");
      });
  },

  delete: (req, res) => {
    let driverId = req.params.id;
    Driver.findByIdAndRemove(driverId)
      .then(() => {
        console.log("Deleted Succesfully");
      })
      .catch((error) => {
        console.log(`Error deleting Driver : ${error.message}`);
      });
  },

  claim: (req, res) => {
    let driverId = req.params.driverId,
      deliveryId = req.params.deliveryId;

    Driver.findOne({ _id: driverId })
      .exec()
      .then((driver) => {
        driver.claimDelivery(deliveryId);
        res.send("Delivery Claimed");
      })
      .catch((error) => {
        console.log(`ERROR: ${error.message}`);
      })
      .then(() => {
        console.log("Delivery Claimed");
      });
  },

  retrieved: (req, res) => {
    let driverId = req.params.driverId,
      deliveryId = req.params.deliveryId;

    Driver.findOne({ _id: driverId })
      .exec()
      .then((driver) => {
        driver.deliveryRetrieved(deliveryId);
        res.send("Delivery Retrieved");
      })
      .catch((error) => {
        console.log(`ERROR: ${error.message}`);
      })
      .then(() => {
        console.log("Delivery Retrieved");
      });
  },

  getDeliveries: (req, res) => {
    let driverId = req.params.id;
    console.log(driverId);

    Driver.findOne({ _id: driverId })
      .exec()
      .then((driver) => {
        Delivery.find({
          correspondingVehicule: driver.vehicule,
          isClaimed: false,
        })
          .exec()
          .then((deliveries) => {
            res.send(deliveries);
          })
          .catch((error) => {
            res.send(error);
          });
      })
      .catch((error) => {
        console.log(`ERROR: ${error.message}`);
      })
      .then(() => {
        console.log("Deliveries fetched");
      });
  },

  login: (req, res) => {
    let driverEmail = req.body.email;
    Driver.findOne({ email: driverEmail })
      .exec()
      .then((driver) => {
        res.send(driver);
      })
      .catch((error) => {
        res.send("error");
      });
  },
};
