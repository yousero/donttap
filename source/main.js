const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')

const ctx = canvasDiv.getContext('2d')

const h = 4
const w = 4

const bColor = '#ff0107'
const fColor = '#f1f7ff'
const aColor = '#000107'

const cellSize = 100
const bSize = 1

function renderSquare(x, y, cColor) {
  console.log('renderSquare')
  ctx.fillStyle = cColor
  const rX = y * (cellSize + bSize) + bSize
  const rY = x * (cellSize + bSize) + bSize
  ctx.fillRect(rY, rX, cellSize, cellSize)
}

function render(_bColor = bColor, _fColor = fColor) {
  console.log('render')
  ctx.fillStyle = _bColor
  ctx.fillRect(
    0,
    0,
    (cellSize + bSize) * h + bSize,
    (cellSize + bSize) * w + bSize
  )

  ctx.fillStyle = _fColor

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const rX = y * (cellSize + bSize) + bSize
      const rY = x * (cellSize + bSize) + bSize
      ctx.fillRect(rY, rX, cellSize, cellSize)
    }
  }
}

function renderBorders(sColor = bColor) {
  console.log('renderBorders')
  ctx.strokeStyle = sColor

  for (let x = 0; x <= w; ++x) {
    ctx.moveTo(x * (cellSize + bSize) + 0.5, 0)
    ctx.lineTo(x * (cellSize + bSize) + 0.5, h * (cellSize + bSize) + bSize)
    ctx.stroke()
  }
  for (let y = 0; y <= h; ++y) {
    ctx.moveTo(0, y * (cellSize + bSize) + 0.5)
    ctx.lineTo(w * (cellSize + bSize) + bSize, y * (cellSize + bSize) + 0.5)
    ctx.stroke()
  }
}

let speed = 0
let clicks = 0
let misses = 0
let accuracy = 1

const breakPoint = 4
let missStreak = 0

let clock = 0.0
let startTime = new Date()
let clickTime = startTime

const clockDiv = document.getElementById('clock')
const infoDiv = document.getElementById('information')

let timer = -1

let gameMap = []

function textNumber(number) {
  tNumber = String(Math.round(number * 100) / 100)

  if (tNumber.slice(-2, -1) == '.') tNumber += '0'
  if (tNumber.slice(-3, -2) != '.') tNumber += '.00'

  return tNumber
}

function gameover() {
  console.log('gameover')
  clearTimeout(timer)
  clock = 0.0
  clockDiv.classList.add('gameover')
  render(bColor, aColor)
}

function run() {
  speed = clock ? clicks / clock : 0
  accuracy = clicks ? clicks / (clicks + misses) : 1

  const tSpeed = textNumber(speed)
  const tClicks = textNumber(clicks)
  const tAccuracy = textNumber(accuracy)

  infoDiv.textContent = `${tSpeed} / ${tClicks} / ${tAccuracy}`

  clock = (new Date() - startTime) / 1000

  if (clock > 0) {
    clockDiv.textContent = textNumber(clock)
  } else {
    clockDiv.textContent = '0.00'
  }

  if ((new Date() - clickTime) / 1000 > 8) {
    gameover()
  } else {
    setTimeout(run, 0)
  }
}

const activeCells = 3

function start() {
  console.log('start')
  clockDiv.classList.remove('gameover')

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      gameMap.push(`${x}.${y}`)
    }
  }

  render()

  for (let i = 0; i < activeCells; ++i) {
    let cell = gameMap[Math.floor(Math.random() * gameMap.length)]
    let [x, y] = cell.split('.')
    renderSquare(x, y, aColor)
    gameMap = gameMap.filter((x) => x != cell)
  }

  speed = 0
  clicks = 0
  misses = 0
  accuracy = 1

  clock = 0.0
  startTime = new Date()
  clickTime = startTime

  run()
}

function hit(event) {
  console.log('hit')

  clicks += 1

  if (clock) {
    const x = event.offsetX
    const y = event.offsetY

    if (x == 0 || y == 0 || x == this.width || y == this.height) {
      misses += 1
      missStreak += 1
    } else {
      const cellX = Math.floor((x - (x % (cellSize + bSize))) / cellSize)
      const cellY = Math.floor((y - (y % (cellSize + bSize))) / cellSize)

      if (gameMap.includes(`${cellX}.${cellY}`)) {
        // renderSquare(cellX, cellY, aColor)
        misses += 1
        missStreak += 1
      } else {
        renderSquare(cellX, cellY, fColor)
      }
    }

    clickTime = new Date()

    if (missStreak >= breakPoint) {
      gameover()
    }
  } else {
    start()
  }
}

render(bColor, aColor)

// canvasDiv.addEventListener('touchstart', hit)
canvasDiv.addEventListener('mousedown', hit)

console.log('script ended')
