var myCanvas = document.getElementById("canvas");
var canvasContext = myCanvas.getContext("2d")
canvasContext.font = "20px Arial"
var gravity = 0.1;
//entity
var player ={
  x:10,
  spdX:5,
  y:100,
  spdY:1,
  name:"P",
  velocityY: 0,
  bounceFactor: 0.6,
}
var enemyList ={}

Enemy("E1",150,350,0.5,0.6, 0.1)
Enemy("E2",70,350,0.3,0.4, 0.2)
Enemy("E3",100,350,0.4,0.5, 0.3)


function getDistanceBetweenEntities(entity1, entity2){
  var vx = entity1.x - entity2.x
  var vy = entity1.y - entity2.y
  return Math.sqrt(vx*vx+vy*vy)
}
function testCollisionEntity(entity1, entity2){
  var distance = getDistanceBetweenEntities(entity1, entity2);
  return distance < 30;
}

function Enemy(id,x,y,spdX,spdY, bounceFactor){
  var enemy ={
    x:x,
    spdX:spdX,
    y:y,
    spdY:spdY,
    name:"E",
    id:id,
    velocityY:0,
    bounceFactor:bounceFactor,
  }
  enemyList[id] = enemy;
}


function updateEntity(entity){
  canvasContext.fillText(entity.name, entity.x, entity.y,)
  entity.x += entity.spdX;
  this.velocityY += gravity;
  entity.y += velocityY;
  if(entity.x >= myCanvas.width || entity.x <= 0){
    entity.spdX *= -1;
  }
  if(entity.y >= myCanvas.height || entity.y <= 0){
    entity.velocityY *= (-1 * entity.bounceFactor);
  }
}

setInterval(update, 20)
function update(){
  canvasContext.clearRect(0,0,myCanvas.width, myCanvas.height)

  for(var i in enemyList){
    updateEntity(enemyList[i])

    var isColliding = testCollisionEntity(player, enemyList[i])

    if(isColliding){
      console.log("hello")
    }
  }
    updateEntity(player)
}
