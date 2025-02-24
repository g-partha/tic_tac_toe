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
        const setSignY = () => sign = "Y";
        const getSign = () => sign;
        const increaseTurns = () => turns++;
        const getTurns = () => turns;
        const resetTurns = () => turns = 0;
        return {
            getName, increaseScore, resetScore, getScore,
            setSignX, setSignY, getSign, increaseTurns, getTurns, resetTurns,
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
            playerList.one.setSignY();
            playerList.two.setSignX();
        } else if(players.playerList.one.getSign() == "Y"){
            playerList.one.setSignX();
            playerList.two.setSignY();
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

    const setfirstTurnPlayerOfTheGame = (function () {
        const one = () => {
            firstTurnPlayerOfTheGame = "one";
            players.playerList.one.setSignX();
            players.playerList.two.setSignY();
        };
        const two = () => {
            firstTurnPlayerOfTheGame = "two";
            players.playerList.two.setSignX();
            players.playerList.one.setSignY();
        }
        return { one, two }
    })();

    const makeTurn = function (verticalPositionChoice, horizontalPositionChoice) {
        if (!gameBoard.getBoardEntry(verticalPositionChoice, horizontalPositionChoice)) {
            let turns = players.playerList.one.getTurns() + players.playerList.one.getTurns();
            if (turns == 0) {
                if (firstTurnPlayerOfTheGame == "one") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                    players.playerList.one.increaseTurns();
                    lastTurn = "one";
                    results.resultActions();
                    return;
                } else if (firstTurnPlayerOfTheGame == "two") {
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                    players.playerList.two.increaseTurns();
                    lastTurn = "two";
                    results.resultActions();
                    return;
                }
            }
            if (lastTurn == "one") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                players.playerList.two.increaseTurns();
                lastTurn = "two";
                results.resultActions();
                return;
            } else if (lastTurn == "two") {
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                players.playerList.one.increaseTurns();
                lastTurn = "one";
                results.resultActions();
                return;
            }
        }

    };

    return { setfirstTurnPlayerOfTheGame, makeTurn, };
})();




const results = (function(){
    const checkMatchResult = function () {
        const board = gameBoard.getBoard();
        for(let i = 0; i < 3; i++){
            if(board[i][0] == "X" && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                return "one";
            } else if(board[i][0] == "Y" && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
                return "two";
            }
        }
        for(let j = 0; j < 0; j++){
            if(board[0][j] == "X" && board[0][j] == board[1][j] && board[1][j] == board[2][j]){
                return "one";
            } else if(board[0][j] == "Y" && board[0][j] == board[1][j] && board[1][j] == board[2][j]){
                return "two";
            }
        }
        if(board[0][0] == "X" && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            return "one";
        } else if(board[0][0] == "Y" && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
            return "two";
        }
        if(board[0][2] == "X" && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            return "one";
        } else if(board[0][2] == "Y" && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
            return "two";
        }
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] == ""){
                    return;
                }
            }
        }
        return "draw"; //return draw not working
    };

    // the code below is under work
    const resultActions = function(){
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
    // the code above is under work

    return {resultActions};
})();




// Console tests

players.addNewPlayers("Rick", "Tom");
playGame.setfirstTurnPlayerOfTheGame.one();
console.log({ "Player One Sign": players.playerList.one.getSign() });
console.log({ "Player Two Sign": players.playerList.two.getSign() });


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
    playGame.makeTurn(1, 0);
    playGame.makeTurn(1, 1);
    playGame.makeTurn(1, 2);
    playGame.makeTurn(2, 0);
    playGame.makeTurn(2, 1);
    playGame.makeTurn(2, 2);
}

XWins();
XWins();
YWins();
YWins();
XWins();
draw();



console.log({ "Board": gameBoard.getBoard() });

console.log({"player one score": players.playerList.one.getScore(), "player two score": players.playerList.two.getScore(),});

