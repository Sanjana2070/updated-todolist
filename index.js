const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://sanjana:hello@playful.ha5wyqd.mongodb.net/?retryWrites=true&w=majority&appName=playful")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);

const todo2 = new Item({ name: "Create Qalira" });
const todo3 = new Item({ name: "Learn React" });
const todo4 = new Item({ name: "Create todo" });

/* async function saveTodos() {
  try {
    await todo2.save();
    await todo3.save();
    await todo4.save();
    console.log("Todos saved.");
  } catch (err) {
    console.error(err);
  }
}
saveTodos();
*/

app.get("/", async (req, res) => {
  try {
    const foundItems = await Item.find({});
    res.render("list", { ejes: foundItems });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/", function(req, res){
    const itemName = req.body.ele1;
    const todo4 = new Item({
        name:itemName
    })
    todo4.save();
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await Item.findByIdAndDelete(id);
  res.redirect("/");
});


app.listen(3000, () => console.log("Server running on port 3000"));
