const players = (function(){
    const createPlayer = function (name){
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
        return {getName, increaseScore, resetScore, getScore,
            setSignX, setSignY, getSign, increaseTurns, getTurns,};
    };
    const playerNames = {one: "", two: "",};
    const playerList = {};
    function addNewPlayers(playerOneName, playerTwoName) {
        playerNames.one = playerOneName;
        playerNames.two = playerTwoName;
        playerList.one = createPlayer(playerNames.one);
        playerList.two = createPlayer(playerNames.two);
    };
    addNewPlayers("", "");
    return {addNewPlayers, playerList};
})();

const gameBoard = (function(){
    const board = [];
    const rows = 3;
    const cols = 3;
    function initiateBoard() {
        for(let i = 0; i < rows; i++){
            board.push([]);
            for(let j = 0; j < cols; j++){
                board[i].push("");
            }
        }
    }
    initiateBoard();
    const getBoard = () => board;
    const getBoardEntry = (verticalPosition, horizontalPosition) => board[verticalPosition][horizontalPosition];
    const setBoardEntry = (verticalPosition, horizontalPosition, value) => board[verticalPosition][horizontalPosition] = value;    
    return {initiateBoard, setBoardEntry, getBoardEntry, getBoard};
})();

const playGame = (function(){
    let firstTurnPlayerOfTheMatch = "";
    let lastTurn = "";

    const setFirstTurnPlayerOfTheMatch = (function(){
        const one = () => {
            firstTurnPlayerOfTheMatch = "one";
            players.playerList.one.setSignX();
            players.playerList.two.setSignY();
        };
        const two = () => {
            firstTurnPlayerOfTheMatch = "two";
            players.playerList.two.setSignX();
            players.playerList.one.setSignY();
        }
        return {one, two}
    })();

    const makeTurn = function(verticalPositionChoice, horizontalPositionChoice){
        if(!gameBoard.getBoardEntry(verticalPositionChoice, horizontalPositionChoice)){
            let turns = players.playerList.one.getTurns() + players.playerList.one.getTurns();
            if(turns == 0){
                if(firstTurnPlayerOfTheMatch == "one"){
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                    players.playerList.one.increaseTurns();
                    lastTurn = "one";
                    return;
                } else if(firstTurnPlayerOfTheMatch == "two"){
                    gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                    players.playerList.two.increaseTurns();
                    lastTurn = "two";
                    return;
                }
            }
            if(lastTurn == "one"){
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.two.getSign());
                players.playerList.two.increaseTurns();
                lastTurn = "two";
                return;
            } else if(lastTurn == "two"){
                gameBoard.setBoardEntry(verticalPositionChoice, horizontalPositionChoice, players.playerList.one.getSign());
                players.playerList.one.increaseTurns();
                lastTurn = "one";
                return;
            }
        }

    };

    return {setFirstTurnPlayerOfTheMatch, makeTurn,};
})();






// Console tests

players.addNewPlayers("Rick", "Tom");
playGame.setFirstTurnPlayerOfTheMatch.one();
console.log({"Player One Sign": players.playerList.one.getSign()});
console.log({"Player Two Sign": players.playerList.two.getSign()});
console.log({"Board": gameBoard.getBoard()});


function testTurn(h, v){
    playGame.makeTurn(h, v);
}

testTurn(0, 2);
testTurn(0, 0);
testTurn(0, 1);
testTurn(1, 2);
testTurn(1, 2);

