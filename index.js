const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [];

app.get('/', function (req, res){
    res.render("list", { ejes: items });
});

app.post("/", function(req, res){
    const item = req.body.ele1;
    items.push({ name: item, id: Date.now().toString() }); // add id
    res.redirect("/");
});

app.post("/delete", function(req, res){
    const idToDelete = req.body.id;
    items = items.filter(item => item.id !== idToDelete); // remove by id
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Server Successfully Started");
});
