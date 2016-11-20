var GameOfLife = GameOfLife || {};

GameOfLife.Play = function () {};


GameOfLife.Play.prototype = {

  create: function() {
    this.game.stage.backgroundColor = "#00000";

    this.cellsToLive = [];
    this.cellsToDead = [];

    // Create cell group
    this.cellGroup = this.game.add.group();
    this.generateWorldCells();
    this.resetCell(4, 5);
    this.resetCell(5, 5);
    this.resetCell(6, 5);
    this.resetCell(6, 4);
    this.resetCell(5, 3);
  },

  update: function() {
    this.cellsToDead.forEach(function(point) {
      this.killCell(point[0], point[1]);
    }, this);

    this.cellsToLive.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);

    this.cellsToDead = [];
    this.cellsToLive = [];

    for(var i = 0; i < GameOfLife.width; i++) {
      for(var j = 0; j < GameOfLife.height; j++) {
        var cell = this.findCell(i, j);
        this.checkLife(cell);
      }
    }

    console.log("generation complete");
  },

  generateWorldCells: function(){
    for(var i = 0; i < GameOfLife.width; i++) {
      for(var j = 0; j < GameOfLife.height; j++) {
        cell = this.generateCell(i, j);
        cell.kill();
        cell.alive = false;
      }
    }
  },

  checkLife: function(cell){
    var cellsAround = 0;
    var x = cell.x;
    var y = cell.y;
    var pointsToCheck = this.getCellPointsAround(x, y);
    pointsToCheck.forEach(function(point) {
      var cellAround = this.findCell(point[0], point[1]);
      if ( cellAround && cellAround.alive && cellAround != cell ) {
        cellsAround++;
      }
    }, this);
    this.applyRules(cell, cellsAround);
  },

  // RULES
  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by over-population.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  applyRules: function(cell, cellsAround) {
    if ( cell.alive && cellsAround < 2 ) {
      this.cellsToDead.push([cell.x, cell.y]);
    }
    if ( cell.alive && cellsAround >= 2 && cellsAround <= 3 ) {
      // nothing to do
    }
    if ( cell.alive && cellsAround > 3 ) {
      this.cellsToDead.push([cell.x, cell.y]);
    }
    if ( !cell.alive && cellsAround === 3 ) {
      this.cellsToLive.push([cell.x, cell.y]);
    }
  },

  getCellPointsAround: function(x, y) {
    return [
            [x-1, y+1],
            [x-1, y],
            [x-1, y-1],
            [x, y-1],
            [x+1, y-1],
            [x+1, y],
            [x+1, y+1],
            [x, y+1]
          ];
  },

  generateCell: function(x, y) {
    cell = new GameOfLife.Cell(this.game, x, y);
    this.cellGroup.add(cell);
    return cell;
  },

  resetCell: function(x, y) {
    var cell = this.findCell(x, y);
    if ( cell ) {
      cell.reset(x, y);
      cell.alive = true;
    }
  },

  killCell: function(x, y) {
    var cell = this.findCell(x, y);
    if ( cell ) {
      cell.alive = false;
      cell.kill();
    }
  },

  findCell: function(x, y) {
    return _(this.cellGroup.children).find(function(cell){ return cell.x == x && cell.y == y; });
  }


};
