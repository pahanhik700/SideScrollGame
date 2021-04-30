var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var aster = [];
var player = {x:0, y:300};
var timer = 0;
var fire = [];

var enemy = new Image();
enemy.src = "assets/media/Ship6/Ship6.png";
var fonimg = new Image();
fonimg.src = "assets/game_background_2.png";
var ship = new Image();
ship.src = "assets/media/Ship3/Ship3.png";
var fireimg = new Image();
fireimg.src = "assets/media/shot5_asset.png";

//обработка мыши и клавиатуры
//мышь
canvas.addEventListener("mousemove", function(event) {
  player.x = event.offsetX-60;
  player.y = event.offsetY-60;
});
canvas.addEventListener("mousedown", function(e){
  fire.push({
    x:player.x+30,
    y:player.y+10,
    dx:7,
    dy:0});
});

//клавиатура
var highPressed = false;
var lowPressed = false;
canvas.addEventListener("keydown", keyDownHandler, false);
canvas.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        highPressed = true;
    }
    else if(e.keyCode == 40) {
        lowPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 38) {
        highPressed = false;
    }
    else if(e.keyCode == 40) {
        lowPressed = false;
    }
}



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
  if(timer%40==0) {
    aster.push({
      x:1240,
      y:Math.random() * (610 - 50) + 50,
      dx:Math.random() * -2 - 2,
      dy:Math.random() * 3 - 2,
      del:0});
  }
  for(i in aster) {
  aster[i].x = aster[i].x+aster[i].dx;
  aster[i].y = aster[i].y+aster[i].dy;

  if(aster[i].x < -100) aster.splice(i,1);
  if(aster[i].y>=600 || aster[i].y < -20) aster[i].dy = -aster[i].dy;

  for(j in fire) {
    if(Math.abs(aster[i].x + 40 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 40){
      // expl.push({x:aster[i].x - 25, y:aster[i].y-25, animx:0, animt:0});
      aster[i].del=1;
      fire.splice(j,1);break;
    }
  }
  if (aster[i].del == 1) aster.splice(i,1);
}
  for(i in fire) {
    fire[i].x += fire[i].dx;
    if(fire[i].dx > 1280) fire[i].splice(i,1);
  }
}

function render() {
  context.drawImage(fonimg, 0, 0, 1280, 700);
  context.drawImage(ship, player.x, player.y);
  for(i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y);
  for(i in aster) context.drawImage(enemy, aster[i].x, aster[i].y);
}

var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame     ||
  window.oRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback, 1000 / 20);
  };
})();
