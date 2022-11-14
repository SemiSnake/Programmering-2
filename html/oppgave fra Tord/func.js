var gravity = 0.05;
var gravityDragf = 0;
var bounceFactorf = 0.7;
var xVelocityf = 4;
var airResistancef = 0.005;
var babyI = 0;
var babySpawnRate = 1;
var xBorder = 1800;
var yBorder = 800;
const baby = document.getElementById("baby");
babyX = parseInt(window.getComputedStyle(baby).getPropertyValue("left"))
babyY = parseInt(window.getComputedStyle(baby).getPropertyValue("top"))
var babyList = [];


document.body.style.backgroundImage = "url('https://i.gifer.com/UR1Q.gif')";
setInterval(update1, 5);

function update1(){
  babyX += xVelocityf;
  if(xVelocityf > 0.0001){
    xVelocityf -= airResistancef;
  }
  gravityDragf += gravity;
  babyY += gravityDragf;
  baby.style.top = babyY + "px";
  baby.style.left = babyX + "px";
if(babyY > 800){
  babyY = 800;
  baby.style.top = babyY + "px";
  gravityDragf = -(gravityDragf * bounceFactorf);
}
}
class babyc{
  constructor(id, xVelocity, bounceFactor, gravityDrag, airResistance, el){
    this.id = id;
    this.xVelocity = xVelocity;
    this.bounceFactor = bounceFactor;
    this.gravityDrag = gravityDrag;
    this.airResistance = airResistance;
    this.el = document.getElementById(el);
    this.xPos = (Math.random() * (400 - 100)) + 100;
    this.yPos = (Math.random() * (400 - 100)) + 100;
    this.el.style.left = this.xPos + "px";
    this.el.style.top = this.yPos + "px";
    this.initialXVel = xVelocity;
    this.direction = 1;
  }
  update(obj){
    //obj.bounceFactor = 1 - (obj.xVelocity/10 -0.1)
    if(obj.xVelocity > 0.0001 && obj.direction == 1 || obj.xVelocity < -0.0001 && obj.direction == -1)
    {
    obj.xPos += obj.xVelocity;
      obj.xVelocity -= obj.airResistance * (obj.initialXVel / 4) * obj.direction;

    obj.gravityDrag += gravity;
    obj.yPos += obj.gravityDrag;
    obj.el.style.left = obj.xPos + "px";
    obj.el.style.top = obj.yPos + "px";
    if(obj.yPos > yBorder)
    {
      obj.yPos = yBorder;
      obj.gravityDrag = -(obj.gravityDrag * obj.bounceFactor);
    }
    if(obj.xPos > xBorder){
      obj.xPos = xBorder;
      obj.direction = -1;
      obj.xVelocity = -(obj.xVelocity);
    }
  }
  }
}
setInterval(createBaby, babySpawnRate * 1000);
function createBaby(){
  const babyEl = document.createElement("div");
  babyEl.id ="baby" + babyI;
  const audio = document.getElementById("babyMusic")
  const audio2 = audio.cloneNode()
  audio2.play()
  babyEl.classList.add("baby");
  document.body.appendChild(babyEl);
  babyList[babyI] = new babyc(babyI, (Math.random() * (6 - 1)) + 1, 0.7, 0, 0.005, babyEl.id);
  setInterval(babyList[babyI].update, 7, babyList[babyI]);
  babyI ++;
}
