var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([37.8102589045, -122.265385309], 12)
  , featureLayer;
var popup = L.popup({offset: L.point(0, -30)});

$(document).ready(function() {
  $.getJSON('/ajax/vacantlots', function(data) {
    var geojson = {
      type: 'FeatureCollection',
      features: data
    };

    featureLayer = L.mapbox.featureLayer(geojson)
      .on('click', function(e) {
        var props = e.layer.feature.properties;
        var content = '<h1>' + props.Address + '</h1>' +
          'Category: ' + props.SpecUse + '<br/>' +
          'Acres: ' + props.Acre + '<br/>' +
          'Square Ft: ' + props["SqFt\r"] + '<br/>' +
          'FID Parcel: ' + props.FID_PARCEL;

        popup
          .setContent(content)
          .setLatLng(e.latlng)
          .openOn(map)
        ;

      })
    ;
    
    var markers = new L.MarkerClusterGroup();
    markers.addLayer(featureLayer);

    map.addLayer(markers);
    
  });
});