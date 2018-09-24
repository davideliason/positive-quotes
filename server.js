const express = require('express');
const app = express();

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req,res) => {
	res.send('got a new quote');
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});