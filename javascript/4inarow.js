//Declare a class to be reused in main.js file

class Fourinarow{
  //constructor is going to take in selector and pass it to
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.selector = selector;
    this.createGrid();
    this.setupEventListeners();

  }

  //Adding a method that will build up a bunch of divs into grid
  createGrid() {
    const $board = $(this.selector);

    //for loop creating the rows and columns

    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>')
        .addClass('row');
      for (let col = 0; col < this.COLS; col++) {
        const $col = $('<div>')
          .addClass('col empty')
          .attr('data-col', col)
          .attr('data-row', row);
        $row.append($col);
      }

      $board.append($row);
    }
  }

  //Highlight placement for player's disk

  setupEventListeners(){
    const $board = $(this.selector);

    function findLastEmptyCell(col){
      const cells = $(`.col[data-col='${col}']`);
      console.log(cells);
    }

    $board.on('mouseover', '.col.empty', function(){
      const col = $(this).data('col');
      const $lastEmptyCell = findLastEmptyCell(col);
      //$lastEmptyCell.addClass(`next-red`);
      console.log(col);
    })
  }
}
