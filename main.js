"Use Strict";

const express = require("express"),
  app = express(),
  //requiring method-override module (to override mehodes in html requests)
  methodOverride = require("method-override"),
  //Require mongoose
  mongoose = require("mongoose"),
  adminController = require("./controllers/adminController"),
  driversController = require("./controllers/driversController"),
  deliveriesController = require("./controllers/deliveriesController"),
  router = express.Router();

//DATABASE
//let mongoose know we r using native ES6 promises and set up the connection to database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/morrocoShip", {
  useNewUrlParser: true,
});

//Assigne the database to the db' variable
const db = mongoose.connection;

//Log a message when the application connects to the database
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.set("port", process.env.PORT || 3000);
app.use("/", router);

router.get("/drivers", driversController.getAllDrivers);
router.post("/drivers/create", driversController.create);
router.put("/drivers/:id/update", driversController.update);
router.delete("/drivers/:id/delete", driversController.delete);
router.get("drivers/:driverId/claim/:deliveryId", driversController.claim);
router.get(
  "drivers/:driverId/retrieved/:deliveryId",
  driversController.retrieved
);
router.get("drivers/:id/deliveries", driversController.getDeliveries);

router.get("deliveries", deliveriesController.getAllDeliveries);
router.delete("deliveries/:id/delete", deliveriesController.delete);
router.put("deliveries/:id/update", deliveriesController.update);
router.post("deliveries/create", deliveriesController.create);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")} `);
});
