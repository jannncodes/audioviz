const express = require('express');
const app = express();
const path = require('path');

//Server
app.listen(3000, function () {
    console.log('The server is listening on port 3000!');
});

//File Requests
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/public/:file', function(req, res){
  res.sendFile(path.join(__dirname, '/public', req.params.file));
});
