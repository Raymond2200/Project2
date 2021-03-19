var express = require('express');
var router = express.Router();
const passport = require('passport');
let indexCtrl = require('../controller/Index')

router.get('/', indexCtrl.index)

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/search',  indexCtrl.search)


module.exports = router;
