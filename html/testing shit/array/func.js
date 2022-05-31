const array = [5,125,6,7,1,367,4,7,8,9,2,6,87,8,2,4,6,7,8,2,3,6];

x = 0;
y = 1;
console.log(array[x]);
var firstNumber = array[x];
console.log(array[y]);
var secondNumber = array[y];
console.log(array[x]);
console.log(array[y]);

/*if(firstNumber > secondNumber){

}else if(secondNumber> firstNumber){

}else*/


function arrMove(arr, oldIndex, newIndex) {
  if (newIndex >= arr.length) {
    let i = newIndex - arr.length + 1;
    while (i--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
// returns [22, 11, 33]
console.log(arrMove([11, 22, 33], 0, 1));


console.log(array);
