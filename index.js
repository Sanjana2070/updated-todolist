const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));



const itemSchema = new mongoose.Schema({
  name: String,
  id: String
});

const Item = mongoose.model("Item", itemSchema);


app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render("list", { ejes: items });
});

app.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.ele1,
    id: Date.now().toString()
  });
  await item.save();
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  await Item.deleteOne({ id: req.body.id });
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  await Item.updateOne(
    { id: req.body.id },
    { name: req.body.updatedName }
  );
  res.redirect("/");
});


app.listen(3000, () => console.log("Server running on port 3000"));
