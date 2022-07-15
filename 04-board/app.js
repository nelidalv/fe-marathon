const board = document.querySelector('#board')
const colors = ['#e74c3c', '#8e44ad', '#349db', '#e67e22', '#2ecc71']
const SQUAERS_NUMBER = 100

for (let i = 0 ; i < SQUAERS_NUMBER; i++) {
    const square = document.createElement('div') // в строковом виде говорим какой тег хотим создать
    square.classList.add('square')

    square.addEventListener('mouseover', () => setColor(square)) 

    square.addEventListener('mouseleave', () => removeColor(square))

    board.append(square)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}