require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Vegetable = require("./models/vegetable");
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");
const fruitsController = require("./controllers/fruitsController");

//Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("connected to mongo");
});

// View Engine Middleware Configure
const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set("view engine", "jsx");
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: false }));
//this enables the req.body in post routes

// Custom Middleware
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));

//accessing static files from public folder like css, imgs, fonts
app.use(express.static("public"));

//routes
app.use("/fruits", fruitsController);

//Induces for vegetables//
//index for veg
app.get("/vegetables", async (req, res) => {
  try {
    const foundVeg = await Vegetable.find({});
    res.render("vegetables/IndexVeg", { vegetables: foundVeg });
  } catch (err) {
    res.status(400).send(err);
  }
});

//create new route
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//create (post) route
app.post("/vegetables", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const newVeg = await Vegetable.create(req.body);
    res.redirect("/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

//show for veg
app.get("/vegetables/:id", async (req, res) => {
  try {
    const foundVeg = await Vegetable.findById(req.params.id);
    res.render("vegetables/ShowVeg", { vegetables: foundVeg });
  } catch (err) {
    res.status(400).send(err);
  }
});

//catch all route
app.get("/*", (req, res) => {
  res.redirect("/fruits");
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
