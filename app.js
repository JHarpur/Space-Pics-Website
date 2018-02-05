//including our frameworks/libraries
var express     = require("express"),
methodOverride  = require("method-override"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
app             = express();

const ejsLint = require('ejs-lint');


// APP CONFIG
mongoose.connect("mongodb://localhost/spacePhotosApp");
app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride("_method"));


//defining Schema
var picSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {type: Date, default: Date.now} //i.e it should be a date and to check for default date value as of now
});



//MONGOOSE/MODEL CONFIG
var Pic = mongoose.model("Pic", picSchema);

//RESTFUL ROUTES
app.get("/", function (req, res){
    res.redirect("/pics");
        
});

//INDEX ROUTE
app.get("/pics", function (req, res){
    Pic.find({}, function (err, pics){ 
        if (err) {
            console.log(err);
        } else {
            res.render("index", {pics: pics}); 
        }
    });
});


//NEW ROUTE
app.get("/pics/new", function(req, res){
    res.render("new");
});

// ABOUT ROUTE
app.get("/pics/about", function(req, res){
    res.render("about");
});

// CONTACT ROUTE
app.get("/pics/contact", function(req, res){
    res.render("contact");
});

//CREATE ROUTE
app.post("/pics", function(req, res){
   //create blog
   Pic.create(req.body.pic, function (err, newPic){
       if(err) {
           res.render("new");
       } else {
           res.redirect("/pics");
       }
   });
});

//SHOW ROUTE
app.get("/pics/:id", function(req, res){
   Pic.findById(req.params.id, function(err, foundPic){
       if (err) {
           res.redirect("/pics");
       } else {
           res.render("show", {pic: foundPic});
       }
   })
});

//EDIT ROUTE
app.get("/pics/:id/edit", function(req,res){
   Pic.findById(req.params.id, function(err, foundPic){
       if (err){
           res.redirect("/pics");
       } else {
              res.render("edit", {pic: foundPic}); 
       }
   })
});

//UPDATE ROUTE
app.put("/pics/:id", function(req, res){
   Pic.findByIdAndUpdate(req.params.id, req.pic.blog, function(err, updatedPic){
       if(err) {
           res.redirect("/pics");
           } else {
               res.redirect("/pics/" + req.params.id);
           }
   });
});

//DELETE ROUTE
app.delete("/pics/:id", function(req, res){
   //destroy blog
   Pic.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           res.redirect("/pics");
       } else {
           res.redirect("/pics");
       }
   });

});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Space Photos Server is running");
});
