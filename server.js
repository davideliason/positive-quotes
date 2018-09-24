const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req,res) => {
	console.log(req.body);
	res.send('got a new quote');
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});