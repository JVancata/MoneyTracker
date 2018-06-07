var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/money', ['transakce'])
/*var massive = {
  user: "xd",
  transactions: {
    0: {
      transactions: []
    },
    1: {
      transactions: []
    },
    2: {
      transactions: []
    },
    3: {
      transactions: []
    },
    4: {
      transactions: []
    },
    5: {
      transactions: []
    },
    6: {
      transactions: []
    },
    7: {
      transactions: []
    },
    8: {
      transactions: []
    },
    9: {
      transactions: []
    },
    10: {
      transactions: []
    },
    11: {
      transactions: []
    }
  }
};*/


/* GET users listing. */
/*router.get('/', function (req, res, next) {
  console.log(req);
  db.transakce.insert({ shit: "jooo" });
  res.json({ neco: 'respond with a resource' });
});*/

router.post('/insert', function (req, res, next) {
  const transaction = req.body;
  //console.log(req.body);
  //TODO: Verification and schema
  console.log("Inserting transaction ", transaction);
  db.transakce.insert({ ...transaction }, (err, data) => {
    if (err) { console.log(err); }
    res.json({ ...data });
  });
});

router.post('/get', function (req, res, next) {
  const { userId } = req.body;
  console.log("chceš transakce s ID %s jo?", userId);

  db.transakce.find({ userId: { $eq: userId } }, (err, docs) => {
    console.log(docs);
    res.json(docs);
  });
});

module.exports = router;
