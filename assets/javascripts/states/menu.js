var GameOfLife = GameOfLife || {};

GameOfLife.Menu = function () {};

GameOfLife.Menu.prototype = {
  create: function() {
    this.game.add.text(5,5, "TAP \nTO \nSTART", { font: '6px PressStart', fill: '#FFFFFF'});
    this.game.input.onDown.add(this.start, this);
  },

  start: function(){
    this.game.state.start("play");
  }
};
