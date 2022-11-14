const player = document.getElementById("player");
var playerX = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
var playerY = parseInt(window.getComputedStyle(player).getPropertyValue("top"));

var groundLevel = 800;
var isGrounded = false;
var isMoving = false;
var airControlReduction = 5;
var xGroundVel;
var moveSpeed = 1;
var moveDir = 0;
const gravity = 0.05;
var yVelocity = 0;
var xVelocity = 0;
setInterval(physics, 5);
function physics(){

playerX += xVelocity;
player.style.left = playerX + "px";

if(!isGrounded)
{
  yVelocity += gravity;
  playerY += yVelocity;
  player.style.top = playerY + "px";
}else{
  moveSpeed = 1;
  xVelocity = 0;
}
if(moveDir != 0){
  isMoving = true;
  xVelocity += (moveSpeed / 10) * moveDir;
}else if(!isGrounded && isMoving){
  xVelocity = xGroundVel;
  isMoving = true;
}else{
  xVelocity = 0;
}

if(playerY >= groundLevel)
{
  isGrounded = true;
  }else{
  isGrounded = false;
}
}

function jump(){
  xGroundVel = xVelocity;
  playerY = groundLevel-1;
  isGrounded = false;
  yVelocity = -4;
}

window.onkeydown = function(e) {
  var kc = e.keyCode;
  e.preventDefault();
  if (kc === 32  && isGrounded) jump();
  if (kc == 68 || kc == 39) moveDir = 1;
  if (kc == 37 || kc == 65) moveDir = -1;
}
window.onkeyup = function(e){
  var kc = e.keyCode;
  if (kc == 68 || kc == 39) moveDir = 0;
  if (kc == 37 || kc == 65) moveDir = 0;
}
