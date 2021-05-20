const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')

const ctx = canvasDiv.getContext('2d')

let h = 4
let w = 4

let bColor = '#ff0107'
let fColor = '#f1f7ff'
let aColor = '#000107'

let cellSize = 100
let bSize = 1

function renderSquare(x, y, cColor) {
  ctx.fillStyle = cColor
  const rX = y * (cellSize + bSize) + bSize
  const rY = x * (cellSize + bSize) + bSize
  ctx.fillRect(rY, rX, cellSize, cellSize)
}

function render() {
  ctx.fillStyle = bColor
  ctx.fillRect(
    0,
    0,
    (cellSize + bSize) * h + bSize,
    (cellSize + bSize) * w + bSize
  )

  ctx.fillStyle = fColor

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const rX = y * (cellSize + bSize) + bSize
      const rY = x * (cellSize + bSize) + bSize
      ctx.fillRect(rY, rX, cellSize, cellSize)
    }
  }
}

function renderBorders(sColor = bColor) {
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
let accuracy = 1

let clock = 30.0
let startTime = new Date()

const clockDiv = document.getElementById('clock')
const infoDiv = document.getElementById('information')

let timer = -1

let gameMap = []

function run() {
  const tSpeed = Math.round(speed * 100) / 100
  const tClicks = Math.round(clicks * 100) / 100
  const tAccuracy = Math.round(accuracy * 100) / 100

  infoDiv.textContent = `${tSpeed} / ${tClicks} / ${tAccuracy}`

  clock = (new Date() - startTime) / 1000

  if (clock > 0) {
    let tClock = String(Math.round(clock * 100) / 100)
    if (tClock.slice(-2, -1) == '.') tClock += '0'
    if (tClock.slice(-3, -2) != '.') tClock += '.00'

    clockDiv.textContent = tClock

    setTimeout(run, 0)
  } else {
    clockDiv.textContent = '0.00'
  }
}

let activeCells = 3
let clockTime = 30

function start() {
  clockDiv.classList.remove('gameover')

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      gameMap.push(`${x}.${y}`)
    }
  }

  for (let i = 0; i < activeCells; ++i) {
    let cell = gameMap[Math.floor(Math.random() * gameMap.length)]
    let [x, y] = cell.split('.')
    renderSquare(x, y, aColor)
    gameMap = gameMap.filter((x) => x != cell)
  }

  speed = 0
  clicks = 0
  accuracy = 1

  clock = clockTime
  startTime = new Date()
  endTime = new Date(startTime)

  endTime.setMilliseconds(endTime.getMilliseconds() + clock * 1000)

  //run()
}

function gameover() {
  console.log('gameover')
  clockDiv.classList.add('gameover')
  clearTimeout(timer)
}

function click(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (x == 0 || y == 0 || x == this.width || y == this.height) {
    gameover()
  } else {
    const cellX = Math.floor((x - (x % (cellSize + bSize))) / cellSize)
    const cellY = Math.floor((y - (y % (cellSize + bSize))) / cellSize)

    if (gameMap.includes(`${cellX}.${cellY}`)) {
      gameover()
      renderSquare(cellX, cellY, aColor)
    } else {
      renderSquare(cellX, cellY, fColor)
    }
  }
}

// render()
renderBorders()
// start()

canvasDiv.addEventListener('mousedown', click)

console.log('script ended')
