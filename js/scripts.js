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
}

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
}

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
  if (this.turn() === this.player) {
     this.currentTurn = this.player1;
   }
   else  {
     this.currentTurn = this.player;
   }
}

Game.prototype.win = function() {
  var board = this.board;
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

  var win = false;
  winningCombos.forEach(function(combo){
    if ((combo[0].markedBy === combo[1].markedBy) && (combo[0].markedBy === combo[2].markedBy) && (combo[1].markedBy === combo[2].markedBy)) {
      if (combo[0].markedBy) {
        win = true;
      }
    }
  });

  return win;
}

$(document).ready(function() {
  var game = new Game();
  var x = new Player("X");
  var o = new Player("O");

  $(".square").click(function() {
    var coords = $(this).attr('id').split(',') // "1, 2" -> ["1", "2"]
    var space = game.board.findSpace(Number(coords[0]), Number(coords[1]));

    if (!space.clicked) {
      if (game.turn().mark === "X") {
        $(this).append('<img class="hand" src="css/images/hand.jpg" style="height: 35px;">');
        space.markBy(x);
      } else {
        $(this).append('<img class="pumpkin" src="css/images/pumpkin.jpg" style="height: 35px;">');
        space.markBy(o);
      }
    }
    game.changeTurn()

    if (game.win()) {
      alert("Winner!!!!!")
    }




  });
});
