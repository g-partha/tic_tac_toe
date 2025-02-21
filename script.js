const players = (function(){
    const createPlayer = function (name){
        let score = 0;
        let sign = "";
        let turns = "";
        let firstTurn = false;
        const getName = () => name;
        const increaseScore = () => score++;
        const getScore = () => score;
        const resetScore = () => score = 0;
        const setSignX = () => sign = "X";
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
    let turns = players.playerList.one.getTurns() + players.playerList.one.getTurns();
    const makeTurn = (function(){
        const setTurn = (player, vertical, horizontal) => {
            if(turns == 0){
                players.playerList[player].setSignX();
                if(player == "one"){
                    players.playerList.two.setSignY();
                } else if(player == "two"){
                    players.playerList.one.setSignY();
                }
            }
            const playerSign = players.playerList[player].getSign();
            gameBoard.setBoardEntry(vertical, horizontal, playerSign);
        }
        const one = (verticalPositionChoice, horizontalPositionChoice) => setTurn("one", verticalPositionChoice, horizontalPositionChoice);
        const two = (verticalPositionChoice, horizontalPositionChoice) => setTurn("two", verticalPositionChoice, horizontalPositionChoice);
        return {one, two};
    })();




    return {makeTurn};
})();






// Console tests

players.addNewPlayers("Rick", "Tom");
playGame.makeTurn.two(2, 1,);
console.log({"Player One Sign": players.playerList.one.getSign()});
console.log({"Player Two Sign": players.playerList.two.getSign()});
console.log({"Board": gameBoard.getBoard()});