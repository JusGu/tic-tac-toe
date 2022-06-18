const tiles = document.querySelectorAll(".tile");
const display = document.querySelector("p");

const board = (() => {
    const state = [
        [-1,-1,-1], // 1, 2, 3,
        [-1,-1,-1], // 4, 5, 6,
        [-1,-1,-1]  // 7, 8, 9
    ]
    let curPlayer = 1; // 0 for O and 1 for X
    let won = false;
    const switchPlayer = () => {
        if(curPlayer == 0){
            display.innerHTML = "<b>Player 1</b>'s turn"
            curPlayer = 1;
        } else if (curPlayer == 1){
            curPlayer = 0;
            display.innerHTML = "<b>Player 2</b>'s turn"
        }
    }
    // detects if there is a game winner
    const win = (i , j) => {
        if(state[i][0] == state[i][1] && state[i][0] == state[i][2]){ // check if column are the same
            tiles[0 + i*3].classList.add('won');
            tiles[1 + i*3].classList.add('won');
            tiles[2 + i*3].classList.add('won');
            return true;
        } else if (state[0][j] == state[1][j] && state[0][j] == state[2][j]){
            tiles[0 + j].classList.add('won');
            tiles[3 + j].classList.add('won');
            tiles[6 + j].classList.add('won');
            return true;
        } else if ((i == 0 && j == 0) || (i == 0 && j == 2) || (i == 2 && j == 0) || (i == 2 && j == 2) || (i == 1 && j == 1)) {
            if (state[0][0] !== -1 && state[0][0] == state[1][1] && state[0][0] == state[2][2]){
                tiles[0].classList.add('won');
                tiles[4].classList.add('won');
                tiles[8].classList.add('won');

                return true;
            } else if (state[0][2] !== -1 && state[0][2] == state[1][1] && state[0][2] == state[2][0]){
                tiles[2].classList.add('won');
                tiles[4].classList.add('won');
                tiles[6].classList.add('won');
                return true;
            }
        } else {
            return false;
        }
    }
    const add = (a) => {
        let tileNum = a - 1;
        if(tileNum == -1 || won){
            return;
        }
        let i = Math.floor((tileNum)/3);
        let j = (tileNum)%3;
        console.log(tileNum);
        if(state[i][j] == -1){
            state[i][j] = curPlayer;

            let marker = null;
            if(!curPlayer){
                marker = 'O';
            } else {
                marker = 'X'
            }
            const beforeStyle = "opacity: 0; visible: none; transform: scale(1.2); transition: 0.3s ease all";
            tiles[tileNum].innerHTML = `<div class="marker" style="${beforeStyle}">${marker}</div>`;
            const afterStyle = "opacity: 1; visible: visible; transform: scale(1); transition: 0.3s ease all";
            setTimeout(function() {
                tiles[tileNum].firstChild.style = afterStyle;
                tiles[tileNum].classList.add('pressed');
              }, 0);
            won = win(i, j);
            if(won){
                if(curPlayer == 0){
                    display.innerHTML = "<b>Player 2</b> wins!"
                    curPlayer = 1;
                } else if (curPlayer == 1){
                    curPlayer = 0;
                    display.innerHTML = "<b>Player 1</b> wins!"
                }
            } else {
                switchPlayer();
            }
            
        }

        console.log(state);
    }

    const reset = () => {
        won = false;
        for(let i = 0; i < tiles.length; i++){
            const tile = tiles[i];
            tile.classList.remove('won');
            tile.classList.remove('pressed');
            tile.innerHTML = '<div></div>'
        }
        for(let i = 0; i < state.length ;i++){
            state[i][1] = -1;
            state[i][2] = -1;
            state[i][0] = -1;
        }
        display.innerHTML = "<b>Player 1</b>'s turn"
        curPlayer = 1;
    }
    return {
        add,
        reset
    }
})();

tiles.forEach(tile => {
    tile.addEventListener('click', e => board.add(e.target.id))
})

