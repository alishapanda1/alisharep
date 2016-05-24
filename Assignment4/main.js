var fs = require('fs');

var obj1=[], obj2=[], obj3=[];

var data=[];
var fileContents = fs.readFileSync("datafile.csv");
//reading the csv file
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    data.push(lines[i].split(','));

}
//csv to array


for(var j=1;j<lines.length-1;j++){

  obj1.push({"country":data[j][0].substring(1,data[j][0].length-1),
  "population":parseFloat(data[j][5].substring(1,data[j][5].length-1))});
}
//obj1 contains the countries and population

for(var k=0;k<obj1.length;k++){
  if(obj1[k].country=="European Union"){
    obj1.splice(k);
  }
}
//splicing out European Union from obj1

for(var j=1;j<lines.length-1;j++){

  obj2.push({"country":data[j][0].substring(1,data[j][0].length-1),"gdp":parseFloat(data[j][9].substring(1,data[j][9].length-1))});
}
//obj2 contains the countries and gdp

for(var k=0;k<obj2.length;k++){
  if(obj2[k].country=="European Union"){
    obj2.splice(k);
  }
}

//splicing out European Union from obj2

for(var j=1;j<lines.length-1;j++){
  obj3.push({"country":data[j][0].substring(1,data[j][0].length-1),"power":parseFloat(data[j][17].substring(1,data[j][17].length-1))});
}
//obj3 contains the countries and power
for(var k=0;k<obj3.length;k++){
  if(obj3[k].country=="European Union"){
    obj3.splice(k);
  }
}

//splicing out European Union from obj3

var sortedObj1 = obj1.slice(0);
sortedObj1.sort(function(a,b){
  return b.population - a.population;
});

//sort by population

var sortedObj2 = obj2.slice(0);
sortedObj2.sort(function(a,b){
  return b.gdp - a.gdp;
});

//sort by GDP

var sortedObj3 = obj3.slice(0);
sortedObj3.sort(function(a,b){
  return b.power - a.power;
});

//sort by Power

var outputFilename1 = 'Population(descending)2013.json';

fs.writeFile(outputFilename1, JSON.stringify(sortedObj1, null, 4), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename1);
  }
  console.log(JSON.stringify(sortedObj1));

});
//writing the Population(descending)2013.json file

var outputFilename2 = 'GDP(descending)2013.json';

fs.writeFile(outputFilename2, JSON.stringify(sortedObj2, null, 4), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename2);
  }
  console.log(JSON.stringify(sortedObj2));

});
//writing the GDP(descending)2013.json file

var outputFilename3 = 'Power(descending)2013.json';

fs.writeFile(outputFilename3, JSON.stringify(sortedObj3, null, 4), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename3);
  }
  console.log(JSON.stringify(sortedObj3));

});
//writing the Power(descending)2013.json file
