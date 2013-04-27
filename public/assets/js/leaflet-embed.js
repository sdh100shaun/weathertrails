var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

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
		
	 

	L.marker(coords,{"draggable":true})
	.on("dragend", function(e){
		var marker = e.target;  
    	var result = marker.getLatLng();
    	console.log(result.lat);
	})
	.addTo(map)
    .bindPopup('')
    .openPopup();
}


