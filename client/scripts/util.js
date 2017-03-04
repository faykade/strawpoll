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

var requestPoll = function(id, callback){
  $.ajax({
    url: "http://localhost:3000/api/poll?poll_id=" + id,
    method: "GET",
  })
    .done(callback)
    .fail(function(xhr, status, err){
      alert("Error finding poll, please try again");
    });
};
