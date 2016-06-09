var numbers = [];

var diameter = 860,
format = d3.format(",d"),
color = d3.scale.category10();

var bubble = d3.layout.pack()
.sort(null)
.size([diameter, diameter])
.padding(1.5);

var svg = d3.select("#textContent").append("svg")
.attr("width", diameter)
.attr("height", diameter)
.attr("class", "bubble")
.attr("id", "nodeDiv");

d3.json("flare.json", function(error, root) {
  if (error) throw error;

  var node = svg.selectAll(".node")
  .data(bubble.nodes(classes(root))
  .filter(function(d) { return !d.children; }))
  .enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
  .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
  /** Use this when we have enough attendences: .attr("r", function(d) { return d.r; }) **/
  .attr("r", function(d) { return (d.r - 30) * 1.25; })
  .style("fill", function(d) {
    var seen = {};

    var fillColor = color(d.packageName);
    if(fillColor === "#7f7f7f"){
      fillColor = color(d.packageName + 1);
    }

    /** Returns a color generated from value in JSON **/
    return fillColor;
  });

  node.append("text")
  .attr("dy", "-20px")
  .attr("x", function(d){return d.cx;})
  .attr("y", function(d){return d.cy;})
  .style("text-anchor", "middle")
  .style("font-size", "16px")
  .style("font-weight", "bold")
  .text(function(d) { return d.className; });

  node.append("text")
  .attr("dy", "5px")
  .attr("x", function(d) {return d.cx;})
  .attr("y", function(d) {return d.cy;})
  .style("text-anchor", "middle")
  .text(function(d) { return d.packageName; });

  node.append("text")
  .attr("dy", "30px")
  .attr("x", function(d) {return d.cx;})
  .attr("y", function(d) {return d.cy;})
  .style("text-anchor", "middle")
  .text(function(d) { return format(d.value); });

  /** Did not work to append an image (Was thinking to add the flag now at the bottom) WHY??? **/
  /**
  node.append("image")
  .attr("dy", "55px")
  .attr("x", function(d) {return d.cx;})
  .attr("y", function(d) {return d.cy;})
  .attr("type", "image/svg+xml")
  .attr("xlink:href", function(d){return 'img/16/' + d.packageName + '.png'})
  .style("text-anchor", "middle");
  **/

});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.goals, in: node.in});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
