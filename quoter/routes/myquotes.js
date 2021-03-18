var express = require('express');
var router = express.Router();
const passport = require('passport');
let myquoCtrl = require('../controller/myquotes');

router.get('/', myquoCtrl.quoIndex);



module.exports = router;