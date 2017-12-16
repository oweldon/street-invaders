var gameScreen;
var output;
var hadouken;
var ryu;
var enemies = [];
var gameTimer;
var upArrowDown = false;
var downArrowDown = false;
var bg1;
var score = 1;
var titleScreen = document.getElementById('titleScreen');

  function endGame(){
    $("#gameScreen").remove();
    $("#titleScreen").show();
    $("#countdown").remove();
    $("#playerScore").remove();
    document.getElementById("titleScreen").textContent = "Good Job Fighter, " + (score-1) + " Down!";
    var a = document.createElement("a");
      var linkText = document.createTextNode("Play Again?");
      a.appendChild(linkText);
      a.title = "Play Again?";
      a.href = "javascript:history.go(0)";
      a.style.color = "white";
      a.style.position = "absolute";
      a.style.left = "450px";
      a.style.bottom = "100px";
      titleScreen.appendChild(a);
  }

  function init(){
    $("#titleScreen").hide();
    gameScreen = document.getElementById('gameScreen');
    $("gameScreen").show();
    gameScreen.style.width = "800px";
    gameScreen.style.height = "600px";

    function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < -1) {
            display.textContent = "00:00";
        } else if (timer === -1) {
          endGame();
        }
    }, 1000);
}
    startTimer(30, document.getElementById("countdown"));

    hadouken = document.createElement('DIV');
      hadouken.className = 'gameObject hadouken';
      gameScreen.appendChild(hadouken);

    bg1 = document.createElement('IMG');
      bg1.className = "gameObject";
      bg1.src = "images/bg1.jpg";
      bg1.style.width = "800px";
      bg1.style.height = "600px;"
      bg1.style.left = "0px";
      bg1.style.top  = "0px";
      gameScreen.appendChild(bg1);

    ryu = document.createElement('IMG');
      ryu.src = 'images/ryuwalk.gif';
      ryu.className = 'gameObject';
      ryu.style.width = '100px';
      ryu.style.height = '100px';
      ryu.style.top = '350px';
      ryu.style.left = '0';
      gameScreen.appendChild(ryu);

  function spawnEnemy(){
    var newEnemy = document.createElement('IMG');
      newEnemy.src = "images/ken.gif";
      newEnemy.className = "gameObject enemy";
      newEnemy.style.width = '100px';
      newEnemy.style.height = '100px';
      newEnemy.style.right = 0;
      newEnemy.style.top = Math.floor(Math.random()*400) + 'px';
      enemies.push(newEnemy);
      gameScreen.appendChild(newEnemy);
      $(document).ready(function() {
        var width = "+=" + $(document).width();
          $(newEnemy).animate({
            right: width
          }, 9000, function() {
          });
      });
    }
    var hitTest = setInterval(function(){
        var enemylist = $(".enemy");

        for(i = 0; i < enemylist.length; i++){

        var hadoukenlist = $(".hadouken");

        for(h = 0; h < hadoukenlist.length; h++){

        var enemy = $(enemylist[i]);
        var hadouken = $(hadoukenlist[h]);

        var enemyT = enemy.offset().top;
        var enemyB = enemy.height()+enemyT;
        var enemyL = enemy.offset().left;
        var enemyR = enemy.width()+enemyL;

        var hadoukenT = hadouken.offset().top;
        var hadoukenB = hadouken.height();
        var hadoukenL = hadouken.offset().left;
        var hadoukenR = hadouken.width();

        if(hadoukenT >= enemyT-hadoukenB && hadoukenT <= enemyB && hadoukenL >= enemyL-hadoukenR && hadoukenL <= enemyR){
          enemy.hide();
          enemy.remove();
          hadouken.hide();
          document.getElementById('playerScore').textContent = "SCORE: " + score++;
        }
      }
    }
  }, 100);

setInterval(spawnEnemy, 1000);


gameTimer =  setInterval(gameloop, 50);
} //end init


  function gameloop(){

  if(upArrowDown){
    var newY = parseInt(ryu.style.top);
    if(newY > 0) ryu.style.top = newY - 5 + 'px';
    else ryu.style.top = '0px';
  }

  if(downArrowDown){
    var newY = parseInt(ryu.style.top);
    var maxY = 800 - parseInt(ryu.style.top);
    if(newY <  maxY) ryu.style.top = newY + 5 + 'px';
    else ryu.style.top = maxY + 'px';
  }
}

function fire(){
  var hadoukenWidth = 75;
  var hadoukenHeight = 75;
  var hadouken = $($('.hadouken').clone().get(0));
  hadouken.css({
    "background-image": "url('images/hadouken.png')",
    "background-size": "100%",
    "width": "75px",
    "height": "75px",
    "left": (ryu.x) - 180 + 'px',
    "top": (ryu.y) - 90 +'px'
  })

  hadouken.show();

  var width = "+=" + $(document).width();
  $(hadouken).animate({
  left: width
}, 3000, function() {
  $("hadouken").hide();
});

    gameScreen.appendChild(hadouken.get(0));
  }

  document.addEventListener('keypress', function(event){
    if(event.keyCode==32){
      ryu.src = "images/ryu.png";
      fire();
    }
  });

  document.addEventListener('keyup', function(event){
    if(event.keyCode==32){
      ryu.src = "images/ryuwalk.gif";
    }
  });

  document.addEventListener('keydown', function(event){
    if(event.keyCode==38) upArrowDown = true;
    if(event.keyCode==40) downArrowDown = true;
  });

  document.addEventListener('keyup', function(event){
    if(event.keyCode==38) upArrowDown = false;
    if(event.keyCode==40) downArrowDown = false;
  });

  var modal = document.getElementById('myModal');
  var btn = document.getElementById("instructions");
  var span = document.getElementsByClassName("close")[0];


  btn.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
