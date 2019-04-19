var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/add',function(req,res, next){
  res.render('user/useradd',{title:'Home Page'});
});

router.post('/add', function (req,res, next) {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  })

})
module.exports = router;
