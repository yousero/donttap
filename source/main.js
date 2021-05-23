const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')

const ctx = canvasDiv.getContext('2d')

const bColor = '#ff0107'
const fColor = '#f1f7ff'
const aColor = '#000107'

const h = 4
const w = 4

const bSize = 1

let cellSize = 100

if (window.innerWidth < 446) {
  cellSize = 72
} else if (window.innerWidth > 1024) {
  cellSize = 128
}

canvasDiv.height = h * (cellSize + bSize) + bSize
canvasDiv.width = w * (cellSize + bSize) + bSize

function renderSquare(x, y, cColor) {
  ctx.fillStyle = cColor
  const rX = y * (cellSize + bSize) + bSize
  const rY = x * (cellSize + bSize) + bSize
  ctx.fillRect(rY, rX, cellSize, cellSize)
}

function render(_bColor = bColor, _fColor = fColor) {
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

let state = 'STOP'
let clock = 0.0
let startTime = new Date()
let clickTime = startTime

let clickStamps = []
let gameMap = []

const clockDiv = document.getElementById('clock')
const infoDiv = document.getElementById('information')

let timer = -1

function textNumber(number) {
  tNumber = String(Math.round(number * 100) / 100)

  if (tNumber.slice(-2, -1) == '.') tNumber += '0'
  if (tNumber.slice(-3, -2) != '.') tNumber += '.00'

  return tNumber
}

function gameover() {
  state = 'GAMEOVER'
  clearTimeout(timer)
  clock = 0.0
  clockDiv.classList.add('gameover')
  render(bColor, aColor)
}

function run() {
  if (state != 'RUNNING') {
    return
  }

  let i = 0
  let d = new Date()
  for (; i < clickStamps.length; ++i) {
    if ((d - clickStamps[i]) / 1000 > 10) {
      break
    }
  }

  clock = (new Date() - startTime) / 1000

  speed = i / (clock < 10 ? clock || 1 : 10)
  accuracy = clicks ? clicks / (clicks + misses) : 1

  const tSpeed = textNumber(speed)
  const tClicks = String(clicks)
  const tAccuracy = textNumber(accuracy)

  infoDiv.textContent = `${tSpeed} / ${tClicks} / ${tAccuracy}`

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
  clockDiv.classList.remove('gameover')

  gameMap = []
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      gameMap.push(`${x}.${y}`)
    }
  }

  render()

  for (let i = 0; i < activeCells; ++i) {
    const index = Math.floor(Math.random() * gameMap.length)
    const cell = gameMap[index]
    const [x, y] = cell.split('.')
    renderSquare(x, y, aColor)
    gameMap.splice(index, 1)
  }

  speed = 0
  clicks = 0
  misses = 0
  missStreak = 0
  accuracy = 1

  clock = 0.0
  startTime = new Date()
  clickTime = startTime

  clickStamps = []

  state = 'RUNNING'

  run()
}

function hit(event) {
  clicks += 1

  if (state == 'RUNNING') {
    const x = event.offsetX
    const y = event.offsetY

    if (x == 0 || y == 0 || x == this.width || y == this.height) {
      misses += 1
      missStreak += 1
    } else {
      const cellX = Math.floor((x - (x % (cellSize + bSize))) / cellSize)
      const cellY = Math.floor((y - (y % (cellSize + bSize))) / cellSize)

      if (gameMap.includes(`${cellX}.${cellY}`) || cellY >= h || cellX >= w) {
        misses += 1
        missStreak += 1
      } else {
        missStreak = 0
        renderSquare(cellX, cellY, fColor)
        {
          const index = Math.floor(Math.random() * gameMap.length)
          const cell = gameMap[index]
          const [x, y] = cell.split('.')
          renderSquare(x, y, aColor)
          gameMap.splice(index, 1)
        }
        gameMap.push(`${cellX}.${cellY}`)
      }
    }

    clickTime = new Date()
    clickStamps.unshift(clickTime)

    if (missStreak >= breakPoint) {
      gameover()
    }
  } else {
    start()
  }

  if (window.getSelection) {
    window.getSelection().removeAllRanges()
  } else if (document.selection) {
    document.selection.empty()
  }
}

render(bColor, aColor)

canvasDiv.addEventListener('mousedown', hit)
canvasDiv.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  return false
})

document.body.addEventListener('keydown', (e) => {
  if (['Space', 'Escape'].includes(e.code)) {
    start()
  } else if (['KeyZ', 'KeyX', 'KeyC', 'KeyV'].includes(e.code)) {
    console.log(e)
  }
})
window.addEventListener('resize', (e) => {
  if (state != 'RUNNING') {
    cellSize = 100

    if (window.innerWidth < 446) {
      cellSize = 72
    } else if (window.innerWidth > 1024) {
      cellSize = 128
    }

    canvasDiv.height = h * (cellSize + bSize) + bSize
    canvasDiv.width = w * (cellSize + bSize) + bSize

    render(bColor, aColor)
  }
})
