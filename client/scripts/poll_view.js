var displayPollOptions = function(pollData){
  var $container = $('.options_container');
  var $titleContainer = $('.poll_name');
  $titleContainer.html(escapeHtml(pollData.data.poll_name));
  var options = [];
  $.each(pollData.data.poll_options, function(index, option){
    var checkedStatus = index === 0 ? ' checked' : '';
    var optionHTML = '<label><input type="radio" name="option" value="' + option._id + '"' + checkedStatus + '>' + escapeHtml(option.option_name) + '</label>';
    options.push(optionHTML);
  });
  var allOptions = options.join('</br>');
  $container.html(allOptions);
};

var addVote = function(e, poll, callback){
  e.preventDefault();
  var selectedOption = $('#vote_form input[type="radio"]:checked').val();
  $.ajax({
    url: "http://localhost:3000/api/poll",
    method: "PUT",
    data: {
      poll_id: poll,
      option_id: selectedOption
    },
    dataType: "json"
  })
    .done(callback)
    .fail(function(xhr, status, err){
      alert("Error adding vote to poll, please try again");
    });
};

$(function(){
  var pollID = getUrlParameter("poll_id");

  if(pollID){
    requestPoll(pollID, displayPollOptions);
    $(document).on('submit', '#vote_form', function(e){
      addVote(e, pollID, function(){
        window.location.href = 'poll_results.html?poll_id=' + pollID;
      });
    });
  }
  else{
    alert("Sorry, no poll_id given to search for");
  }
});
