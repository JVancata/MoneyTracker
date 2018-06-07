var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/money', ['transakce'])

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.transakce.insert({ shit: "jooo" });
  res.json({ neco: 'respond with a resource' });
});

module.exports = router;
