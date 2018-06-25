//Declare a class to be reused in main.js file
class Fourinarow{
  //constructor is going to take in selector and pass it to
  constructor(selector){
    this.ROWS = 6;
    this.COLS = 7;

  //Using jQuery to display what is currently happening in browser
  const $grid = $(selector);
  $grid.html('test');
  }
}
