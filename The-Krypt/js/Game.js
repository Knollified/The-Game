//basic game object and its methods
let score = 0;
let game = {
    gameStart: function (classType) {
        this.resetPlayer(classType);
        this.setFloor();
    },
    //Sets player variable in Player.js when a class is clicked on with the following stats
    resetPlayer: function (classType) {
        switch (classType) {
            case 'Mage':
                Player = new player (classType, 20, 5, 5, 5);
                break;
            case 'Rouge':
                Player = new player (classType, 15, 7, 7, 3);
                break;
            case 'Warrior':
                Player = new player (classType, 25, 7, 3, 7);
                break;
        }
        //changes the game space
        let getGameSpace = document.querySelector(".GameSpace");

        getGameSpace.innerHTML = '<div class="wrapper1"><img src="./assets/Player/' + classType + '.jpg" class="Avatar" alt=""><div class="GameSpace"><h3>' + classType + '</h3><p class="HealthPlayer">Health: ' + Player._health + '</p><p>Attack: '+ Player._attack +'</p><p>Speed: ' + Player._speed + '</p><p>Defense: ' + Player._defense + '</p></div></div>';
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
        let enemy00 = new mob ("Skeleton", Math.floor((Math.random() + 0.2) * 10), Math.floor((Math.random() + 0.1) * 10), Math.floor((Math.random() + 0.08) * 10), Math.floor((Math.random() + 0.04) * 10));
        let enemy01 = new mob ("Skeleton-General", Math.floor((Math.random() + 0.2) * 10), Math.floor((Math.random() + 0.1) * 10), Math.floor((Math.random() + 0.08) * 10), Math.floor((Math.random() + 0.04) * 10));
        let enemy02 = new mob ("Skeleton-Mage", Math.floor((Math.random() + 0.2) * 10), Math.floor((Math.random() + 0.1) * 10), Math.floor((Math.random() + 0.09) * 10), Math.floor((Math.random() + 0.04) * 10));
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
        getPlayerAction.innerHTML ='<div class="btnChoice"><div><a href="#" class="Attack-btn" onclick="PlayerMoves.Attack(),PlayerMoves.Check()"><p>Attack!</p></div><div><a href="#" class="Defend-btn" onclick="PlayerMoves.DefendDodge(),PlayerMoves.Check()"><p>Defend!</p></div></div>';
        getEnemy.innerHTML = '<img src="./assets/Mobs/' + Mob._mobType + '.jpg" class="Avatar" alt=""><div class="GameSpace"><h3>' + Mob._mobType + '</h3><p class="HealthMob">Health: ' + Mob._health + '</p><p>Attack: '+ Mob._attack +'</p><p>Speed: ' + Mob._speed + '</p><p>Defense: ' + Mob._defense + '</p></div>';
    },
    GameRestart: function () {
        location.reload();
    },
    ScoreCheck: function () {
        // boss check
        if(score >= 30 && score <= 33){
            let getHeader = document.querySelector("#header");
            let getPlayerAction = document.querySelector(".PlayerAction");
            let getEnemy = document.querySelector(".Enemy");
            getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.setBossFight()"><p>Boss Battle</p></div>';
        }
    },
    setBossFight : function () {
        let getHeader = document.querySelector("#header");
        let getPlayerAction = document.querySelector(".PlayerAction");
        let getEnemy = document.querySelector(".Enemy");
        //create an enemy
        let enemy03 = new mob ("Skeleton-King", Math.floor((Math.random() + 0.8) * 10), Math.floor((Math.random() + 0.4) * 10), Math.floor((Math.random() + 0.7) * 5), 9);
        let randomEnemyGen = Math.floor(Math.random() * Math.floor(3));
        switch (randomEnemyGen) {
            case 0:
                Mob = enemy03;
                break;
            case 1:
                Mob = enemy03;
                break;
            case 2:
                Mob =  enemy03;
                break;
        }
        //getHeader.innerHTML =
        getHeader.innerHTML = '<h2>Attack or Defend</h2>';
        getPlayerAction.innerHTML ='<div class="btnChoice"><div><a href="#" class="Attack-btn" onclick="PlayerMoves.Attack(),PlayerMoves.Check()"><p>Attack!</p></div><div><a href="#" class="Defend-btn" onclick="PlayerMoves.DefendDodge(),PlayerMoves.Check()"><p>Defend!</p></div></div>';
        getEnemy.innerHTML = '<img src="./assets/Mobs/' + Mob._mobType + '.jpg" class="Avatar" alt=""><div class="GameSpace"><h3>' + Mob._mobType + '</h3><p class="HealthMob">Health: ' + Mob._health + '</p><p>Attack: '+ Mob._attack +'</p><p>Speed: ' + Mob._speed + '</p><p>Defense: ' + Mob._defense + '</p></div>';

    }
};
let PlayerMoves = {
    Check: function () {
        let MobHealth = Mob._health;
        let PlayerHealth = Player._health;
        let getGameEvents = document.querySelector(".GameEvents");
        let getPlayerAction = document.querySelector(".PlayerAction");
        if (MobHealth <= 0){
            if (Mob._mobType !== 'Skeleton-King'){
                if (PlayerHealth <= 0 && MobHealth <= 0) {
                    getGameEvents.innerHTML ='<p> You Were Defeated!</p>';
                    getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.GameRestart()"><p>Restart</p></div>';
                }
                score = score +1;
                console.log(score);
                game.setFloor();
                game.resetPlayer(Player._classType);
                getGameEvents.innerHTML = Mob._mobType + '<p>Was Defeated</p>';
                game.ScoreCheck();
            }else if (Mob._mobType === 'Skeleton-King'){
                if (PlayerHealth <= 0 && MobHealth <= 0) {
                    getGameEvents.innerHTML ='<p> You Were Defeated!</p>';
                    getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.GameRestart()"><p>Restart</p></div>';
                }else{
                getGameEvents.innerHTML = Mob._mobType + '<p>Was Defeated You Cleared The Krpyt!</p>';
                getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.GameRestart()"><p>Restart</p></div>';
                }
            }
        }else if (PlayerHealth <= 0){
            getGameEvents.innerHTML ='<p> You Were Defeated!</p>';
            getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.GameRestart()"><p>Restart</p></div>';
        }else if (PlayerHealth <= 0 && MobHealth <= 0) {
            getGameEvents.innerHTML ='<p> You Were Defeated!</p>';
            getPlayerAction.innerHTML = '<div><a href="#" class="Fight-btn" onclick="game.GameRestart()"><p>Restart</p></div>';
        }
    },
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
        let getGameEvents = document.querySelector(".GameEvents");
        //if player is faster
        if(mobSpeed < playerSpeed){
            if(playerHealth > 0){
                if(mobDefense > playerAttack){
                    Mob._health = (mobHealth - playerAttack) + 1;
                    PlayerMoves.Check();
                    if(mobHealth > 0){
                        PlayerMoves.Check();
                        Player._health = playerHealth - mobAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
                }else if(mobDefense < playerAttack){
                    Mob._health = (mobHealth - playerAttack) - 2;
                    PlayerMoves.Check();
                    if(mobHealth > 0){
                        PlayerMoves.Check();
                        Player._health = playerHealth - mobAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
                }else if(mobDefense === playerAttack){
                    Mob._health = mobHealth - playerAttack;
                    PlayerMoves.Check();
                    if(mobHealth > 0){
                        PlayerMoves.Check();
                        Player._health = playerHealth - mobAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
                }
            }
        }else if (mobSpeed > playerSpeed){
            if(mobHealth > 0){
                if(playerDefense > mobAttack){
                    Player._health = (playerHealth - mobAttack) + 1;
                    PlayerMoves.Check();
                    if(playerHealth > 0){
                        PlayerMoves.Check();
                        Mob._health = mobHealth - playerAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack - 1) + ' damage!</p>';
                }else if(playerDefense < mobAttack){
                    Player._health = (playerHealth - mobAttack) - 1;
                    PlayerMoves.Check();
                    if(playerHealth > 0){
                        PlayerMoves.Check();
                        Mob._health = mobHealth - playerAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack + 1) + ' damage!</p>';
                }else if(playerDefense === mobAttack){
                    Player._health = playerHealth - mobAttack;
                    PlayerMoves.Check();
                    if(playerHealth > 0){
                        PlayerMoves.Check();
                        Mob._health = mobHealth - playerAttack;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
                }
            }
        }else if (mobSpeed === playerSpeed){
            Player._health = playerHealth - mobAttack;
            Mob._health = mobHealth - playerAttack;
            getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
            PlayerMoves.Check();
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
        let getGameEvents = document.querySelector(".GameEvents");
        //if player is faster
        if(mobSpeed < playerSpeed){
            if(playerHealth > 0){
                if(mobAttack < playerDefense){
                    if(mobHealth > 0){
                        PlayerMoves.Check();
                        Player._health = (playerHealth - mobAttack) + 2;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack - 2) + ' damage!</p>';
                }else if(playerDefense < mobAttack){
                    if(mobHealth > 0){
                        PlayerMoves.Check();
                        Player._health = (playerHealth - mobAttack) - 1;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack - 1) + ' damage!</p>';
                }else if(playerDefense === mobAttack){
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack * 0) + ' damage!</p>';
                }
            }
        }else if (mobSpeed > playerSpeed){
            if(mobHealth > 0){
                if(mobAttack < playerDefense){
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) + 2;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack - 2) + ' damage!</p>';
                }else if(playerDefense < mobAttack){
                    if(mobHealth > 0){
                        Player._health = (playerHealth - mobAttack) - 1;
                        PlayerMoves.Check();
                    }
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack - 1) + ' damage!</p>';
                }else if(playerDefense === mobAttack){
                    mHealthDesc.innerHTML ='Health: ' + Mob._health;
                    pHealthDesc.innerHTML ='Health: ' + Player._health;
                    getGameEvents.innerHTML = '<p>You have taken ' + (mobAttack * 0) + ' damage!</p>';
                }
            }
        }else if (mobSpeed === playerSpeed){
            Player._health = playerHealth - mobAttack;
            Mob._health = mobHealth - playerAttack;
            getGameEvents.innerHTML = '<p>You have taken ' + mobAttack + ' damage!</p>';
            PlayerMoves.Check();
        }
    }
};
