var addOption = function(e){
  e.preventDefault();
  e.stopPropagation();
  var div = '<div class="option_line">';
  var input = '<input type="text" placeholder="Option..." class="poll_option">';
  var button = '<button type="button" class="remove_option" tabindex="-1">-</button>';
  $('.options').append(div + input + button + '</div>');
  $('.options input[type=text]').last().focus();
};

var removeOption = function(e){
  e.preventDefault();
  e.stopPropagation();
  var $parent = $(this).parent();
  $parent.remove();
};

var buildRequest = function($title, $options){
  var ajaxData = {
    poll_name: $title.val().trim(),
    poll_options: []
  };

  $.each($options, function(index, option){
    var $option = $(option);
    if($option.val() && $option.val().trim()){
      ajaxData.poll_options.push($option.val().trim());
    }
  });

  return ajaxData;
};

var displayPollLink =function(res){
  if(res && res.data && res.success){
    $('div.poll_link').html('<a href="poll_view.html?poll_id=' + res.data._id + '">Link to Poll</a>');
  } else {
    alert("Sorry, there was an error creating the poll");
  }
}

var makeRequest = function(req, callback){
  $.ajax({
    url: "http://localhost:3000/api/poll",
    method: "POST",
    dataType: 'json',
    data: req
  })
    .done(callback)
    .fail(function(xhr, status, err){
      alert("Error creating poll, please try again");
    });
};

var isValidTitle = function($title){
  return $title && $title.val() && $title.val().trim();
};

var areValidOptions = function($options){
  return $options && $options.length > 0;
};

var createPoll = function(e){
  e.preventDefault();
  e.stopPropagation();
  var $title = $('.poll_title');
  var $options = $('.poll_option');

  if(isValidTitle($title) && areValidOptions($options)){
    var request = buildRequest($title, $options);
    makeRequest(request, displayPollLink);
  }
  else {
    alert("Invalid data to make a poll");
  }
};

$(function(){
  $(document).on('click', '.add_option', addOption);

  $(document).on('click', '.remove_option', removeOption);

  $('#create_poll').on('submit', createPoll);
});
