const express = require('express');
const router = express.Router();

const parser = require('../lib/Parser');

/* GET home page. */
router.get('/', (req, res) => {

  parser.parse();

  res.json({status: 'ok'});


});

module.exports = router;
