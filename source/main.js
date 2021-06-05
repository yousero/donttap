const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')

const ctx = canvasDiv.getContext('2d')

const bColor = '#ff0107'
const fColor = '#f1f7ff'
const aColor = '#000107'
const cColor = '#07ff07'

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

let msToLife = 350

let clickTime = new Date()
let hitTime = new Date()

let startTime = new Date()
let endTime = new Date()
endTime.setSeconds(-120)

let clickStamps = []
let gameMap = []

const clockDiv = document.getElementById('clock')
const infoDiv = document.getElementById('information')

function gameover() {
  endTime = new Date()
  state = 'GAMEOVER'
  clock = 0.0
  clockDiv.textContent = '0.00'
  clockDiv.classList.add('gameover')
  render(bColor, aColor)
}

function colorProgress(c1, c2, weight) {
  const r1 = parseInt(c1.slice(1, 3), 16)
  const g1 = parseInt(c1.slice(3, 5), 16)
  const b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16)
  const g2 = parseInt(c2.slice(3, 5), 16)
  const b2 = parseInt(c2.slice(5, 7), 16)

  let r3 = parseInt(r1 + (r2 - r1) * weight).toString(16)
  let g3 = parseInt(g1 + (g2 - g1) * weight).toString(16)
  let b3 = parseInt(b1 + (b2 - b1) * weight).toString(16)

  r3 = r3.length == 1 ? '0' + r3 : r3
  g3 = g3.length == 1 ? '0' + g3 : g3
  b3 = b3.length == 1 ? '0' + b3 : b3

  return `#${r3}${g3}${b3}`
}

function textNumber(number) {
  tNumber = String(Math.round(number * 100) / 100)

  if (tNumber.slice(-2, -1) == '.') tNumber += '0'
  if (tNumber.slice(-3, -2) != '.') tNumber += '.00'

  return tNumber
}

function run() {
  if (state != 'RUNNING') {
    return
  }

  const d = new Date()

  msClock = endTime - d

  if (msClock <= 0) {
    return gameover()
  } else {
    if (msClock < 500) {
      for (let cell of gameMap) {
        let [x, y] = cell.split('.')
        const color = colorProgress(fColor, bColor, (500 - msClock) / 500)
        renderSquare(x, y, color)
      }
    }
  }

  let i = 0
  for (; i < clickStamps.length; ++i) {
    if ((d - clickStamps[i]) / 1000 > 10) {
      break
    }
  }

  clock = (d - startTime) / 1000

  if (clock > 0) {
    clockDiv.textContent = textNumber(msClock / 1000)
  } else {
    clockDiv.textContent = '0.00'
  }

  speed = i / (clock < 10 ? clock || 1 : 10)
  accuracy = clicks ? clicks / (clicks + misses) : 1

  const tSpeed = textNumber(speed)
  const tClicks = String(clicks)
  const tAccuracy = textNumber(accuracy)

  infoDiv.textContent = `${tSpeed} / ${tClicks} / ${tAccuracy}`

  requestAnimationFrame(run)
}

function randomCell() {
  const index = Math.floor(Math.random() * gameMap.length)
  const cell = gameMap[index]
  const [x, y] = cell.split('.')
  renderSquare(x, y, aColor)
  gameMap.splice(index, 1)
}

const activeCells = 3

function start(reset = false) {
  if (!reset && new Date() - endTime < 1500) {
    return
  }

  clockDiv.classList.remove('gameover')

  gameMap = []
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      gameMap.push(`${x}.${y}`)
    }
  }

  render()

  for (let i = 0; i < activeCells; ++i) {
    randomCell()
  }

  speed = 0
  clicks = 0

  misses = 0
  missStreak = 0
  accuracy = 1

  state = 'RUNNING'
  clock = 0.0

  msToLife = 350

  startTime = new Date()
  endTime = new Date()
  endTime.setSeconds(endTime.getSeconds() + 16)

  clickTime = startTime
  hitTime = startTime

  clickStamps = []

  requestAnimationFrame(run)
}

function hit(event) {
  clicks += 1

  if (state == 'RUNNING') {
    let x, y
    if (event instanceof TouchEvent) {
      x = event.touches[0].clientX - canvasDiv.offsetLeft
      y = event.touches[0].clientY - canvasDiv.offsetTop
    } else {
      x = event.offsetX
      y = event.offsetY
    }

    if (x == 0 || y == 0 || x == this.width || y == this.height) {
      endTime.setMilliseconds(endTime.getMilliseconds() - msToLife)

      misses += 1
      missStreak += 1
    } else {
      endTime.setMilliseconds(endTime.getMilliseconds() + msToLife)

      const cellX = Math.floor((x - (x % (cellSize + bSize))) / cellSize)
      const cellY = Math.floor((y - (y % (cellSize + bSize))) / cellSize)

      if (gameMap.includes(`${cellX}.${cellY}`) || cellY >= h || cellX >= w) {
        misses += 1
        missStreak += 1
      } else {
        hitTime = new Date()
        missStreak = 0

        renderSquare(cellX, cellY, fColor)
        randomCell()

        gameMap.push(`${cellX}.${cellY}`)
      }
    }

    clickTime = new Date()
    clickStamps.unshift(clickTime)

    if (missStreak >= breakPoint) {
      gameover()
    }

    if (msToLife > 250) {
      msToLife -= 0.8
    } else if (msToLife > 200) {
      msToLife -= 0.125
    } else if (msToLife > 166) {
      msToLife -= 1 / 150
    } else if (msToLife > 142) {
      msToLife -= 0.0016
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

let cX, cY

canvasDiv.addEventListener('mousemove', (e) => {
  cX = e.clientX
  cY = e.clientY
})
canvasDiv.addEventListener('touchstart', (e) => {
  hit(e)
  e.preventDefault()
  return false
})
canvasDiv.addEventListener('mousedown', hit)
canvasDiv.parentElement.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  return false
})

document.body.addEventListener('keydown', (e) => {
  if (['Space', 'Escape'].includes(e.code)) {
    start(true)
  } else if (['KeyZ', 'KeyX', 'KeyC', 'KeyV'].includes(e.code)) {
    const event = new MouseEvent('mousedown', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: cX,
      clientY: cY
    })
    canvasDiv.dispatchEvent(event)
  }
})
window.addEventListener('resize', (_) => {
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

if ('serviceWorker' in navigator && window.location.protocol != 'file:') {
  navigator.serviceWorker.register('sw.js')
}
