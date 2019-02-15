const MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://mongodb:27017/mydb',
    express = require('express'),
    app = express();
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err;
    }
    console.log('Database created!');
    const mydb = db.db('mydb');
    mydb.collection('data').findOne({}, function(err, result) {
      if (result === null) {
        result = {value: 1};
        mydb.collection('data').insertOne(result, function(err, res) {
          if (err) throw err;
        });
      } else {
        var newvalues = {$set: {value: result.value++}};
        mydb.collection('data').
            updateOne(result, newvalues, function(err, res) {});
      }
      db.close();
      res.send(result.value.toString());
    });
  });
})
;
app.listen(80);