var csv = require('csv');
var fs = require('fs');
var geojson = require('geojson');
var path = require('path');
var S = require('string');
var titlecase = require('titlecase');
var moment = require('moment-timezone');

var key_fixes = {
  OBJECTID: 'object_id',
  DATE_CREAT: 'created_at',
  DATE_UPDAT: 'updated_at',
  OwnMail: 'owner_address',
  OwnZip: 'owner_zip',
  ZnLabel: 'zone_label',
  Acre: 'acreage',
  SqFt: 'square_footage'
}

var key_remove = [
  'APN_SORT',
  'APNJoin',
  'Clean_Pa21',
]

function cleanKey(key) {
  if(key_remove.indexOf(key) >= 0) {
    return;
  }

  newKey = key_fixes[key] || S(key).underscore().s;
  if(newKey[0] == '_') {
    newKey = newKey.substr(1);
  }
  return newKey;
}

function fixAddress(address) {
  var address = titlecase(address.toLowerCase());
  return address.replace(' Ca', ', CA');
}

function clean(lot) {
  var newLot = {};

  Object.keys(lot).forEach(function(key) {
    var newKey = cleanKey(key);
    if(newKey) {
      newLot[newKey] = lot[key];
    }
  });

  newLot.address = fixAddress(newLot.address);
  newLot.owner = fixAddress(newLot.owner);
  newLot.owner_address = fixAddress(newLot.owner_address);
  newLot.city = fixAddress(newLot.city);

  newLot.created_at = moment.tz(newLot.created_at, 'America/Los_Angeles').toISOString()
  newLot.updated_at = moment.tz(newLot.updated_at, 'America/Los_Angeles').toISOString()

  return newLot;
}

var vacantLots = []
csv()
  .from.path(path.join(__dirname, 'vacants.csv'), {columns: true})
  .transform(function(lot) {
    vacantLots.push(clean(lot));
  })
  .on('end', function() {
    geojson.parse(vacantLots, {Point: ['lat', 'lng']}, function(geojson) {
      fs.writeFileSync('vacantlots.geojson', JSON.stringify(geojson, null, '  '));
    });
  });
