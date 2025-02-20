const createPlayer = function (name){
        let score = 0;
        const getName = () => name;
        const increaseScore = () => score++;
        const getScore = () => score;
        return {getName, increaseScore, getScore};
    }

const player1 = createPlayer("Ram");
const player2 = createPlayer("Shyam");

const gameBoard = (function(){
    const board = 
})