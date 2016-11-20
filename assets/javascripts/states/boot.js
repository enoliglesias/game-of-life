var GameOfLife = GameOfLife || {};

GameOfLife.Boot = function () {};

GameOfLife.Boot.prototype = {
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start("load");
  }
};
