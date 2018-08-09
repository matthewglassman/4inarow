$(document).ready(function(){
  //Draw grid here by instantiating new grid object from 4inarow.js
  const fourinarow = new Fourinarow('#fourinarow');

  fourinarow.onPlayerMove = function() {
    $('#player').text(fourinarow.player);
  }

  $('#restart').click(function(){
    fourinarow.restart();
  })
});
