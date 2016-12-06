var express = require('express');
var router = express.Router();
var q = require('q');
var jsonfile = require('jsonfile');


var parser = require('../libs/services/parser');

/* GET home page. */

router.get('/build', function(req, res) {

    console.log('Building');

  parser
      .makeRequest()
      .then(function(o){
        res.sendStatus(200).end();
      })
  ;




});

router.get('/data', function(req, res){
    jsonfile.readFile('public/data.json', function(err, obj){
        res.json(obj).end();
    })
});

module.exports = router;
