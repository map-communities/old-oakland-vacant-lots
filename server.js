var express = require('express')
  , MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

// express
var app = express();
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));

// mongodb
var mongoclient = new MongoClient(new Server('oceanic.mongohq.com', 10045));
mongoclient.open(function(err, mongoclient) {
  if (err) console.log('Mongodb error - ' + err);

  var db = mongoclient.db('app22981599');
  db.authenticate('imauser', 'ldt4ieb72o684p4', function(err, data) {
    if (err) console.log('authentication error - ' + err);
    if (data) console.log('authenticated! - ' + data);
  });

  // collections
  var lots = db.collection('lots');
});

// cache vacant lots in memory until a db is implemented
var vacantlots = fs.readFileSync(__dirname + '/vacantlots2.json', { encoding: 'utf8' });
app.get('/vacantlots.json', function(req, res) {
  res.type('json');
  res.send(vacantlots);
});

// start listening
app.listen('5000', function() {
  console.log('Listening on port 5000');
});
