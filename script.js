// ==========================
// TYPING MASTER PRO
// ==========================

const sentences = [
    "Python makes coding fun and easy for everyone",
    "Practice typing daily to improve your keyboard speed",
    "Learning new skills requires patience focus and effort",
    "Technology changes rapidly and creates exciting opportunities",
    "Good programmers write clean code with proper structure",
    "Success comes through hard work dedication and consistency"
];

let currentSentence = "";
let startTime = 0;

// Elements

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const sentenceBox = document.getElementById("sentenceBox");
const typingInput = document.getElementById("typingInput");
const playerName = document.getElementById("playerName");

const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const timeTakenText = document.getElementById("timeTaken");

const highScoreText = document.getElementById("highScore");

const totalTestsText = document.getElementById("totalTests");
const avgWpmText = document.getElementById("avgWpm");
const bestAccuracyText = document.getElementById("bestAccuracy");

const leaderboard = document.getElementById("leaderboard");

const themeSelector = document.getElementById("themeSelector");
const modeSelector =
document.getElementById("gameMode");

const gameArea =
document.getElementById("gameArea");
// ==========================
// START TEST
// ==========================
startBtn.addEventListener("click", () => {

    let mode =
    modeSelector.value;

    if(mode === "classic"){
        startClassic();
    }

    if(mode === "falling"){
        startFallingMode();
    }

    if(mode === "survival"){
        startSurvivalMode();
    }

    if(mode === "zombie"){
        startZombieMode();
    }

});

// ==========================
// SUBMIT TEST
// ========================

submitBtn.addEventListener("click", () => {

    if (!currentSentence) {
        alert("Start a test first.");
        return;
    }

    const typed = typingInput.value;

    const endTime = Date.now();

    const seconds = (endTime - startTime) / 1000;

    const minutes = seconds / 60;

    const words = currentSentence.split(" ").length;

    const wpm = Math.round(words / minutes);

    let correct = 0;

    for (
        let i = 0;
        i < Math.min(
            typed.length,
            currentSentence.length
        );
        i++
    ) {
        if (typed[i] === currentSentence[i]) {
            correct++;
        }
    }

    const accuracy =
        (correct / currentSentence.length) * 100;

    wpmText.textContent = wpm;
    accuracyText.textContent =
        accuracy.toFixed(2) + "%";
    timeTakenText.textContent =
        seconds.toFixed(2) + "s";

    const name =
        playerName.value.trim() || "Anonymous";

    saveResult(name, wpm, accuracy);

    loadLeaderboard();
    loadStats();
    loadHighScore();
});

// ==========================
// SAVE RESULT
// ==========================

function saveResult(name, wpm, accuracy) {

    let data =
        JSON.parse(
            localStorage.getItem("typingResults")
        ) || [];

    data.push({
        name,
        wpm,
        accuracy
    });

    localStorage.setItem(
        "typingResults",
        JSON.stringify(data)
    );
}

// ==========================
// HIGH SCORE
// ==========================

function loadHighScore() {

    let data =
        JSON.parse(
            localStorage.getItem("typingResults")
        ) || [];

    if (data.length === 0) {
        highScoreText.textContent =
            "No Record Yet";
        return;
    }

    let best =
        data.reduce((a, b) =>
            a.wpm > b.wpm ? a : b
        );

    highScoreText.textContent =
        `${best.name} - ${best.wpm} WPM`;
}

// ==========================
// LEADERBOARD
// ==========================

function loadLeaderboard() {

    let data =
        JSON.parse(
            localStorage.getItem("typingResults")
        ) || [];

    leaderboard.innerHTML = "";

    data.sort((a, b) => b.wpm - a.wpm);

    data.slice(0, 10).forEach(player => {

        const li =
            document.createElement("li");

        li.textContent =
            `${player.name} - ${player.wpm} WPM`;

        leaderboard.appendChild(li);
    });
}

// ==========================
// STATS
// ==========================

function loadStats() {

    let data =
        JSON.parse(
            localStorage.getItem("typingResults")
        ) || [];

    if (data.length === 0) return;

    totalTestsText.textContent =
        data.length;

    let totalWpm =
        data.reduce(
            (sum, item) => sum + item.wpm,
            0
        );

    avgWpmText.textContent =
        (totalWpm / data.length).toFixed(1);

    let bestAccuracy =
        Math.max(
            ...data.map(
                item => item.accuracy
            )
        );

    bestAccuracyText.textContent =
        bestAccuracy.toFixed(2) + "%";
}

// ==========================
// THEMES
// ==========================

themeSelector.addEventListener(
    "change",
    () => {

        document.body.classList.remove(
            "dark",
            "neon",
            "hacker"
        );

        if (
            themeSelector.value === "neon"
        ) {
            document.body.classList.add(
                "neon"
            );
        }

        if (
            themeSelector.value === "hacker"
        ) {
            document.body.classList.add(
                "hacker"
            );
        }
    }
);

// ==========================
// LOAD DATA
// ==========================

loadHighScore();
loadLeaderboard();
loadStats();
function startClassic(){

    currentSentence =
    sentences[Math.floor(
    Math.random()*sentences.length)];

    sentenceBox.textContent =
    currentSentence;

    typingInput.value = "";

    startTime = Date.now();
}

function startFallingMode(){

    gameArea.innerHTML = "";

    let word = "Python";

    let div =
    document.createElement("div");

    div.className =
    "falling-word";

    div.innerText = word;

    div.style.left = "100px";

    gameArea.appendChild(div);

    let y = 0;

    let fall = setInterval(()=>{

        y += 3;

        div.style.top =
        y + "px";

        if(y > 350){

            clearInterval(fall);

            alert("Missed Word!");

        }

    },30);

}

function startSurvivalMode(){

    alert(
    "❤️ Survival Mode Started"
    );

    startClassic();

}

function startZombieMode(){

    gameArea.innerHTML = "";

    let zombie =
    document.createElement("div");

    zombie.className =
    "zombie";

    zombie.innerText =
    "🧟 Python";

    zombie.style.left =
    "0px";

    zombie.style.top =
    "180px";

    gameArea.appendChild(zombie);

    let x = 0;

    let move = setInterval(()=>{

        x += 2;

        zombie.style.left =
        x + "px";

        if(x > 320){

            clearInterval(move);

            alert(
            "Zombie Reached Base!"
            );

        }

    },30);

}
