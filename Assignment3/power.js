
/*******************************************************************************
Author: Venkata Karthik Thota
File: gdpBarGraph.js
See google style guide on JavaScript code sytle if needed.
*******************************************************************************/

// See D3 margin convention: http://bl.ocks.org/mbostock/3019563
var margin = {top: 20, right: 10, bottom: 150, left:180},
    width = 1500 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;

/*------------------------------------------------------------------------------
define SVG
Still confused about SVG? see Chapter 3.
The "g" element is used as a container for grouping objects. The SVG will be
in "lightgrey" backgorund to help you visualize it.
See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g for more info
------------------------------------------------------------------------------*/


 var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-30, 0])
  .html(function(d) {
    return "<strong>Power:</strong> <span style='color:blue'>" + d.power + "</span>";
  });
var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");

svg.call(tip)
/* -----------------------------------------------------------------------------
SCALE and AXIS are two different methods of D3. See D3 API Refrence for info on
AXIS and SCALES. See D3 API Refrence to understand the difference between
Ordinal vs Linear scale.
------------------------------------------------------------------------------*/
// define x and y scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.1, 0.1);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");



/* -----------------------------------------------------------------------------
To understand how to import data. See D3 API refrence on CSV. Understand
the difference between .csv, .tsv and .json files. To import a .tsv or
.json file use d3.tsv() or d3.json(), respectively.
------------------------------------------------------------------------------*/
d3.json("Power(descending)2013.json", function(error,data) {
  if(error) console.log("Error: data not loaded!");



  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.country; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.power; } ) ]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)

    .attr({
      "x": function(d) { return xScale(d.country); },
      "y": function(d) { return yScale(d.power); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.power); }
    })
     .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


     svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.power;
            })
            .attr({
                "x": function(d){ return xScale(d.country) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.power)+ 10; },
                "font-family": 'sans-serif',
                "font-size": '12px',
                "fill": 'white',
                "font-weight":'bold',
                "text-anchor": 'middle'
            });

     // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-0.8em")
        .attr("dy", "0.25em")
        .attr("transform", "rotate(-45)" )
        .style("text-anchor", "end")
        .attr("font-size", "35px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
   .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("Power(billions)");
});
