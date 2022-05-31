
document.body.onload = function(){js()};
let bodyEl = document.querySelector("body");



//console array list.
const consoleFightOutput = []


//general variables
var clickCount = 0;
var gameSpeed = 10;
var maxLevel = 1;
var currentLevel = 1;
// mana variables
var mana = 0;
var maxMana = 1000;
var manaPerClick = 1;
var manaPerTick = 0;
var manaShow = 0;
var globalMPSMultiplier = 1;
var globalClickMultiplier = 1;

//gold variables
var gold = 0;
var goldShow = 0;
var goldShow2 = 0;
var goldPerTick = 0;


//shop variables
var manaClickShopItemSumValue = 0;
var manaIdleShopItemSumValue = 0;
var attackClickShopItemSumValue = 0;
var attackIdleShopItemSumValue = 0;



//enemy variables
let enemyEl = document.getElementById("enemy")
var enemyIsAlive = true;
var enemyMaxHP = 200;
var enemyHP = enemyMaxHP;
var enemyHPShow = Math.round(enemyHP * 10) / 10;
var enemyHPPercent = (enemyHP / totalEnemyMaxHP)
var enemyAttackSpeed = 1000;
var enemyBaseAttackDamage = 10;
var enemyName ="Nisse";
var enemyGoldDrop = 10;
var globalEnemyLevelMultiplier = currentLevel;
var totalEnemyAttack = enemyBaseAttackDamage * globalEnemyLevelMultiplier;
var totalEnemyMaxHP = enemyMaxHP * globalEnemyLevelMultiplier;
var enemyCurrentLevel = currentLevel;


//player variables
var playerIsAlive = true;
var playerCurrentHP = 100;
var playerMaxHP = 100;
var playerAttack = 1;
var playerDMG = 10;
var dpsIdle = 0;
var damagePerTick;
//other variables
var shopOpen = false;
var shopOpeningClosing = false;
var spellOpen = false;
var spellOpeningClosing = false;
var shopTypeIsMana = true;
var shopCategory = "click";
var currentTutorialPage = 1;
var i = 0;

//ID elements
var loadingDivEl = document.getElementById("loadingDiv");
var reviveDivEl = document.getElementById("reviveDiv");
var enemyHPEl = document.getElementById("enemyHP");
var enemyMaxHPEl = document.getElementById("enemyMaxHP");


let tutorialPages = []
class tutorialPage{
  constructor(id, header, paragraph,){
    this.id = id;
    this.header = header;
    this.paragraph = paragraph;
    tutorialPages[this.id - 1] = this;
  }
  tut(){
  document.getElementById("tutorialHeader").innerHTML = this.header
  document.getElementById("tutorialParagraph").innerHTML = this.paragraph
}}
let tutorialPage1 = new tutorialPage(1, "Magical Clicker", "Hello and welcome to Magical Clicker! Here you can see through the tutorial. Press 'start' to play! Press the 'next page' button to go to next page! (You can look at the tutorial again later)")
let tutorialPage2 = new tutorialPage(2, "The Basics", "This game is all about fighting enemies using attacks and spells with unique effects! <br> On each of the side of the screen, you will see arrows which will open up menus.<br> In the middle of the screen there is an enemy. Click on the enemy to attack them, dealing damage.<br> When you kill an enemy, you get gold based on its current level. You can use gold to buy stats in the shop.");
let tutorialPage3 = new tutorialPage(3, "The Shop", "The shop is where you can spend gold to buy stat increases such as more damage/mana per click/second.")
let tutorialPage4 = new tutorialPage(4, "Spells", "In this game, you can cast magical spells which will deal damage and may also apply a status effect on the enemy<br>When you cast a spell, you will use all of your mana, but the spells effect scales with how much mana you allocated.<br>To collect mana, simply click the big orb located over your stats.")
let tutorialPage5 = new tutorialPage(5, "Levels", "To progress in this game, you have to increase the enemies level.<br> To unlock a new level, you have to kill an enemy which level is that of your max level, indicated by the two number on top of the screen.<br>To change levels, simply press the two buttons besides the enemys hp bar.")
let tutorialPage6 = new tutorialPage(6, "Stats:", "Under the enemy, you can see a console which will log everything that happens.<br> Besides the console, you can see your stats(currently just hp), and the enemies stats(currently just hp and level)")
let tutorialPage7 = new tutorialPage(7, "Credits:", "Coding: Tommy Aas Hjelle.<br>Enemy art: Andy Nguyen.<br>Music: Casper Møller.")




class spell{
  constructor(id, wrapperId, cost, effect, costId, element, spellName, effectId, cooldown, effectToElementRatio, statusEffectDuration, statusEffectDamageId, statusEffectDurationId, manaScaling){
    this.id = id;
    this.wrapperId = wrapperId;
    this.cost = cost;
    this.effect = effect;
    this.costId = costId;
    this.element = element;
    this.spellName = spellName;
    this.effectId = effectId;
    this.cooldown = cooldown;
    this.cooldownTimer = 0;
    this.effectToElementRatio = effectToElementRatio;
    this.statusEffectDuration = statusEffectDuration;
    this.statusEffectDamageId = statusEffectDamageId;
    this.statusEffectDurationId = statusEffectDurationId;
    this.manaScaling = manaScaling;
    this.totalEffect = 0;
  }
    cast(){
    if(this.cooldownTimer == 0 && playerIsAlive == true && enemyIsAlive == true && mana > 0){
        document.getElementById(this.wrapperId).style.animation = "none";
        this.cooldownTimer = this.cooldown;
        this.totalEffect = Math.round(this.effect + (this.manaScaling * mana))
        mana = 0;
        if(enemyHP - this.totalEffect > 0){
          enemyHP -= this.totalEffect;
          consoleFightOutput.push("<br> <p style = 'color: #90e0ef'> You cast " + this.spellName + ". It hit " + enemyName + " for " + this.totalEffect + " damage!</p>");
          enemyStatusEffectApplied(this.element, this.totalEffect, this.effectToElementRatio, this.statusEffectDuration)
        }else{
          consoleFightOutput.push("<br> <p style = 'color: #90e0ef'> You cast " + this.spellName + ". It hit " + enemyName + " for " + Math.ceil(enemyHP) + " damage!</p>");
          enemyHP -= enemyHP;

        }
        document.getElementById(this.wrapperId).style.animation = "spellCooldownBar linear " + this.cooldown + "s forwards";
          setTimeout(() => {
            this.cooldownTimer = 0;
              document.getElementById(this.wrapperId).style.animation = "";
          }, this.cooldown * 1000);


      }else if(this.cooldownTimer != 0){
        consoleFightOutput.push("<br><p>This spell is cooling down!</p>")
      }else if(mana <= 0){
        consoleFightOutput.push("<br><p>You do not have any mana!</p>")
      }
}
}
function enemyStatusEffectApplied(element, effect, effectToElementRatio, statusEffectDuration ){
  var statusEffectCounter = 1;
  if(element =="fire" && enemyIsAlive == true && playerIsAlive == true){
    enemyEl.style = "filter: opacity(0.4  ) drop-shadow(0 0 0 red)"
  }
function statusEffectLoop() {
  setTimeout(function() {
    var elementalEffect = Math.round(effect / effectToElementRatio * 10) / 10 ;
        if(element =="fire" && enemyIsAlive == true && playerIsAlive == true){
          if(enemyHP - elementalEffect <= 0){
            enemyHP -= enemyHP;
            consoleFightOutput.push("<br> <p style = 'color: #fab430'> You burnt " + enemyName + " to a crisp!</p>");
          }else{
            enemyHP -= Math.round(elementalEffect * 10) / 10;
            consoleFightOutput.push("<br> <p style = 'color: #fab430'> You burnt " + enemyName + " for " + elementalEffect + " damage!</p>");
          }
        }else{
          statusEffectCounter = statusEffectDuration + 1;
        }
    statusEffectCounter++;
    if (statusEffectCounter <= statusEffectDuration && enemyIsAlive == true) {
      statusEffectLoop();
    }else if(statusEffectCounter > statusEffectDuration && enemyIsAlive == true){
      enemyEl.style ="filter: opacity(1) drop-shadow(0 0 0)"
    }
  }, 1000)
}

statusEffectLoop();

}
class upgrade{
  constructor(type, shopCategory, cost, costIncreaseMultiplier, costIncreaseAddition, value, upgradeCostId, amount, upgradeAmountId, totalBonus, totalBonusId, totalBonusPercentageId){
    this.type = type;
    this.shopCategory = shopCategory;
    this.cost = cost;
    this.costIncreaseMultiplier = costIncreaseMultiplier;
    this.costIncreaseAddition = costIncreaseAddition;
    this.value = value;
    this.upgradeCostId = upgradeCostId;
    this.upgradeAmountId = upgradeAmountId;
    this.amount = amount;
    this.totalBonus = 0;
    this.totalBonusId = totalBonusId;
    this.totalBonusPercentage = 0;
    this.totalBonusPercentageId = totalBonusPercentageId;
  }
   buy(){
    if(gold >= this.cost){
      this.amount ++;
      let thisCostId = document.getElementById(this.upgradeCostId);
      let thisAmountId = document.getElementById(this.upgradeAmountId);
      let thisTotalBonusId = document.getElementById(this.totalBonusId);
      gold -= this.cost;
      this.totalBonus = this.amount * this.value;
  if(this.type =="mana"){
      if(this.shopCategory == "click"){
        manaPerClick += this.value;
        manaClickShopItemSumValue += this.value;
        for (i in manaClickShopItems)
      {
        manaClickShopItems[i].totalBonusPercentage = Math.round((manaClickShopItems[i].totalBonus / manaClickShopItemSumValue) * 100);
        document.getElementById(manaClickShopItems[i].totalBonusPercentageId).innerHTML = manaClickShopItems[i].totalBonusPercentage;
      }

      }else if(this.shopCategory == "idle"){
        manaPerTick += this.value;
        manaIdleShopItemSumValue += this.value;
        for (i in manaIdleShopItems)
      {
        manaIdleShopItems[i].totalBonusPercentage = Math.round((manaIdleShopItems[i].totalBonus / manaIdleShopItemSumValue) * 100);
        document.getElementById(manaIdleShopItems[i].totalBonusPercentageId).innerHTML = manaIdleShopItems[i].totalBonusPercentage;
      }

    }else if (this.shopCategory == "manaCap"){
      maxMana *= this.value;
      maxManaEl.innerHTML = maxMana;
    }

    }else if(this.type =="attack"){
      if(this.shopCategory=="click"){
        playerDMG += this.value;
        attackClickShopItemSumValue += this.value;
        for (i in attackClickShopItems){
        attackClickShopItems[i].totalBonusPercentage = Math.round((attackClickShopItems[i].totalBonus / attackClickShopItemSumValue) * 100);
        document.getElementById(attackClickShopItems[i].totalBonusPercentageId).innerHTML = attackClickShopItems[i].totalBonusPercentage;
      }
    }else if(this.shopCategory =="idle"){
      dpsIdle += this.value;
      attackIdleShopItemSumValue += this.value;
      for (i in attackIdleShopItems){
      attackIdleShopItems[i].totalBonusPercentage = Math.round((attackIdleShopItems[i].totalBonus / attackIdleShopItemSumValue) * 100);
      document.getElementById(attackIdleShopItems[i].totalBonusPercentageId).innerHTML = attackIdleShopItems[i].totalBonusPercentage;
    }
  }
}
    this.cost *= this.costIncreaseMultiplier;
    this.cost += this.costIncreaseAddition;
    thisCostId.innerHTML = Math.round(this.cost);
    thisAmountId.innerHTML = this.amount;
    thisTotalBonusId.innerHTML = this.totalBonus;
    }else{
          alert("You do not have enough for this upgrade! You need " + Math.round((this.cost - gold)) + " more gold!");
        }
  }
}
//-----------------------------[UPGRADES]---------------------------------------------//
  //-----------------------[MANA]-------------------------------------//
      //----------------[CLICK]------------------------------//

let manaClickShopItem1 = new upgrade("mana", "click", 10, 1.1, 5, 1, "manaClickShopItem1Cost", 0, "manaClickShopItem1Amount", 0, "manaClickShopItem1TotalBonus", "manaClickShopItem1TotalBonusPercentage");
let manaClickShopItem2 = new upgrade("mana", "click", 75, 1.2, 37, 5, "manaClickShopItem2Cost", 0, "manaClickShopItem2Amount", 0, "manaClickShopItem2TotalBonus", "manaClickShopItem2TotalBonusPercentage");
let manaClickShopItem3 = new upgrade("mana", "click", 400, 1.3, 200, 10, "manaClickShopItem3Cost", 0, "manaClickShopItem3Amount", 0, "manaClickShopItem3TotalBonus", "manaClickShopItem3TotalBonusPercentage");
let manaClickShopItem4 = new upgrade("mana", "click", 2000, 1.4, 800, 25, "manaClickShopItem4Cost", 0, "manaClickShopItem4Amount", 0, "manaClickShopItem4TotalBonus", "manaClickShopItem4TotalBonusPercentage");
let manaClickShopItem5 = new upgrade("mana", "click", 5000, 1.5, 1700, 50, "manaClickShopItem5Cost", 0, "manaClickShopItem5Amount", 0, "manaClickShopItem5TotalBonus", "manaClickShopItem5TotalBonusPercentage");
let manaClickShopItem6 = new upgrade("mana", "click", 12000, 1.6, 4000, 100, "manaClickShopItem6Cost", 0, "manaClickShopItem6Amount", 0, "manaClickShopItem6TotalBonus", "manaClickShopItem6TotalBonusPercentage");
let manaClickShopItem7 = new upgrade("mana", "click", 25000, 1.7, 10000, 200, "manaClickShopItem7Cost", 0, "manaClickShopItem7Amount", 0, "manaClickShopItem7TotalBonus", "manaClickShopItem7TotalBonusPercentage");
let manaClickShopItem8 = new upgrade("mana", "click", 60000, 1.8, 20000, 500, "manaClickShopItem8Cost", 0, "manaClickShopItem8Amount", 0, "manaClickShopItem8TotalBonus", "manaClickShopItem8TotalBonusPercentage");
let manaClickShopItem9 = new upgrade("mana", "click", 150000, 1.9, 35000, 1000, "manaClickShopItem9Cost", 0, "manaClickShopItem9Amount", 0, "manaClickShopItem9TotalBonus", "manaClickShopItem9TotalBonusPercentage");
let manaClickShopItem10 = new upgrade("mana", "click", 1000000, 2, 60000, 10000, "manaClickShopItem10Cost", 0, "manaClickShopItem10Amount", 0, "manaClickShopItem10TotalBonus", "manaClickShopItem10TotalBonusPercentage");
const manaClickShopItems = [manaClickShopItem1, manaClickShopItem2, manaClickShopItem3, manaClickShopItem4, manaClickShopItem5, manaClickShopItem6, manaClickShopItem7, manaClickShopItem8, manaClickShopItem9, manaClickShopItem10]


      //----------------[IDLE]------------------------------//
let manaIdleShopItem1 = new upgrade("mana", "idle", 25, 1.2, 1, 1, "manaIdleShopItem1Cost", 0, "manaIdleShopItem1Amount", 0, "manaIdleShopItem1TotalBonus", "manaIdleShopItem1TotalBonusPercentage");
let manaIdleShopItem2 = new upgrade("mana", "idle", 250, 1.2, 50, 10, "manaIdleShopItem2Cost", 0, "manaIdleShopItem2Amount", 0, "manaIdleShopItem2TotalBonus", "manaIdleShopItem2TotalBonusPercentage");
let manaIdleShopItem3 = new upgrade("mana", "idle", 2500, 1.2, 50, 100, "manaIdleShopItem3Cost", 0, "manaIdleShopItem3Amount", 0, "manaIdleShopItem3TotalBonus", "manaIdleShopItem3TotalBonusPercentage");
let manaIdleShopItem4 = new upgrade("mana", "idle", 25000, 1.2, 50, 1000, "manaIdleShopItem4Cost", 0, "manaIdleShopItem4Amount", 0, "manaIdleShopItem4TotalBonus", "manaIdleShopItem4TotalBonusPercentage");
let manaIdleShopItem5 = new upgrade("mana", "idle", 250000, 1.2, 50, 10000, "manaIdleShopItem5Cost", 0, "manaIdleShopItem5Amount", 0, "manaIdleShopItem5TotalBonus", "manaIdleShopItem5TotalBonusPercentage");
let manaIdleShopItem6 = new upgrade("mana", "idle", 2500000, 1.2, 50, 100000, "manaIdleShopItem6Cost", 0, "manaIdleShopItem6Amount", 0, "manaIdleShopItem6TotalBonus", "manaIdleShopItem6TotalBonusPercentage");
let manaIdleShopItem7 = new upgrade("mana", "idle", 25000000, 1.2, 50, 1000000, "manaIdleShopItem7Cost", 0, "manaIdleShopItem7Amount", 0, "manaIdleShopItem7TotalBonus", "manaIdleShopItem7TotalBonusPercentage");
let manaIdleShopItem8 = new upgrade("mana", "idle", 250000000, 1.2, 50, 10000000, "manaIdleShopItem8Cost", 0, "manaIdleShopItem8Amount", 0, "manaIdleShopItem8TotalBonus", "manaIdleShopItem8TotalBonusPercentage");
let manaIdleShopItem9 = new upgrade("mana", "idle", 2500000000, 1.2, 50, 100000000, "manaIdleShopItem9Cost", 0, "manaIdleShopItem9Amount", 0, "manaIdleShopItem9TotalBonus", "manaIdleShopItem9TotalBonusPercentage");
let manaIdleShopItem10 = new upgrade("mana", "idle", 25000000000, 1.2, 50, 1000000000, "manaIdleShopItem10Cost", 0, "manaIdleShopItem10Amount", 0, "manaIdleShopItem10TotalBonus", "manaIdleShopItem10TotalBonusPercentage");
const manaIdleShopItems = [manaIdleShopItem1, manaIdleShopItem2, manaIdleShopItem3, manaIdleShopItem4, manaIdleShopItem5, manaIdleShopItem6, manaIdleShopItem7, manaIdleShopItem8, manaIdleShopItem9, manaIdleShopItem10]
      //----------------[OTHER]------------------------------//
let manaOtherShopItem1 = new upgrade("mana", "manaCap", 1000, 10, 0, 10, "manaOtherShopItem1Cost");

  //--------------------[ATTACK]------------------------------------//
let attackClickShopItem1 = new upgrade("attack", "click", 25, 1.1, 10, 1, "attackClickShopItem1Cost", 0, "attackClickShopItem1Amount", 0, "attackClickShopItem1TotalBonus", "attackClickShopItem1TotalBonusPercentage")
let attackClickShopItem2 = new upgrade("attack", "click", 250, 1.2, 0, 10, "attackClickShopItem2Cost", 0, "attackClickShopItem2Amount", 0, "attackClickShopItem2TotalBonus", "attackClickShopItem2TotalBonusPercentage")
let attackClickShopItem3 = new upgrade("attack", "click", 2500, 1.2, 0, 100, "attackClickShopItem3Cost", 0, "attackClickShopItem3Amount", 0, "attackClickShopItem3TotalBonus", "attackClickShopItem3TotalBonusPercentage")
let attackClickShopItem4 = new upgrade("attack", "click", 25000, 1.2, 0, 1000, "attackClickShopItem4Cost", 0, "attackClickShopItem4Amount", 0, "attackClickShopItem4TotalBonus", "attackClickShopItem4TotalBonusPercentage")
let attackClickShopItem5 = new upgrade("attack", "click", 250000, 1.2, 0, 10000, "attackClickShopItem5Cost", 0, "attackClickShopItem5Amount", 0, "attackClickShopItem5TotalBonus", "attackClickShopItem5TotalBonusPercentage")
let attackClickShopItem6 = new upgrade("attack", "click", 2500000, 1.2, 0, 100000, "attackClickShopItem6Cost", 0, "attackClickShopItem6Amount", 0, "attackClickShopItem6TotalBonus", "attackClickShopItem6TotalBonusPercentage")
let attackClickShopItem7 = new upgrade("attack", "click", 25000000, 1.2, 0, 1000000, "attackClickShopItem7Cost", 0, "attackClickShopItem7Amount", 0, "attackClickShopItem7TotalBonus", "attackClickShopItem7TotalBonusPercentage")
let attackClickShopItem8 = new upgrade("attack", "click", 250000000, 1.2, 0, 10000000, "attackClickShopItem8Cost", 0, "attackClickShopItem8Amount", 0, "attackClickShopItem8TotalBonus", "attackClickShopItem8TotalBonusPercentage")
let attackClickShopItem9 = new upgrade("attack", "click", 2500000000, 1.2, 0, 100000000, "attackClickShopItem9Cost", 0, "attackClickShopItem9Amount", 0, "attackClickShopItem9TotalBonus", "attackClickShopItem9TotalBonusPercentage")
let attackClickShopItem10 = new upgrade("attack", "click", 25000000000, 1.2, 0, 1000000000, "attackClickShopItem10Cost", 0, "attackClickShopItem10Amount", 0, "attackClickShopItem10TotalBonus", "attackClickShopItem10TotalBonusPercentage")
const attackClickShopItems =[attackClickShopItem1, attackClickShopItem2, attackClickShopItem3, attackClickShopItem4, attackClickShopItem5, attackClickShopItem6, attackClickShopItem7, attackClickShopItem8, attackClickShopItem9, attackClickShopItem10, ]

  //-----------------------[IDLE]-----------------------------------//
  let attackIdleShopItem1 = new upgrade("attack", "idle", 25, 1.1, 10, 1, "attackIdleShopItem1Cost", 0, "attackIdleShopItem1Amount", 0, "attackIdleShopItem1TotalBonus", "attackIdleShopItem1TotalBonusPercentage")
  let attackIdleShopItem2 = new upgrade("attack", "idle", 1000, 1.2, 0, 5, "attackIdleShopItem2Cost", 0, "attackIdleShopItem2Amount", 0, "attackIdleShopItem2TotalBonus", "attackIdleShopItem2TotalBonusPercentage")
  let attackIdleShopItem3 = new upgrade("attack", "idle", 250000, 1.2, 0, 100, "attackIdleShopItem3Cost", 0, "attackIdleShopItem3Amount", 0, "attackIdleShopItem3TotalBonus", "attackIdleShopItem3TotalBonusPercentage")
  let attackIdleShopItem4 = new upgrade("attack", "idle", 1000000, 1.2, 0, 1000, "attackIdleShopItem4Cost", 0, "attackIdleShopItem4Amount", 0, "attackIdleShopItem4TotalBonus", "attackIdleShopItem4TotalBonusPercentage")
  let attackIdleShopItem5 = new upgrade("attack", "idle", 2000000, 1.2, 0, 1500, "attackIdleShopItem5Cost", 0, "attackIdleShopItem5Amount", 0, "attackIdleShopItem5TotalBonus", "attackIdleShopItem5TotalBonusPercentage")
  let attackIdleShopItem6 = new upgrade("attack", "idle", 4000000, 1.2, 0, 2000, "attackIdleShopItem6Cost", 0, "attackIdleShopItem6Amount", 0, "attackIdleShopItem6TotalBonus", "attackIdleShopItem6TotalBonusPercentage")
  let attackIdleShopItem7 = new upgrade("attack", "idle", 8000000, 1.2, 0, 5000, "attackIdleShopItem7Cost", 0, "attackIdleShopItem7Amount", 0, "attackIdleShopItem7TotalBonus", "attackIdleShopItem7TotalBonusPercentage")
  let attackIdleShopItem8 = new upgrade("attack", "idle", 16000000, 1.2, 0, 10000, "attackIdleShopItem8Cost", 0, "attackIdleShopItem8Amount", 0, "attackIdleShopItem8TotalBonus", "attackIdleShopItem8TotalBonusPercentage")
  let attackIdleShopItem9 = new upgrade("attack", "idle", 32000000, 1.2, 0, 20000, "attackIdleShopItem9Cost", 0, "attackIdleShopItem9Amount", 0, "attackIdleShopItem9TotalBonus", "attackIdleShopItem9TotalBonusPercentage")
  let attackIdleShopItem10 = new upgrade("attack", "idle", 64000000, 1.2, 0, 40000, "attackIdleShopItem10Cost", 0, "attackIdleShopItem10Amount", 0, "attackIdleShopItem10TotalBonus", "attackIdleShopItem10TotalBonusPercentage")
  const attackIdleShopItems =[attackIdleShopItem1, attackIdleShopItem2, attackIdleShopItem3, attackIdleShopItem4, attackIdleShopItem5, attackIdleShopItem6, attackIdleShopItem7, attackIdleShopItem8, attackIdleShopItem9, attackIdleShopItem10, ]
//  var baseIdleAttackCost = 100;
//  var baseIdleAttackCostIncreaseIncrement = 1.1;
//  var baseIdleAttackCostIncreaseAddition = 5;
//  var baseIdleAttackIdleValue = 1;
//  var baseIdleAttackUpgradeCostId;
//  var baseIdleAttackUpgradeAmountId;
//  var baseIdleAttackTotalBonusId;
//  var baseIdleTotalBonusPercentageId;
//  const attackIdleShopItems ={}
//  for(let i = 1; i < 11; i++){
//    baseIdleAttackUpgradeCostId = "attackIdleShopItem" + i +  "Cost";
//    baseIdleAttackUpgradeAmountId = "attackIdleShopItem" + i + "Cost";
//    baseIdleAttackTotalBonusId = "attackIdleShopItem" + i +"TotalBonus";
//    baseIdleTotalBonusPercentageId = "attackIdleShopItem" + i + "TotalBonusPercentage";
//    attackIdleShopItems["IdleAttackShopItem" + i] = new upgrade("attack", "idle", baseIdleAttackCost, baseIdleAttackCostIncreaseIncrement, baseIdleAttackCostIncreaseAddition, 0, baseIdleAttackIdleValue, 0, baseIdleAttackUpgradeCostId, 0, baseIdleAttackUpgradeAmountId, 0, baseIdleAttackTotalBonusId, baseIdleTotalBonusPercentageId)
//    baseIdleAttackCost *= 1.2;
//    baseIdleAttackIdleValue *= 1.5;
//  }

//-------------------------[SPELLS]------------------------------------//
let spellItem1 = new spell("spellItem1", "spellItem1Wrapper", 10, 10, "spellItem1Cost", "none", "Wind Current", "spellItem1Effect", 5, 0, 0, "spellItem1StatusEffectDamage", "spellItem1StatusEffectDuration",1.5 )
let spellItem2 = new spell("spellItem2", "spellItem2Wrapper", 50, 0, "spellItem2Cost", "fire", "Fire Ball", "spellItem2Effect", 10, 10, 10, "spellItem2StatusEffectDamage", "spellItem2StatusEffectDuration",1 )

const spellItems = [spellItem1]
//-----------------------------[JS START]------------------------------------------------//
function js(){
  loadingDivEl = document.getElementById("loadingDiv")
  enemyEl = document.getElementById("enemy")
  enemyHPEl = document.getElementById("enemyHP")
  enemyHPEl2 = document.getElementById("enemyHP2")
  reviveDivEl = document.getElementById("reviveDiv")
  totalEnemyMaxHPEl = document.getElementById("enemyMaxHP");
  totalEnemyMaxHPEl2 = document.getElementById("enemyMaxHP2");
  playerCurrentHpEl = document.getElementById("playerCurrentHP");
  playerMaxHPEl = document.getElementById("playerMaxHP");
  manaDivBarEl = document.getElementById("manaDivBar")
  manaEl = document.getElementById("mana");
  maxManaEl = document.getElementById("maxMana")
  enemyHPBarEl = document.getElementById("enemyHPBar")
  consoleOutputEl = document.getElementById("consoleOutput")
  manaShowEl = document.getElementById("manaShow");
  goldShowEl = document.getElementById("goldShow");
  playerCurrentHPEl = document.getElementById("playerCurrentHP");
  currentLevelTextEl = document.getElementById("currentLevelText");
  previousLevelButtonEl = document.getElementById("previousLevelButton");
  nextLevelButtonEl = document.getElementById("nextLevelButton");
  shopManaEl = document.getElementById("shopMana");
  shopAttackEl = document.getElementById("shopAttack");
  shopClickEl = document.getElementById("shopClick");
  shopIdleEl = document.getElementById("shopIdle")
  shopOtherEl = document.getElementById("shopOther")
  shopManaClickEl = document.getElementById("shopManaClick")
  shopManaIdleEl = document.getElementById("shopManaIdle")
  shopManaOtherEl = document.getElementById("shopManaOther")
  shopAttackClickEl = document.getElementById("shopAttackClick");
  shopAttackIdleEl = document.getElementById("shopAttackIdle");
  shopAttackOtherEl = document.getElementById("shopAttackOther")
  startMusicEl = document.getElementById("startMusic");
  startDivEl = document.getElementById("startingDiv")
  spellOpenerImageEl = document.getElementById("spellOpenerImage")
  shopOpenerImageEl = document.getElementById("shopOpenerImage")
  enemyCurrentLevelEl = document.getElementById("enemyCurrentLevel")
  shopDivEl = document.getElementById("shopDiv");
  spellDivEl = document.getElementById("spellDiv");
  maxLevelEl = document.getElementById("maxLevel")
  currentPageEl = document.getElementById("currentPage")
  maxTutorialPageEl = document.getElementById("maxTutorialPage")
  shopClickEl.innerText = "Clicking";
  shopIdleEl.innerText ="Idling";
  shopOtherEl.innerText = "Mana cap";
  shopClickEl.style.color = "white";
  shopIdleEl.style.color = "white";
  shopOtherEl.style.color = "white";

  document.getElementById("tutorialHeader").innerHTML = tutorialPage1.header;
  document.getElementById("tutorialParagraph").innerHTML = tutorialPage1.paragraph;
  maxTutorialPageEl.innerHTML = "/" + tutorialPages.length;
  setTimeout(function () {
   loadingDivEl.style.animation = "fadeOut forwards 0.7s";
   loadingDivEl.style.pointerEvents = "none";
 }, 1000);


   // update perimeter for kpsUpdate function, saying it should run 100 times pers second
   setInterval(mpsUpdate, gameSpeed);
   setInterval(gpsUpdate, gameSpeed);
   setInterval(frameUpdate, 1);
   setInterval(enemyAttack, enemyAttackSpeed);
   setInterval(dpsUpdate, gameSpeed);

   //sets text with the id "upgrade1Cost" to the variable "upgrade1Cost"





   enemyHPEl.innerHTML = enemyHP;
   totalEnemyMaxHPEl.innerHTML = totalEnemyMaxHP;
   totalEnemyMaxHPEl2.innerHTML = totalEnemyMaxHP;
   playerCurrentHpEl.innerHTML = playerCurrentHP;
   playerMaxHPEl.innerHTML = playerMaxHP;



   // pastes bodyEl in console, allowing surveillance of body tag (html) in the console.
   console.log(bodyEl);
  function enemyAttack(){
     if(enemyIsAlive == true && playerIsAlive == true ){
       if (playerCurrentHP > 0 && playerCurrentHP - totalEnemyAttack >= 0){
         playerCurrentHP -= Math.round(totalEnemyAttack);
         if(consoleFightOutput.length > 13){
            consoleFightOutput.shift();
         }
         consoleFightOutput.push("<br> <p style = 'color: red'>" + enemyName + " hit you for " + totalEnemyAttack + " damage!</p>");

       } else if (playerCurrentHP > 0 && playerCurrentHP - totalEnemyAttack < 0 || playerCurrentHP == 0){
         playerCurrentHP = 0;
       }
       if(playerCurrentHP == 0){
         if(consoleFightOutput.length > 13){
           consoleFightOutput.shift()
         }
         playerIsAlive = false;
         consoleFightOutput.push("<br>you are dead as HECK!");
         reviveDivEl.style.display ="block";
       }
     }
   }

  function frameUpdate(){
    if(consoleFightOutput.length > 13){
     consoleFightOutput.shift();
   }
   if(enemyHP <= 0 && enemyIsAlive == true){
     enemyRespawn(false);
   }
      manaDivBarEl.style.width = mana /(maxMana/100) + "%"
      enemyHPShow = Math.round(enemyHP * 10) / 10;
      goldShow = (Math.round(gold * 1)/ 1);
      manaShow =(Math.round(mana*1)/1)
      enemyHPPercent = (enemyHP / totalEnemyMaxHP) * 100;
      enemyHPBarEl.style.width = enemyHPPercent + "%"

    /*-----------------------UNSORTED ---------------------------------------*/
    consoleOutputEl.innerHTML = consoleFightOutput;

    totalEnemyMaxHPEl.innerHTML = totalEnemyMaxHP;
    totalEnemyMaxHPEl2.innerHTML = totalEnemyMaxHP;
    maxManaEl.innerHTML = maxMana;
    playerCurrentHPEl.innerHTML = playerCurrentHP;
    playerMaxHPEl.innerHTML = playerMaxHP;
    enemyHPEl2.innerHTML = enemyHPShow;
    enemyHPEl.innerHTML = enemyHPShow;
    /*------------------------------------------------------------------------*/

    //updates money variable on the html document
    manaShowEl.innerHTML = manaShow;
    goldShowEl.innerHTML = goldShow;

  }

  function mpsUpdate(){
    // adds one 1000th of manaPerTick to mana per 1000th of a second
    if(mana  < maxMana) {
      mana += manaPerTick * gameSpeed /1000;
      manaEl.style.color ="black";
      maxManaEl.style.color ="black";
      manaShowEl.style.color ="black";
    }
    else if(mana + manaPerTick > maxMana) {
      mana += maxMana - mana;
      manaEl.style.color ="yellow";
      maxManaEl.style.color ="yellow";
      manaShowEl.style.color ="yellow";
    }
  }

  function gpsUpdate(){
    // add a tenth of moneyPerSecond to money
    gold += goldPerTick * gameSpeed /1000;
  }
}
function dpsUpdate(){
if(enemyIsAlive == true && playerIsAlive == true){
  damagePerTick = dpsIdle *gameSpeed /1000;
if(enemyHP - damagePerTick <= 0){
  enemyHP -= enemyHP;
}else{
  enemyHP -= damagePerTick;
}
}
}
//-----------------------------------[JS END]-------------------------------------------//

/*--------------------------------------|FUNCTIONS CALLED IN HTML|-------------------------------------*/
function nextPage(){
  if(currentTutorialPage < tutorialPages.length){
    currentTutorialPage += 1;
    currentPageEl.innerHTML = currentTutorialPage;
    tutorialPages[currentTutorialPage - 1].tut()
  }else{
    currentTutorialPage = 1;
    currentPageEl.innerHTML = currentTutorialPage;
    tutorialPages[currentTutorialPage - 1].tut()
  }
}
function previousPage(){
  if(currentTutorialPage > 1){
    currentTutorialPage -= 1;
    currentPageEl.innerHTML = currentTutorialPage;
    tutorialPages[currentTutorialPage - 1].tut()
  }else{
    currentTutorialPage = tutorialPages.length;
    currentPageEl.innerHTML = currentTutorialPage;
    tutorialPages[currentTutorialPage - 1].tut()
  }
}
function levelIncrease(){
    currentLevel ++;
    if(enemyIsAlive == true){
      enemyRespawn(true)
    }
    currentLevelTextEl.innerHTML = " " + currentLevel
    previousLevelButtonEl.style.display ="block";
    if(currentLevel >= maxLevel){
    nextLevelButtonEl.style.display = "none";
  }
}


function levelDecrease(){
    currentLevel -= 1;
    if(enemyIsAlive == true){
      enemyRespawn(true)
    }
    currentLevelTextEl.innerHTML = " " + currentLevel;
    nextLevelButtonEl.style.display = "block";
    if(currentLevel <= 1){
      previousLevelButtonEl.style.display = "none";
  }
}
/*------------------|CHANGING SHOP TYPE|-------------------------------*/

function shopTypeChanger(event){
  if(event.target.id == "shopTypeMana"){
  shopTypeIsMana = true;
  shopManaClickEl.style.display ="block";
  shopManaIdleEl.style.display ="none";
  shopManaOtherEl.style.display ="none";
  shopManaEl.style.display ="block";
  shopAttackEl.style.display ="none";
  shopClickEl.style.backgroundColor = "rgba(17,29,74, 1)";
  shopClickEl.innerText = "Clicking";
  shopClickEl.style.color ="white";
  shopIdleEl.style.backgroundColor ="rgba(50,100,200, 1)";
  shopIdleEl.innerText ="Idling";
  shopIdleEl.style.color ="white";
  shopOtherEl.style.backgroundColor ="rgba(50,100,200, 1)";
  shopOtherEl.innerText = "Mana cap";
  shopOtherEl.style.color ="white";
}else{
  shopTypeIsMana = false;
  shopAttackClickEl.style.display = "block";
  shopAttackIdleEl.style.display = "none";
  shopAttackOtherEl.style.display = "none"
  shopAttackEl.style.display ="block";
  shopManaEl.style.display = "none";
  shopClickEl.style.backgroundColor = "rgba(150,35,35, 1)";
  shopClickEl.innerText = "Clicking";
  shopClickEl.style.color ="white";
  shopIdleEl.style.backgroundColor ="rgba(255,80,80, 1)";
  shopIdleEl.innerText ="Idling";
  shopIdleEl.style.color ="white";
  shopOtherEl.style.backgroundColor ="rgba(255,80,80, 1)";
  shopOtherEl.innerText = "Weapons & armour";
  shopOtherEl.style.color ="white";
 }
}
//---------------------------------------------------------------------//

/*------------------|CHANGING SHOP CATEGORY|-----------------------------*/
function shopCategoryChanger(event){
  if(shopTypeIsMana == true){
    if(event.target.id =="shopClick"){
      shopManaClickEl.style.display ="block";
      shopOtherEl.style.backgroundColor ="rgba(50,100,200, 1)";
      shopIdleEl.style.backgroundColor ="rgba(50,100,200, 1)";
      shopClickEl.style.backgroundColor ="rgba(17,29,74, 1)";
      shopManaIdleEl.style.display ="none";
      shopManaOtherEl.style.display="none";
   }else if(event.target.id =="shopIdle"){
      shopOtherEl.style.backgroundColor ="rgba(50,100,200, 1)";
      shopClickEl.style.backgroundColor ="rgba(50,100,200, 1)";
      shopIdleEl.style.backgroundColor ="rgba(17,29,74, 1)";
      shopManaIdleEl.style.display ="block";
      shopManaClickEl.style.display ="none";
      shopManaOtherEl.style.display ="none";
   }else if (event.target.id=="shopOther"){
     shopManaIdleEl.style.display ="none";
     shopIdleEl.style.backgroundColor ="rgba(50,100,200, 1)";
     shopClickEl.style.backgroundColor ="rgba(50,100,200, 1)";
     shopOtherEl.style.backgroundColor ="rgba(17,29,74, 1)";
     shopManaClickEl.style.display ="none";
     shopManaOtherEl.style.display ="block";
   }
 } else{
   if(event.target.id =="shopClick"){
     shopAttackClickEl.style.display="block";
     shopAttackIdleEl.style.display ="none";
     shopAttackOtherEl.style.display="none";
     shopClickEl.style.backgroundColor = "rgba(150,35,35, 1)";
     shopIdleEl.style.backgroundColor = "rgba(255, 80, 80)";
     shopOtherEl.style.backgroundColor = "rgba(255, 80, 80)"
  }else if(event.target.id =="shopIdle"){
     shopAttackIdleEl.style.display ="block";
     shopAttackClickEl.style.display ="none";
     shopAttackOtherEl.style.display ="none";
     shopIdleEl.style.backgroundColor = "rgba(150,35,35, 1)";
     shopClickEl.style.backgroundColor = "rgba(255, 80, 80)";
     shopOtherEl.style.backgroundColor = "rgba(255, 80, 80)"
  }else if (event.target.id=="shopOther"){
    shopAttackIdleEl.style.display ="none";
    shopAttackClickEl.style.display ="none";
    shopAttackOtherEl.style.display ="block";
    shopOtherEl.style.backgroundColor = "rgba(150,35,35, 1)";
    shopIdleEl.style.backgroundColor = "rgba(255, 80, 80)";
    shopClickEl.style.backgroundColor = "rgba(255, 80, 80)"
  }
   }
 }
//-----------------------------------------------------------------------//

/*----------------------|ANIMATION WHEN PRESS START BUTTON|-----------------------*/
function gameStart(){
    startMusicEl.loop = "true";
    startDivEl.style.animation ="startAnimation 2s forwards";
    startMusic.play();
    setTimeout(function () {
      startDivEl.style.display ="none";
    }, 2000);
}
//--------------------------------------------------------------------------------//


/*--------------------|OPENING AND CLOSING SHOP AND SPELL TAB---------------------*/
function shopOpenClose(){
 if(shopOpeningClosing == false){
  if(shopOpen == false){
    shopOpeningClosing = true;
    shopDivEl.style.animation ="shopAnimationOpen 2s forwards"
    shopOpenerImageEl.style.animation = "shopOpenerFlipIn 2s forwards"
    shopOpen = true;
    setTimeout(function () {
      shopOpeningClosing = false;
    }, 2000);
  }
  else if(shopOpen == true){
    shopOpeningClosing = true;
    shopDivEl.style.animation ="shopAnimationClose 2s forwards"
    shopOpenerImageEl.style.animation = "shopOpenerFlipOut 2s forwards"
    shopOpen = false;
    setTimeout(function () {
      shopOpeningClosing = false;
    }, 2000);
   }
  }
}
function spellOpenClose(){

  if(spellOpeningClosing == false){
  if(spellOpen == false){
    spellOpeningClosing = true;
    spellDivEl.style.animation ="spellAnimationOpen 2s forwards"
    spellOpenerImageEl.style.animation = "spellOpenerFlipIn 2s forwards"
    spellOpen = true;
    setTimeout(function () {
      spellOpeningClosing = false;
    }, 2000);
  }
  else if(spellOpen == true){
    spellOpeningClosing = true;
    spellDivEl.style.animation ="spellAnimationClose 2s forwards"
    spellOpenerImageEl.style.animation = "spellOpenerFlipOut 2s forwards"
    spellOpen = false;
    setTimeout(function () {
      spellOpeningClosing = false;
    }, 2000);
  }
 }
}
//--------------------------------------------------------------------------------//

/*-----------------------------|ENEMYHP MATH|--------------------------------*/
function enemyHit(){
  //checks if enemy has hp
if(playerIsAlive == true && enemyIsAlive == true){

  if(enemyHP > 0){
    //randomizes playerAttack damage
    playerAttack = playerDMG;
    //checks if damage would be more than hp to prevent negative numbers
    if(enemyHP - playerAttack < 0){
      //reduces enemyhp to 0
      consoleFightOutput.push("<br> <p style ='color: rgba(255,255,255)'>You hit " + enemyName + " for " + Math.ceil(enemyHP) + " damage!</p>");
      enemyHP -= enemyHP;
    } else {
    //reduces enemyHP by playerAttack
    enemyHP -= playerAttack;
    consoleFightOutput.push("<br> <p style ='color: rgba(255,255,255)'>You hit " + enemyName + " for " + playerAttack + " damage!</p>");
    }
  }
 }
}
//---------------------------------------------------------------------------//

/*----------------------|TEXT APPEARING IN CONSOLE------------------------*/
function enemyRespawn(changeLevel){
  //checks if length of console array is more than 8, basically checks for amount of lines in console.
    var i = 1;
       enemyIsAlive = false;
       if(changeLevel == false){
         consoleFightOutput.push("<br><p style ='color: #ffe169;'>" + enemyName + " Dropped " + Math.round(enemyGoldDrop * globalEnemyLevelMultiplier) + " gold!</p>");
         gold += Math.round(enemyGoldDrop * globalEnemyLevelMultiplier)
       }


       if(enemyCurrentLevel == maxLevel){
         maxLevel ++;
         consoleFightOutput.push("<br><p style = 'color: green;'> You now have access to level " + (currentLevel + 1) + "!</p>")
         maxLevelEl.innerHTML = maxLevel;
         nextLevelButtonEl.style.display ="block";
       }
       enemyEl.style.display ="none"
       setTimeout(() => {
         /*-----------------------Enemy randomizer -------------------------------
         */var enemyRandomizer = Math.floor(Math.random() * 10) + 1;
         if(enemyRandomizer == 1){
           enemyName = "Nisse";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_goblin_1.png";
         }else if(enemyRandomizer == 2){
           enemyName = "Angry eagle";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_bird_1.png";
         }else if(enemyRandomizer == 3){
           enemyName = "Giant Worm";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_worm_1.png";
         }else if(enemyRandomizer == 4){
           enemyName = "Forest spirit";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_goblin_1.png";
         }else if(enemyRandomizer == 5){
           enemyName = "Angry man";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_man_1.png";
         }else if(enemyRandomizer == 6){
           enemyName = "???";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_shadow_1.png";
         }else if(enemyRandomizer == 7){
           enemyName = "Tree demon";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_goblin_1.png";
         }else if(enemyRandomizer == 8){
           enemyName = "Dryad";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_dryad_1.png";
         }else if(enemyRandomizer == 9){
           enemyName = "Spider";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_spider_1.png";
         }else if(enemyRandomizer == 10){
           enemyName = "Nisse king";
           enemyEl.style.display = "block";
           enemyEl.src ="Bilder/EM_goblin-king_1.png";
         }
         //-----------------------------------------------------------------------
         consoleFightOutput.push("<br><p style ='color: rgba(255,80,80);'> A wild " + enemyName + " Appeared!</p>");
         enemyEl.style = "filter: opacity(1)"
         enemyCurrentLevel = currentLevel;
         globalEnemyLevelMultiplier = currentLevel * 0.2 + 0.8;
         totalEnemyAttack = Math.round(enemyBaseAttackDamage * globalEnemyLevelMultiplier);
         totalEnemyMaxHP = Math.round(enemyMaxHP * globalEnemyLevelMultiplier);
         enemyHP = Math.round(totalEnemyMaxHP);
         playerCurrentHP = playerMaxHP;
         enemyIsAlive = true;

         enemyCurrentLevelEl.innerHTML = " " + enemyCurrentLevel;
         //-----------------------------------------------------------------------
       }, 2000)
       i = 0;
   }

//------------------------------------------------------------------------//

/*--------------------|OPENING MENUS FOUND IN HEADER|------------------------*/
function headerMenuChanger(event){
   if (event.target.id =="upgradesText"){
    document.querySelector(".upgrades").style.display = "flex";
    document.querySelector(".overlay").style.display ="flex";
  }
  else if(event.target.id =="overlay"){
    document.querySelector(".upgrades").style.display = "none";
    document.querySelector(".rebirthCanvas").style.display ="none";
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".skillTreeCanvas").style.display ="none"
  }
  else if(event.target.id =="rebirthText"){
    document.querySelector(".rebirthCanvas").style.display = "flex";
    document.querySelector(".overlay").style.display ="flex";
  }
  else if(event.target.id =="skillTreeText"){
    document.querySelector(".skillTreeCanvas").style.display = "flex";
    document.querySelector(".overlay").style.display ="flex";
  }else if(event.target.id == "Tutorial"){
    startDivEl.style.display = "block";
    startDivEl.style.animation = "";
  }
}
//---------------------------------------------------------------------------//

/*---------------------|GAINING MANA BY CLICKING ORB|--------------------*/
function orbClick(){
  if(manaPerClick > maxMana - mana){
    mana += maxMana - mana;
    manaEl.style.color ="yellow";
    maxManaEl.style.color ="yellow";
    manaShowEl.style.color ="yellow";
  }
  else{
    mana += manaPerClick;
  }
}
//-----------------------------------------------------------------------//

function playerRevive(){
  enemyEl.style = "filter: opacity(1)"
  playerIsAlive = true;
  totalEnemyAttack = Math.round(enemyBaseAttackDamage * globalEnemyLevelMultiplier);
  totalEnemyMaxHP = Math.round(enemyMaxHP * globalEnemyLevelMultiplier);
  enemyHP = Math.round(totalEnemyMaxHP);
  playerCurrentHP = Math.round(playerMaxHP);

  document.getElementById("enemyCurrentLevel").innerHTML =" " + currentLevel;
  reviveDivEl.style.display = "none";
}
//-------------------------------------------------------------------------------------------------//
