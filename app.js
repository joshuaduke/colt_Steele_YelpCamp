let express = require('express');
let app = express();

app.set("view engine", "ejs"); // to remove ejs extension from res.render

app.get("/", (req, res)=>{
  res.render("landing");
});

app.listen(3000 ,process.env.IP, ()=>{
  console.log("The server is running...");
});