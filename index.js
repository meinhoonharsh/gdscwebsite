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
  
  const teamsData = await getData(`teams?populate=*`)
  const departmentsData = await getData(`departments?populate=*`)
  const partnersData = await getData(`communitypartners?populate=*`)
  const blogsData = await getData(`blogs?populate=*`)
  const eventsData = await getData(`events?populate=*`)
  const feedbackData = await getData(`feedbacks?populate=*`)
  
 
  const params = {
    departments: departmentsData,
    partners: partnersData,
    teams: teamsData,
    blogs: blogsData,
    events: eventsData,
    feedbacks: feedbackData,
    apiUrl: apiUrl
  }
  // res.send(params)
  res.render("index", params);
});

router.get("/contact", (req, res) => {
  res.render("contact",{
    apiUrl: apiUrl
  });
});

// Blogs routes
router.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;
  const blogsData = await getData(`blogs?populate=*`)
  const blog = blogsData.find(blog => blog.attributes.slug === slug);
  if(blog){
    const params = {
      blog: blog,
      apiUrl: apiUrl
    }
    // res.send(params);
    res.render("blog", params);
  }
  else{
    res.send('No blog found for slug: '+ slug)  
  }
});

//  All Blogs Route
router.get("/blogs", async (req, res) => {
  const blogsData = await getData(`blogs?populate=*`)
  const params = {
    blogs: blogsData,
    apiUrl: apiUrl
  }
  // res.send(params);
  res.render("blogs", params);
});



router.get("/about", (req, res) => {
  res.render("about", { title: "Hey", message: "Hello there!" });
});

app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 8000");