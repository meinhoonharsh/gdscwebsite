const express = require("express");
const app = express();
const path = require("path");
const departments = require('./json/departments.json');
const router = express.Router();
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');


// use public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
router.get("/", (req, res) => {
  res.render("index",{
    departments: departments
  });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Hey", message: "Hello there!" });
});

app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 3000");