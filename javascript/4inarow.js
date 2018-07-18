//Declare a class to be reused in main.js file

class Fourinarow{
  //constructor is going to take in selector and pass it to
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'red';
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

  setupEventListeners() {
    const $board = $(this.selector);

    //retain access to the original 'this' attribute

    const that = this;

    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass('empty')) {
            return $cell;
        }
      }

      return null;

      //console.log(cells);
    }

    $board.on('mouseenter', '.col.empty', function () {
      const col = $(this).data('col');
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.addClass(`next-${that.player}`);

      //console.log(col);
    });

    //immediately removes the class from the cell so that a color doesn't remain
    $board.on('mouseleave', '.col', function () {
      $('.col').removeClass(`next-${that.player}`);
    });

    $board.on('click', '.col.empty', function () {
      const col = $(this).data('col');

      //const row = $(this).data('row');

      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass('empty next-${that.player}');
      $lastEmptyCell.addClass(that.player);

      //switches which player has gone.
      that.player = (that.player === 'red') ? 'black' : 'red';
      $(this).trigger('mouseenter');
    });
  }
}
