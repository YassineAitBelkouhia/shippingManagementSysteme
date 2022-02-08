"Use Strict";

const Delivery = require("../models/delivery"),
  Driver = require("../models/driver"),
  getDeliveryParams = (body) => {
    return {
      isInternational: body.isInternational,
      weight: body.weight,
      description: body.description,
      destination: {
        address: body.destination.continent,
        country: body.destination.country,
        address: body.destination.address,
      },
    };
  };

module.exports = {
  getAllDeliveries: (req, res) => {
    Delivery.find({})
      .exec()
      .then((deliveries) => {
        console.log(deliveries);
        res.send(deliveries);
      })
      .catch((error) => {
        console.log(`Error fetching deliveries: ${error.message}`);
      })
      .then(() => {
        console.log("Deliveries fetched succefully");
      });
  },

  create: (req, res) => {
    console.log(req.body);
    let deliveryParams = getDeliveryParams(req.body);
    Delivery.create(deliveryParams)
      .then((delivery) => {
        console.log(delivery);
        res.send(delivery);
      })
      .catch((error) => {
        console.log(`Error saving delivery: ${error.message}`);
      })
      .then(() => {
        console.log("Delivery created succefully");
      });
  },

  update: (req, res) => {
    let deliveryId = req.params.id,
      deliveryParams = getDeliveryParams(req.body);

    Delivery.findByIdAndUpdate(deliveryId, {
      $set: deliveryParams,
    })
      .exec()
      .then((delivery) => {
        res.send(delivery);
      })
      .catch((error) => {
        console.log(`Error updating delivery ERROR: ${error.message}`);
      })
      .then(() => {
        console.log("Delivery updated succefully");
      });
  },

  delete: (req, res) => {
    let deliveryId = req.params.id;
    Delivery.findByIdAndRemove(deliveryId)
      .then(() => {
        console.log("Deleted Succesfully");
      })
      .catch((error) => {
        console.log(`Error deleting delivery`);
      });
  },
};
