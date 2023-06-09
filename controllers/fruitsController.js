const express = require("express");
const router = express.Router();
const Fruit = require("../models/fruit");

// Seed Route
router.get("/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

// I.N.D.U.C.E.S
// ==============
// Index--making a query with find()
router.get("/", async (req, res) => {
  try {
    //first param in find() is a filter method-- also fing returns an array
    const foundFruit = await Fruit.find({});
    res.render("fruits/Index", { fruits: foundFruit });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New // renders a form to create a new fruit
router.get("/new", (req, res) => {
  res.render("fruits/New");
});

//delete route--recv the id of the fruit doc and deletes it. after that it will redirect back to the Index
router.delete("/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update(put) route
router.put("/:id", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create // recieves info from new route to then create a new fruit w/ it
router.post("/", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const newFruit = await Fruit.create(req.body);

    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
  // req.body.readyToEat = req.body.readyToEat === "on";
  // fruits.push(req.body);
  //console.log(fruits);
  // redirect is making a GET request to whatever path you specify
  // res.redirect("/fruits");
});

//Edit route
router.get("/:id/edit", async (req, res) => {
  try {
    //finding doc that we are about to edit, giving the Edit.jsx
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show
router.get("/:id", async (req, res) => {
  try {
    //using the id in the url params to querry our database
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      //second param must be an object sending to show page via props
      fruit: foundFruit,
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
