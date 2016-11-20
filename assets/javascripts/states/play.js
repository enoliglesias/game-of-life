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
    this.generateLightweightSpaceship(4, 5);
    this.generateLightweightSpaceship(40, 10);
    this.generateLightweightSpaceship(30, 30);
    this.generateGlider(15, 35);
    this.generateGlider(10, 20);
    this.generateGlider(5, 40);
    this.generateBlinker(25, 25);
    this.generateToad(5, 30);
    this.generateBacon(15, 15);
    this.generatePentadecathlon(30, 5);
    this.generatePentadecathlon(25, 30);
    this.generatePulsar(35, 35);
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

    var cellsToCheck = this.getCellsToCheckLife();

    _.compact(cellsToCheck).forEach(function(cell) {
      this.checkLife(cell);
    }, this);

    console.log("generation complete");
  },

  getCellsToCheckLife: function(){
    // We need the alive cells and their neighbours
    var cellsToCheck = _(this.cellGroup.children).filter(function(cell){ return cell.alive; });
    // Now we need to calculate the neighbours
    cellsToCheck.forEach(function(cell) {
      var neighboursPoints = this.getCellPointsAround(cell.x, cell.y);
      neighboursPoints.forEach(function(points){
        cellsToCheck.push(this.findCell(points[0], points[1]));
      }, this);
    }, this);
    return cellsToCheck;
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
  },

  // Auxiliar functions in order to create patterns

  // Still lifes

  generateBlock: function(x, y) {
    var elementPoints = [[x, y], [x, y+1], [x+1, y], [x+1, y+1]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generateLoaf: function(x, y) {
    var elementPoints = [[x, y], [x+1, y+1], [x+2, y+2], [x+1, y-1], [x+2, y-1], [x+3, y], [x+3, y+1]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generateBoat: function(x, y) {
    var elementPoints = [[x, y], [x+1, y], [x, y+1], [x+2, y+1], [x+1, y+2]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  // Oscillators

  generateBlinker: function(x, y) {
    var elementPoints = [[x, y], [x-1, y], [x-2, y]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generateToad: function(x, y){
    var elementPoints = [[x, y], [x, y+1], [x+1, y+2], [x+2, y-1], [x+3, y], [x+3, y+1]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generateBacon: function(x, y){
    var elementPoints = [[x, y], [x, y+1], [x+1, y], [x+2, y+3], [x+3, y+3], [x+3, y+2]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generatePulsar: function(x, y){
    var elementPoints = [
          [x, y+2], [x, y+3], [x, y+4], [x+2, y], [x+3, y], [x+4, y],
          [x+2, y+5],[x+3, y+5],[x+4, y+5],[x+5, y+2],[x+5, y+3],[x+5, y+4],

          [x+8, y], [x+9, y], [x+10, y], [x+7, y+2], [x+7, y+3], [x+7, y+4],
          [x+8, y+5],[x+9, y+5],[x+10, y+5],[x+12, y+2],[x+12, y+3],[x+12, y+4],

          [x, y+8], [x, y+9], [x, y+10], [x+2, y+7], [x+3, y+7], [x+4, y+7],
          [x+2, y+12],[x+3, y+12],[x+4, y+12],[x+5, y+8],[x+5, y+9],[x+5, y+10],

          [x+7, y+8], [x+7, y+9], [x+7, y+10], [x+8, y+7], [x+9, y+7], [x+10, y+7],
          [x+8, y+12],[x+9, y+12],[x+10, y+12],[x+12, y+8],[x+12, y+9],[x+12, y+10],
        ];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generatePentadecathlon: function(x, y) {
    var elementPoints = [
          [x+1, y], [x+1, y+1], [x+1, y+2], [x, y+2], [x+2, y+2],
          [x, y+5],[x+1, y+5],[x+2, y+5], [x+1, y+6], [x+1, y+6], [x+1, y+7],
          [x+1, y+8], [x+1, y+9], [x+1, y+10], [x, y+10], [x+2, y+10],
          [x, y+13], [x+1, y+13], [x+2, y+13], [x+1, y+14], [x+1, y+15],
        ];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  // Spaceships

  generateGlider: function(x, y) {
    var elementPoints = [[x, y], [x+1, y], [x+2, y], [x+2, y-1], [x+1, y-2]];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  },

  generateLightweightSpaceship: function(x, y) {
    var elementPoints = [
          [x+1, y], [x+2, y], [x, y+1], [x, y+2], [x+1, y+1], [x+1, y+2],
          [x+2, y+1],[x+3, y+1], [x+3, y+2], [x+4, y+2], [x+2, y+3], [x+3, y+2], [x+3, y+3]
        ];
    elementPoints.forEach(function(point) {
      this.resetCell(point[0], point[1]);
    }, this);
  }


};
