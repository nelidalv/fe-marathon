const board = document.querySelector('#board')
// const colors = ['#e74c3c', '#8e44ad', '#349db', '#e67e22', '#2ecc71']
const SQUAERS_NUMBER = 300

for (let i = 0 ; i < SQUAERS_NUMBER; i++) {
    const square = document.createElement('div') // в строковом виде говорим какой тег хотим создать
    square.classList.add('square')

    square.addEventListener('mouseover', () => setColor(square)) 

    square.addEventListener('mouseleave', () => removeColor(square))

    board.append(square)
}

function setColor(element) {
    // const color = getRandomColor()
    const color = '#'+ getRandomIntInclusive().toString(16)
    // const color = '#'+ (0x100000 + Math.floor(Math.random() * 0xffffff)).toString(16)

    console.log(color)
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

// function getRandomColor() {
//     const index = Math.floor(Math.random() * colors.length)
//     return colors[index]
// }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(0x100000);
    max = Math.floor(0xffffff);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}