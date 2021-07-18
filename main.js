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
            corners[i].onclick = function() { selectCorner(i) };
        };
    }, time);
}

function selectCorner(sel){
    var time = 0;

    for (let i = 0; i < 4; i++){
        corners[i].src = "yellowsticker.png";
        corners[i].onclick = function(){};
    }

    InstructionsFade(time);


    let disappear = [1, 12, 4, 16, 13, 2, 14, 5, 3, 15, 10, 11, 9, 6, 7]; 
    let moves = [1, 5, 4, 4, 1, 3, 4, 1, 2, 4, 1, 3, 2, 1, 1];
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
            button.style.display = "none";
            for (let i = 1; i <= 16; i++){
                time += 50;
                setTimeout(function(){
                    document.getElementById("st" + i).classList.remove("fade-out");
                    document.getElementById("st" + i).classList.add("fade-in")}, time);
            }
            time += 400;
            setTimeout(function(){ newGame() }, time) };
    }, time)
}

