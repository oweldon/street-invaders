# street-invaders

This project is a fun recreation of the popular Space Shooter game commonly made with either Phaser or Canvas.
I decided to forego those options and make the game with javascript and  jquery to improve my abiltiy and understanding of the language.

# hit-test
The most interesting thing learned in this endeavor is a very functional and much less complicated alternative to implement colision
detection when your weapon hits enemies.


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

# improvement opportunities

Elements are successfully removed from the DOM when collisions are detected, but still remain when offscreen. This has the 
potential to slow down the program if too many add up. Will be fixed in v2.0.
