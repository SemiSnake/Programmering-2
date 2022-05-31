

 //console array list.
 var click1Output = "You click on the cool ass orb";

 // currency variables, or other variables that affect general income.
 var mana = 0;
 var maxMana = 100;
 var clickCount = 0;
 var manaPerClick = 10;
 var upgrade1Cost = 10;
 var upgrade2Cost = 25;
 var manaPerTick = 5;
 var gameSpeed = 10;
 var manaShow = 0;
 var globalMPSMultiplier = 1;

 // update perimeter for kpsUpdate function, saying it should run 100 times pers second
 setInterval(kpsUpdate, gameSpeed);
 setInterval(frameUpdate, 1);

 // creating an object consisting of body tag in html, allowing interaction in javascript.
 let bodyEl = document.querySelector("body");


 //sets text with the id "upgrade1Cost" to the variable "upgrade1Cost"
 document.getElementById("upgrade1Cost").innerHTML = upgrade1Cost;
 // copies .content element, allowing interaction in javascript
 let contentEl = document.querySelector(".content");

 // pastes bodyEl in console, allowing surveillance of body tag (html) in the console.
 console.log(bodyEl);

 // adds a statement to start the "click" function, making the function run on clickEvent.
 bodyEl.addEventListener("click", clickEvent);

 // identifies element "box" by its id, and starts function: "consoleOutput" on click.
 document.getElementById("orb").onclick = function() {consoleOutput()};

 //function for smoother updates on variables on screen.
 function frameUpdate(){
   //updates upgrade1Cost variable on the html document
   document.getElementById("upgrade1Cost").innerHTML = upgrade1Cost;
   document.getElementById("maxMana").innerHTML = maxMana;
   document.getElementById("upgrade2Cost").innerHTML = upgrade2Cost;
   //updates money variable on the html document
   document.getElementById("manaShow").innerHTML = manaShow;
   //updates console_content variable on the html document
   // rounds up money variable to closest one decimal
   manaShow = (Math.round(mana * 1)/ 1);

 }



 function kpsUpdate(){
   // add a tenth of moneyPerSecond to money
   if(mana  < maxMana) {
     mana += manaPerTick * gameSpeed /1000;
   }
   else if(mana + manaPerTick > maxMana) {
     mana += maxMana - mana;
   }

 }


 function consoleOutput(){
   console.log(clickCount);
   //adds 1 to clickCount;
   clickCount += 1;
         if(clickCount == 1){
           document.getElementById("click1Output").innerHTML = click1Output;
           document.getElementById("click1Output").animate([
             {
               opacity: 0,
             },
             {
               opacity: 1,
             }
           ], 1000);
         }
 }





 function clickEvent (e){
   //checks if target of click is box or not.
       if (e.target.id == "orb" && mana < maxMana ){
         //adds moneyPerClick to money;
         if(manaPerClick > maxMana - mana){
           mana += maxMana - mana;
         }
         else{
           mana += manaPerClick;
         }
       }

       //checks if target of click is upgrade button, and also checks if money is higher than or equal to price.
       else if (e.target.id == "Upgrade1" && manaShow >= upgrade1Cost || e.target.id =="upgrade1Cost" && manaShow >= upgrade1Cost) {
         //changes moneyPerClick by 1
         manaPerClick ++;
         //reduces money by upgrade1Cost
         mana -= upgrade1Cost;
         //increases cost of upgrade1 for future upgrades
         upgrade1Cost *= 1.25;
         //prevents unneccesary decimals
         upgrade1Cost = (Math.round(upgrade1Cost * 1)/ 1);
         mana = (Math.round(mana * 10)/ 10);

       }
       else if (e.target.id =="Upgrade2" && manaShow >= upgrade2Cost || e.target.id =="upgrade2Cost" && manaShow >= upgrade2Cost){
         mana -= upgrade2Cost;
         manaPerTick += 1 * globalMPSMultiplier;
         upgrade2Cost *= 1.25;
         upgrade2Cost = (Math.round(upgrade2Cost *1)/ 1);

       }
       //if none of above statements return 1, this happens:
       else {
         //logs target id of click
         console.log(e.target.id);
       }
   }
