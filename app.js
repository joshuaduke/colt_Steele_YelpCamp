let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.set("view engine", "ejs"); // to remove ejs extension from res.render
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
  res.render("landing");
});

app.get("/campgrounds", (req, res)=>{
  let campgrounds = [
      {name: "Salmon Creek", image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/64/9d/47/salmon-creek-falls-trail.jpg"},
      {name: "Batcave", image: "https://i.pinimg.com/originals/8a/49/1f/8a491fdd64f3f479a0b7576e1ba94b94.jpg"},
      {name: "Fortress of solitude", image: "https://qph.fs.quoracdn.net/main-qimg-0c05c6a59d878179df5f1f529740b4fa"}  
  ]
  res.render("campgrounds", {campgrounds: campgrounds}); //name: data passing in 
});

app.get("/campgrounds/new", (req, res)=>{
  res.render("new");
})

app.post("/campgrounds", (req,res)=>{
  //get data from form and add to campgrounds array
res.send("active");
  //redirect back to campgrounds page
});

app.listen(3000 ,process.env.IP, ()=>{
  console.log("The server is running...");
});