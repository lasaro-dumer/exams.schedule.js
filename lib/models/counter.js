var mongoose = require('mongoose');

var Counters = new mongoose.Schema({
  _id: String,
  seq: Number     
});
module.exports = mongoose.model('counters', Counters);