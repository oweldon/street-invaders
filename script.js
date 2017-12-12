  var gameScreen;
  var output;
  var hadoukens;
  var ryu;
  var enemies = new Array();

  var gameTimer;

  var leftArrowDown = false;
  var rightArrowDown = false;

  var bg1;

  const GS_WIDTH = 900;
  const GS_HEIGHT = 500;

  function init(){
    gameScreen = document.getElementById('gameScreen');
    gameScreen.style.width = GS_WIDTH + 'px';
    gameScreen.style.height = GS_HEIGHT + 'px';

    bg1 = document.createElement('IMG');
    bg1.className = "gameObject";
    bg1.src = "images/background.png";
    bg1.style.width = "900px";
    bg1.style.height = "500px;"
    gameScreen.appendChild(bg1);

    hadoukens = document.createElement('DIV');
    hadoukens.className = "gameObject";
    hadoukens.style.width = gameScreen.style.width;
    hadoukens.style.height = gameScreen.style.height;
    hadoukens.style.left = "0px";
    hadoukens.style.top = "0px";
    gameScreen.appendChild(hadoukens);

    output = document.getElementById('output');

    ryu = document.createElement('IMG');
    ryu.src = 'images/ryuwalk.gif';
    ryu.className = 'gameObject';
    ryu.style.width = '150px';
    ryu.style.height = '150px';
    ryu.style.top = '350px';
    ryu.style.left = '0';

    gameScreen.appendChild(ryu);

    gameTimer = setInterval(gameloop, 50);
  }

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

    var h = hadoukens.children;
    for(var i=0; i < h.length; i++){
      var newY = parseInt(h[i].style.top) - h[i].speed;
      if( newY < 0 ) hadoukens.removeChild(h[i]);
      else h[i].style.top = newY + 'px';
       }
       output.innerHTML = h.length;
  }
  function fire(){
    var hadoukenWidth = 5;
    var hadoukenHeight = 5;
    var hadouken = document.createElement('DIV');
    hadouken.className = 'gameObject';
    hadouken.backgroundColor = "yellow";
    hadouken.style.width = hadoukenWidth;
    hadouken.style.height = hadoukenHeight;
    hadouken.speed = 20;
    hadouken.style.top = parseInt(ryu.style.top) - hadoukenHeight + 'px';
    var ryuX = parseInt(ryu.style.left) + parseInt(ryu.style.width)/2;
    hadouken.style.left = (ryuX - hadoukenWidth/2) + 'px';
    hadoukens.appendChild(hadouken);
  }

  document.addEventListener('keypress', function(event){
    if(event.keyCode==32) fire();
  });

  document.addEventListener('keydown', function(event){
    if(event.keyCode==37) leftArrowDown = true;
    if(event.keyCode==39) rightArrowDown = true;
  });

  document.addEventListener('keyup', function(event){
    if(event.keyCode==37) leftArrowDown = false;
    if(event.keyCode==39) rightArrowDown = false;
  });
