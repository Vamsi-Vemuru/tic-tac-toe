//Ids of positions available on the board
var dids = ["d11","d12","d13","d21","d22","d23","d31","d32","d33"]; 
//Board Mapping. Changes to X and O as and when clicked
var board = [
              ['N','N','N'],
              ['N','N','N'],
              ['N','N','N']
            ];

/*
  didscdn and prevent click are conditional lists. Every time a box is clicked,
  the index corresponding to the id is made unclickable.
*/
var didscdn = ["d11","d12","d13","d21","d22","d23","d31","d32","d33"];
var preventClick = [false, false, false, false, false, false, false, false, false];

//function to make the clickable divs
$(document).ready(function() {
  for (var i=0; i<dids.length; i++) {
    $("#"+dids[i]).click(function() {
      if (!preventClick[didscdn.indexOf(this.id)]) {
            trigger(this.id);
        }
        preventClick[didscdn.indexOf(this.id)] = true;
    });
  }
});

/*
  function that sends data to server on click.
  this function also changes the state of the boxes to X or O.
*/
function trigger(id) {
  var did = id;
  //The block below removes the id of the clicked box from the dids list.
  var i = dids.indexOf(did);
  dids.splice(i,1);
  didstr = dids.join();

  //Block below converts the 2D board map list to a string. String is sent to server for operations
  board[parseInt(did.substring(1,2)) - 1][parseInt(did.substring(2,3)) - 1] = 'X';
  var boardout = [];
  for(var i = 0; i < board.length; i++) {
    boardout = boardout.concat(board[i]);
  }
  boardout = boardout.join("");

  document.getElementById(id).innerHTML = 'X';//Adds X on the board

  //Ajax Call to send data to server using GET method.
  $(document).ready(function() {
    $.ajax({
      url : "{% url 'game' %}",
      csrfmiddlewaretoken: '{{ csrf_token }}',
      type : "GET",
      data : {'didstr':didstr,'boardout':boardout}, //data is the querylist sent to the server
      success : function(response) {

        /*
          Response is sent in 3 forms:
            1. If there exists more positions to play on, then the response is of form
               "position of 'O', board map"
            2. If there is a winner before all boxes are filled, then the response is of form
               "position of 'O', name of winner(player/computer)"
            3. If the last box is filled, then the response is of form
                "name of winner" or "draw"  
        */

        //Condition tree written below is logic for when all boxes are filled.
        if (response == "Draw") {
          $('#winner').html("Draw");
          return false
        } else if (response == "Player") {
          $('#winner').html("Winner is Player");
          return false
        } else if (response == "Computer") {
          $('#winner').html("Winner is Computer");
          return false
        }

        //Block below removes the ID of O from dids and makes it unclickable
        var a = response.split(",");
        var i = dids.indexOf(a[0]);
        dids.splice(i,1);
        preventClick[didscdn.indexOf(a[0])] = true;

        //appending O to the box of generated ID
        $('#'+a[0]).html('O');

        //Winner logic for less than 9 boxes played.
        if (a[1]=="Player") {
          $('#winner').html("Winner is Player");
          //If winner, then make the game unclickable
          for (var i = 0; i < preventClick.length; i++) {
            preventClick[i] = true;
          }
          return false;
        } else if (a[1] == "Computer") {
          $('#winner').html("Winner is Computer");
          //If winner, then make the game unclickable
          for (var i = 0; i < preventClick.length; i++) {
            preventClick[i] = true;
          }
          return false;
        } else {
          //creating 3d board map from string for next round
          var arr = a[1].split("");
          var nArr = [];
          while(arr.length > 0) {
            nArr.push(arr.splice(0,3));
          }
          board = nArr;
        }        
      }
    });
    return false;
  });
};