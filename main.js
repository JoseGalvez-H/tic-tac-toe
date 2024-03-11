
/*----- constants -----*/
const COLOR_LOOKUP = {
    '1': 'purple',
    '-1': 'red',
    'null': 'white',
};

const winningCombos = [
    [0, 1, 2], //Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //Diagonals
    [2, 4, 6],
];

// const playerNames = {
//     1: 'X',
//     '-1': 'O',
// }

/*----- state variables -----*/
let board;
let winner;
let turn;



/*----- cached elements  -----*/

const messageElement = document.querySelector("h1");
const playAgainBtn = document.querySelector("button");


/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
playAgainBtn.addEventListener('click', initialize);


/*----- functions -----*/

initialize();

function initialize() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    winner = null;
    turn = 1;
    render();
}


function handleMove(evt) {
    const id = evt.target.id;
    const colIndex = parseInt(id.charAt(1));
    const rowIndex = parseInt(id.charAt(3));
    if (isNaN(colIndex) || isNaN(rowIndex) || colIndex < 0 || colIndex >= board.length || rowIndex < 0 || rowIndex >= board[0].length || board[rowIndex][colIndex] !== null || winner) {
        return;
    }
    board[rowIndex][colIndex] = turn;
    winner = null;
    turn *= -1;
    render();
}


function renderBoard() {
    board.forEach(function (sqVal, index) {
        const squareEl = document.getElementById(`sq-${index}`);
        squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
    });
}

function getWinner() {
    for (let winArr of winningCombos) {
        const [a, b, c] = winArr;
        const total = board[a[0]][a[1]] + board[b[0]][b[1]] + board[c[0]][c[1]];

        if (Math.abs(total) === 3) {
            return board[a[0]][a[1]]; 
        }
    }

    if (board.flat().includes(null)) {
        return null;
    }

    return 'T';
}

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() {
    board.forEach(function (row, rowIndex) {
        row.forEach(function (sqVal, colIndex) {
            const squareEl = document.getElementById(`c${colIndex}r${rowIndex}`);
            squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
        });
    });
}

function renderMessage() {
    if (winner === 'T') {
        messageElement.innerHTML = 'Rats, another tie!';
    } else if (winner) {
        messageElement.innerHTML = `Congrats <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
    } else {
        messageElement.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
    }
}
