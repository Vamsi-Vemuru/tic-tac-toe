var dids = ["d11","d12","d13","d21","d22","d23","d31","d32","d33"];
var board = [
              ['N','N','N'],
              ['N','N','N'],
              ['N','N','N']
            ];
var didscdn = ["d11","d12","d13","d21","d22","d23","d31","d32","d33"];
var preventClick = [false, false, false, false, false, false, false, false, false];

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

function trigger(id) {
  var did = id;
  var i = dids.indexOf(did);
  dids.splice(i,1);
  didstr = dids.join();
  board[parseInt(did.substring(1,2)) - 1][parseInt(did.substring(2,3)) - 1] = 'X';

  var boardout = [];
  for(var i = 0; i < board.length; i++) {
    boardout = boardout.concat(board[i]);
  }
  boardout = boardout.join("");

  document.getElementById(id).innerHTML = 'X';
  didhash = "#"+did;
  $(document).ready(function() {
    $.ajax({
      url : "{% url 'game' %}",
      csrfmiddlewaretoken: '{{ csrf_token }}',
      type : "GET",
      data : {'didstr':didstr,'boardout':boardout},
      success : function(response) {
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

        var a = response.split(",");
        var i = dids.indexOf(a[0]);
        dids.splice(i,1);
        preventClick[didscdn.indexOf(a[0])] = true;
        $('#'+a[0]).html('O');
        if (a[1]=="Player") {
          $('#winner').html("Winner is Player");
          for (var i = 0; i < preventClick.length; i++) {
            preventClick[i] = true;
          }
          return false;
        } else if (a[1] == "Computer") {
          $('#winner').html("Winner is Computer");
          for (var i = 0; i < preventClick.length; i++) {
            preventClick[i] = true;
          }
          return false;
        } else {
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