const players = (function () {
    const createPlayer = function (name) {
        let score = 0;
        let sign = "";
        let turns = 0;
        const getName = () => name;
        const increaseScore = () => score++;
        const getScore = () => score;
        const resetScore = () => score = 0;
        const setSignX = () => sign = "X"; // The first player gets the "X" sign
        const setSignO = () => sign = "O";
        const getSign = () => sign;
        const increaseTurns = () => turns++;
        const getTurns = () => turns;
        const resetTurns = () => turns = 0;
        return {
            getName, increaseScore, resetScore, getScore,
            setSignX, setSignO, getSign, increaseTurns, getTurns, resetTurns,
        };
    };
    const playerNames = { one: "", two: "", };
    const playerList = {};
    function addNewPlayers(playerOneName, playerTwoName) {
        playerNames.one = playerOneName;
        playerNames.two = playerTwoName;
        playerList.one = createPlayer(playerNames.one);
        playerList.two = createPlayer(playerNames.two);
    };
    const reverseSign = function () {
        if (playerList.one.getSign() == "X") {
            playerList.one.setSignO();
            playerList.two.setSignX();
        } else if (playerList.one.getSign() == "O") {
            playerList.one.setSignX();
            playerList.two.setSignO();
        }
    }
    addNewPlayers("", "");
    return { addNewPlayers, playerList, reverseSign, };
})();




const gameBoard = (function () {
    const board = [];
    function initiateBoard() {
        board.splice(0, board.length);
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                board[i].push("");
            }
        }
    }
    initiateBoard();
    const getBoard = () => board;
    const getBoardEntry = (verticalPosition, horizontalPosition) => board[verticalPosition][horizontalPosition];
    const setBoardEntry = (verticalPosition, horizontalPosition, value) => board[verticalPosition][horizontalPosition] = value;
    return { initiateBoard, setBoardEntry, getBoardEntry, getBoard };
})();





const playGame = (function () {
    let firstTurnPlayerOfTheMatch = "";
    let lastTurn = "";
    const setLastTurn = (player) => {
        lastTurn = player;
    }
    const getLastTurn = () => lastTurn;

    const setfirstTurnPlayerOfTheMatch = (function () {
        function one() {
            firstTurnPlayerOfTheMatch = "one";
            players.playerList.one.setSignX();
            players.playerList.two.setSignO();
        }
        function two(){
            firstTurnPlayerOfTheMatch = "two";
            players.playerList.two.setSignX();
            players.playerList.one.setSignO();
        }
        function reset(){
            firstTurnPlayerOfTheMatch = "";
        }
        function reverse() {
            if(getFirstTurnPlayerOfTheMatch() == "one"){
                two();
            } else if(getFirstTurnPlayerOfTheMatch() == "two"){
                one();
            }
        }
        return { one, two, reset, reverse }
    })();
    function getFirstTurnPlayerOfTheMatch(){
        return firstTurnPlayerOfTheMatch;
    };

    const makeTurn = function (verticalPositionChoice, horizontalPositionChoice) {
        if (!players.playerList.one.getName() || !players.playerList.two.getName()) {
            alert("Please Enter Your Names!");
            return;
        }
        if (!gameBoard.getBoardEntry(verticalPositionChoice, horizontalPositionChoice)) {
            let turns = players.playerList.one.getTurns() + players.playerList.two.getTurns();
            if (turns == 0) {
                if (getFirstTurnPlayerOfTheMatch() == "one") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                    players.playerList.one.increaseTurns();
                    setLastTurn("one");

                    results.matchResultActions();
                    results.gameResultActions();
                    uiControls.updateBoardUI();
                    uiControls.updateGameStatusField();
                    return;
                } else if (getFirstTurnPlayerOfTheMatch() == "two") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                    players.playerList.two.increaseTurns();
                    setLastTurn("two");

                    results.matchResultActions();
                    results.gameResultActions();
                    uiControls.updateBoardUI();
                    uiControls.updateGameStatusField();

                    return;
                }
            }
            if (getLastTurn() == "one") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                players.playerList.two.increaseTurns();
                setLastTurn("two");

                results.matchResultActions();
                results.gameResultActions();
                uiControls.updateBoardUI();
                uiControls.updateGameStatusField();

                return;
            } else if (getLastTurn() == "two") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                players.playerList.one.increaseTurns();
                setLastTurn("one");

                results.matchResultActions();
                results.gameResultActions();
                uiControls.updateBoardUI();
                uiControls.updateGameStatusField();

                return;
            }
        }
    };
    return { setfirstTurnPlayerOfTheMatch, makeTurn, getLastTurn, setLastTurn, getFirstTurnPlayerOfTheMatch};
})();




const results = (function () {

    const checkMatchResult = function () {
        const board = gameBoard.getBoard();
        const playerOneSign = players.playerList.one.getSign();
        const playerTwoSign = players.playerList.two.getSign();
        
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0] === playerOneSign ? "one" : "two";
            }
        }
        
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== "" && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return board[0][j] === playerOneSign ? "one" : "two";
            }
        }
        
        // Check diagonals
        if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0] === playerOneSign ? "one" : "two";
        }
        
        if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2] === playerOneSign ? "one" : "two";
        }
        
        // Check for draw
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    return; // Game still in progress
                }
            }
        }
        
        return "draw";
    };

    const matchResultActions = function () {
        if (checkMatchResult() == "one") {
            players.playerList.one.increaseScore();
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            playGame.setLastTurn("");
            gameBoard.initiateBoard();
            playGame.setfirstTurnPlayerOfTheMatch.reverse();
            alert(`${players.playerList.one.getName()} wins!`);
        } else if (checkMatchResult() == "two") {
            players.playerList.two.increaseScore();
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            playGame.setLastTurn("");
            gameBoard.initiateBoard();
            playGame.setfirstTurnPlayerOfTheMatch.reverse();

            alert(`${players.playerList.two.getName()} wins!`);

        } else if (checkMatchResult() == "draw") {
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            playGame.setLastTurn("");
            gameBoard.initiateBoard();
            playGame.setfirstTurnPlayerOfTheMatch.reverse();
            alert("Its a draw!");

        }
    }
    const gameResultActions = function () {
        if (players.playerList.one.getScore() == 5) {
            alert(`${players.playerList.one.getName()} wins the game!`);

            players.addNewPlayers("", "");
            playGame.setfirstTurnPlayerOfTheMatch.reset();
            uiControls.removeGameStatusField();
        } else if (players.playerList.two.getScore() == 5) {
            alert(`${players.playerList.two.getName()} wins the game!`);

            players.addNewPlayers("", "");
            playGame.setfirstTurnPlayerOfTheMatch.reset();
            uiControls.removeGameStatusField();
        }

    }
    return { matchResultActions, gameResultActions };
})();





const uiControls = (function () {
    const container = document.querySelector(".container");
    const playerOneNameInput = document.querySelector("#player-one-name");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const createPlayersButton = document.querySelector(".create-players-button");
    const gameStatusField = document.createElement("div");
    gameStatusField.classList.toggle("game-status-field");
    const gameBoardUI = document.querySelector(".game-board-ui");
    const gameBoardUICells = [];
    (function() {
        gameBoardUI.textContent = "";
        gameBoardUICells.splice(0, gameBoardUICells.length);
        for (let i = 0; i < 3; i++) {
            gameBoardUICells.push([]);
            for (let j = 0; j < 3; j++) {
                gameBoardUICells[i][j] = document.createElement("div");
                gameBoardUICells[i][j].classList.toggle("game-board-ui-cells");
                gameBoardUICells[i][j].addEventListener("click", () => {
                    playGame.makeTurn(i, j);
                });
                gameBoardUI.appendChild(gameBoardUICells[i][j]);
            }
        }
    })();

    function removeGameStatusField(){
        container.removeChild(gameStatusField);

    }

    function updateBoardUI(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameBoardUICells[i][j].textContent = gameBoard.getBoardEntry(i, j);
            }
        }
    }

    createPlayersButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!!playerOneNameInput.value && !!playerTwoNameInput.value) {
            players.addNewPlayers(playerOneNameInput.value, playerTwoNameInput.value);
            playerOneNameInput.value = "";
            playerTwoNameInput.value = "";
            const randomNumber = 2 * Math.random();
            if(randomNumber < 1){
                playGame.setfirstTurnPlayerOfTheMatch.one();
            } else if(randomNumber >= 1 && randomNumber < 2){
            playGame.setfirstTurnPlayerOfTheMatch.two();
            }
            gameBoard.initiateBoard();
            updateBoardUI();
            updateGameStatusField();
            container.insertBefore(gameStatusField, gameBoardUI);

        }

    });


    const currentTurnPlayer = document.createElement("div");
    currentTurnPlayer.classList.toggle("current-turn-player");
    const currentScore = document.createElement("div");
    currentScore.classList.toggle("current-score");
    const currentScoreHeading = document.createElement("div");
    const playerOneScore = document.createElement("div");
    playerOneScore.classList.toggle("player-scores");
    const playerTwoScore = document.createElement("div");
    playerTwoScore.classList.toggle("player-scores");
    currentScore.appendChild(currentScoreHeading);
    currentScore.appendChild(playerOneScore);
    currentScore.appendChild(playerTwoScore);
    gameStatusField.appendChild(currentTurnPlayer);
    gameStatusField.appendChild(currentScore);

    function updateGameStatusField(){
        let currentPlayer = "";
        if(players.playerList.one.getTurns() + players.playerList.two.getTurns() == 0){
            currentPlayer = playGame.getFirstTurnPlayerOfTheMatch();
        } else {
            if(playGame.getLastTurn() == "one"){
                currentPlayer = "two";
            } else if(playGame.getLastTurn() == "two"){
                currentPlayer = "one";

            }
        }
        const currentPlayerName = (function(){
            if(currentPlayer == "one"){
                return players.playerList.one.getName();
            } else if(currentPlayer == "two"){
                return players.playerList.two.getName();

            }
        })();
        currentTurnPlayer.textContent = `${currentPlayerName}'s turn.`
        currentScoreHeading.textContent = "Scoreboard";
        playerOneScore.textContent = `${players.playerList.one.getName()}: ${players.playerList.one.getScore()}`;
        playerTwoScore.textContent = `${players.playerList.two.getName()}: ${players.playerList.two.getScore()}`;

    }

    return { updateBoardUI, updateGameStatusField, removeGameStatusField, };

})();







// Console tests


const tests = (function () {
    function initiateGame(oneName, twoName, firstPlayer) {
        players.addNewPlayers(oneName, twoName);
        if (firstPlayer == 1) {
            playGame.setfirstTurnPlayerOfTheMatch.one();

        }
        if (firstPlayer == 2) {
            playGame.setfirstTurnPlayerOfTheMatch.two();

        }

    }
    function displayGameStatus() {
        console.log({ Player: "One", Name: players.playerList.one.getName(), Sign: players.playerList.one.getSign(), Score: players.playerList.one.getScore(), });
        console.log({ Player: "Two", Name: players.playerList.two.getName(), Sign: players.playerList.two.getSign(), Score: players.playerList.two.getScore(), });
        console.log({ "Board": gameBoard.getBoard().slice() });
        console.log(playGame.firstTurnPlayerOfTheMatch);
        console.log({lastturn: playGame.lastTurn});
    }
    function XWins() {
        playGame.makeTurn(0, 0);
        playGame.makeTurn(1, 2);
        playGame.makeTurn(1, 1);
        playGame.makeTurn(2, 1);
        playGame.makeTurn(2, 2);
    }
    function YWins() {
        playGame.makeTurn(1, 0);
        playGame.makeTurn(0, 0);
        playGame.makeTurn(1, 2);
        playGame.makeTurn(1, 1);
        playGame.makeTurn(2, 1);
        playGame.makeTurn(2, 2);
    }
    function draw() {
        playGame.makeTurn(0, 0);
        playGame.makeTurn(0, 1);
        playGame.makeTurn(0, 2);
        playGame.makeTurn(1, 1);
        playGame.makeTurn(1, 0);
        playGame.makeTurn(2, 0);
        playGame.makeTurn(2, 2);
        playGame.makeTurn(1, 2);
        playGame.makeTurn(2, 1);
    }
    return { initiateGame, displayGameStatus, XWins, YWins, draw }
})();

// tests.initiateGame("Tom", "Rick", 1);
// tests.displayGameStatus();

// tests.XWins();
// tests.XWins();
// tests.YWins();
// tests.YWins();
// tests.draw();
// tests.XWins();
// // tests.YWins();
// playGame.makeTurn(0, 2);
tests.displayGameStatus();

// tests.XWins();

// tests.displayGameStatus();

// tests.initiateGame("Jim", "Ron", 2);
// tests.displayGameStatus();
