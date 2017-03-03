var addOption = function(e){
  e.preventDefault();
  var div = '<div class="option_line">';
  var input = '<input type="text" placeholder="Option..." class="poll_option">';
  var button = '<button class="remove_option">-</button>';
  $('.options').append(div + input + button + '</div>');
};

var removeOption = function(e){
  console.log("In remove");
  e.preventDefault();
  var $parent = $(this).parent();
  $parent.remove();
};

var buildRequest = function($title, $options){
  var ajaxData = {
    poll_name: $title.val(),
    poll_options: []
  };

  $.each($options, function(index, option){
    var currentOption = {
      option_name: $(option).val(),
      vote_count: 0
    };
    ajaxData.poll_options.push(currentOption);
  });

  return ajaxData;
};

var makeRequest = function(req){
  console.log(req);
  $.ajax({
    url: "http://localhost:3000/api/poll",
    method: "POST",
    dataType: 'json',
    data: req,
  })
    .done(function(res){
      console.log(res);
      alert(res.data._id);
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
  var $title = $('.poll_title');
  var $options = $('.poll_option');

  if(isValidTitle($title) && areValidOptions($options)){
    var request = buildRequest($title, $options);
    makeRequest(request);
  }
};


$(document).on('click', '.add_option', addOption);

$(document).on('click', '.remove_option', removeOption);

$('#create_poll').on('submit', createPoll);
