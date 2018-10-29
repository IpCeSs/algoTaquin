let cases = [1, 2, 3, 4, 5, 6, 7, 8, ""];
/* Get the empty table element that exists in html file */
let table = document.getElementById("jeu");
let row;
/* tableExists is used to check if a table already exists with values*/
let tableExists = false;

let difficulty;

/* clicking the button with 'shuffle' id will trigger all events above, 
shuffle the arr and create / removve table with data from the arr*/
function onClick() {
    document.getElementById("shuffle").addEventListener("click",shuffle(cases));
 }

 function shuffle(arr) {
    let counter = arr.length;
    while (counter > 0) {
        let i = Math.floor(Math.random() * counter);
        counter--;
        /*this is a swap */
        let temp = arr[counter];
        arr[counter] = arr[i];
        arr[i] = temp;
    }
        /* call to difficultyLevel method to determine if 
        taquin is doable returns true or false difficulty*/
        difficultyLevel(arr);

        /**removes badTaquin message if exists */
        removeBadTaquin()
        /**removes table  if exists */
        removeTable();
        
        if (difficulty) {
                createHtmlTable(arr);
        } else {
            badTaquin()
            createHtmlTable(arr);
        }
        console.log(difficulty)
    
    return arr;
 }
/* To calculate difficulty and evalute if a taquin is doable :
 if difficulty level is odd taquin is not doable
 https://www.youtube.com/watch?v=-3IsCOJieCc
*/
function difficultyLevel(arr){
    let level = 0;
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i + 1; j <= arr.length; j++) {
            
            if (arr[i] < arr[j]) {
                j++;
            } else {
                level++;
                j++
            } 
        }
    }
    console.log(level)
    if (level % 2 === 0) {
        difficulty = true
        return difficulty;
    } else {
        difficulty = false
        return difficulty;
    }
    
}

function createHtmlTable(arr) {
  for( let i = 0 ; i < arr.length ; i++) {
      if(i % 3 === 0) {
          
        row = table.insertRow();
      }
       let cellule = row.insertCell();
       cellule.innerHTML = arr[i];
  }
  tableExists = true;
  return tableExists;
}

function removeBadTaquin(){
    document.getElementById("main").innerHTML = "";
}

function removeTable()
   {
       table.innerHTML = "";
   }

function badTaquin() {
var H2 = document.createElement("H2");
H2.style.background = 'grey';
H2.style.color = "white";
H2.innerHTML = "Shuffle again ! No solution for generated taquin";

document.getElementById("main").appendChild(H2);
}



