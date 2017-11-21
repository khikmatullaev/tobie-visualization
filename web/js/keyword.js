/**Initialization**/
var graph = [];
//Append a SVG to the body of the html page. Assign this SVG as an object to svg.
var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
setData();
drawGraph();

function drawGraph(){	
		
	//Create a new force simulation. 
	//Charge is global force that affects every node. 
	//Center translates all nodes to visually move them into the center of the svg element.
	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force("charge", d3.forceManyBody().strength(setStrength()))
		.force("center", d3.forceCenter(width/2, height/2));
		
	//d3.json("keyword.json", function(error, graph) {
	//	if (error) throw error;

	//Set up tooltip
	var linkTip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-10, 0])
		.html(function (d) { return  "node1: "+d.source.id+"<br>node2: "+d.target.id+"<br>Strength: "+d.strength+"<br>Co-occurrence: "+d.cooccurrence; })
	svg.call(linkTip);

	var nodeTip = d3.tip()
		.attr("class", "d3-tip")
		.offset([-10, 0])
		.html(function (d) { return "node: "+d.id+"<br>cluster: "+d.cluster+"<br>occurrence: "+d.occurrence; });
	svg.call(nodeTip);

	//Create the line elements to display our links respectively.
	var link = svg.append("g")
		.attr("class", "links")
		.selectAll("line")
		.data(graph.links)
		.enter().append("line")
		.attr("stroke-width", function(d) { return setWidth(d.strength); })
		.attr("stroke", function(d) { return setLineColor(d.source, d.target) })
		.on("mouseover", linkTip.show)
		.on("mouseout", linkTip.hide);

	//Draw circle elements to display the nodes
	var node = svg.append("g")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graph.nodes)
		.enter().append("circle")
		.attr("r", function(d) { return setRadius(d.occurrence) })
		.attr("fill", function(d) { return color[d.cluster]; })
		.on('dblclick', connectedNodes)
		.on("mouseover", nodeTip.show)
		.on("mouseout", nodeTip.hide)
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	//Draw text elements to display the name of each node
	var text = svg.append("g")
		.attr("class", "texts")
		.selectAll("text")
		.data(graph.nodes)
		.enter().append("text")
		.text(function(d) { return d.id; })
		.attr("font-size", 10)
		.attr("dx", 15)
		.attr("dy", ".35em");

	//Start the simulation, update the coordinates of nodes, texts and links.
	simulation
		.nodes(graph.nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(graph.links);
		
	//Define a tick functions that is executed on every simulation tick.
	function ticked() {
		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
		text
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}
	function dragstarted(d) {
	  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function dragged(d) {
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragended(d) {
	  if (!d3.event.active) simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}
	//Toggle stores whether the highlighting is on
	var toggle = 0;
	//This function looks up whether a pair are in the same cluster.
	function sameCluster(a, b) {
		var sourceCluster = getNodeById(a.id)[0].cluster;
		var targetCluster = getNodeById(b.id)[0].cluster;
		if(sourceCluster == targetCluster){
			return 1;
		}
		else{
			return 0;
		}
	} 
	function connectedNodes() {
		if (toggle == 0) {
			//Reduce the opacity of all but the neighbouring nodes
			d = d3.select(this).node().__data__;
			node.style("opacity", function (o) {
				return sameCluster(d, o)? 1 : 0.1;
			});
			text.style("opacity", function (o) {
				return sameCluster(d, o)? 1 : 0.1;
			});
			link.style("opacity", function (o) {
				if(sameCluster(d,o.source)==1&&sameCluster(d,o.target)==1){
					return 1;
				}
				else{
					return 0.1;
				}
			});
			toggle = 1;
		} else {
			//Put them back to opacity=1
			node.style("opacity", 1);
			text.style("opacity", 1);
			link.style("opacity", 1);
			toggle = 0;
		}
	}
	//Show specified cluster when jumped from strategic diagram
	var cluster;
	if(sessionStorage.getItem("cluster")){
		cluster = sessionStorage.getItem("cluster");
		node.style("opacity", function (d){ return showNodes(d); });
		text.style("opacity", function (d){ return showNodes(d); });
		link.style("opacity", function (d){ return showLinks(d); })
		toggle = 1;
		sessionStorage.removeItem('cluster');
	}
	function showNodes(node){
		if( node.cluster == cluster ){
			return 1;
		}
		else{
			return 0.1;
		}
	}
	function showLinks(link){
		if( link.source.cluster == cluster && link.target.cluster == cluster){
			return 1;
		}
		else{
			return 0.1;
		}
	}
}

/**functions**/
//Set node strength accessor according to node numbers
function setStrength(){
	var length = graph.nodes.length;
	if(length <= 10){
		return -75;
	}
	else if(length > 10 && length <= 20){
		return -50;
	}
	else if(length > 20 && length <= 30){
		return -40;
	}
	else if(length > 30 && length <= 40){
		return -30;
	}
	else if(length > 40 && length <= 50){
		return -25;
	}
	else if(length > 50 && length <= 75){
		return -20;
	}
	else if(length > 75 && length <= 100){
		return -15;
	}
	else {
		return -10;
	}
}

//Set radius of each node according to its occurrence, the radius is between 5px and 15px.
function setRadius(occurrence){
	var maxRadius = 15;
	var minRadius = 5;
	var occurrenceArray = new Array();
	for(var i=0 ; i<graph.nodes.length ; i++){
		occurrenceArray[i] = graph.nodes[i].occurrence;
	}
	var max = Math.max.apply(null,occurrenceArray);
	var min = Math.min.apply(null,occurrenceArray);
	var interval = (max - min) / (maxRadius - minRadius);
	var scale = 1 / interval;
	var radius = (occurrence - min) * scale + minRadius;
	return radius;
}

//Set line color of each link, if two nodes in same cluster, the color is same as the nodes; else, the color will be '#E5E5E5'.
function setLineColor(source, target){
	var sourceCluster = getNodeById(source)[0].cluster;
	var targetCluster = getNodeById(target)[0].cluster;
	if(sourceCluster == targetCluster){
		return color[sourceCluster];
	}
	else{
		return '#999999';
	}
}
function getNodeById(id) {
	var data = graph.nodes;
	return data.filter(
		function(data) {
			return data.id == id
		}
	);
}

//Set width of each link according to its strength, the radius is between 2px and 5px.
function setWidth(strength){
	var maxWidth = 5;
	var minWidth = 2;
	var strengthArray = new Array();
	for(var i=0 ; i<graph.links.length ; i++){
		strengthArray[i] = graph.links[i].strength;
	}
	var max = Math.max.apply(null,strengthArray);
	var min = Math.min.apply(null,strengthArray);
	var interval = (max - min) / (maxWidth - minWidth);
	var scale = 1 / interval;
	var width = (strength - min) * scale + minWidth;
	return width;
}

/**Data**/
//send request to server to get data with (from_date,to_date,country)
function getData(from_date,to_date,country,co,ps1,ps2){
    var result = new Array();

    $.ajax({
        url: 'keyworddb',
        type: "GET",
        data:{from_date:from_date, to_date:to_date, country:country, co:co, ps1:ps1, ps2:ps2},
        dataType: "json",
        async: false,
        error: function(){
            alert('Error loading XML document\n'+'from_date: '+from_date+'\n'+'end_date: '+to_date+'\n'+'country: '+country+'\n'+"co-occurence = "+co+'\n'+"pass1link = "+ps1+'\n'+"pass2link = "+ps2);
        },
        success: function(data){
            result = data;
        }
    });

    return result;
}

function setData(){
	graph = getData(num2ymd(start_date[0],start_date[1]),num2ymd(end_date[0],end_date[1]),country[visibleSeriesIndex][0],co,ps1,ps2);
}

function update(){
	svg.selectAll("line").remove();
	svg.selectAll("circle").remove();
	svg.selectAll("text").remove();
	drawGraph();
}

/**Filters**/