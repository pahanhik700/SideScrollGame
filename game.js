var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
context.font = "22px Verdana";

var aster = [];
var player = {x:0, y:300};
var timer = 0;
var bullet = [];
var score = 0;
var hp = 100;
class Boss {
  x = 1130;
  y = 300;
  dx = -4;
  dy = 3;
}


var enemy = new Image();
enemy.src = "assets/media/Ship6/Ship6.png";
var fonimg = new Image();
fonimg.src = "assets/game_background_2.png";
var ship = new Image();
ship.src = "assets/media/Ship3/Ship3.png";
var bulletimg = new Image();
bulletimg.src = "assets/media/shot5_asset.png";

//обработка мыши и клавиатуры
//мышь
canvas.addEventListener("mousemove", function(event) {
  player.x = event.offsetX-60;
  player.y = event.offsetY-60;
});
canvas.addEventListener("mousedown", function(e){
  bullet.push({
    x:player.x+30,
    y:player.y+10,
    dx:7,
    dy:0});
});

//клавиатура

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function keyDownHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true
    } else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true
    } else if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true
    } else if(e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true
    }
    }

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false
    } else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false
    } else if(e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false
    } else if(e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false
    }
    }

function MovePlayerWithKeyboard() {
    if (rightPressed && !leftPressed) {
        player.x += player.dx;
    } else if (!rightPressed && leftPressed) {
        player.x -= player.dx;
    }

    if (upPressed && !downPressed) {
        player.y -= player.dy;
    } else if (!upPressed && downPressed) {
        player.y += player.dy;
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

  for(j in bullet) {
    if(Math.abs(aster[i].x + 40 - bullet[j].x - 15) < 50 && Math.abs(aster[i].y - bullet[j].y) < 40){
      // expl.push({x:aster[i].x - 25, y:aster[i].y-25, animx:0, animt:0});
      aster[i].del=1;
      bullet.splice(j,1);break;
    }
  }
  if (aster[i].del == 1) {
    aster.splice(i,1);
    score +=100;
  }
}
  for(i in bullet) {
    bullet[i].x += bullet[i].dx;
    if(bullet[i].dx > 1280) bullet[i].splice(i,1);
  }
}

function render() {
  context.drawImage(fonimg, 0, 0, 1280, 700);
  context.fillText("Score: "+score, 20, 30);
  context.fillText("HP: " + hp, canvas.width - 180, 30);
  context.drawImage(ship, player.x, player.y);
  for(i in bullet) context.drawImage(bulletimg, bullet[i].x, bullet[i].y);
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
