var GameOfLife = GameOfLife || {};

GameOfLife.game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-container');

GameOfLife.game.state.add("boot", GameOfLife.Boot);
GameOfLife.game.state.add("load", GameOfLife.Load);
GameOfLife.game.state.add("menu", GameOfLife.Menu);
GameOfLife.game.state.add("play", GameOfLife.Play);
GameOfLife.game.state.add("gameover", GameOfLife.GameOver);

GameOfLife.game.state.start("boot");
