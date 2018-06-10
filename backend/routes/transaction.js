const express = require('express');
const router = express.Router();
const mongojs = require('mongojs')
const db = mongojs('mongodb://localhost:27017/money', ['transakce'])
const ObjectId = mongojs.ObjectId;
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

router.post('/delete', function (req, res, next) {
  const { userId, _id } = req.body;
  console.log(userId, _id)
  db.transakce.remove({ _id: ObjectId(_id), userId: { $eq: userId } }, (err, data) => {
    if (err) { console.log(err); }
    res.json({ msg: "deleted" });
  });
});

router.post('/update', function (req, res, next) {
  let { userId, transaction } = req.body;
  if (!transaction.offline) delete transaction.offline;
  const { description, month, amount, add } = transaction;
  db.transakce.update({ _id: ObjectId(transaction._id), userId: { $eq: userId } }, { userId: userId, description: description, month: month, amount: amount, add: add }, (err, data) => {
    if (err) { console.log(err); }
    res.json({ msg: "updated" });
  });
});

router.post('/get', function (req, res, next) {
  const { userId } = req.body;
  console.log("chceš transakce s ID %s jo?", userId);

  db.transakce.find({ userId: { $eq: userId } }, (err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
