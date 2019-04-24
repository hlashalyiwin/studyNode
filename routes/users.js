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
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.city = req.body.city;
  user.state = req.body.state;
  user.zip = req.body.zip;
  user.save(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userdetails/'+ rtn.id);
  })
})

router.get('/userdetails/:id',function (req,res, next){
  User.findById(req.params.id, function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/userdetails',{ title:'User Detail', user:rtn});
  })
})

router.get('/userlist',function (req,res,next){
  User.find({},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/userlist', {title:'User List',user:rtn});
  })
})

router.get('/userupdate/:id',function (req,res,next){
  User.findById(req.params.id, function(err, rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/userupdate', {title:'User Update',user:rtn});
  })
})

router.post('/userupdate',function (req,res,next){
  var update = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  User.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  })
})
//Delete
router.get('/userdelete/:id', function(req,res, next){
  User.findByIdAndRemove(req.params.id, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  })
})
module.exports = router;
