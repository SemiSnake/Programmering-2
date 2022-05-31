var speed = 1;
var playerHP = 100;
var mana = 10;
class car
{
  constructor(year, model, speed, oppstartstid)
  {
    this.speed = speed;
    this.year = year;
    this.model = model;
    this.oppstartstid = oppstartstid;
  }

}

function upgrade(cost, effect){
  this.cost = cost;
  this.effect = effect;
}

function manaUpgrade(mana){
  this.mana = mana;
  upgrade.call(this, cost, effect)
  this.category ="manaUpgrade"
}

function clickUpgrade(cost, effect, mana){
  manaUpgrade.call(this, cost, effect, mana)
  this.category = "clickUpgrade"
}
console.log(new clickUpgrade(15, mana, 2016).effect)


let tesla = new car(2014, "Tesla", 80, 10);
let tiss = new car(1986, "Volvo", 60, 5);
let toyota = new car(2000, "Toyota", 70, 15);
console.log(tesla);
console.log(toyota.oppstartstid);

class enemy
{
    constructor(damage, type, miniboss, boss, attackSpeed, health){
      this.damage = damage;
      this.type = type;
      this.miniboss = miniboss;
      this.boss = boss;
      this.attackSpeed = attackSpeed;
      this.health = health;
    }

    attack(){
      playerHP -= this.damage;
    }
}

let fast_enemy = new enemy(10, "rapid", false, false, 1.5, 100);
let goblin_king = new enemy(50, "hard-hitter", false, true, 1, 500);
console.log(fast_enemy);
console.log(goblin_king);
console.log(goblin_king.damage);
console.log(playerHP);
fast_enemy.attack();
console.log(playerHP);
