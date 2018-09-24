const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()
app.set('view engine', 'ejs')
// static docs
app.use(express.static('public'));
// server to read JSON data
app.use(bodyParser.json())

var db;

MongoClient.connect(process.env.DB_HOST, (err,client) => {
	console.log('connected to db');
	if(err) return console.log(err);
	db = client.db('positive-quotes');

	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/', (req,res) => {
		db.collection('quotes').find().toArray(function(err,result){
			if(err) return console.log(err)
				res.render('index.ejs', {quotes: result})
		});

	});

	app.put('/quotes', (req,res) => {
       db.collection('quotes').findOneAndUpdate(
  			{name : "David Eliason"},
  			{
  			  $set: {
  			  	name: req.body.name,
  			  	quote: req.body.quote
  			  }},
  			{
  			  sort: { _id: -1},
  			  upsert: true
  			},
  			(err, result) => {
  				if (err) return res.send(err)
  				res.send(result)
			})
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
