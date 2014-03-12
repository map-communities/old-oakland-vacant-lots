var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([37.8102589045, -122.265385309], 12)
  , featureLayer;

/* L.mapbox.featureLayer('./vacantlots2.json').on('ready', function(e) {
  var clusterGroup = new L.MarkerClusterGroup();
  e.target.eachLayer(function(layer) {
    var props = layer.feature.properties;
    var content = '<h1>' + props.street + '</h1>' +
      'Category: ' + props.category + '<br/>' +
      'Acres: ' + props.acres + '<br/>' +
      'Square Ft: ' + props.sqFt + '<br/>' +
      'FID Parcel: ' + props.name;
    layer.bindPopup(content);
    clusterGroup.addLayer(layer);
  });
  map.addLayer(clusterGroup);
}); */

$(document).ready(function() {
  $.getJSON('/vacantlots.json', function(geojson) {
    featureLayer = L.mapbox.featureLayer(geojson);

    featureLayer.on('click', function(e) {
      debugger;
    });
  });
});