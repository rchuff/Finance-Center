//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/routes.js');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'));

app.use("/api", router);


app.listen(3000, () => console.log('App running on port 3000'));
