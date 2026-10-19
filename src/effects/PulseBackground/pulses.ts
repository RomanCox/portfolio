// Живой фон: импульсы бегут по линиям сетки. Чистый canvas, без библиотек.
// Параметры — из ТЗ (раздел «Живой фон») и прототипа в макете.

const CELL = 56
// Сетка сдвинута на -1px (background-position), узлы совпадают с линиями
const OFFSET = -1
const TAIL = 150
const MAX_PULSES = 46
const TURN_CHANCE = 0.3
const FLASH_MS = 500
const MAX_TRAIL_POINTS = 12
const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const

// Интервалы появления, мс
const IDLE_CURSOR_INTERVAL = 900
const MIN_INTERVAL = 45
const AMBIENT_HERO_INTERVAL = 1700
const AMBIENT_BELOW_INTERVAL = 3200
const TOUCH_INTERVAL = 2600
// Ниже первого экрана слой приглушён
const BELOW_HERO_ALPHA = 0.55

const FALLBACK_COLORS = ['0,229,255', '255,61,216', '177,140,255']

interface Pulse {
  x: number
  y: number
  dx: number
  dy: number
  speed: number
  color: string
  trail: Array<[number, number]>
  travelled: number
  maxTravel: number
  toNode: number
}

interface Flash {
  x: number
  y: number
  alpha: number
  color: string
}

// Цвета импульсов — из CSS (--pulse-colors в globals.scss): «r,g,b|r,g,b|…»
function readColors(): string[] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--pulse-colors')
  const colors = raw
    .split('|')
    .map((color) => color.trim())
    .filter(Boolean)
  return colors.length > 0 ? colors : FALLBACK_COLORS
}

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function snap(value: number) {
  return Math.round((value - OFFSET) / CELL) * CELL + OFFSET
}

export function startPulses(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  const touch = window.matchMedia('(hover: none)').matches
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)')

  let width = 0
  let height = 0
  let colors = readColors()
  let pulses: Pulse[] = []
  let flashes: Flash[] = []
  let mouse: { x: number; y: number; t: number } | null = null
  let speed = 0
  let acc = 0
  let prev = performance.now()
  let raf = 0

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const next = { x: event.clientX, y: event.clientY, t: performance.now() }
    if (mouse) {
      const dt = Math.max(1, next.t - mouse.t)
      // скорость курсора, px/мс, со сглаживанием
      speed = speed * 0.6 + (Math.hypot(next.x - mouse.x, next.y - mouse.y) / dt) * 0.4
    }
    mouse = next
  }

  const onPointerLeave = () => {
    mouse = null
    speed = 0
  }

  const onThemeChange = () => {
    colors = readColors()
  }

  const spawn = (x: number, y: number) => {
    if (pulses.length > MAX_PULSES) return
    const gx = snap(x)
    const gy = snap(y)
    const [dx, dy] = pick(DIRECTIONS)
    pulses.push({
      x: gx,
      y: gy,
      dx,
      dy,
      speed: 0.22 + Math.random() * 0.16,
      color: pick(colors),
      trail: [[gx, gy]],
      travelled: 0,
      maxTravel: 380 + Math.random() * 520,
      toNode: CELL,
    })
    flashes.push({ x: gx, y: gy, alpha: 1, color: colors[0] })
  }

  const move = (pulse: Pulse, dt: number) => {
    let step = pulse.speed * dt
    while (step > 0) {
      const s = Math.min(step, pulse.toNode)
      pulse.x += pulse.dx * s
      pulse.y += pulse.dy * s
      pulse.toNode -= s
      pulse.travelled += s
      step -= s
      if (pulse.toNode <= 0.001) {
        // узел: запомнить точку хвоста и, может быть, повернуть на 90°
        pulse.toNode = CELL
        pulse.trail.push([pulse.x, pulse.y])
        if (Math.random() < TURN_CHANCE) {
          const turn = Math.random() < 0.5 ? 1 : -1
          const dx = pulse.dy * turn
          const dy = -pulse.dx * turn
          pulse.dx = dx
          pulse.dy = dy
        }
      }
    }
  }

  const drawPulse = (pulse: Pulse, fade: number) => {
    const points = [...pulse.trail, [pulse.x, pulse.y] as [number, number]]
    let length = 0
    ctx.lineWidth = 1.5
    ctx.lineCap = 'square'

    // хвост от головы назад, с затуханием по длине
    for (let k = points.length - 1; k > 0 && length < TAIL; k--) {
      const [ax, ay] = points[k]
      const [bx, by] = points[k - 1]
      const segment = Math.hypot(ax - bx, ay - by)
      const use = Math.min(segment, TAIL - length)
      const ratio = use / (segment || 1)
      const ex = ax + (bx - ax) * ratio
      const ey = ay + (by - ay) * ratio
      const gradient = ctx.createLinearGradient(ax, ay, ex, ey)
      gradient.addColorStop(0, `rgba(${pulse.color},${(0.95 * (1 - length / TAIL) * fade).toFixed(3)})`)
      gradient.addColorStop(1, `rgba(${pulse.color},${(0.95 * (1 - (length + use) / TAIL) * fade).toFixed(3)})`)
      ctx.strokeStyle = gradient
      ctx.beginPath()
      ctx.moveTo(ax, ay)
      ctx.lineTo(ex, ey)
      ctx.stroke()
      length += use
    }

    ctx.fillStyle = `rgba(${pulse.color},${fade.toFixed(3)})`
    ctx.fillRect(pulse.x - 1.5, pulse.y - 1.5, 3, 3)
  }

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(50, now - prev)
    prev = now
    if (document.hidden) return

    speed *= 0.92
    ctx.clearRect(0, 0, width, height)

    const inHero = window.scrollY < height * 0.8
    ctx.globalAlpha = inHero ? 1 : BELOW_HERO_ALPHA

    const followCursor = mouse !== null && !touch
    const interval = followCursor
      ? Math.max(MIN_INTERVAL, IDLE_CURSOR_INTERVAL / (1 + speed * 9))
      : touch
        ? TOUCH_INTERVAL
        : inHero
          ? AMBIENT_HERO_INTERVAL
          : AMBIENT_BELOW_INTERVAL

    acc += dt
    while (acc >= interval) {
      acc -= interval
      if (followCursor && mouse) spawn(mouse.x, mouse.y)
      else spawn(Math.random() * width, Math.random() * height)
    }

    pulses = pulses.filter((pulse) => {
      move(pulse, dt)
      const fade = pulse.travelled > pulse.maxTravel ? Math.max(0, 1 - (pulse.travelled - pulse.maxTravel) / 160) : 1
      const outside = pulse.x < -200 || pulse.x > width + 200 || pulse.y < -200 || pulse.y > height + 200
      if (fade <= 0 || outside) return false
      drawPulse(pulse, fade)
      if (pulse.trail.length > MAX_TRAIL_POINTS) pulse.trail.splice(0, pulse.trail.length - MAX_TRAIL_POINTS)
      return true
    })

    // вспышка-квадрат в точке рождения
    ctx.lineWidth = 1
    flashes = flashes.filter((flash) => {
      flash.alpha -= dt / FLASH_MS
      if (flash.alpha <= 0) return false
      const size = 4 + (1 - flash.alpha) * 10
      ctx.strokeStyle = `rgba(${flash.color},${flash.alpha.toFixed(3)})`
      ctx.strokeRect(flash.x - size / 2, flash.y - size / 2, size, size)
      return true
    })

    ctx.globalAlpha = 1
  }

  const themeObserver = new MutationObserver(onThemeChange)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  lightScheme.addEventListener('change', onThemeChange)

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('blur', onPointerLeave)
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    themeObserver.disconnect()
    lightScheme.removeEventListener('change', onThemeChange)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('blur', onPointerLeave)
    ctx.clearRect(0, 0, width, height)
  }
}
