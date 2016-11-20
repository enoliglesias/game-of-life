var GameOfLife = GameOfLife || {};

GameOfLife.Play = function () {};

GameOfLife.Play.prototype = {

  create: function() {
    this.game.stage.backgroundColor = "#00000";

    // Create test cell
    new GameOfLife.Cell(this.game, 50, 50);

  },

  update: function() {
  },


};
