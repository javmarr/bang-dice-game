const MAX_ROLLS = 3
// locks dynamite by default when rolling
const LOCK_DYNAMITE = true;
// what dice face is the dynamite
const DYNAMITE_DICE_FACE = 5; 
var displayedResult = [1, 2, 3, 4, 5];
var rollCount = 0;

const numberOfOccurances = (array, item) => {
    return array.filter((currentItem) => currentItem == item).length;
};

function reset() {
    window.location.reload();
}

function toggleLock(target) {
    // only toggle is the Keep row is shown
    if (!document.getElementById("keepRow").hasAttribute("hidden")) {   
        var lockId = "lock" + target.getAttribute("id").substr(-1);
        document.getElementById(lockId).checked = !document.getElementById(lockId).checked;
    }
}

// remove checkboxes on page load
function resetLocks() {
    var locks = document.getElementsByClassName("lock");
    for (var i = 0; i < locks.length; i++) {
        locks.item(i).checked = false
    }
}

function rollDiceWithRange(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function rollD6() {
    dieRoll = rollDiceWithRange(1, 6);
    // console.log("You rolled: " + dieRoll);
    return dieRoll;
}

function rollDice() {
    if (rollCount >= MAX_ROLLS) {
        console.log("Reched the MAX_ROLLS per turn: " + MAX_ROLLS);
        return;
    }
    for (var i = 0; i < displayedResult.length; i++) {
        // console.log("rolling dice: " + i);

        if (!document.getElementById("lock" + i).checked) {
            dieResult = rollD6();
            displayedResult[i] = dieResult;

            // update images
            document.getElementById("dice" + i).src = "img/" + displayedResult[i] + ".png";

            // BANG special rule: locks dynamite
            if (LOCK_DYNAMITE && dieResult == 5) {
                document.getElementById("lock" + i).checked = true;
            }
        }
    }
    // update rollCount
    rollCount = rollCount + 1;
    document.getElementById("rollCount").textContent = "Roll Number: " + rollCount
    console.log(displayedResult);

    // check if MAX_ROLLS reached or rolled 3+ dynamite
    if (rollCount >= MAX_ROLLS || numberOfOccurances(displayedResult, DYNAMITE_DICE_FACE) >= 3) {
        // show reset button
        document.getElementById("maxRolls").removeAttribute("hidden");
        document.getElementById("resetButton").removeAttribute("hidden");

        // remove roll button
        document.getElementById("rollButton").setAttribute("hidden", "");
    }
    
    // show "Keep" row
    // console.log("count is:" + rollCount);
    if (rollCount > 0) {
        document.getElementById("keepRow").removeAttribute("hidden");
    }

    animateDice();
}

function stopDice() {
    var diceList = document.getElementsByClassName("dice");
    for (var i = 0; i < diceList.length; i++) {
        var diceId = "dice" + i;
        // console.log("stopping:" + diceId);
        document.getElementById("rollButton").removeAttribute("disabled");
        document.getElementById(diceId).setAttribute("class", "dice");
    }
}

function animateDice() {
    var diceList = document.getElementsByClassName("dice");
    for (var i = 0; i < diceList.length; i++) {
        var diceId = "dice" + i;
        if (!document.getElementById("lock" + i).checked) {
            // console.log("moving:" + diceId);
            document.getElementById("rollButton").setAttribute("disabled", "disabled");
            document.getElementById(diceId).setAttribute("class", "dice diceShake");
        }
    }
    setTimeout(stopDice, 500);
}



function getCharacters(playerCount) {
    document.getElementById("characterBox").innerHTML = "";
    if (playerCount>8) {
        alert("Max players is 8");
        return;
    }

    var characters = [
        "Bart Cassidy",
        "Black Jack",
        "Calamity Janet",
        "El Gringo",
        "Jesse Jones",
        "Jourdonnais",
        "Kit Carlson",
        "Lucky Duke",
        "Paul Regret",
        "Pedro Ramirez",
        "Rose Doolan",
        "Sid Ketchum",
        "Slab the Killer",
        "Suzy Lafayette",
        "Vulture Sam",
        "Willy the Kid"
    ]

    var result = [];
    for (var i=0; i<playerCount; i++){
        do {
            character = characters[rollDiceWithRange(0,characters.length-1)];
        } while (result.includes(character));
        result.push(character);
        var characterHtml = document.createElement("li");
        characterHtml.textContent = character;
        document.getElementById("characterBox").appendChild(characterHtml);
    }

    console.log(result);

    return result;
}