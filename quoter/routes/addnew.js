const { Router } = require('express');
var express = require('express');
var router = express.Router();
const passport = require('passport');
let addnewCtrl = require('../controller/addnew');

router.get("/", addnewCtrl.addNewIndex);

router.post("/", addnewCtrl.quoteCreate);


module.exports = router;