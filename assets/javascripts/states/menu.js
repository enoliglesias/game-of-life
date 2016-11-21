var GameOfLife = GameOfLife || {};

GameOfLife.Menu = function () {};

GameOfLife.Menu.prototype = {
  create: function() {
    this.game.add.text(5,5, "CLICK\nTO\nSTART", { align: 'center', font: '14px PressStart', fill: '#FFFFFF'});
    this.game.input.onDown.add(this.start, this);
  },

  start: function(){
    this.game.state.start("play");
  }
};
