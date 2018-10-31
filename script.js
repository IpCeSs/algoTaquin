$(document).ready(function () {
    createHtmlTable(initialCells)
});
let initialCells = [1, 2, 3, 4, 5, 6, 7, 8, ""];
let cells = [1, 7, 3, 4, 5, 6, 2, 8, ""];
/* Get the empty table element that exists in html file */
let table = document.getElementById("jeu");
let row;
let selectedCell;
let difficulty;

/* clicking the button with 'shuffle' id will trigger all events above, 
shuffle the arr and create / removve table with data from the arr*/
function shuffleClick() {
    shuffle(cells);
}

function resolveClick() {
    console.log(difficulty)
    while (initialCells !== cells) {
        moveClick();
    }
}

function moveClick() {
    if (difficulty) {
        let target = event.target; //where was the click
        let emptyCell = parseInt(document.getElementsByClassName('empty')[0].id);
        let autoTarget = emptyCell - 1;

        if (target.tagName !== 'TD') return; // not on TD? Then we're not interested
        if (target) {
            move(target);
            removeTable()
            createHtmlTable(cells)
        } else {
            move(autoTarget);
            removeTable()
            createHtmlTable(cells)
        }

    } else {
        alert('This taquin is not solvable, shuffle again !')
        shuffle(cells)
    }

}

function move(td) {
    let emptyCell = parseInt(document.getElementsByClassName('empty')[0].id);
    selectedCell = parseInt(td.id);
    let diagonal = false;

    if (selectedCell === 2 && emptyCell === 3 ||
        selectedCell === 5 && emptyCell === 6 ||
        selectedCell === 3 && emptyCell === 2 ||
        selectedCell === 6 && emptyCell === 5 ||
        selectedCell === 0 && emptyCell === 8 ||
        selectedCell === 8 && emptyCell === 0 ||
        selectedCell === 0 && emptyCell === 4 ||
        selectedCell === 4 && emptyCell === 0 ||
        selectedCell === 2 && emptyCell === 4 ||
        selectedCell === 4 && emptyCell === 2 ||
        selectedCell === 1 && emptyCell === 3 ||
        selectedCell === 3 && emptyCell === 1 ||
        selectedCell === 1 && emptyCell === 5 ||
        selectedCell === 5 && emptyCell === 1 ||
        selectedCell === 3 && emptyCell === 7 ||
        selectedCell === 7 && emptyCell === 3 ||
        selectedCell === 4 && emptyCell === 6 ||
        selectedCell === 6 && emptyCell === 4 ||
        selectedCell === 4 && emptyCell === 8 ||
        selectedCell === 8 && emptyCell === 4 ||
        selectedCell === 7 && emptyCell === 5 ||
        selectedCell === 5 && emptyCell === 7
    ) {

        diagonal === true
        return diagonal;
    }

    
    if (selectedCell != emptyCell + 1 && selectedCell != emptyCell - 1 && selectedCell != emptyCell + 3 && selectedCell != emptyCell - 3 || diagonal) {

    } else {
        let temp = cells[selectedCell];
        cells[selectedCell] = cells[emptyCell];
        cells[emptyCell] = temp;

    }
    return cells;
}



function shuffle(arr) {
    let counter = arr.length;
    while (counter > 0) {
        let i = Math.floor(Math.random() * counter);
        /* decrement counter to only have numbers one time, once an index is 
        taken into account it is 'removed' */
        counter--;
        /*this is a swap */
        let temp = arr[counter];
        arr[counter] = arr[i];
        arr[i] = temp;
    }
    /* call to difficultyLevel method to determine if 
    taquin is doable returns true or false difficulty*/
    difficultyLevel(arr);

    /**removes table  if exists */
    removeTable();

    if (difficulty) {
        createHtmlTable(arr);
    } else {
        removeTable();
        shuffle(arr)
    }
    console.log(difficulty)

    return arr;
}
/* To calculate difficulty and evalute if a taquin is doable :
 if difficulty level is odd taquin is not doable
 https://www.youtube.com/watch?v=-3IsCOJieCc
*/
function difficultyLevel(arr) {
    let level = 0;
    /* compares cases to evalute level difficulty */
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {

            if (arr[i] > arr[j] && arr[j] !== "" && arr[i] !== "") {
                level++;
            }
        }
    }
    console.log(level)

    /**evaluates if even or odd */
    if (level % 2 === 0) {
        difficulty = true
        return difficulty;
    } else {
        difficulty = false
        return difficulty;
    }

}

/*To create table with taquin numbers */
function createHtmlTable(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0) {

            row = table.insertRow();
        }
        if (arr[i] !== "") {
            let cellule = row.insertCell();
            cellule.innerHTML = arr[i];
            cellule.value = arr[i]
            /* gives td an id matching  i (0 to 8) */
            cellule.id = i;
        } else {
            let cellule = row.insertCell();
            cellule.innerHTML = arr[i];
            cellule.value = arr[i];
            cellule.style = "background-color:lightgrey";
            /* gives td an id matching  i (0 to 8) */
            cellule.id = i;
            cellule.className = 'empty';
        }
    }

}

// /*To remove error messages */
// function removeMessage() {
//     document.getElementById("main").innerHTML = "";
// }

/*To remove table before displaying the newly generated one */
function removeTable() {
    table.innerHTML = "";
}

// /* To display a message if taquin is not doable */
// function badTaquin() {
//     var H2 = document.createElement("H2");
//     H2.style.background = 'grey';
//     H2.style.color = "white";
//     H2.innerHTML = "Shuffle again ! No solution for generated taquin";
//     document.getElementById("main").appendChild(H2);
// }


// function notAuthorizedMove() {
//     var H2no = document.createElement("H2");
//     H2no.style.background = 'grey';
//     H2no.style.color = "white";
//     H2no.innerHTML = "This move is not authorized. You can only move UP/DOWN or LEFT/RIGHT.";
//     document.getElementById("main").appendChild(H2no);
// }