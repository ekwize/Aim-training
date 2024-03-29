const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')
const scoreElement = document.querySelector('#score')
const colors = ['#00FFFF', '#E0FFFF', '#AFEEEE', '#7FFFD4',
'#40E0D0', '#48D1CC', '#00CED1', '#5F9EA0',
'#4682B4', '#B0C4DE', '#B0E0E6', '#ADD8E6', 
'#87CEEB', '#87CEFA', '#00BFFF', '#1E90FF',
'#6495ED', '#7B68EE', '#4169E1', '#0000FF', 
'#0000CD', '#00008B', '#000080', '#191970']


let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = event.target.getAttribute('data-time')
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        setScore(score)
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === "Never") {
        return
    } else {
        time = parseInt(time)
        if (time === 0) {
            finishGame()
        } else {
            let currentTime = --time
            if (currentTime < 10) {
                currentTime = `0${currentTime}`
            }
            setTime(currentTime)
        }
    }
}

function setScore(score) {
    scoreElement.textContent = score
}

function setTime(value) {
    if (value === "Never") {
        timeElement.parentElement.remove()
    }
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    timeElement.parentElement.parentElement.classList.add('hide')
}

function createRandomCircle() {
    size = 50
    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()   
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = getRandomColor()

    board.appendChild(circle)
}

function getRandomNumber(min, max) {
    return (Math.round(Math.random()  * (max - min)) + min)
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
