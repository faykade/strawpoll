var express = require('express');
var app = express();
var config = require('./config');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Poll = require('./models/poll');



mongoose.Promise = global.Promise;
mongoose.connect(config.server.database_host);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./../client'));

var errorResponse = function(msg){
  return {
    success: false,
    message: msg,
  };
};

var successResponse = function(msg, data){
  return {
    success: true,
    message: msg,
    data: data,
  };
};


/*==============================================================================
POLL ROUTES
==============================================================================*/
// CREATE A POLL ---------------------------------------------------------------
app.post('/api/poll', function(req, res){
  if(req.body && req.body.poll_name && req.body.poll_options){
    var newPoll = new Poll();
    newPoll.poll_name = req.body.poll_name;
    newPoll.poll_options = req.body.poll_options;
    newPoll.poll_votes = 0;
    newPoll.save(function(err,poll){
      if(err){
        res.json(errorResponse("Error saving poll information"));
      } else {
        res.json(successResponse("Successfully created poll", poll));
      }
    });
  } else {
    res.json(errorResponse("Missing poll name or options"));
  }
});

// ADD VOTE  -------------------------------------------------------------------
app.put('/api/poll/:poll_id/:option_id', function(req, res){
  if(req.params.poll_id && req.params.option_id){
    Poll.findOneAndUpdate(
      {'_id': req.params.poll_id, 'poll_options._id' : req.params.option_id},
      {'$inc': {'poll_votes' : 1, 'poll_options.$.vote_count': 1}},
      {new: true},
      function(err, poll){
        if(err){
          res.json(errorResponse("Error updating vote"));
        } else {
          res.json(successResponse("Successfully updated vote", poll));
        }
      }
    );
  }
});

// GET A POLL ------------------------------------------------------------------
app.get('/api/poll/:poll_id', function(req, res){
  if(req.params.poll_id){
    Poll.findOne({'_id': req.params.poll_id}, function(err, poll){
      if(err){
        res.json(errorResponse("Poll ID not found in database"));
      } else {
        res.json(successResponse("Found poll", poll));
      }
    });
  }
});

// get the port number from the server environment or the config file if running locally
const PORT = process.env.PORT || config.server.port;

// start the server
app.listen(PORT, function(){
  console.log("Server listening on: " + PORT);
});
