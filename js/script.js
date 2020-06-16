$(document).ready(function() {


  $('.write-chat i.send').click(function() {
    // alert('ok');
    var valoreText = $('.write-chat input').val();
    var cloneText = $('.template li').clone();

    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var currentTime = hours.toString() + ':' + minutes.toString();

    cloneText.children('p:first-child').text(valoreText);
    cloneText.children('p.time').text(currentTime);

    cloneText.addClass('green-text');
    $('.read-chat ul').append(cloneText);

    $('.write-chat input').val('');

  });

});
