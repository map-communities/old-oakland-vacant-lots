var csv = require('csv');
var fs = require('fs');
var geojson = require('geojson');

var vacantLots = []
csv()
  .from
  .stream(fs.createReadStream('./vacants.csv'))
  .transform(function(row, index) {
    var lot = {
      name: row[7].replace(/\s+/, ' '),
      street: row[8].replace(/\s+/, ' '),
      category: row[18],
      lat: row[20],
      lng: row[21]
    };
    if(index > 0 && index < 300) {
      vacantLots.push(lot);
    }
  })
  .on('end', function() {
    geojson.parse(vacantLots, {Point: ['lat', 'lng']}, function(geojson) {
      fs.writeFileSync('vacantlots.geojson', JSON.stringify(geojson, null, '  '));
    });
  });
