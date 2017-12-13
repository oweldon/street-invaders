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
  const BG_SPEED = 1;
  const GS_WIDTH = 800;
  const GS_HEIGHT = 600;

    function init(){
    gameScreen = document.getElementById('gameScreen');
    gameScreen.style.width = GS_WIDTH + 'px';
    gameScreen.style.height = GS_HEIGHT + 'px';

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
    newEnemy.className = "gameObject";
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
  setInterval(spawnEnemy, 2500);
}
    gameTimer =  setInterval(gameloop, 50);

    function gameloop(){

    if(leftArrowDown){
      var newX = parseInt(ryu.style.left);
      if(newX > 0) ryu.style.left = newX - 20 + 'px';
      else ryu.style.left = '0px';
    }

    if(rightArrowDown){
      var newX = parseInt(ryu.style.left);
      var maxX = GS_WIDTH - parseInt(ryu.style.width);
      if(newX <  maxX) ryu.style.left = newX + 20 + 'px';
      else ryu.style.left = maxX + 'px';
    }

    if(upArrowDown){
      var newY = parseInt(ryu.style.top);
      if(newY > 0) ryu.style.top = newY - 20 + 'px';
      else ryu.style.top = '0px';
    }

    if(downArrowDown){
      var newY = parseInt(ryu.style.top);
      var maxY = GS_HEIGHT - parseInt(ryu.style.top);
      if(newY <  maxY) ryu.style.top = newY + 20 + 'px';
      else ryu.style.top = maxY + 'px';
    }
  }

  function fire(){
    var hadoukenWidth = 75;
    var hadoukenHeight = 75;
    var hadouken = document.createElement('DIV');
    hadouken.className = 'gameObject';
    hadouken.style.backgroundImage = "url('images/hadouken.png')";
    hadouken.style.backgroundSize = "100%";
    hadouken.style.width = '75px';
    hadouken.style.height = '75px';
    hadouken.style.left = (ryu.x) + 135 + 'px';
    hadouken.style.top = (ryu.y) - 5 +'px';
    $(document).ready(function(e) {
    var width = "+=" + $(document).width();
    $(hadouken).animate({
    left: width
  }, 3000, function() {
    $("hadouken").css("display", "none");
  });
});
    gameScreen.appendChild(hadouken);
    console.log('hadouken');
  }

  document.addEventListener('keypress', function(event){
    if(event.keyCode==32){
      ryu.src = "images/ryu.png";
    }  fire();
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
