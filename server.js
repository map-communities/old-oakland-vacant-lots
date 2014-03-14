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
    if (err) console.log('mongodb authentication error - ' + err);
    if (data) console.log('mongodb authenticated! - ' + data);
  });

  // collections
  var lots = db.collection('lots');

  app.get('/ajax/vacantlots', function(req, res) {
    lots.find().toArray(function(err, docs) {
      if (err) console.log('mongodb error - '+err);
      res.json(docs);
    });
  });

  
});


// start listening
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on port 5000');
});
