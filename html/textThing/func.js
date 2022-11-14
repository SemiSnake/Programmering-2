const textContentEl = document.getElementById("textM");
var currentPage = 0;
var isAnim = false;
var charNum = 0;
var animSpeed = 100;
var npc1Seq = ["Hello! My name is froggit!.", "Nice to meet you!", "One quick question, do you want to see my face?"];
console.log()

function pageChange(){
  if(!isAnim){
    isAnim = true;
    currentPage ++;
    charNum = 0;
    textContentEl.innerHTML = "";
    function textAnim(){
      setTimeout(function () {
        if(charNum <npc1Seq[currentPage-1].length){
        textContentEl.innerHTML += npc1Seq[currentPage-1].charAt(charNum);
        charNum ++;
        textAnim();
      }else{
        isAnim = false;
      }
    }, animSpeed);
    }
    textAnim();
  }else{
    textContentEl.innerHTML = npc1Seq[currentPage-1];
    charNum = npc1Seq[currentPage-1].length
    console.log(charNum)
  }
}
