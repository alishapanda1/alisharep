var express = require("express");
var path = require("path");
var app = express();
var fs = require('fs');
var items=[];
var fileContents=fs.readFileSync("D:/workspace/StackRoute/Assignment5/public/movies.json");

var items=JSON.parse(fileContents);
console.log(items);

var bodyParser=require("body-parser")
var urlEncoder=bodyParser.urlencoded({ extended: true })

app.use(express.static(path.join((__dirname,"public"))));

app.get('/getObj', function(req,res){
  // res.send("hello");
  res.send(items);
});
app.get('/form', function(req,res){
  // res.send("hello");
  res.sendfile("./index.html");
});
app.get('/update', function(req,res){

  console.log("sllll");
  // res.send("hello");
  // res.sendfile("./index.html");
});
// app.put('/:id', function(req, res) {
//     var id = req.params.id;
//   }
app.post('/update', urlEncoder,function(req,res){
  var imdbID=req.body.imdbID;

  for(var i=0;i<items.length;i++){
    if(items[i].imdbID==imdbID){

      items[i].Title=req.body.movieName;
      items[i].Year=req.body.yearReleased;
      items[i].Rated=req.body.rated;
      items[i].Released=req.body.dateRelease;
      items[i].Director=req.body.directorName;
      items[i].Actors=req.body.actorsName;
      items[i].Runtime=req.body.runtime;
      items[i].Genre=req.body.genre;
      items[i].Writer=req.body.writer;
      items[i].Plot=req.body.plotMovie;
      items[i].Language=req.body.language;
      items[i].Country=req.body.country;
      items[i].Awards=req.body.awardsWon;
      items[i].Poster="/images/M/"+(req.body.poster);
      items[i].Metascore=req.body.metascore;
      items[i].imdbRating=req.body.imdbRating;
      items[i].imdbVotes=req.body.imdbVotes;
      items[i].Response=req.body.response;
    }
  }

  var obj=JSON.stringify(items);

  fs.writeFile("D:/workspace/StackRoute/Assignment5/public/movies.json", obj, function(err){
    if(err) console.log("error");
  });
  res.sendfile("./public/index.html");


});

app.post('/delete',urlEncoder,function(req,res){
  var index=req.body;

  // console.log("dsjdh"+index.id);

  items.splice(index.id,1);
  var obj=JSON.stringify(items);

  fs.writeFile("D:/workspace/StackRoute/Assignment5/public/movies.json", obj, function(err){
    if(err) console.log("error");
  });

});
 app.post('/form', urlEncoder,function(req,res){

   items.push({"Title":req.body.movieName,"Year":req.body.yearReleased,"Rated":"R",
   "Released":req.body.dateRelease,"Runtime":req.body.runtime,"Genre":req.body.genre,
   "Director":req.body.directorName,"Writer":req.body.writer,"Actors":req.body.actorsName,
   "Plot":req.body.plotMovie,"Language":req.body.language,"Country":req.body.country,
   "Awards":req.body.awardsWon,"Poster":"/images/M/"+(req.body.poster),"Metascore":req.body.metascore,
   "imdbRating":req.body.imdbRating,"imdbVotes":req.body.imdbVotes,
   "imdbID":req.body.imdbID,"Type":req.body.movietype,"Response":req.body.responseMovie});

   var obj=JSON.stringify(items);

   fs.writeFile("D:/workspace/StackRoute/Assignment5/public/movies.json", obj, function(err){
     if(err) console.log("error");
   });
   res.sendfile("./public/index.html");


 });
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');

  // fs.writeFile('movies.json', JSON.stringify(items, null, 4), function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("JSON saved to ");
  //   }
  //   console.log(JSON.stringify(items));

  // });
});
// app.listen(8080);
