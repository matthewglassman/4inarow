//Declare a class to be reused in main.js file
class Fourinarow{
  //constructor is going to take in selector and pass it to
  constructor(selector){
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    this.createGrid();
  //Using jQuery to display what is currently happening in browser
  const $grid = $(selector);
  $grid.html('test');
  }

  //Adding a method that will build up a bunch of divs into grid
  createGrid(){
    const $board = $(this.selector);
    //for loop creating the rows and columns
    for (let row = 0; row < this.ROWS; row++){
      const $row = $('<div>')
        .addClass('row');
      $board.append($row);
    }
    console.log($board.html());
  }
}
