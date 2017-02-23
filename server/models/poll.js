var mongoose = require('mongoose');
var config = require('../config');
var Schema = mongoose.Schema;

// define the behavior we want each poll to have
var pollSchema = new Schema({
  poll_name: String,
  poll_options: [{ option_name: String, vote_count: Number }],
  poll_votes: Number,
});

// different poll methods
pollSchema.methods.isValidOptionCount = function(optionCount){
  if(optionCount){
    return (optionCount > config.polls.min_options) && (optionCount < config.polls.max_options);
  } else {
    return false;
  }
};

// attach schema to the model
var Poll = mongoose.model('Poll', pollSchema);

// export the model to be used elsewhere
module.exports = Poll;
