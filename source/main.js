const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')
const healthbarDiv = document.getElementById('healthbar')

const ctx = canvasDiv.getContext('2d')

const borderColor = '#ff0107'
const fillColor = '#f1f7ff'
const activeColor = '#000107'
const squareColor = '#00BFFF'

healthbarDiv.style.backgroundColor = fillColor
healthbarDiv.style.width = '0%'

const h = 4
const w = 4

const bSize = 0

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

function render(_borderColor = borderColor, _fillColor = fillColor) {
  ctx.fillStyle = _borderColor
  ctx.fillRect(
    0,
    0,
    (cellSize + bSize) * h + bSize,
    (cellSize + bSize) * w + bSize
  )

  ctx.fillStyle = _fillColor

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      const rX = y * (cellSize + bSize) + bSize
      const rY = x * (cellSize + bSize) + bSize
      ctx.fillRect(rY, rX, cellSize, cellSize)
    }
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

let msToLife = 250

let clickTime = new Date()
let hitTime = new Date()

let startTime = new Date()
let endTime = new Date()
endTime.setSeconds(-120)

let clickStamps = []
let gameMap = []

const infoDiv = document.getElementById('information')

function addInfo(tlabel, tvalue) {
  const el = document.createElement('div')
  el.classList.add('stats')
  const label = document.createElement('div')
  label.classList.add('stats-label')
  label.textContent = tlabel
  el.appendChild(label)
  const value = document.createElement('div')
  value.classList.add('stats-value')
  value.textContent = tvalue
  el.appendChild(value)
  infoDiv.appendChild(el)
}

function textNumber(number) {
  tNumber = String(Math.round(number * 100) / 100)

  if (tNumber.slice(-2, -1) == '.') tNumber += '0'
  if (tNumber.slice(-3, -2) != '.') tNumber += '.00'

  return tNumber
}

function gameover() {
  if (state == 'RUNNING') {
    endTime = new Date()
    state = 'GAMEOVER'
    clock = 0.0

    healthbarDiv.style.width = '0%'
    render(borderColor, squareColor)

    if (clicks) {
      const deltaTime = (endTime - startTime) / 1000

      speed = clicks / deltaTime
      accuracy = clicks ? clicks / (clicks + misses) : 1

      const minutes = Math.floor(deltaTime / 60)

      if (minutes > 0) {
        let seconds = Math.floor(deltaTime) % 60
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        addInfo('time', `${minutes}:${seconds}`)
      } else {
        addInfo('time', textNumber(deltaTime) + 's')
      }

      addInfo('clicks', String(clicks))
      addInfo('speed', textNumber(speed))
      addInfo('accuracy', textNumber(accuracy * 100) + '%')
      
      infoDiv.classList.remove('hidden')
    }    
  }
}

function run() {
  if (state != 'RUNNING') {
    return
  }

  const d = new Date()

  msClock = endTime - d

  if (msClock <= 0) {
    return gameover()
  }

  clock = (d - startTime) / 1000

  if (clock > 0) {
    healthbarDiv.style.width = (100 * msClock) / (endTime - startTime) + '%'
  } else {
    healthbarDiv.style.width = '0%'
  }

  requestAnimationFrame(run)
}

function randomCell() {
  const index = Math.floor(Math.random() * gameMap.length)
  const cell = gameMap[index]
  const [x, y] = cell.split('.')
  renderSquare(x, y, squareColor)
  gameMap.splice(index, 1)
}

const activeCells = 3

function start(reset = false) {
  if (!reset && new Date() - endTime < 1500) {
    return
  }

  infoDiv.classList.add('hidden')
  infoDiv.innerHTML = ''

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

  msToLife = 250

  startTime = new Date()
  endTime = new Date()
  endTime.setSeconds(endTime.getSeconds() + 32)

  clickTime = startTime
  hitTime = startTime

  clickStamps = []

  requestAnimationFrame(run)
}

let cX, cY

function hit(event) {
  clicks += 1

  if (state == 'RUNNING') {
    let x, y
    if (event instanceof TouchEvent) {
      x = event.touches[0].clientX - canvasDiv.offsetLeft
      y = event.touches[0].clientY - canvasDiv.offsetTop
    } else if (event) {
      x = event.offsetX
      y = event.offsetY
    } else {
      x = cX - canvasDiv.offsetLeft
      y = cY - canvasDiv.offsetTop
    }

    const cellX = Math.floor((x - (x % (cellSize + bSize))) / cellSize)
    const cellY = Math.floor((y - (y % (cellSize + bSize))) / cellSize)

    if (gameMap.includes(`${cellX}.${cellY}`) || cellY >= h || cellX >= w) {
      endTime.setMilliseconds(endTime.getMilliseconds() - msToLife)

      misses += 1
      missStreak += 1
    } else {
      endTime.setMilliseconds(endTime.getMilliseconds() + msToLife)

      hitTime = new Date()
      missStreak = 0

      renderSquare(cellX, cellY, fillColor)
      randomCell()

      gameMap.push(`${cellX}.${cellY}`)
    }

    clickTime = new Date()
    clickStamps.unshift(clickTime)

    if (missStreak >= breakPoint) {
      gameover()
    }

    if (msToLife > 200) {
      msToLife -= 0.8
    } else if (msToLife > 166) {
      msToLife -= 0.125
    } else if (msToLife > 142) {
      msToLife -= 1 / 150
    } else if (msToLife > 125) {
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

render(borderColor, squareColor)

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
    hit(null)
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

    render(borderColor, squareColor)
  }
})

if ('serviceWorker' in navigator && window.location.protocol != 'file:') {
  navigator.serviceWorker.register('sw.js')
}
