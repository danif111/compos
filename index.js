window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isActive = true;
    let score1 = 0
    let score2 = 0

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    const winConditons = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var totalTime = 179;
    setInterval(setTime, 1000);

    function setTime() {
        --totalTime;
        document.getElementById("sec").innerHTML =sandBox(totalTime % 60)
        document.getElementById("min").innerHTML =sandBox(parseInt(totalTime / 60))
        if(totalTime==0){
            document.querySelector('.background').classList.add('hide');
            document.querySelector('.winner').classList.remove('hide');
            if (score1 < score2){
                document.querySelector('.winner').innerHTML = "player O Won "+ score1+"/"+score2;
            }else
            {
                document.querySelector('.winner').innerHTML = "player X Won "+ score1+"/"+score2;
            }
        }
    }

    function sandBox(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
    function handleValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winConditons[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                score2++;
                document.getElementById("player2").innerHTML =score2;
                resetBoard();
                break;
            case PLAYERX_WON:
                score1++;
                document.getElementById("player1").innerHTML =score1;
                resetBoard();
                break;
            case TIE:
                resetBoard();
        }
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isActive = true;

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

        document.querySelector('.message').classList.add('hide');
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

});