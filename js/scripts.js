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

Board.prototype.win = function() {

  var winningCombos = [
    [this.findSpace(1,1), this.findSpace(1,2), this.findSpace(1,3)],
    [this.findSpace(2,1), this.findSpace(2,2), this.findSpace(2,3)],
    [this.findSpace(3,1), this.findSpace(3,2), this.findSpace(3,3)],
    [this.findSpace(1,1), this.findSpace(2,2), this.findSpace(3,3)],
    [this.findSpace(3,1), this.findSpace(2,2), this.findSpace(1,3)],
    [this.findSpace(1,3), this.findSpace(2,3), this.findSpace(3,3)],
    [this.findSpace(1,1), this.findSpace(2,1), this.findSpace(3,1)],
    [this.findSpace(1,2), this.findSpace(2,2), this.findSpace(3,2)],
  ];

  var result = 0;
  winningCombos.forEach(function(combo){
    if ((combo[0].markedBy === combo[1].markedBy) && (combo[0].markedBy === combo[2].markedBy) && (combo[1].markedBy === combo[2].markedBy)) {
        result += 1;
    }
  });
  if (result > 0) {
    return true;
  }
};



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
