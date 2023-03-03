'use strict';
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('DOMContentLoaded', () => {
    timer.innerHTML = `<div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="0"></div>`;
    statusGame.dataset.gameStatus = 'start';
    renderАields();
    renderScore();
});

const counter = document.querySelector('.counter');
const statusGame = document.querySelector('.status__game');
const timer = document.querySelector('.timer');
const gameWrapper = document.querySelector('.game__wrapper');

let gameStatus = false;
let gameScore = 40;
let one = 0;
const gamePull = [];
let time = 0;
let timerStatus = false;

function renderАields() {
    gameWrapper.innerHTML = ''
    const result = [];
    for (let i = 0; i < (16 * 16); i++) {
        let randomKey = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
        if (randomKey === 1) {
            one++;
        }
        gamePull.push(one <= 40 ? randomKey : 0);
        gamePull.sort(() => Math.random() - 0.5);
        gameWrapper.innerHTML += `<div class="game-block" data-status="closed"></div>`;
        var elements = document.querySelectorAll('.game-block');
    }
    for (let i = 0; i < gamePull.length; i += 16) {
        const chunk = gamePull.slice(i, i + 16);
        result.push(chunk);
    }
    addEvenClick(elements, result)
}

function addEvenClick(elements, arr) {
    elements.forEach((item, i) => {
        elements[i].addEventListener('mousedown', (e) => {
            if (gameStatus === false) {
                timerStart();
            }
            if (e.which == 1 && elements[i].dataset.status === 'closed') {
                elements[i].dataset.status = 'open';
                statusGame.dataset.gameStatus = 'click';
                for (let j = 0; j < gamePull.length; j++) {
                    if (j === i && gamePull[j] === 1) {
                        elements[i].dataset.status = 'bomb-boom';
                        stopGame();
                        gameStatus = false
                    }
                    if (j === i && gamePull[j] === 0) {
                        let line = Math.floor(j / (16 * 16) * 16);
                        console.log(line, arr[line]);
                    }
                }
            }
            if (e.which == 3) {
                if (elements[i].dataset.status === 'closed') {
                    elements[i].dataset.status = 'flag';
                    gameScore--;
                } else if (elements[i].dataset.status === 'flag') {
                    elements[i].dataset.status = 'question';
                } else if (elements[i].dataset.status === 'question') {
                    elements[i].dataset.status = 'closed';
                    gameScore++;
                }
                renderScore();
            }
        });

        elements[i].addEventListener('mouseup', (e) => {
            if (statusGame.dataset.gameStatus === 'click' && gameStatus === true) {
                statusGame.dataset.gameStatus = 'start';
            }
            if (gameStatus === false) {
                for (let i = 0; i < gamePull.length; i++) {
                    if (gamePull[i] === 1 && elements[i].dataset.status === 'closed') {
                        elements[i].dataset.status = 'bomb-all';
                    }
                    if (elements[i].dataset.status === 'flag' || elements[i].dataset.status === 'question') {
                        elements[i].dataset.status = 'bomb-found';
                    }
                }
                statusGame.dataset.gameStatus = 'end-game';

            }
        })

    })
}

function startGame() {
    console.log('start game');
}

function stopGame() {
    gameStatus = false;
    timerStatus = false;
    statusGame.dataset.gameStatus = 'end-game';
}

function timerStart() {
    gameStatus = true;
    timerStatus = true;
    const upTime = setInterval(function () {
        const timeArr = time.toString().split('');
        timeArr.forEach((item, i) => {
            if (time < 10) {
                timer.innerHTML = `<div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="${time}"></div>`;
            } else if (time >= 10 && time < 100) {
                timer.innerHTML = `<div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="${time.toString().split('').at(-2)}"></div><div class="timer__wrapper" data-time-number="${time.toString().split('').at(-1)}"></div>`;
            } else {
                timer.innerHTML = `<div class="timer__wrapper" data-time-number="${time.toString().split('').at(-3)}"></div><div class="timer__wrapper" data-time-number="${time.toString().split('').at(-2)}"></div><div class="timer__wrapper" data-time-number="${time.toString().split('').at(-1)}"></div>`;
            }
        })
        time++;
        if (gameStatus === false) {
            clearInterval(upTime);
        }
    }, 1000)
}

function renderScore() {
    const a = gameScore.toString().split('');
    a.forEach((item, i) => {
        counter.innerHTML = `<div class="game__score" data-time-number="0"></div><div class="game__score" data-time-number="${a.at(-2)}"></div><div class="game__score" data-time-number="${a.at(-1)}"></div>`;
    })
}

statusGame.addEventListener('click', (e) => {
    statusGame.dataset.gameStatus = 'start';
    gameStatus = false
    time = 0;
    gameScore = 40;
    renderScore();
    gameWrapper.innerHTML = '';
    renderАields();
    one = 0;
    timer.innerHTML = `<div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="0"></div><div class="timer__wrapper" data-time-number="0"></div>`;
});