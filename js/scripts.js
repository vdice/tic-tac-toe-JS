function Player(mark) {
  this.mark = mark;
}

function Space(xCoordinate, yCoordinate) {
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;

  this.markedBy = null;
}

Space.prototype.markBy = function(player) {
  this.markedBy = player;
};

function Board() {
  this.spaces = [new Space(1,1), new Space(1,2), new Space(1,3), new Space(2,1), new Space(2,2), new Space(2,3), new Space(3,1), new Space(3,2), new Space(3,3)];

}

Board.prototype.findSpace = function(xCoordinate, yCoordinate) {
  var foundSpace = null;
  for (var i = 0; i < this.spaces.length; i++) {
    if ((this.spaces[i].xCoordinate === xCoordinate) && (this.spaces[i].yCoordinate === yCoordinate)) {
      foundSpace = i;
    }
  }
    return this.spaces[foundSpace];
};



function Game() {
  this.player = new Player("X");
  this.player1 = new Player("O");
  this.board = new Board();
  this.currentTurn = this.player
}

Game.prototype.turn = function() {
  return this.currentTurn
}

Game.prototype.changeTurn = function() {
  if (this.currentTurn = this.player) {
     this.currentTurn = this.player1;
   }
     else  {
       this.currentTurn = this.player;
     }

}

Game.prototype.win = function() {

  var board = this.board
  var winningCombos = [
    [board.findSpace(1,1), board.findSpace(1,2), board.findSpace(1,3)],
    [board.findSpace(2,1), board.findSpace(2,2), board.findSpace(2,3)],
    [board.findSpace(3,1), board.findSpace(3,2), board.findSpace(3,3)],
    [board.findSpace(1,1), board.findSpace(2,2), board.findSpace(3,3)],
    [board.findSpace(3,1), board.findSpace(2,2), board.findSpace(1,3)],
    [board.findSpace(1,3), board.findSpace(2,3), board.findSpace(3,3)],
    [board.findSpace(1,1), board.findSpace(2,1), board.findSpace(3,1)],
    [board.findSpace(1,2), board.findSpace(2,2), board.findSpace(3,2)],
  ];

  // var result = 0;
  var win = false;
  winningCombos.forEach(function(combo){
    if ((combo[0].markedBy === combo[1].markedBy) && (combo[0].markedBy === combo[2].markedBy) && (combo[1].markedBy === combo[2].markedBy)) {
        win = true;
    }
  });
  // if (result > 0) {
  //   return true;
  // }
  return win;
}

//wining combos:
// (1,1), (1,2), (1,3) #across the top
// (2,1), (2,2), (2,3)#across the middle
// (3,1), (3,2), (3,3) #across the bottom
//
//
// (1,1), (2,2), (3,3) #diagonal left to right
// (3,1), (2,2), (1,3)#diagonal right to left
//
// (1,3), (2,3), (3,3)#down the right
// (1,1), (2,1), (3,1)#down the left
// (1,2), (2,2), (3,2)#down the middle
