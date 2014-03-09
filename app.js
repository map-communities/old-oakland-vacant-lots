var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([37.8102589045, -122.265385309], 12);

L.mapbox.featureLayer('./vacantlots.geojson').on('ready', function(e) {
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
});
