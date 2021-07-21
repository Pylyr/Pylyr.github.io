var corners = [];
var instructions;
var button;
var time = 0;

function InstructionsFade(time){
    setTimeout(function(){
        instructions.classList.remove("fade-in");
        instructions.classList.add("fade-out");
    }, time);
}

function turnInstruction(inp, turn){
    let conver = {1:4, 2:5, 3:12, 4:13, 5:14, 6:11, 7:6, 8:3, 9:2, 10:7, 11:10, 12:15, 13:16, 14:9, 15:8, 16:1};
    for (let i = 1; i <= turn; i++){
        for (let j = 0; j <= 15; j++){
            inp[j] = conver[inp[j]];
        }
    }
    return inp;
}  

function startGame(){
    instructions = document.getElementById("instructions");
    button = document.getElementById("start-btn");
    button.style.display = "none";
    for (let i = 1; i <= 16; i++){
        setTimeout(function(){document.getElementById("st" + i).classList.add("fade-in")}, 100 + 50 * i);
    }

    if (window.innerWidth < 1000) {
        document.getElementById("game-container").classList.add("move-down-mobile");}
    else {
        document.getElementById("game-container").classList.add("move-down");}

    var topLeftCorner = document.getElementById("st1");
    var topRightCorner = document.getElementById("st4");
    var bottomLeftCorner = document.getElementById("st16");
    var bottomRightCorner = document.getElementById("st13");
    corners = [topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner];
    time = 0

    time += 1300;
    setTimeout(function(){
        instructions.style.visibility = "visible";
        instructions.classList.add("fade-in");
    }, time);

    time += 2000;
    InstructionsFade(time);

    time += 1000;
    setTimeout(function(){
        instructions.classList.remove("fade-out");
        instructions.innerHTML = "Every turn you can move left, right, up or down.";
        instructions.classList.add("fade-in");
    }, time);

    time += 2500;
    InstructionsFade(time);

    time += 1000;
    setTimeout(function(){
        instructions.classList.remove("fade-out");
        instructions.innerHTML = "You may go over the same cards, but not move diagonally.";
        instructions.classList.add("fade-in");
    }, time);

    time += 2500;
    InstructionsFade(time);

    time += 1000;
    setTimeout(function(){
        instructions.classList.remove("fade-out");
        instructions.innerHTML = "No need to press anything, just follow with your eyes.";
        instructions.classList.add("fade-in");
    }, time);

    time += 2500;
    InstructionsFade(time);

    time += 1400;
    setTimeout(function(){ newGame() }, time);
}

function newGame(){

    time = 0;
    instructions.classList.remove("fade-out");
    instructions.innerHTML = "Now choose on any one of the 4 corners where you want to begin.";
    instructions.classList.add("fade-in");

    setTimeout(function(){
        for (let i = 0; i < 4; i++){
            corners[i].src = "greensticker.png";
            corners[i].style.pointerEvents = "auto";
            corners[i].onclick = function() { selectCorner(i) };
        };
    }, time);
}

function selectCorner(sel){
    var time = 0;

    for (let i = 0; i < 4; i++){
        corners[i].src = "yellowsticker.png";
        corners[i].style.pointerEvents = "none";
        corners[i].onclick = function(){};
    }

    InstructionsFade(time);

    let listOfPaths = [
                    [[1, 9, 5, 16, 4, 15, 3, 13, 14, 12, 2, 11, 8, 6, 7], [1, 6, 4, 5, 2, 1, 4, 2, 5, 4, 2, 3, 5, 2, 1]],
                    [[1, 12, 4, 16, 13, 2, 14, 5, 3, 15, 10, 11, 9, 6, 7], [1, 5, 4, 2, 1, 3, 4, 1, 2, 4, 1, 3, 2, 1, 1]],
                    [[1, 8, 13, 5, 4, 2, 15, 14, 12, 16, 9, 7, 10, 11, 6], [1, 7, 5, 2, 3, 4, 5, 3, 2, 4, 3, 4, 3, 1, 1]],
                    [[1, 15, 2, 12, 16, 13, 9, 14, 3, 11, 8, 10, 7, 4, 5], [1, 4, 7, 6, 4, 5, 6, 3, 1, 2, 5, 4, 3, 1, 1]],
                    ];

    [disappear, moves] = listOfPaths[Math.floor(Math.random()*listOfPaths.length)];
    disappear = turnInstruction(disappear, sel);
    let wordMove;
    time += 800;
    
    for (let i = 0; i < 15; i++){

        time += 800;

        setTimeout(function(){
            instructions.classList.remove("fade-out");
            wordMove = (moves[i] > 1) ? "moves" : "move";
            instructions.innerHTML = `Make ${moves[i]} ${wordMove} now.`;
            instructions.classList.add("fade-in");
        }, time);
        
        time += 1500 + 250 * moves[i];

        InstructionsFade(time);
        setTimeout(function(){document.getElementById("st" + disappear[i]).classList.add("fade-out");}, time);
    }

    time += 1200;
    setTimeout(function(){
        instructions.classList.remove("fade-out");
        instructions.classList.add("fade-in");
        instructions.innerHTML = "Is this your card? Knew it :)";
    }, time)

    time += 1000;
    setTimeout(function(){
        button.innerHTML = "Try Again"
        button.style.display = "block";
        button.classList.add("fade-in");
        button.onclick = function() { 
            time = 0;
            // button.style.display = "none";
            // for (let i = 1; i <= 16; i++){
            //     time += 50;
            //     setTimeout(function(){
            //         document.getElementById("st" + i).classList.remove("fade-out");
            //         document.getElementById("st" + i).classList.add("fade-in")}, time);
            // }
            // time += 400;
            setTimeout(function(){ location.reload(); return false; }, time) };
    }, time)
}

