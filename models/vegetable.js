//destructuring the schema and model

const { Schema, model } = require("mongoose");

//creating a new schema, same thing as mongoose.schema
const vegSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});

const Vegetable = model("Vegetable", vegSchema);

module.exports = Vegetable;
