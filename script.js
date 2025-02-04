document.addEventListener("DOMContentLoaded", function () {
    const colorBox = document.getElementById("colorBox");
    const gameStatus = document.getElementById("gameStatus");
    const colorButtons = Array.from(document.querySelectorAll(".color-btn"));
    const scoreDisplay = document.getElementById("score");
    const newGameButton = document.getElementById("newGameButton");
    const hintButton = document.getElementById("hintButton");

    let colors = [];
    let targetColor;
    let score = 0;

    function getRandomColor() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    function startGame() {
        colors = [];

        for (let i = 0; i < 6; i++) {
            colors.push(getRandomColor());
        }

        targetColor = colors[Math.floor(Math.random() * colors.length)]; // ✅ Fix here


        colorButtons.forEach((btn, index) => {
            btn.style.backgroundColor = colors[index];
            btn.dataset.color = colors[index];

            btn.onclick = function () {
                checkGuess(btn.dataset.color);
            };
        });

        gameStatus.textContent = "Make a guess!";
    }

    function checkGuess(selectedColor) {
        if (selectedColor === targetColor) {
            gameStatus.textContent = "✅ Correct!";
            score++;
        } else {
            gameStatus.textContent = "❌ Wrong! Try again.";
        }

        scoreDisplay.textContent = "Score: " + score;
    }

    function giveHint() {
        if (!targetColor) {
            gameStatus.textContent = "Start a game first!";
            return;
        }

        let matchResult = targetColor.match(/\d+/g);
        if (!matchResult) {
            gameStatus.textContent = "Hint: Cannot determine the color.";
            return;
        }

        let [r, g, b] = matchResult.map(Number);

        if (r > g && r > b) {
            gameStatus.textContent = "Hint: The color is **Reddish** 🔴";
        } else if (g > r && g > b) {
            gameStatus.textContent = "Hint: The color is **Greenish** 🟢";
        } else if (b > r && b > g) {
            gameStatus.textContent = "Hint: The color is **Bluish** 🔵";
        } else {
            gameStatus.textContent = "Hint: The color is a mix!";
        }
    }

    newGameButton.addEventListener("click", startGame);
    hintButton.addEventListener("click", giveHint);

    startGame();
});
