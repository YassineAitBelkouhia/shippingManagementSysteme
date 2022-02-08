"Use Strict";

const mongoose = require("mongoose"),
  Driver = require("./models/driver");

// Set up connection to data base
mongoose.connect("mongodb://localhost:27017/morrocoShip", {
  useNewUrlParser: true,
});

mongoose.connection;

let drivers = [
  {
    name: {
      first: "Yassine",
      last: "Ait Belkouhia",
    },
    email: "yassine.ait.belkouhia@gmail.com",
    password: "unhashedPassword01",
    vehicule: "small truck",
  },
  {
    name: {
      first: "Nadia",
      last: "Ait Belkouhia",
    },
    email: "nadia.ait.belkouhia@gmail.com",
    password: "unhashedPassword01",
    vehicule: "car",
  },
  {
    name: {
      first: "zineb",
      last: "Ait Belkouhia",
    },
    email: "zineb.ait.belkouhia@gmail.com",
    password: "unhashedPassword01",
    vehicule: "big truck",
  },
];

//Remove all drivers data
Driver.deleteMany()
  .exec()
  .then(() => {
    console.log("Drivers data is empty!");
  });

var commands = [];

//Loop through drivers objects to create promises
drivers.forEach((driver) => {
  commands.push(
    Driver.create({
      name: {
        first: driver.name.first,
        last: driver.name.last,
      },
      email: driver.email,
      password: driver.password,
      vehicule: driver.vehicule,
    })
  );
});

//Log confirmation after promises resolve
Promise.all(commands)
  .then((r) => {
    console.log(r);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });
