var gameScreen;
var output;
var hadouken;
var ryu;
var enemies = [];
var gameTimer;
var leftArrowDown = false;
var rightArrowDown = false;
var upArrowDown = false;
var downArrowDown = false;
var bg1, bg2;


  function init(){

    gameScreen = document.getElementById('gameScreen');
    gameScreen.style.width = "800px";
    gameScreen.style.height = "600px";

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

  //
  // bg2 = document.createElement('IMG');
  // bg2.className = "gameObject";
  // bg2.src = "images/bg1.jpg";
  // bg2.style.width = "800px";
  // bg2.style.height = "1422px;"
  // bg2.style.left = "0px";
  // bg2.style.top  = "-1422px";
  // gameScreen.appendChild(bg2);

  output = document.getElementById('output');

  ryu = document.createElement('IMG');
  ryu.src = 'images/ryuwalk.gif';
  ryu.className = 'gameObject';
  ryu.style.width = '100px';
  ryu.style.height = '100px';
  ryu.style.top = '350px';
  ryu.style.left = '0';
  gameScreen.appendChild(ryu);

  function spawnEnemy(){
  console.log('Spawn');

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
}, 20000, function() {
  $("newEnemy").css("display", "none");
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
        }
      }
    }
  }, 100);

setInterval(spawnEnemy, 2500);

gameTimer =  setInterval(gameloop, 50);
} //end init



  function gameloop(){

  if(leftArrowDown){
    var newX = parseInt(ryu.style.left);
    if(newX > 0) ryu.style.left = newX - 10 + 'px';
    else ryu.style.left = '0px';
  }

  if(rightArrowDown){
    var newX = parseInt(ryu.style.left);
    var maxX = 800 - parseInt(ryu.style.width);
    if(newX <  maxX) ryu.style.left = newX + 10 + 'px';
    else ryu.style.left = maxX + 'px';
  }

  if(upArrowDown){
    var newY = parseInt(ryu.style.top);
    if(newY > 0) ryu.style.top = newY - 10 + 'px';
    else ryu.style.top = '0px';
  }

  if(downArrowDown){
    var newY = parseInt(ryu.style.top);
    var maxY = 800 - parseInt(ryu.style.top);
    if(newY <  maxY) ryu.style.top = newY + 10 + 'px';
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
    "left": (ryu.x) + 135 + 'px',
    "top": (ryu.y) - 5 +'px'
  })

  hadouken.show();

  var width = "+=" + $(document).width();
  $(hadouken).animate({
  left: width
}, 3000, function() {
  $("hadouken").hide();
});

  gameScreen.appendChild(hadouken.get(0));
  console.log('hadouken');
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
  if(event.keyCode==37) leftArrowDown = true;
  if(event.keyCode==38) upArrowDown = true;
  if(event.keyCode==39) rightArrowDown = true;
  if(event.keyCode==40) downArrowDown = true;
});

document.addEventListener('keyup', function(event){
  if(event.keyCode==37) leftArrowDown = false;
  if(event.keyCode==38) upArrowDown = false;
  if(event.keyCode==39) rightArrowDown = false;
  if(event.keyCode==40) downArrowDown = false;
});
