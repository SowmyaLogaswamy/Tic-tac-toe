//Business logic
var whoseTurn = true; //true= x's turn
var boardArray = [0,0,0,0,0,0,0,0,0]; //This helps us to track the status of each position.

// checks to see if the position is clear
function positionIsClear(pos) {
  //check boardArray
  if (boardArray[pos] === 0) {
    return true;
  }
  return false;
}
//User Interface Logic
$(document).ready(function() {

// an event listener that fires on any click on the board
$(".position").on("click",function() {
  var posClicked = $(this).data("pos") - 1;
  if (positionIsClear(posClicked)) {
    boardArray[posClicked]++}


  //console.log($(this).data("pos")+" was clicked");
  console.log(boardArray);
})

});

//test
