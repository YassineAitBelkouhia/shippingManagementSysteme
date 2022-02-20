"Use Strict";

const express = require("express"),
  app = express(),
  //requiring method-override module (to override mehodes in html requests)
  methodOverride = require("method-override"),
  //Require mongoose
  mongoose = require("mongoose"),
  //requiring the three modules
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  cors = require("cors"),
  adminController = require("./controllers/adminController"),
  driversController = require("./controllers/driversController"),
  deliveriesController = require("./controllers/deliveriesController"),
  errorController = require("./controllers/errorController"),
  router = express.Router();

//DATABASE
//let mongoose know we r using native ES6 promises and set up the connection to database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/morrocoShip", {
  useNewUrlParser: true,
});

//Assigne the database connection to the db variable
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
app.set("port", process.env.PORT || 5000);
router.use(express.json());

//Configure express app to use cookie-parser as middleware,and for express-session to use cookie-parser and use connect fash as middleware
//using resave: false, and saveUnitialised: false,prevent a lot of empty sessions objects being saved in the session store since there's nothing useful to store, the session is forgotten at the end of the request
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());

//treat connectFlash messages like a local variable on the response.
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

router.get("/likan/:name", (req, res) => {
  let name = req.params.name;
  res.send(name);
});
router.get("/drivers/:id/deliveries", driversController.getDeliveries);
router.get("/drivers", driversController.getAllDrivers);
router.post("/drivers/login", driversController.login);
router.post("/drivers/create", driversController.create);
router.put("/drivers/:id/update", driversController.update);
router.delete("/drivers/:id/delete", driversController.delete);
router.get("/drivers/:driverId/claim/:deliveryId", driversController.claim);
router.get(
  "/drivers/:driverId/retrieved/:deliveryId",
  driversController.retrieved
);

router.get("/deliveries", deliveriesController.getAllDeliveries);
router.delete("/deliveries/:id/delete", deliveriesController.delete);
router.put("/deliveries/:id/update", deliveriesController.update);
router.post("/deliveries/create", deliveriesController.create);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")} `);
});
