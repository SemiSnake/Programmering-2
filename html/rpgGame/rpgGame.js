var myCanvas = document.getElementById("myCanvas");
var canvasContext = myCanvas.getContext("2d")
canvasContext.font = "20px Arial"
//entity
var player ={
  x:10,
  spdX:5,
  y:100,
  spdY:1,
  name:"P",
}
var enemyList ={}

Enemy("E1",150,350,0.5,0.6)
Enemy("E2",70,350,0.3,0.4)
Enemy("E3",100,350,0.4,0.5)


function getDistanceBetweenEntities(entity1, entity2){
  var vx = entity1.x - entity2.x
  var vy = entity1.y - entity2.y
  return Math.sqrt(vx*vx+vy*vy)
}
function testCollisionEntity(entity1, entity2){
  var distance = getDistanceBetweenEntities(entity1, entity2);
  return distance < 30;
}

function Enemy(id,x,y,spdX,spdY,){
  var enemy ={
    x:x,
    spdX:spdX,
    y:y,
    spdY:spdY,
    name:"E",
    id:id,
  }
  enemyList[id] = enemy;
}


function updateEntity(entity){
  canvasContext.fillText(entity.name, entity.x, entity.y)
  entity.x += entity.spdX;
  entity.y += entity.spdY;
  if(entity.x >= myCanvas.width || entity.x <= 0){
    entity.spdX *= -1;
  }
  if(entity.y >= myCanvas.height || entity.y <= 0){
    entity.spdY *= -1;
  }
}

setInterval(update, 1)
function update(){
  canvasContext.clearRect(0,0,myCanvas.width, myCanvas.height)

  for(var i in enemyList){
    updateEntity(enemyList[i])

    var isColliding = testCollisionEntity(player, enemyList[i])

    if(isColliding){
      player.spdX += player.spdX *= 0.005;
      player.spdY += player.spdY *= 0.005;
    }
  }
    updateEntity(player)
}
