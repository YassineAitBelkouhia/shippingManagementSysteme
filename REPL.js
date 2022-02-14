"Use Strict";

const mongoose = require("mongoose"),
  Driver = require("./models/driver"),
  Delivery = require("./models/delivery");

// Set up connection to data base
mongoose.connect("mongodb://localhost:27017/morrocoShip", {
  useNewUrlParser: true,
});

//Use native promises
mongoose.Promise = global.Promise;
