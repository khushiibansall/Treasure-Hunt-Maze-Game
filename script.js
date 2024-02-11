let level1= [
    [1,1,1,0,1,0],
    [1,0,1,1,1,1],
    [0,0,1,0,0,0],
    [1,0,1,1,1,1],
    [1,0,1,0,1,0],
    [1,1,1,0,1,1]
]

let level2 = [
    [1,1,1,0,1,0,1,0],
    [1,0,1,1,1,1,1,0],
    [0,0,1,0,0,0,1,0],
    [1,0,1,1,1,0,1,1],
    [1,0,1,0,1,0,1,1],
    [1,1,1,0,1,1,1,0],
    [1,0,1,0,1,0,0,0],
    [1,1,1,0,1,1,1,1]
]

let level3=[
[1,0,0,1,1,1,0,0,0,0],
[1,0,0,1,0,1,1,1,1,1],
[1,1,1,1,0,0,0,0,0,1],
[1,0,0,0,0,1,1,1,1,1],
[1,0,1,1,1,1,0,1,0,1],
[1,0,1,0,0,0,0,1,0,0],
[1,1,1,0,1,0,1,1,0,1],
[1,0,0,0,1,0,0,1,0,1],
[1,0,1,1,1,0,1,1,1,1],
[1,1,1,0,0,0,1,0,0,1]
]

//0 is wall 1 is space and 2 is man
let mazearray= level1;
let Level= document.getElementById("levelselect");
Level.addEventListener("change", function(){
    let level= Level.value;
    if(level ==1){
        mazearray= level1;
    }
    if(level==2){
        mazearray = level2;
    }
    if(level ==3){
        mazearray = level3;
    } 
    maze.innerHTML=`<img src="swordsman.png" id="swordsman" alt="swordsman" width="50px" height="50px">
<img src="treasure (1).png" id="treasure" alt="treasure" width="50px" height="50px">`; 
    createMaze();
})

let maze= document.getElementById("maze-container");
let swordsman= document.getElementById("swordsman");
let treasure= document.getElementById("treasure");

function setSwordsmanPosition(x,y){
    swordsman.style.top= x +"px";
    swordsman.style.left = y + "px";
}
function setTreasurePosition(x,y){
    treasure.style.bottom= x +"px";
    treasure.style.right = y + "px";
}

function createMaze(){
    // maze.innerHTML = "";
    for(let i=0; i<mazearray.length; i++){
        let row= document.createElement("div");
        row.classList.add("row");

        for(let j=0; j<mazearray.length; j++){
            let cell= document.createElement("div");
            cell.classList.add("cell");

       if(mazearray[i][j]==0) {
        cell.classList.add("wall");
       }
       row.appendChild(cell);
       if(i==0 && j==0){
        mazearray[i][j]=2;
       }
    }
    maze.appendChild(row);

    }
    setSwordsmanPosition(0,0);
    setTreasurePosition(0,0);
   
}

function getSwordsmanPosition(){
    let position=[-1,-1];
    for(let i=0; i< mazearray.length; i++){
        for(let j=0; j<mazearray.length; j++){
            if(mazearray[i][j]==2){
                position[0]=i;
                position[1]=j;
                return position;
            }
        }

    }
    return position;
}

document.addEventListener("keydown", function(e){
    let swordsman= document.getElementById("swordsman");
    let treasure= document.getElementById("treasure");
    let swordsmanleft = swordsman.offsetLeft;
    let swordsmantop = swordsman.offsetTop;
    let treasureleft = treasure.offsetLeft;
    let treasuretop = treasure.offsetTop;
    let swordsmanPosition= getSwordsmanPosition();

    if (e.key == "ArrowRight" && swordsmanleft < (mazearray.length - 1) * 50 && mazearray[swordsmanPosition[0]][swordsmanPosition[1] + 1] == 1) {
        swordsmanleft += 50;
        swordsman.style.left = swordsmanleft + "px";
        mazearray[swordsmanPosition[0]][swordsmanPosition[1]] = 1;
        mazearray[swordsmanPosition[0]][swordsmanPosition[1] + 1] = 2;
    }


    if (e.key == "ArrowLeft" && swordsmanleft > 0 && mazearray[swordsmanPosition[0]][swordsmanPosition[1] - 1] == 1) {
        swordsmanleft -= 50;
        swordsman.style.left = swordsmanleft + "px";
        mazearray[swordsmanPosition[0]][swordsmanPosition[1]] = 1;
        mazearray[swordsmanPosition[0]][swordsmanPosition[1] - 1] = 2;
    }

    if (e.key == "ArrowUp" && swordsmantop > 0 && mazearray[swordsmanPosition[0] - 1][swordsmanPosition[1]] == 1) {
        swordsmantop -= 50;
        swordsman.style.top = swordsmantop + "px";
        mazearray[swordsmanPosition[0]][swordsmanPosition[1]] = 1;
        mazearray[swordsmanPosition[0] - 1][swordsmanPosition[1]] = 2;
    }


    if (e.key == "ArrowDown" && swordsmantop < (mazearray.length - 1) * 50 && mazearray[swordsmanPosition[0] + 1][swordsmanPosition[1]] == 1) {
        swordsmantop += 50;
        swordsman.style.top = swordsmantop + "px";
        mazearray[swordsmanPosition[0]][swordsmanPosition[1]] = 1;
        mazearray[swordsmanPosition[0] + 1][swordsmanPosition[1]] = 2;
    }


    if (swordsmanleft == treasureleft && swordsmantop == treasuretop) {
        alert("You Won");
    }
});