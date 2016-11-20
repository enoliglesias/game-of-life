var GameOfLife = GameOfLife || {};

GameOfLife.Load = function () {}

GameOfLife.Load.prototype = {
  preload: function() {
    this.game.load.image('cell', 'assets/images/cell.jpg');
  },

  loadUpdate: function(){
    var bars = "|".repeat(this.load.progress/3);
    this.game.add.text(250, 150, bars, { font: '60px PressStart', fill: '#76FF03' });
  },

  create: function(){
    this.game.state.start("menu");
  }

};
