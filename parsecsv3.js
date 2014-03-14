'use strict';

var fs = require('fs');

fs.readFile(__dirname + '/vacants.csv', { encoding: 'utf8' }, function(err, rows) {
  if (err) throw err;

  rows = rows.split('\n');
  var columnnames = rows[0].split(',');
  console.log(columnnames);

// convert row strings into objects
  var lots = []
    , column
    , i
    , j;
  for (i=1; i<rows.length; i++) {
    column = {};
    rows[i] = rows[i].split(',');
    for (j=0; j<columnnames.length; j++) {
      column[columnnames[j]] = rows[i][j];
    }
    lots.push(column);
  }

  var json = []

// push each lot to a properly formatted geojson with
//   EVERY property from the csv
  var point;
  lots.forEach(function(lot) {
    var lat = parseFloat(lot.lat)
      , lng = parseFloat(lot.lng);
    delete lot.lat;
    delete lot.lng;

    if (!isNaN(lat) && !isNaN(lng)) {
      point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ lng, lat ]
        },
        properties: lot
      };

      json.push(JSON.stringify(point));
    }

  });

// join the json into a file for a mongodb import
var towritetofile = json.join('\n');

// write geojson to file
  fs.writeFile(__dirname + '/vacantlots3.json', towritetofile, function(err) {
    if (err) throw err;
    console.log('saved geojson');
  });
});