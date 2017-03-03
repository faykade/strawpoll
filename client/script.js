$('.new_poll').on('click', function(e){
  $.ajax({
    url: "http://localhost:3000/api/poll",
    method: "POST",
    dataType: 'json',
    data: {
      poll_name: "Testing",
      poll_options: [
        {
          option_name: "test",
          vote_count: 0,
        },
      ],
    },

  })
    .done(function(data){
      console.log(data);
    });
});
