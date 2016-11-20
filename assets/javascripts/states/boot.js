var GameOfLife = GameOfLife || {};

GameOfLife.Boot = function () {};

GameOfLife.Boot.prototype = {
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = 600;
    this.game.state.start("load");
  }
};
