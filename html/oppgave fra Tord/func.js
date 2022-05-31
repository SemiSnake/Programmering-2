var gravity = 0.05;
var gravityDrag = 0;
var bounceFactor = 0.7;
var xVelocity = 4;
var airResistance = 0.005;
var babyI = 0;
const baby = document.getElementById("baby");
babyX = parseInt(window.getComputedStyle(baby).getPropertyValue("left"))
babyY = parseInt(window.getComputedStyle(baby).getPropertyValue("top"))
var babyList = [baby];
setInterval(update, 5);

function update(){
  babyX += xVelocity;
  if(xVelocity > 0.0001){
    xVelocity -= airResistance;
  }
  gravityDrag += gravity;
  babyY += gravityDrag;
  baby.style.top = babyY + "px";
  baby.style.left = babyX + "px";
if(babyY > 800){
  babyY = 800;
  baby.style.top = babyY + "px";
  gravityDrag = -(gravityDrag * bounceFactor);
}
}
class babyc{
  constructor(id, xVelocity, bounceFactor, airResistance){
    this.id = id;
    this.xVelocity = xVelocity;
    this.bounceFactor = bounceFactor;
    babyList[id] = this;
  }
  physics(){
    babyX += xVelocity;
    if(this.xVelocity > 0.0001){
      this.xVelocity -= airResistance;
    }
    gravityDrag += gravity;
    babyY += gravityDrag;
    this.style.top = babyY + "px";
    this.style.left = babyX + "px";
  if(babyY > 800){
    babyY = 800;
    baby.style.top = babyY + "px";
    gravityDrag = -(gravityDrag * bounceFactor);
  }
  }
}
function createBaby(){
  babyI ++;
  babyList[babyI] = new babyc(babyI, 2, 0.1, 0.005);
  setInterval(babyList[babyI].physics(), 5);

}
