var game = document.getElementById("game")
var Keys = {
        up: false,
        down: false,
    };





setInterval(playerMove, 1)
setInterval(collisionChecker, 1)

var player = document.getElementById("player");
var block = document.getElementById("block");
var game = document.getElementById("game");
var points = 0;
var poengSum = document.getElementById("poengSum");

var blockX = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
var blockY = parseInt(window.getComputedStyle(block).getPropertyValue("top"))

var playerY = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
var playerX = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
var blockHeight = parseInt(window.getComputedStyle(block).getPropertyValue("height"))
var blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue("width"))
var blockYBottom = parseInt(window.getComputedStyle(block).getPropertyValue("top")) + blockHeight;
var blockStartPosX = parseInt(window.getComputedStyle(block).getPropertyValue("left")) - blockWidth;
var playerHeight = parseInt(window.getComputedStyle(player).getPropertyValue("height"))
var playerYBottom = parseInt(window.getComputedStyle(player).getPropertyValue("top")) + playerHeight;
var playerWidth = parseInt(window.getComputedStyle(player).getPropertyValue("width"))
var gameWidth = parseInt(window.getComputedStyle(game).getPropertyValue("width"))
var gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"))
var gameY = parseInt(window.getComputedStyle(game).getPropertyValue("top"))
var gameYBottom = parseInt(window.getComputedStyle(game).getPropertyValue("top")) + gameHeight;
var gameX = parseInt(window.getComputedStyle(game).getPropertyValue("left"))

function collisionChecker(){
   blockX = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
   blockY = parseInt(window.getComputedStyle(block).getPropertyValue("top"))
   playerX = parseInt(window.getComputedStyle(player).getPropertyValue("left"))
   playerY = parseInt(window.getComputedStyle(player).getPropertyValue("top"))
   playerYBottom = parseInt(window.getComputedStyle(player).getPropertyValue("top")) + playerHeight;
   blockYBottom = parseInt(window.getComputedStyle(block).getPropertyValue("top")) + blockHeight;

  if(blockX <= gameX + playerWidth){
    if(blockY <= playerYBottom && blockY >= playerY || blockYBottom <= playerYBottom && blockYBottom >= playerY){
    block.style.top = Math.random() * (gameHeight - blockHeight - blockHeight) + blockHeight + "px";
    boxPos = blockStartPosX;
    block.style.left = boxPos + "px";
    points += 1;
    poengSum.innerHTML = points;
    playerMoveSpeed += 0.01;
    if(boxMoveSpeed < 4){
    boxMoveSpeed += 0.07;
  }
  }
  }
}
var playerPos = playerY;
var playerMoveSpeed = 1;
function playerMove(){
  if (Keys.up == true  && playerY >= gameY - gameY){
    playerPos -=playerMoveSpeed;
    player.style.top = playerPos + "px";
  } else if (Keys.down == true && playerYBottom <= gameYBottom - gameY) {
    playerPos +=playerMoveSpeed;
    player.style.top = playerPos + "px";
  }
}


window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 38) Keys.up = true;
    else if (kc === 40) Keys.down = true;
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if (kc === 38) Keys.up = false;
    else if (kc === 40) Keys.down = false;
};

setInterval(frame, 1);
var boxPos = blockStartPosX;
var boxMoveSpeed = 1;
function frame() {
  if (blockX <= gameX) {
    console.log("Kul bomma")
    console.log(blockY)
    boxMoveSpeed = 1;
    boxPos = blockStartPosX;
    block.style.left = boxPos + "px";
    block.style.top = Math.random() * (gameHeight - blockHeight - blockHeight) + blockHeight + "px";
    playerMoveSpeed = 1;
    points = 0;
    poengSum.innerHTML = points;
  }
   else {
    boxPos -= boxMoveSpeed;
    block.style.left = boxPos + "px";
  }
}



function changeFontSize(){
  var slider = document.getElementById("slider1");
  if(slider.value != 1)
  {
    document.getElementById("text1").style.fontSize = slider.value /1.1 + "vmax";
  }
  else
  {
    document.getElementById("text1").style.fontSize = 14 + "px";
  }
}
