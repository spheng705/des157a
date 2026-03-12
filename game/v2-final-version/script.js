(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        // --- audio ---
        const toastSound = new Audio('audio/toaster.mp3');
        const winSound = new Audio('audio/bell.mp3');

        // --- game state ---
        let p1Char = null;
        let p2Char = null;
        let currentPlayer = 1;
        let scores = { p1: 0, p2: 0 };
        let currentHeat = 0;
        let mustRollAgain = false; 

        const mainBread = document.getElementById('main-bread-assets');
        const titleLayer = document.querySelector('.title-layer');
        const charOverlay = document.getElementById('character-overlay');
        const gameLayout = document.querySelector('.layout');
        const rulesOverlay = document.getElementById('rules-overlay');

        // dice elements
        const die1Img = document.getElementById('die1-img');
        const die2Img = document.getElementById('die2-img');
        const dicePlaceholder = document.getElementById('dice-placeholder');

        // buttons
        const rollBtn = document.getElementById('roll-btn');
        const stopBtn = document.getElementById('stop-btn');
        const startBtn = document.querySelector('.start-btn');
        const doneBtn = document.getElementById('done-btn');

        // rules overlays
        document.querySelector('.rules-btn').onclick = () => rulesOverlay.classList.remove('hidden');
        document.getElementById('ingame-rules-btn').onclick = () => rulesOverlay.classList.remove('hidden');
        document.getElementById('close-rules').onclick = () => rulesOverlay.classList.add('hidden');

        // open character select
        startBtn.onclick = () => charOverlay.classList.remove('hidden');

        // character selection
        document.querySelectorAll('.character-grid img').forEach(img => {
            img.addEventListener('click', () => {
                const name = img.getAttribute('data-name');
                if (!p1Char) {
                    p1Char = name;
                    img.classList.add('is-selected');
                    document.getElementById('p1-choice').textContent = `Player 1: ${name}`;
                } else if (!p2Char && name !== p1Char) {
                    p2Char = name;
                    img.classList.add('is-selected');
                    document.getElementById('p2-choice').textContent = `Player 2: ${name}`;
                }
            });
        });

        // done + start game
        doneBtn.addEventListener('click', () => {
            if (p1Char && p2Char) {
                currentPlayer = Math.random() < 0.5 ? 1 : 2;
                if (mainBread) mainBread.classList.add('hidden');
                titleLayer.classList.add('hidden');
                charOverlay.classList.add('hidden');
                document.querySelector('.rules-btn').classList.add('hidden');
                gameLayout.classList.remove('hidden');
                updateUI();
                showMessage(`${currentPlayer === 1 ? p1Char : p2Char} goes first!`);
            } else {
                alert("Both players must pick their bread!");
            }
        });

        const updateUI = () => {
            document.getElementById('p1-total').textContent = scores.p1;
            document.getElementById('p2-total').textContent = scores.p2;
            document.getElementById('p1-heat').textContent = `+${currentPlayer === 1 ? currentHeat : 0}`;
            document.getElementById('p2-heat').textContent = `+${currentPlayer === 2 ? currentHeat : 0}`;
            document.querySelector('.p1-side').classList.toggle('active', currentPlayer === 1);
            document.querySelector('.p2-side').classList.toggle('active', currentPlayer === 2);
            document.getElementById('turn-indicator').textContent =
                `Turn: ${currentPlayer === 1 ? p1Char : p2Char}`;
            stopBtn.disabled = mustRollAgain;
        };

        const showMessage = (msg) => {
            const msgEl = document.getElementById('game-message');
            if (msgEl) {
                msgEl.textContent = msg;
                msgEl.classList.remove('hidden');
            }
        };

        const hideDice = () => {
            die1Img.classList.add('hidden');
            die2Img.classList.add('hidden');
            dicePlaceholder.classList.remove('hidden');
        };

        const showDice = (roll1, roll2) => {
            dicePlaceholder.classList.add('hidden');
            die1Img.src = `images/Dice%20${roll1}.svg`;
            die2Img.src = `images/Dice%20${roll2}.svg`;
            die1Img.classList.remove('hidden');
            die2Img.classList.remove('hidden');
        };


        const rollDice = () => {

            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            const rollSum = roll1 + roll2;

            showDice(roll1, roll2);

            if (rollSum === 2) {
                scores[currentPlayer === 1 ? 'p1' : 'p2'] = 0;
                currentHeat = 0;
                mustRollAgain = false;
                showMessage("Butter eyes! Your score is zeroed out!");
                rollBtn.disabled = true;
                stopBtn.disabled = true;
                setTimeout(() => {
                    switchPlayer();
                    rollBtn.disabled = false;
                    updateUI();
                    showMessage(`${currentPlayer === 1 ? p1Char : p2Char}'s turn!`);
                }, 2000);
            } else if (roll1 === 1 || roll2 === 1) {
                currentHeat = 0;
                mustRollAgain = false;
                const nextName = currentPlayer === 1 ? p2Char : p1Char;
                showMessage(` A one came up so no points! Switching to ${nextName}...`);
                rollBtn.disabled = true;
                stopBtn.disabled = true;
                setTimeout(() => {
                    switchPlayer();
                    rollBtn.disabled = false;
                    updateUI();
                    showMessage(`${currentPlayer === 1 ? p1Char : p2Char}'s turn!`);
                }, 2000);
            } else {
                currentHeat += rollSum;
                mustRollAgain = false;
                showMessage(`Rolled ${roll1} + ${roll2} = ${rollSum}. Heat: +${currentHeat}`);
                const totalIfStop = scores[currentPlayer === 1 ? 'p1' : 'p2'] + currentHeat;
                if (totalIfStop >= 50) {
                    endTurn();
                    return;
                }
                updateUI();
            }
        };

        const endTurn = () => {
            const key = currentPlayer === 1 ? 'p1' : 'p2';
            scores[key] += currentHeat;

            if (scores[key] >= 50) {
                // play bell on win
                winSound.play();

                const winner = currentPlayer === 1 ? p1Char : p2Char;
                updateUI();
                showMessage(`🍞 PERFECTLY TOASTED! ${winner} wins with ${scores[key]} points!`);
                rollBtn.disabled = true;
                stopBtn.disabled = true;
                document.getElementById('restart-btn').classList.remove('hidden');
                return;
            }

            // play toaster sound
            toastSound.currentTime = 0.5; 
            toastSound.play();

            currentHeat = 0;
            mustRollAgain = false;
            switchPlayer();
            hideDice();
            updateUI();
            showMessage(`${currentPlayer === 1 ? p1Char : p2Char}'s turn!`);
        };

        const switchPlayer = () => {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        };

        rollBtn.onclick = rollDice;
        stopBtn.onclick = () => endTurn();

        document.getElementById('restart-btn').addEventListener('click', () => {
            location.reload();
        });
    });
})();