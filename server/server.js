var express = require('express');
var app = express();
var config = require('./config');
var Poll = require('./models/poll');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect(config.server.database_host);
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
// MODIFY POLLS ----------------------------------------------------------------
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
    console.log(req);
    res.json(errorResponse("Missing poll name or options"));
  }
});

app.put('/api/poll/:id/:option', function(req, res){

});

// GET POLLS -------------------------------------------------------------------
app.get('/api/poll/:id', function(req, res){

});

// get the port number from the server environment or the config file if running locally
const PORT = process.env.PORT || config.server.port;

// start the server
app.listen(PORT, function(){
  console.log("Server listening on: " + PORT);
});
