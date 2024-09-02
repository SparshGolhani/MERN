const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://0.0.0.0/itemdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  qty: Number,
  price: Number,
  date: Date,
});

const Item = mongoose.model("Item", itemSchema);

app.post("/items", (req, res) => {
  const items = req.body;
  Item.insertMany(items)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

app.listen(port, () => console.log(`Server running on port ${port}`));