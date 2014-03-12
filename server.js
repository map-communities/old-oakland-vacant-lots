var express = require('express')
  , fs = require('fs');

var app = express();

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// cache vacant lots in memory until a db is implemented
var vacantlots = fs.readFileSync(__dirname + '/vacantlots2.json', { encoding: 'utf8' });
app.get('/vacantlots.json', function(req, res) {
  res.type('json');
  res.send(vacantlots);
});

// serve static files
app.use(express.static(__dirname));

// start listening
app.listen('5000', function() {
  console.log('Listening on port 5000');
});
