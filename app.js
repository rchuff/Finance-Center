//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/routes.js');
const app = express();
let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'));

app.use("/api", router);


app.listen(port, () => console.log('App has started successfully'));
