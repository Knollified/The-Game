//basic game object and its methods
let Checkdead = () =>{
    if(Mob._health <= 0){
        game.setFloor();
    }
    if(Player._health <= 0){
        game.setFloor();
    }

};
let game = {
    gameStart: function (classType) {
        this.resetPlayer(classType);
        this.setFloor();
    },
    //Sets player variable in Player.js when a class is clicked on with the following stats
    resetPlayer: function (classType) {
        switch (classType) {
            case 'Mage':
                Player = new player (classType, 15, 5, 5, 5);
                break;
            case 'Rouge':
                Player = new player (classType, 10, 7, 7, 3);
                break;
            case 'Warrior':
                Player = new player (classType, 20, 7, 3, 7);
                break;
        }
        //changes the game space
        let getGameSpace = document.querySelector(".GameSpace");

        getGameSpace.innerHTML = '<img src="./assets/Player/' + classType + '.jpg" class="Avatar" alt=""><div class="GameSpace"><h3>' + classType + '</h3><p class="HealthPlayer">Health: ' + Player._health + '</p><p>Attack: '+ Player._attack +'</p><p>Speed: ' + Player._speed + '</p><p>Defense: ' + Player._defense + '</p></div>';
    },
    //changes the header, adds player action, adds game events.
    setFloor: function (){
        let getHeader = document.querySelector("#header");
        let getPlayerAction = document.querySelector(".PlayerAction");
        let getGameEvents = document.querySelector(".GameEvents");
        getHeader.innerHTML = '<h2>Clear The Krypt</h2>';
        getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.setFight()"><p>Start Krypt Battles!</p></div>';
        getGameEvents.style.visibility = "visible";
    },
    //changes the header, adds player action, adds game events and adds enemy.
    setFight: function(){
        let getHeader = document.querySelector("#header");
        let getPlayerAction = document.querySelector(".PlayerAction");
        let getEnemy = document.querySelector(".Enemy");
        //create an enemy
        let enemy00 = new mob ("Skeleton", 8, 6, 6, 3);
        let enemy01 = new mob ("Skeleton-General", 13, 7, 5, 5);
        let enemy02 = new mob ("Skeleton-Mage", 10, 6, 5, 5);
        let enemy03 = new mob ("Skeleton-King", 18, 8, 7, 6);
        let randomEnemyGen = Math.floor(Math.random() * Math.floor(3));
        switch (randomEnemyGen) {
            case 0:
                Mob = enemy00;
                break;
            case 1:
                Mob = enemy01;
                break;
            case 2:
                Mob =  enemy02;
                break;
        }
        //getHeader.innerHTML =
        getHeader.innerHTML = '<h2>Attack or Defend</h2>';
        getPlayerAction.innerHTML ='<div class="btnChoice"><div><a href="#" class="Attack-btn" onclick="PlayerMoves.Attack()"><p>Attack!</p></div><div><a href="#" class="Defend-btn" onclick="PlayerMoves.DefendDodge()"><p>Defend!</p></div></div>';
        getEnemy.innerHTML = '<img src="./assets/Mobs/' + Mob._mobType + '.jpg" class="Avatar" alt=""><div class="GameSpace"><h3>' + Mob._mobType + '</h3><p class="HealthMob">Health: ' + Mob._health + '</p><p>Attack: '+ Mob._attack +'</p><p>Speed: ' + Mob._speed + '</p><p>Defense: ' + Mob._defense + '</p></div>';
    }
};
let PlayerMoves = {
    Attack: function(){
        let playerSpeed = Player._speed ;
        let mobSpeed = Mob._speed;
        let playerAttack = Player._attack ;
        let mobAttack = Mob._attack;
        let playerDefense = Player._defense ;
        let mobDefense = Mob._defense;
        let playerHealth = Player._health ;
        let mobHealth = Mob._health;
        let pHealthDesc = document.querySelector(".HealthPlayer");
        let mHealthDesc = document.querySelector(".HealthMob");
        //if player is faster
        if(mobHealth > 0  && playerHealth > 0){
            if(mobSpeed <= playerSpeed){
                if(mobDefense > playerAttack){
                    Mob._health = (mobHealth - playerAttack) + 1;
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) - 1;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense < playerAttack){
                    Mob._health = (mobHealth - playerAttack) - 1;
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense === playerAttack){
                    Mob._health = mobHealth - playerAttack;
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }
            }else {
                if(playerDefense > mobAttack){
                    Player._health = (playerHealth - mobAttack) + 1;
                    Checkdead();
                    if(playerHealth > 0){
                        Mob._health = (playerHealth - mobAttack) - 1;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(playerDefense < mobAttack){
                    Player._health = (playerHealth - mobAttack) - 1;
                    Checkdead();
                    if(playerHealth > 0){
                        Mob._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(playerDefense === mobAttack){
                    Player._health = playerHealth - mobAttack;
                    Checkdead();
                    if(playerHealth > 0){
                        Mob._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }
            }
        }else{
            game.setFloor();
        }
    },
    DefendDodge: function(){
        let playerSpeed = Player._speed ;
        let mobSpeed = Mob._speed;
        let playerAttack = Player._attack ;
        let mobAttack = Mob._attack;
        let playerDefense = Player._defense ;
        let mobDefense = Mob._defense;
        let playerHealth = Player._health ;
        let mobHealth = Mob._health;
        let pHealthDesc = document.querySelector(".HealthPlayer");
        let mHealthDesc = document.querySelector(".HealthMob");
        //if player is faster
        if(mobHealth > 0  && playerHealth > 0){
            if(mobSpeed <= playerSpeed){
                if(mobDefense > playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) + 3;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense < playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) - 2;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense === playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }
            }else {
                if(mobDefense > playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) + 3;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense < playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) - 2;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }else if(mobDefense === playerAttack){
                    Checkdead();
                    if(mobHealth > 0){
                        Player._health = playerHealth - mobAttack;
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    Checkdead();
                }
            }
        }else{
            game.setFloor();
        }
    }
};
