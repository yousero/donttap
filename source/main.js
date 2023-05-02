
const appDiv = document.getElementById('app')
const canvasDiv = document.getElementById('canvas')
const healthbarDiv = document.getElementById('healthbar')

const ctx = canvasDiv.getContext('2d')

const borderColor = '#990003'
const fillColor = '#f1f7ff'
const activeColor = '#000107'
const squareColor = '#00BFFF'

healthbarDiv.style.backgroundColor = fillColor
healthbarDiv.style.width = '0%'

let h = 4
let w = 4

const bSize = 0

let cellSize = 100

let activeCells = 3

function refreshCanvas() {
  cellSize = 100

  if (window.innerWidth < 446) {
    cellSize = 72
  } else if (window.innerWidth > 1024) {
    cellSize = 128
  }

  cellSize = 100

  canvasDiv.height = h * (cellSize + bSize) + bSize
  canvasDiv.width = w * (cellSize + bSize) + bSize
}

refreshCanvas()

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
let hpTime = new Date()
let endTime = new Date()
endTime.setSeconds(-120)

let clickStamps = []
let gameMap = []

const infoDiv = document.getElementById('information')

function addInfo(tlabel, tvalue, title=null) {
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

  if (title) {
    el.title = title
  }

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
      addInfo('speed', textNumber(speed), 'clicks per second')
      addInfo('accuracy', textNumber(accuracy * 100) + '%', misses + ' misses')
      
      infoDiv.classList.remove('hidden')

      if (localStorage) {
        let records = []
        if (localStorage.records) {
          try {
            records = JSON.parse(localStorage.records)  
          } catch (SyntaxError) {
            delete localStorage.records
          }
        }
        if (records.length >= 0) {
          records.push([endTime.getTime(), deltaTime, clicks, misses].join(';'))
          localStorage.records = JSON.stringify(records)
        }
      }
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
    const dt = endTime - hpTime
    const hp = (100 * msClock) / dt
    healthbarDiv.style.width = hp + '%'

    if (dt >= 60000) {
      if (hp <= 25) {
        hpTime.setMilliseconds(hpTime.getMilliseconds() + dt * 6.5/10)
      }
    }
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
  hpTime = new Date()
  endTime = new Date()
  endTime.setSeconds(endTime.getSeconds() + 32)

  clickTime = startTime
  hitTime = startTime

  clickStamps = []

  requestAnimationFrame(run)
}

function hit(event) {
  clicks += 1

  if (state == 'RUNNING') {
    let x, y
    if ('TouchEvent' in window) {
      if (event instanceof TouchEvent) {
        x = event.touches[0].clientX - canvasDiv.offsetLeft
        y = event.touches[0].clientY - canvasDiv.offsetTop
      }
    } else if (event) {
      x = event.offsetX
      y = event.offsetY
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

const settingsDiv = document.getElementById('settings')

// const okSettings = settingsDiv.querySelector('#settings-ok')
// okSettings.addEventListener('click', (e) => {
//   const sizeSettings = settingsDiv.querySelector('input[name="size"]')
//   const numberSettings = settingsDiv.querySelector('input[name="number"]')
//   const size = parseInt(sizeSettings.value)
//   if (size > 1) {
//     h = w = size
//     refreshCanvas()
//     render(borderColor, squareColor)
//   }
//   const number = parseInt(numberSettings.value)
//   if (number > 0 && number < w) {
//     activeCells = number
//   }
// })

const toggleBar = settingsDiv.querySelector('#toggle-bar')
toggleBar.addEventListener('click', function(e) {
  const width = parseInt(healthbarDiv.style.width)
  if ((width + 30) > 100) {
    healthbarDiv.style.width = '0%'
  } else {
    healthbarDiv.style.width = String(width + 30) + '%'
  }  
})

const showInfo = settingsDiv.querySelector('#toggle-info')
showInfo.addEventListener('click', function(e) {
  if (!infoDiv.innerHTML) {
    addInfo('time', '0' + 's')
    addInfo('clicks', '0')
    addInfo('speed', '0')
    addInfo('accuracy', String(Math.floor(accuracy * 100)) + '%')
  }
  infoDiv.classList.toggle('hidden')
})

const firstRound = settingsDiv.querySelector('#show-first-round')
firstRound.addEventListener('click', function(e) {
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
  }
})
window.addEventListener('resize', (_) => {
  if (state != 'RUNNING') {
    refreshCanvas()
    render(borderColor, squareColor)
  }
})

if ('serviceWorker' in navigator && window.location.protocol != 'file:') {
  navigator.serviceWorker.register(
    new URL('sw.js')
  )
}
