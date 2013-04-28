var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var marker; 
var pointList=[];

function get_location() {
  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(initmap);
  } else {
    var location = [51.3, 0.7];
    initmap(location);
  }
}

function initmap(location) {
	// set up the map

	
	coords = [location.coords.latitude,location.coords.longitude];
	add_line_point(coords);
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		

	// start the map in South-East England
	map.setView(new L.LatLng(51.3, 0.7),9);
	map.addLayer(osm);

	// add a marker in the given location, attach some popup content to it and open the popup
		
	

	marker = L.marker(coords,{"draggable":true});

	marker.on("dragend", function(e){
		var currentMarker = e.target;  
    	var result = currentMarker.getLatLng();
    	console.log(result);
    	add_line_point([result.lat,result.lng]);
    	get_popup([result.lat,result.lng]);
    	draw_line(pointList);
	})
	
	marker.addTo(map)
    

    get_popup(coords);
}

function add_line_point(coords)
{
	pointList.push(new L.LatLng(coords[0],coords[1]));
}

function draw_line(pointList)
{

var polyline = new L.Polyline(pointList, {
	color: 'red',
	weight: 3,
	opacity: 0.5,
	smoothFactor: 1
	}).addTo(map);
}

function get_popup(coords)
{
	console.log(coords);
	$.getJSON( '/weather/'+coords[0]+'/'+coords[1], function(data) {
  		
  		var template = "<object data=\"/assets/SVG/{{svg}}\" type=\"image/svg+xml\"><img src=\"/assets/img/logo.png\" /></object><p>{{text}}</p><p>{{temp}}<sup>0</sup>F</p>";

    	var html = Mustache.to_html(template, data);
    	console.log(html);
    	marker.bindPopup(html).openPopup();
    	map.panTo(new L.LatLng(coords[0], coords[1]) );
    	add_to_itinery(coords,data)
	})
	.done(function() { console.log( "second success" ); })
	.fail(function() { console.log( "error" ); })
	.always(function() { console.log( "complete" ); });
	
	

}

function add_to_itinery(coords,weather)
{
	$.getJSON( '/place/'+coords[0]+'/'+coords[1], function(data) {
	
		console.log(data);
		results = {
				"place":data.query.results.Result.name,
				"country":data.query.results.Result.country,
				"county":data.query.results.Result.county,
				"temp":weather.temp,
				"text":weather.text
		};
		var template = "<li><span class=\"label label-info\">Info</span>&nbsp; {{county}}({{place}}) {{country}}- {{temp}} - {{text}}</li>";

		var html = Mustache.to_html(template, results);
		$("#itinery ul").append(html);
	});
}
