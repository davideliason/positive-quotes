const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()

var db;

MongoClient.connect(process.env.DB_HOST, (err,client) => {
	console.log('connected to db');
	if(err) return console.log(err);
	db = client.db('positive-quotes');

	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', (req,res) => {
		res.sendFile(__dirname + '/index.html');
	});

	app.post('/quotes', (req, res) => {
  		db.collection('quotes').save(req.body, (err, result) => {
    	if (err) return console.log(err)

    	console.log('saved to database')
    	res.redirect('/')
  })
})

	app.listen(3000, () => {
	console.log("listening on port 3000");
   });
});

// middleware
