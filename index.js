const express = require("express");
const app = express();
const path = require("path");
const departments = require('./json/departments.json');
const partners = require('./json/communitypartners.json');
const teams = require('./json/teams.json');
const axios = require('axios')
const { resolve } = require("path");
const { param } = require("express/lib/request");
const apiUrl = 'http://localhost:1337'
const router = express.Router();
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

 
getData = async (path) => {
    try {
        const response = await axios.get(apiUrl +'/api/'+ path).then(res => res.data);
        return response.data;
    } catch (error) {
        console.log(error.data);
    } 
  }

// use public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
router.get("/", async (req, res) => {
  
  const teamsData = await getData(`teams`)
  const departmentsData = await getData(`departments?populate=icon`)
  const partnersData = await getData(`communitypartners`)
  const blogsData = await getData(`blogs`)
  const eventsData = await getData(`events`)
  const feedbackData = await getData(`feedbacks`)
  
 
  const params = {
    departments: departmentsData,
    partners: partnersData,
    teams: teamsData,
    blogs: blogsData,
    events: eventsData,
    feedbacks: feedbackData,
    apiUrl: apiUrl
  }
  res.send(params)
  // res.render("index", params);
 


});

router.get("/contact", (req, res) => {
  res.render("contact",{
    departments: departments,
    partners: partners,
    teams: teams
  });
});

router.get("/axios", (req, res) => {
 
  // Send post request with axios to /api/departments 
  axios.post('http://localhost:1337/api/departments', {
    title: 'New Team',
    description: 'New Team Description',
    
  }, {
    "headers": {
       'Content-Type': 'application/json',
    }})
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    res.send(error)
  })

});

router.get("/about", (req, res) => {
  res.render("about", { title: "Hey", message: "Hello there!" });
});

app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 8000");