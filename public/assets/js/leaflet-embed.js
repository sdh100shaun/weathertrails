var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var marker; 

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
    	get_popup([result.lat,result.lng]);
	})
	
	marker.addTo(map)
    

    get_popup(coords);
}

function get_popup(coords)
{
	console.log(coords);
	$.getJSON( '/place/'+coords[0]+'/'+coords[1], function(data) {
  		
  		var template = "<h1>{{country}}</h1><p>{{woeid}}</p>";

    	var html = Mustache.to_html(template, data.query.results.Result);
    	console.log(html);
    	marker.bindPopup(html).openPopup();
    	//map.panTo(new L.LatLng(coords[0], coords[1]) );
	})
	.done(function() { console.log( "second success" ); })
	.fail(function() { console.log( "error" ); })
	.always(function() { console.log( "complete" ); });
	
	

}

