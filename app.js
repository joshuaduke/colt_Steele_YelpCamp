let express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDb      = require("./seeds")

seedDb();    
mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs"); // to remove ejs extension from res.render

let campgrounds = [
  {name: "Star Labs", image: "https://vignette.wikia.nocookie.net/dccu/images/a/a4/S.T.A.R._Labs_-_Desk_of_Silas_Stone.jpg/revision/latest?cb=20180322215627"},
  {name: "Batcave", image: "https://i.pinimg.com/originals/8a/49/1f/8a491fdd64f3f479a0b7576e1ba94b94.jpg"},
  {name: "Fortress of solitude", image: "https://qph.fs.quoracdn.net/main-qimg-0c05c6a59d878179df5f1f529740b4fa"}, 
   
]

app.get("/", (req, res)=>{
  res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", (req, res)=>{
  //Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err)
    }else{
      res.render("index", {campgrounds: allCampgrounds});
    }
  })
  // res.render("campgrounds", {campgrounds: campgrounds}); //name: data passing in 
});

//NEW - Show form to create new campground
app.get("/campgrounds/new", (req, res)=>{
  res.render("new");
})

// CREATE ROUTE - Add new campground to database
app.post("/campgrounds", (req,res)=>{
  //get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampgrounds = {name: name, image: image, description: description};

  //Create a new campground an save to database
    // campgrounds.push(newCampgrounds);
  Campground.create(newCampgrounds, function(err, newlyCreated){
    if (err){
      console.log(err);
    }else{
        //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });

});

//SHOW - Shows more info about one campground
app.get("/campgrounds/:id", (req,res)=>{
  //find the campgroun qith provided id 
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err)
    } else {
      console.log(foundCampground);
        //render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
})

app.listen(3000 ,process.env.IP, ()=>{
  console.log("The server is running...");
});