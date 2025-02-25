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
    const reverseSign = function(){
        if(playerList.one.getSign() == "X"){
            playerList.one.setSignO();
            playerList.two.setSignX();
        } else if(players.playerList.one.getSign() == "O"){
            playerList.one.setSignX();
            playerList.two.setSignO();
        }
    }
    addNewPlayers("", "");
    return { addNewPlayers, playerList, reverseSign,};
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
    let firstTurnPlayerOfTheGame = "";
    let lastTurn = "";
    const setFirstTurnPlayerOfTheGame = (function () {
        const one = () => {
            firstTurnPlayerOfTheGame = "one";
            players.playerList.one.setSignX();
            players.playerList.two.setSignO();
        };
        const two = () => {
            firstTurnPlayerOfTheGame = "two";
            players.playerList.two.setSignX();
            players.playerList.one.setSignO();
        };
        const reset = () => {
            firstTurnPlayerOfTheGame = "";
        };
        return { one, two, reset }
    })();
    const makeTurn = function (verticalPositionChoice, horizontalPositionChoice) {
        if(!players.playerList.one.getName() || !players.playerList.one.getName()){
            alert("Please Enter Your Names!");
            return;
        }
        if (!gameBoard.getBoardEntry(verticalPositionChoice, horizontalPositionChoice)) {
            let turns = players.playerList.one.getTurns() + players.playerList.one.getTurns();
            if (turns == 0) {
                if (firstTurnPlayerOfTheGame == "one") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                    players.playerList.one.increaseTurns();
                    lastTurn = "one";
                    results.matchResultActions();
                    results.gameResultActions();
                    return;
                } else if (firstTurnPlayerOfTheGame == "two") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                    players.playerList.two.increaseTurns();
                    lastTurn = "two";
                    results.matchResultActions();
                    results.gameResultActions();
                    return;
                }
            }
            if (lastTurn == "one") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                players.playerList.two.increaseTurns();
                lastTurn = "two";
                results.matchResultActions();
                results.gameResultActions();
                return;
            } else if (lastTurn == "two") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                players.playerList.one.increaseTurns();
                lastTurn = "one";
                results.matchResultActions();
                results.gameResultActions();
                return;
            }
        }
    };
    return { setFirstTurnPlayerOfTheGame, makeTurn, };
})();




const results = (function(){
    const checkMatchResult = function () {
        const board = gameBoard.getBoard();
        for(let i = 0; i < 3; i++){
            if(board[i][0] == "X" && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                return "one";
            } else if(board[i][0] == "O" && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                return "two";
            }
        }
        for(let j = 0; j < 0; j++){
            if(board[0][j] == "X" && board[0][j] == board[1][j] && board[1][j] == board[2][j]){
                return "one";
            } else if(board[0][j] == "O" && board[0][j] == board[1][j] && board[1][j] == board[2][j]){
                return "two";
            }
        }
        if(board[0][0] == "X" && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            return "one";
        } else if(board[0][0] == "O" && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            return "two";
        }
        if(board[0][2] == "X" && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            return "one";
        } else if(board[0][2] == "O" && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            return "two";
        }
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] == ""){
                    return;
                }
            }
        }
        return "draw";
    };
    const matchResultActions = function(){
        if (checkMatchResult() == "one") {
            players.playerList.one.increaseScore();
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            lastTurn = "";
            gameBoard.initiateBoard();
            console.log("one wins"); //console log tests
        } else if (checkMatchResult() == "two") {
            players.playerList.two.increaseScore();
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            lastTurn = "";
            gameBoard.initiateBoard();
            console.log("two wins"); //console log tests
        } else if (checkMatchResult() == "draw") {
            players.reverseSign();
            players.playerList.one.resetTurns();
            players.playerList.two.resetTurns();
            lastTurn = "";
            gameBoard.initiateBoard();
            console.log("draw"); //console log tests
        }
    }
    const gameResultActions = function(){
        if(players.playerList.one.getScore() == 5){
            console.log("one wins the game");
            players.addNewPlayers("", "");
            playGame.setFirstTurnPlayerOfTheGame.reset();
        } else if(players.playerList.two.getScore() == 5){
            console.log("two wins the game");
            players.addNewPlayers("", "");
            playGame.setFirstTurnPlayerOfTheGame.reset();
        }

    }
    return {matchResultActions, gameResultActions};
})();





const uiControls = (function(){
    const playerOneNameInput = document.querySelector("#player-one-name");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const createPlayersButton = document.querySelector(".create-players-button");
    const gameBoardUI = document.querySelector(".game-board-ui");
    const gameBoardUICells = [];
    function createBoardUI(){
        gameBoardUICells.splice(0, gameBoardUICells.length);
        for(let i = 0; i < 3; i++){
            gameBoardUICells.push([]);
            for(let j = 0; j < 3; j++){
                gameBoardUICells[i][j] =  document.createElement("div");
                gameBoardUICells[i][j].classList.toggle(".game-board-ui-cells");
                gameBoardUICells[i][j].textContent = gameBoard.getBoardEntry(i, j);
                gameBoardUICells[i][j].addEventListener("click", () => {
                    playGame.makeTurn(i, j);
                });
                gameBoardUI.appendChild(gameBoardUICells[i][j]);
            }
        }
    }
    createBoardUI();

})();







// Console tests


const tests = (function(){
    function initiateGame(oneName, twoName, firstPlayer){
        players.addNewPlayers(oneName, twoName);
        if(firstPlayer == 1){
            playGame.setFirstTurnPlayerOfTheGame.one();

        }
        if(firstPlayer == 2){
            playGame.setFirstTurnPlayerOfTheGame.two();

        }
    
    }
    function displayGameStatus(){
        console.log({ Player: "One", Name: players.playerList.one.getName(), Sign: players.playerList.one.getSign(), Score: players.playerList.one.getScore(),});
        console.log({ Player: "Two", Name: players.playerList.two.getName(), Sign: players.playerList.two.getSign(), Score: players.playerList.two.getScore(),});
        console.log({ "Board": gameBoard.getBoard().slice() });
    }
    function XWins(){
        playGame.makeTurn(0, 0);
        playGame.makeTurn(1, 2);
        playGame.makeTurn(1, 1);
        playGame.makeTurn(2, 1);
        playGame.makeTurn(2, 2);
    }
    function YWins(){
        playGame.makeTurn(1, 0);
        playGame.makeTurn(0, 0);
        playGame.makeTurn(1, 2);
        playGame.makeTurn(1, 1);
        playGame.makeTurn(2, 1);
        playGame.makeTurn(2, 2);
    }
    function draw(){
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
    return {initiateGame, displayGameStatus, XWins, YWins, draw}
})();

tests.initiateGame("Tom", "Rick", 1);
tests.displayGameStatus();

tests.XWins();
tests.XWins();
tests.YWins();
tests.YWins();
tests.draw();
tests.XWins();
// tests.YWins();
playGame.makeTurn(0, 2);
tests.displayGameStatus();

// tests.XWins();

// tests.displayGameStatus();

// tests.initiateGame("Jim", "Ron", 2);
// tests.displayGameStatus();
