//Business logic
var xTurn = true; //true= x's turn
var boardArray = [0,0,0,0,0,0,0,0,0]; //This helps us to track the status of each position.
var stripes =["stripe1","stripe2","stripe3","stripe4","stripe5","stripe6","stripe7","stripe8"];
//combination of winning stripes
var winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//Object constructor for GameState
function GameState(winner,winningStripe) {
  this.winner = winner;
  this.winningStripe = winningStripe;
}



// checks to see if the position is clear
function positionIsClear(pos) {
  //check boardArray
  if (boardArray[pos] === 0) {
    return true;
  }
  return false;
}

function boardStatus(){
  for (var stripeCount = 0; stripeCount < winners.length; stripeCount++){
    var winnerCheck = "";
    var winner = "none";

    //are there 3 x's or o's in a row?
    for (var stripe = 0; stripe < winners[stripeCount].length; stripe++) {
      winnerCheck = winnerCheck + boardArray[winners[stripeCount][stripe]];
    }

    if (winnerCheck === "XXX"){
      winner = "X";
      break;
    } else if (winnerCheck === "OOO") {
      winner = "O";
      break;
    }
  }
  var tempState = new GameState(winner, stripeCount);
 return tempState;
}



/////////////////////////////////////////////////////////////
//User Interface Logic
function highlightWin(stripe) {
  var positionsArray=winners[stripe];
  positionsArray.forEach(function(pos){
    $(".position[data-pos='"+pos+"']").addClass("winner");
  });
}

// Update the full HTML content based on boardArray
function boardRefresh() {
  for (var index = 0;index <= boardArray.length;index++) {      //update each position
    if(boardArray[index]===0) {
      $("#pos"+(index)).text("");
    }
    else {
      $("#pos"+(index)).text(boardArray[index]);
    }
  }
}


$(document).ready(function() {
  //Resets the game board
  $("#resetButton").click(function() {
    //Clear the text fron all the 9 boxes
    boardArray=[0,0,0,0,0,0,0,0,0];
    console.log(boardArray);
    //Trigger the screen refresh
    boardRefresh();
    //Remove the winner class from all the 9 boxes
    $(".winner").removeClass("winner");
    //Remember to reset whose turn it is
  });

// an event listener that fires on any click on the board
$(".position").on("click",function() {
  var posClicked = $(this).data("pos");

  if (positionIsClear(posClicked) && boardStatus().winner==='none') {
    // check whose turn it is
    if (xTurn) {
      //make the clicked box X
      boardArray[posClicked] = "X";
    }
    else {
      //make the clicked box O
      boardArray[posClicked] = "O";
    }

    // code here to see if someone won
    var status = boardStatus();

    //if there is a winner do this
    if (status.winner != "none"){
      //highlights the winning row
      highlightWin(status.winningStripe);

    }
    else {

    }


    // increment the whoseTurn var (at end of the turn)
    xTurn = !xTurn;

    boardRefresh();

    // This section is when there is an error state, they've clicked on a full position
  } else {
    //alert the user that the space is not clear
    console.log("Place is already occupied");
  }


  //console.log($(this).data("pos")+" was clicked");
  console.log(boardArray, " turn is:", xTurn);
});

});
