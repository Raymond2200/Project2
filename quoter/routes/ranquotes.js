var express = require('express');
var router = express.Router();
const passport = require('passport');
let ranQuotesCtrl = require('../controller/ranquotes')


router.get('/', ranQuotesCtrl.indexran);

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
  res.redirect('/',{user: req.user});
});

router.post('/', ranQuotesCtrl.createQuote);

module.exports = router;