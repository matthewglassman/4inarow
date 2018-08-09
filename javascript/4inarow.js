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
    this.isGameOver = false;

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

      //if the game is over don't allow further action

      if (that.isGameOver) return;
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
      if (that.isGameOver) return;
      const col = $(this).data('col');
      const row = $(this).data('row');

      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data('player', that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data('row'),
        $lastEmptyCell.data('col')
      )
      if (winner) {
        that.isGameOver = true;
        alert(`Game Over! Player ${that.player} has won!`);

        //removes hover effect of having a pointer finger instead of cursor

        $('.col.empty').removeClass('empty');
        return;
      }
      //switches which player has gone.
      that.player = (that.player === 'red') ? 'black' : 'red';
      $(this).trigger('mouseenter');
    });
  }
  checkForWinner(row, col){
    const that = this;

    function getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }


//check vertical direction

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);
      while(i >= 0 && i < that.ROWS && j >= 0 && j < that.COLS &&
        $next.data('player') === that.player) {
          total++;
          i += direction.i;
          j += direction.j;
          $next = getCell(i, j);
      }
      return total;
    }

    function checkWin(directionA, directionB){
      const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      }else{
        return null;
      }
    }

    function checkDiagonalBLtoTR(){
      return checkWin({i: 1, j: -1}, {i:1, j:1});
    }

    function checkDiagonalTLtoBR(){
      return checkWin({i: 1, j: 1}, {i: -1, j:-1});
    }

    function checkVerticals (){
      //pass in directions
      return checkWin({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontals (){
      //pass in directions
      return checkWin({i: 0, j: -1}, {i: 0, j: 1});
    }

    return checkVerticals() || checkHorizontals() ||
      checkDiagonalBLtoTR() || checkDiagonalTLtoBR();
  }
}
