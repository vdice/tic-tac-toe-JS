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
  this.playerX = new Player("X");
  this.playerO = new Player("O");
  this.board = new Board();
  this.currentTurn = this.playerX;
}

Game.prototype.otherPlayer = function() {
  return this.turn() === this.playerX ? this.playerO : this.playerX;
}

Game.prototype.turn = function() {
  return this.currentTurn;
}

Game.prototype.changeTurn = function() {
  this.currentTurn = this.otherPlayer();
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
  var marks = {'X': String('<img class="hand" src="img/hand.jpg">'),
               'O': String('<img class="pumpkin" src="img/pumpkin.jpg">')};

  $(".square").click(function() {
    var coords = $(this).attr('id').split(',') // "1, 2" -> ["1", "2"]
    var space = game.board.findSpace(Number(coords[0]), Number(coords[1]));

    if (!space.markedBy) {
      $(this).append(marks[game.turn().mark])
      space.markBy(game.turn())
      game.changeTurn()
    }

    var showModal = function(myModalName) {

      $("#" + myModalName).modal({'show' : true});

    }

    if (game.win()) {
      var winningPlayer = space.markedBy;
      var losingPlayer = game.turn();
      $("#wins").append(marks[winningPlayer.mark]);
      $("#losses").append(marks[losingPlayer.mark]);

    $("#winModalBody").html(marks[winningPlayer.mark] + ' wins!')
      showModal("winModal");
    } else if ($(".square .hand").length === 5) {
    $("#catModalBody").html('<img src="img/cat.gif"><br><br>' + "I win!")
      showModal("catModal");
    }

  });

  $("#play-again-button").click(function() {
    game = new Game();
    $(".square").html("");
  });

});
