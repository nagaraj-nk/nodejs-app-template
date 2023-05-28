var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const constants = require('../utils/constants');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/testMongo', function (req, res, next) {
  mongoose.set("strictQuery", false);
  const mongoDB = constants.mongoDbConnectionString;
  mongoose.connect(mongoDB);
  // Creating Schemas
  const userSchema = new mongoose.Schema({
    username: String,
    email: String
  });
  const User = mongoose.model('users', userSchema);
  // Query to find and show all the posts
  User.find()
    .then(p => console.log(p))
    .catch(error => console.log(error));
  res.render('home', { title: 'Express' });
});

module.exports = router;
