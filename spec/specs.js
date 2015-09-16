describe('Player', function() {
  it("returns the players mark", function() {
    var testPlayer = new Player("X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it("it returns the player's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoordinate).to.equal(1);
  });

  it("returns the players mark", function() {
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
    expect(testBoard.findSpace(1,2)).to.equal(1);
  });

  // it("tells if there are 3 spaces in a row marked by the same player", function() {
  //   var testPlayer = new Player("X");
  //   var testBoard = new Board();
  //   var testSpace1 = testBoard.spaces[0];
  //   var testSpace2 = testBoard.spaces[1];
  //   var testSpace3 = testBoard.spaces[2];
  //   testSpace1.markBy(testPlayer);
  //   testSpace2.markBy(testPlayer);
  //   testSpace3.markBy(testPlayer);
  //   expect(testBoard.win()).to.equal(true);
  // });
});
