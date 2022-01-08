const express = require("express");
const app = express();
const path = require("path");
const departments = require('./json/departments.json');
const partners = require('./json/communitypartners.json');
const teams = require('./json/teams.json');
const axios = require('axios')
const { resolve } = require("path");
const { param } = require("express/lib/request");

const router = express.Router();
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

 


// use public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
router.get("/", (req, res) => {
  
  // const teamsData = axios.get('http://localhost:1337/api/teams')
  axios.get('http://localhost:1337/api/teams')
  .then(response => {

  const params = {
    departments: departments,
    partners: partners,
    teams: response.data.data
  }
  // console.log(params)
    res.render("index", params);
  })


});

router.get("/contact", (req, res) => {
  res.render("contact",{
    departments: departments,
    partners: partners,
    teams: teams
  });
});

router.get("/axios", (req, res) => {
  // Api call to localhost:1337/api/teams using http
 res.send("I am working Fine")
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Hey", message: "Hello there!" });
});

app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 8000");