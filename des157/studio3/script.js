(function() {
    'use strict';

    const playbtns = document.querySelectorAll('.play');
    const avatars = document.querySelectorAll('#character button')
    const instbtns = document.querySelectorAll('.instructions')
    const game = document.getElementById('game');
    const actionArea = document.getElementById('actions');

    /*sounds */
    const dicesound = new Audio("media/dice.mp3")
    const moosound = new Audio("media/moo.mp3") 

    /* game data */
    const gameData = {
        dice: ['images/1die.svg', 'images/2die.svg', 'images/3die.svg', 
            'images/4die.svg', 'images/5die.svg', 'images/6die.svg'],
        players: ['player 1', 'player 2'],
        colors: ['#FFF', "#FFF"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    /************** set-up *************/

    /* function: for each play button go to character selection screen */
    playbtns.forEach(function(btn){
        //console.log(btn);
        btn.addEventListener('click', function(e){
            e.preventDefault();

            moosound.play();

            // close intro or instructions overlay and go to character selection
            document.getElementById("intro").className = "ov hidden";
            document.getElementById("instructionsov").className = "ov hidden";
            document.getElementById("character").className = "ov showing";
        });
    });

    /* function: sets up game, character, and player colors based on character selection */
    avatars.forEach(function(btn){
        //console.log(btn);
        btn.addEventListener('click', function(e){
            e.preventDefault();

            const character = btn.id;
            console.log(character);

            //first, close the character selection screen & open game
            document.getElementById("character").className = "ov hidden";
            document.getElementById("player1").className = "showing";
            document.getElementById("player2").className = "showing";
            document.getElementById("actionscontainer").className = "showing";
            document.getElementById("quit").className = "showing";


            //sets up the player avatars and color (defined at bottom)
            setUpCharacters(character);
            //game starts here!!!
            document.getElementById("ov-darken").className ="hidden";
            startGame();


        });
        
    });
    
    /* function: opens instructions when instruction button is clicked*/
    instbtns.forEach(function(btn){
        btn.addEventListener('click', function(e){
            e.preventDefault();
            document.getElementById("instructionsov").className = "ov showing";
            document.getElementById("intro").className = "ov hidden";
        });
    })

    /* function: quits game on quitgame button */
    document.getElementById("quit").addEventListener('click', function(){
        location.reload();
    })




    // functions 
    function setUpCharacters(character) {
        // set up player color
        const player1 = document.getElementById("player1");
        const player2 = document.getElementById("player2");

        const pName = document.getElementById("u-char");
        const cName = document.getElementById("c-char");

        /*change based on character name*/
        pName.innerHTML = `${character}`
        document.getElementById("avatar1").innerHTML =`<img src="images/${character}.svg" width="auto">`
        gameData.players[0] = character;

        const avatar2 = document.getElementById("avatar2");

        // set up names and backgrounds based on character chosen
        switch(character){
            case "pig":
                console.log('pig chosen');
                avatar2.innerHTML =`<img src="images/chicken.svg" width="auto">`;
                gameData.players[1] = 'Chicken';
                gameData.colors[0] = "#DF5E81";
                gameData.colors[1] = "#F2B847";
                document.getElementById("actionscontainer").style.backgroundColor= "#DF5E81";

                break;
            case "chicken":
                console.log('chicken chosen');
                avatar2.innerHTML =`<img src="images/dog.svg" width="auto">`;
                gameData.players[1] = 'Dog';

                gameData.colors[0] = "#F2B847";
                gameData.colors[1] = "#A4C457";

                document.getElementById("actionscontainer").style.backgroundColor= "#F2B847";

                break;
            case "dog":
                console.log('dog chosen');
                avatar2.innerHTML =`<img src="images/cow.svg" width="auto">`;
                gameData.players[1] = 'Cow';

                gameData.colors[0] = "#A4C457";
                gameData.colors[1] = "#4BA9D4";
                document.getElementById("actionscontainer").style.backgroundColor= "#A4C457";

                break;
            case "cow":
                console.log('cow chosen');
                gameData.players[1] == 'Pig';

                avatar2.innerHTML =`<img src="images/pig.svg" width="auto">`;
                gameData.colors[0] = "#4BA9D4";
                gameData.colors[1] = "#DF5E81";
                document.getElementById("actionscontainer").style.backgroundColor= "#4BA9D4";
                break;

        }

        player1.style.backgroundColor = gameData.colors[0];
        player2.style.backgroundColor = gameData.colors[1];
        cName.innerHTML = `${gameData.players[1]}`;
        console.log(gameData.players);


        console.log(gameData.colors);
        console.log("players set up");
    }

        /************** game control *************/

    function startGame() {
        // randomly set game index here...
        gameData.index = Math.round(Math.random());
        
        // document.getElementById('quit').addEventListener("click", function(){
        //     location.reload();
        // });

        console.log(gameData.index);
        setUpTurn();
    }

    function setUpTurn() {
        document.getElementById("actionscontainer").style.backgroundColor = gameData.colors[gameData.index];

        actionArea.innerHTML='';

        if (gameData.index == 0){
            playerTurn();
        } else {
            cpuTurn();
        }
    }

    function playerTurn() {
        game.innerHTML = "<p>Roll the dice down below</p>";
        actionArea.innerHTML += '<button id="roll">Roll the Dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            console.log("roll the dice!");
            dicesound.play();
            throwDice();
        });
    }

    function cpuTurn(){
        // change to actual name later
        actionArea.innerHTML = `<p>computer's turn </p>`;
        dicesound.play();
        throwDice();
    }





    function throwDice(){
        actionArea.html = '';
        gameData.roll1= Math.floor(Math.random() * 6) + 1; //use ceil could result in zero
        gameData.roll2= Math.floor(Math.random() * 6) + 1;


        game.innerHTML = `<img id="die1" src="${gameData.dice[gameData.roll1-1]}" width=100px>
                            <img id="die2" src="${gameData.dice[gameData.roll2-1]}" width=100px>`
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1's are rolled
        if (gameData.rollSum == 2) {
            //console.log("snake eyes were rolled");
            game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            // show the current score
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }

        // if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            //console.log("one of the two dice was a 1");
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${
                gameData.players[gameData.index]
            }</p>`;
            actionArea.innerHTML=`<p>Setting up next turn</p>`
            setTimeout(setUpTurn, 2000);
            showCurrentScore();
        }

        else {
            //console.log("the game proceeds");
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            showCurrentScore();

            //check winning condition
            if(checkWinningCondition()){
                endGame();
            } else {

            // if CPU, do CPU turn, else do human turn
                if (gameData.index == 1){
                    game.innerHTML += "<p>CPU's turn! please wait</p>";
                    setTimeout(setUpTurn, 1000);
                } else { 
                    actionArea.innerHTML = '<button id="rollagain"> Roll again </button> or <button id="pass">Pass</button>';
                    game.innerHTML += `<p> Select an an action down below </p>`

    
                    document.getElementById('rollagain').addEventListener('click', function() {
                        setUpTurn();
                    });
        
                    document.getElementById('pass').addEventListener('click', function() {
                        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                        setUpTurn();
                    });
                }
            }

        }
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd) {
            return 1;
            // document.getElementById('quit').innerHTML = "Start a new game?";
        }  else {
            // show current score;
            return 0;

        }
    }

    //function updates score after dice roll
    function showCurrentScore() {
        document.getElementById('u-points').innerHTML=`${gameData.score[0]}`;
        document.getElementById('c-points').innerHTML=`${gameData.score[1]}`;
    }
    
    // ends game if won
    function endGame() {
        // show ending overlay 
        const endov = document.getElementById("endingcontainer")
        endov.className = "ov showing";

        const ending = document.getElementById("ending")

        ending.innerHTML = `<h2>${gameData.players[gameData.index]} won with ${gameData.score[gameData.index]} points!</h2>`

        ending.innerHTML += ` <button id="playagain">play again?</button>  `


        document.getElementById("playagain").addEventListener('click',function() {
            location.reload();
        });
        // hide everything else!
        document.getElementById("player1").className = "hidden";
        document.getElementById("player2").className = "hidden";
        document.getElementById("actions").className = "hidden";
        document.getElementById("ov-darken").className ="showing";

    }
}) ();