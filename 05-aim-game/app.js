const startBtn = document.querySelector('#start'),
 screens = document.querySelectorAll('.screen'),
 timeList = document.querySelector('#time-list'),
 timeEl = document.querySelector('#time'),
 board = document.querySelector('#board'),
 lastEl = document.querySelector('#last-score'),
 bestEl = document.querySelector('#best-score-info'),
 gameEl = document.querySelector('#play-count'),
 playSpeedEl = document.querySelector('#play-speed')

 let time = 0,
 score = 0,
 timeReady = 3,
 check = false,
 lifeTime = 9000,
 bestScore = 0,
 lastScore = 0,
 playCount = 0,
 currentMode = 0

const playMode = {
 mode5: {lastScore: 0, bestScore: 0, playCount: 0},
 mode11: {lastScore: 0, bestScore: 0, playCount: 0},
 mode14: {lastScore: 0, bestScore: 0, playCount: 0},
 mode19: {lastScore: 0, bestScore: 0, playCount: 0},
 mode15: {lastScore: 0, bestScore: 0, playCount: 0},
}

startBtn.addEventListener('click', event => {
 event.preventDefault()
 screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
 if(event.target.classList.contains('time-btn')){
     time = parseInt(event.target.getAttribute('data-time'))
     currentMode = time
     score = 0
     timeReady = 3
     screens[1].classList.add('up')
     ready()
     startGame()
 }
})

function startGame(){
 bestScore = playMode[`mode${currentMode}`].bestScore
 lastScore = playMode[`mode${currentMode}`].lastScore
 playCount = playMode[`mode${currentMode}`].playCount
 lastEl.innerHTML = playMode[`mode${currentMode}`].lastScore
 bestEl.innerHTML = playMode[`mode${currentMode}`].bestScore
 gameEl.innerHTML = playMode[`mode${currentMode}`].playCount
 playSpeedEl.innerHTML = `${currentMode}`

 timeEl.parentNode.classList.remove('hide')
 currentMode < 10 ? setTime(`0${currentMode}`) : setTime(currentMode)
 setTimeout(decreaseTime, 3000)
//  createRandomCircle()
 setTime(currentMode)
 if (currentMode === 15) {cheatTheGame()
 } 
}

board.addEventListener('click', event => {
 if(event.target.classList.contains('circle')){
     score++
     event.target.remove()
     check = true
     createRandomCircle()
 }
})

board.addEventListener('click', event => {
 if(event.target.classList.contains('new-game')){
     screens[1].classList.remove('up')
     playCount = playMode[`mode${currentMode}`].playCount
 }
})

function circleInterval(){
 const newCircleInterval = setInterval(() => {
     const circle = document.querySelector('.circle')
     if(circle){
         if(check){
             check = false
             clearInterval(newCircleInterval)
             circleInterval()
         } else {
             board.innerHTML = ''
             createRandomCircle()
         }
     } else {
         clearInterval(newCircleInterval)
     }

 },lifeTime)
}

function ready(){
 board.innerHTML = `<h1>${timeReady}</h1>`
 const readyInterval = setInterval(() => {
     if(timeReady === 1){
         clearInterval(readyInterval)
         board.innerHTML = ''
     } else {
         --timeReady
         board.innerHTML = `<h1>${timeReady}</h1>`
     }
 }, 1000)
}

function decreaseTime(){
 createRandomCircle()
 const interval = setInterval(() => {
     if(time === 0){
         clearInterval(interval)
         finishGame()
     } else {
         let current = --time
         if(current < 10){
             current = `0${current}`
         }
         setTime(current)
     }
 }, 1000)
 circleInterval()
}

function finishGame(){
 if(score > bestScore){
     bestScore = score
 }
 lastScore = score
 playCount++
 timeEl.parentNode.classList.add('hide')
 board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1><p class="bestScore">Ваш лучший результат: ${bestScore}</p><hr><a class="new-game">Начать новую игру</a>`
 bestEl.innerHTML = `${bestScore}`
 gameEl.innerHTML = `${playCount}`

 playMode[`mode${currentMode}`].lastScore = lastScore
 playMode[`mode${currentMode}`].bestScore = bestScore
 playMode[`mode${currentMode}`].playCount = playCount

//  console.log(playMode)
}

function createRandomCircle () {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    setColor(circle)
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(circle) {
const color = '#'+ getRandomIntInclusive().toString(16)
// console.log(color)
circle.style.background = color
circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomIntInclusive(xx, yy) {
    xx = Math.ceil(0x100000);
    yy = Math.floor(0xffffff);
    return Math.floor(Math.random() * (xx - yy + 1)) + yy;
}

function setTime (value) {
    timeEl.innerHTML = `00:${value}`
}

function cheatTheGame () {
    function cheat() {
    const circle = document.querySelector('.circle')    
    if (circle) {
        circle.click()
    }
}
    setInterval(cheat, 100)
}