var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1));
  var sURLVariables = sPageURL.split('&');
  var sParameterName;
  var i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

var displayPollOptions = function(pollData){
  console.log(pollData);
  var $container = $('.poll_container');
  var title = '<h1>' + pollData.data.poll_name + '</h1>';
  var submit = '<button type="submit">Cast Vote</button>';
  var options = [];
  $.each(pollData.data.poll_options, function(index, option){
    var checkedStatus = index === 0 ? ' checked' : '';
    var optionHTML = '<input type="radio" name="option" value="' + option._id + '"' + checkedStatus + '>' + option.option_name;
    options.push(optionHTML);
  });
  var allOptions = options.join('</br>');
  var form = '<form id="vote_form">' + allOptions + '</br>' + submit + '</form>';
  console.log(title + form);
  $container.html(title + form);
};

var requestPollOptions = function(id){
  $.ajax({
    url: "http://localhost:3000/api/poll?poll_id=" + id,
    method: "GET",
  })
    .done(displayPollOptions)
    .fail(function(xhr, status, err){
      alert("Error finding poll, please try again");
    });
};

var displayPollProgress = function(res){
  console.log(res);
  var $container = $('.poll_container');
  var head = '<tr><th>Option</th><th>Count</th></tr>';
  var options = [];
  $.each(res.data.poll_options, function(index, option){
    var currentOption = '<td>' + option.option_name + '</td><td>' + option.vote_count + '</td>';
    options.push(currentOption);
  });
  var table = '<table>' + head + '<tr>' + options.join('</tr><tr>') + '</tr></table>';
  $container.html(table);

};

var addVote = function(e, poll){
  e.preventDefault();
  console.log("ADDING VOTE");
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
    .done(displayPollProgress)
    .fail(function(xhr, status, err){
      alert("Error adding vote to poll, please try again");
    });
};

$(function(){
  var poll_id = getUrlParameter("poll_id");

  if(poll_id){
    requestPollOptions(poll_id);
    $(document).on('submit', '#vote_form', function(e){
      addVote(e, poll_id)
    });
  }
  else{
    alert("Sorry, no poll_id given to search for");
  }
});
