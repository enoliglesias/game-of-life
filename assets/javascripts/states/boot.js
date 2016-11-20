var GameOfLife = GameOfLife || {};

GameOfLife.Boot = function () {};

GameOfLife.Boot.prototype = {
  create: function() {
    this.game.state.start("load");
  }
};
