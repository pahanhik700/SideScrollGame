var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var aster = [];
var player = {x:0, y:300};
var timer = 0;
var fire =[];

var enemy = new Image();
enemy.src = "assets/media/Ship6/Ship6.png";
var fonimg = new Image();
fonimg.src = "assets/game_background_2.png";
var ship = new Image();
ship.src = "assets/media/Ship3/Ship3.png";
var fireimg = new Image();
fireimg.src = "assets/media/shot5_asset.png";

canvas.addEventListener("mousemove", function(event) {
  player.x = event.offsetX-60;
  player.y = event.offsetY-60;
});



fonimg.onload = function() {
  game();
}

function game() {
  update();
  render();
  requestAnimFrame(game);
}

function update() {
  timer++;
  if(timer%60==0) {
    aster.push({
      x:1240,
      y:Math.random() * (650 - 50) + 50,
      dx:Math.random() * -2 - 2,
      dy:Math.random() * 3 - 2});
  }
  for(i in aster) {
  aster[i].x = aster[i].x+aster[i].dx;
  aster[i].y = aster[i].y+aster[i].dy;

  if(aster[i].x < 0) aster.splice(i,1);
  if(aster[i].y>=650 || aster[i].y < 0) aster[i].dy = -aster[i].dy;
}
}

function render() {
  context.drawImage(fonimg, 0, 0, 1280, 700);
  for(i in aster) {
    context.drawImage(enemy, aster[i].x, aster[i].y, 50, 50);
  }
  context.drawImage(ship, player.x, player.y);
}

var requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame     ||
  window.oRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback, 1000 / 20);
  };
})();
