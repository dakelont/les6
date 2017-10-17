'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

const sendForm = '<form action="/post" method="post" name="user"><input type="text" name="name"><input type="text" name="score"><input type="submit"></form>';

const middleware = function (req, res, next) {
	res.status(200);
	next();
}
const midPost = function (req, res, next) {
	if(req.body) {
		res.status(200);
		next(); 
	}
	else {
		res.sendStatus(404);
	}
}

app.get('/', middleware, function (req, res) {
	res.send('Hello, Express.js');
});
app.get('/hello', middleware, function (req, res) {
	res.send(sendForm + 'Hello stranger!');
});
app.get('/hello/:name', middleware, function (req, res) {
	res.send(`Hello ${req.params.name}`); 
});
app.all('/sub/:part1/:part2', function (req, res) {
	res.send(`You requested URI: /sub/${req.params.part1}/${req.params.part2}`); 
});
app.post('/post', midPost, function (req, res) {
	let post = JSON.stringify(req.body);
	res.send(`You POST: ${post} .`); 
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});