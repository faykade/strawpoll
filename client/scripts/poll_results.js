var displayPollResults = function(pollData){
  if(pollData && pollData.data && pollData.success){
    var $container = $('.poll_results');
    var results = [];
    $.each(pollData.data.poll_options, function(index, result){
      var currentResult = '<tr><td>' + escapeHtml(result.option_name) + '</td><td>' + escapeHtml(result.vote_count) + '</td></tr>';
      results.push(currentResult);
    });
    $container.append(results.join());
  } else {
    alert("Sorry, there was an error retrieving the poll data");
  }
};



$(function(){
  var pollID = getUrlParameter("poll_id");

  if(pollID){
    requestPoll(pollID, displayPollResults);
  }
  else{
    alert("Sorry, no poll_id given to search for");
  }
});
