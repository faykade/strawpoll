var mongoose = require('mongoose');
var config = require('../config');
var Schema = mongoose.Schema;

// plugin promise library
mongoose.Promise = global.Promise;

// define the behavior we want each poll to have
var pollSchema = new Schema({
  poll_name: String,
  poll_options: [{ option_name: String, vote_count: Number }],
  poll_votes: Number,
});

// attach schema to the model
var Poll = mongoose.model('Poll', pollSchema);

// export the model to be used elsewhere
module.exports = Poll;
