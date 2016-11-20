var GameOfLife = GameOfLife || {};

GameOfLife.Cell = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'cell');
  this.game = game;
  this.alive = true;

  // add to the game
  this.game.add.existing(this);
};

GameOfLife.Cell.prototype = Object.create(Phaser.Sprite.prototype);
GameOfLife.Cell.prototype.constructor = GameOfLife.Cell;

GameOfLife.Cell.prototype.update = function() {

};
