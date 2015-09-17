describe('Player', function() {
  it("returns the players mark", function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it("it returns x coord of space", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("it returnsy coord of space", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoordinate).to.equal(2);
  });

  it("lets a player mark a space", function() {
    var testPlayer = new Player("X");
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    expect(testSpace.markedBy).to.equal(testPlayer);
  });
});


describe("Board", function() {
  it("creates 9 spaces when it is initialized", function(){
    var testBoard = new Board();
    expect(testBoard.spaces).to.eql([new Space(1,1), new Space(1,2), new Space(1,3), new Space(2,1), new Space(2,2), new Space(2,3), new Space(3,1), new Space(3,2), new Space(3,3)]);
  });

  it("finds a space on the board", function(){
    var testBoard = new Board();
    expect(testBoard.findSpace(1,2)).to.equal(testBoard.spaces[1])
  });
});

describe("Game", function() {
  it("tells if there are 3 spaces in a row marked by the same player", function() {
    var testGame = new Game();

    expect(testGame.win()).to.equal(false);
    testGame.board.spaces[0].markBy(testGame.playerX);
    testGame.board.spaces[3].markBy(testGame.playerO);
    testGame.board.spaces[1].markBy(testGame.playerX);
    testGame.board.spaces[7].markBy(testGame.playerO);
    testGame.board.spaces[2].markBy(testGame.playerX);
    testGame.board.spaces[4].markBy(testGame.playerX);
    expect(testGame.win()).to.equal(true);
  });

  it("changes turns", function() {
    var testGame = new Game();

    expect(testGame.turn()).to.eql(testGame.playerX);
    testGame.changeTurn();
    expect(testGame.turn()).to.eql(testGame.playerO);
    testGame.changeTurn();
    expect(testGame.turn()).to.eql(testGame.playerX);
  })
})
