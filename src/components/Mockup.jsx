import { useId } from 'react'
import isotipo from '../assets/logo-mark.png'

// Maquetas vectoriales de productos personalizables (viewBox 400×400).
// Cada tipo define:
//   forma     silueta que toma el color elegido
//   detalles  costuras, sombras y piezas dibujadas dentro de la silueta (se recortan a ella)
//   exterior  piezas fuera de la silueta (asas, tapas, cuellos); reciben el color vía `c`
//   fondo     piezas detrás del producto
//   area      zona donde se imprime el logo y el texto

const CUERPO_CAMISETA = 'M150 58 Q200 84 250 58 L322 84 Q336 90 342 102 L376 170 L322 196 L300 160 L302 352 Q302 364 290 364 L110 364 Q98 364 98 352 L100 160 L78 196 L24 170 L58 102 Q64 90 78 84 Z'
const CUERPO_CAMISA = 'M150 58 Q200 80 250 58 L318 82 Q334 88 340 104 L368 328 L330 336 L304 172 L302 352 Q302 364 290 364 L110 364 Q98 364 98 352 L96 172 L70 336 L32 328 L60 104 Q66 88 82 82 Z'
const SOMBRA = 'rgba(0,0,0,.14)'

const cuelloPolo = (c) => (
  <g>
    <path d="M152 56 L200 98 L176 122 L144 66 Z" fill={c} />
    <path d="M248 56 L200 98 L224 122 L256 66 Z" fill={c} />
    <path d="M152 56 L200 98 L176 122 L144 66 Z M248 56 L200 98 L224 122 L256 66 Z" fill="rgba(0,0,0,.12)" stroke="rgba(0,0,0,.18)" />
  </g>
)

const costurasManga = <path d="M100 160 Q97 128 84 98 M300 160 Q303 128 316 98" fill="none" stroke={SOMBRA} strokeWidth="2" />

const TIPOS = {
  camiseta: {
    forma: <path d={CUERPO_CAMISETA} />,
    detalles: (
      <>
        <path d="M150 58 Q200 98 250 58" fill="none" stroke="rgba(0,0,0,.2)" strokeWidth="10" />
        {costurasManga}
        <path d="M28 160 L82 186 M372 160 L318 186" stroke={SOMBRA} strokeWidth="3" />
        <path d="M98 350 L302 350" stroke={SOMBRA} strokeWidth="2" />
      </>
    ),
    area: { x: 140, y: 118, w: 120, h: 130 },
    sombra: 'tela',
  },
  polo: {
    forma: <path d={CUERPO_CAMISETA} />,
    detalles: (
      <>
        <path d="M190 96 L210 96 L210 176 L190 176 Z" fill="rgba(0,0,0,.08)" stroke={SOMBRA} />
        <g fill="rgba(255,255,255,.8)" stroke="rgba(0,0,0,.25)">
          <circle cx="200" cy="118" r="4" />
          <circle cx="200" cy="144" r="4" />
          <circle cx="200" cy="166" r="4" />
        </g>
        {costurasManga}
        <path d="M28 160 L82 186 M34 150 L86 175 M372 160 L318 186 M366 150 L314 175" stroke={SOMBRA} strokeWidth="3" />
        <path d="M98 350 L302 350" stroke={SOMBRA} strokeWidth="2" />
      </>
    ),
    exterior: cuelloPolo,
    area: { x: 226, y: 128, w: 54, h: 54 },
    sombra: 'tela',
  },
  camisa: {
    forma: <path d={CUERPO_CAMISA} />,
    detalles: (
      <>
        <path d="M200 98 L200 364" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
        <g fill="rgba(255,255,255,.8)" stroke="rgba(0,0,0,.25)">
          {[128, 172, 216, 260, 304, 344].map((y) => (
            <circle key={y} cx="206" cy={y} r="3.5" />
          ))}
        </g>
        <path d="M118 146 L172 146 L172 196 Q172 204 164 204 L126 204 Q118 204 118 196 Z" fill="rgba(0,0,0,.05)" stroke="rgba(0,0,0,.16)" />
        <path d="M118 158 L172 158" stroke="rgba(0,0,0,.16)" />
        <path d="M96 172 Q94 130 84 100 M304 172 Q306 130 316 100" fill="none" stroke={SOMBRA} strokeWidth="2" />
        <path d="M30 312 L72 320 M370 312 L328 320" stroke="rgba(0,0,0,.2)" strokeWidth="3" />
      </>
    ),
    exterior: cuelloPolo,
    area: { x: 226, y: 132, w: 54, h: 54 },
    sombra: 'tela',
  },
  gorra: {
    // Vista de tres cuartos: copa a la izquierda, visera hacia la derecha.
    forma: (
      <>
        <path d="M54 268 C50 172 108 104 186 102 C264 100 316 162 320 268 Z" />
        <path d="M268 250 C318 236 380 244 394 266 C398 282 380 292 350 292 C306 292 280 282 262 272 Z" />
      </>
    ),
    detalles: (
      <>
        <path d="M268 250 C318 236 380 244 394 266 C398 282 380 292 350 292 C306 292 280 282 262 272 Z" fill="rgba(0,0,0,.18)" />
        <path d="M274 256 C320 246 372 252 386 268" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M186 102 C148 142 126 200 120 268 M186 102 C232 140 256 200 262 268" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
        <path d="M186 102 C112 128 70 190 64 268" fill="none" stroke="rgba(0,0,0,.1)" strokeWidth="2" />
        <path d="M54 262 L320 262" stroke="rgba(0,0,0,.22)" strokeWidth="8" />
        <circle cx="96" cy="176" r="3.5" fill="rgba(0,0,0,.3)" />
        <circle cx="282" cy="172" r="3.5" fill="rgba(0,0,0,.3)" />
      </>
    ),
    exterior: (c) => (
      <>
        <ellipse cx="186" cy="102" rx="11" ry="6" fill={c} />
        <ellipse cx="186" cy="102" rx="11" ry="6" fill="rgba(0,0,0,.25)" />
      </>
    ),
    area: { x: 144, y: 150, w: 96, h: 86 },
    sombra: 'tela',
  },
  taza: {
    forma: (
      <>
        <path d="M290 150 C352 150 364 182 364 220 C364 262 340 292 290 292 L290 266 C326 266 338 250 338 220 C338 192 326 176 290 176 Z" />
        <path d="M100 110 L290 110 L290 330 Q290 354 266 354 L124 354 Q100 354 100 330 Z" />
        <ellipse cx="195" cy="110" rx="95" ry="18" />
      </>
    ),
    detalles: (
      <>
        <path d="M290 150 C352 150 364 182 364 220 C364 262 340 292 290 292 L290 266 C326 266 338 250 338 220 C338 192 326 176 290 176 Z" fill="rgba(0,0,0,.12)" />
        <ellipse cx="195" cy="111" rx="86" ry="13" fill="rgba(0,0,0,.35)" />
      </>
    ),
    exterior: () => <ellipse cx="195" cy="110" rx="95" ry="18" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" />,
    area: { x: 128, y: 158, w: 134, h: 150 },
    sombra: 'cilindro',
    ancho: { x: 100, w: 190 },
  },
  termo: {
    forma: <path d="M172 108 L228 108 Q262 120 264 160 L264 352 Q264 372 244 372 L156 372 Q136 372 136 352 L136 160 Q138 120 172 108 Z" />,
    detalles: <path d="M136 340 L264 340" stroke="rgba(0,0,0,.12)" strokeWidth="2" />,
    exterior: () => (
      <>
        <rect x="168" y="30" width="64" height="62" rx="10" fill="#1f2937" />
        <rect x="168" y="30" width="64" height="62" rx="10" fill="url(#METAL)" opacity=".45" />
        <rect x="172" y="90" width="56" height="18" fill="url(#METAL)" />
      </>
    ),
    area: { x: 152, y: 182, w: 96, h: 136 },
    sombra: 'cilindro',
    ancho: { x: 136, w: 128 },
  },
  bolsa: {
    forma: <path d="M88 150 L312 150 L324 372 L76 372 Z" />,
    detalles: <path d="M88 162 L312 162" stroke="rgba(0,0,0,.16)" strokeWidth="2" strokeDasharray="4 4" />,
    fondo: (c) => (
      <>
        <path d="M134 156 C134 56 266 56 266 156" fill="none" stroke={c} strokeWidth="13" />
        <path d="M134 156 C134 56 266 56 266 156" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="13" />
      </>
    ),
    exterior: (c) => (
      <>
        <path d="M152 160 C152 78 248 78 248 160" fill="none" stroke={c} strokeWidth="13" />
        <path d="M152 160 C152 78 248 78 248 160" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="13" />
      </>
    ),
    area: { x: 134, y: 200, w: 132, h: 140 },
    sombra: 'tela',
  },
  libreta: {
    forma: <rect x="98" y="50" width="196" height="292" rx="12" />,
    fondo: () => (
      <>
        <rect x="112" y="60" width="196" height="292" rx="12" fill="#e2e8f0" />
        <path d="M296 72 L306 72 M296 92 L306 92 M296 112 L306 112 M296 132 L306 132" stroke="#cbd5e1" />
        <path d="M184 340 L184 384 L192 374 L200 384 L200 340 Z" fill="#7BB331" />
      </>
    ),
    detalles: (
      <>
        <rect x="98" y="50" width="20" height="292" fill="rgba(0,0,0,.18)" />
        <rect x="262" y="50" width="12" height="292" fill="rgba(0,0,0,.42)" />
      </>
    ),
    area: { x: 130, y: 124, w: 120, h: 120 },
    sombra: 'plano',
  },
  boligrafo: {
    transform: 'rotate(-32 200 200)',
    forma: <rect x="72" y="184" width="236" height="32" rx="16" />,
    fondo: () => (
      <>
        <path d="M76 188 L28 200 L76 212 Z" fill="#cbd5e1" />
        <circle cx="26" cy="200" r="3" fill="#475569" />
      </>
    ),
    detalles: (
      <>
        <rect x="72" y="184" width="52" height="32" fill="rgba(0,0,0,.35)" />
        <path d="M84 184 L84 216 M94 184 L94 216 M104 184 L104 216" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
        <rect x="300" y="184" width="10" height="32" fill="rgba(0,0,0,.2)" />
      </>
    ),
    exterior: () => <path d="M244 176 L330 176 Q340 176 340 186 L340 190 L244 190 Z" fill="url(#METAL)" />,
    area: { x: 140, y: 188, w: 140, h: 24 },
    sombra: 'cilindroH',
  },
  delantal: {
    forma: <path d="M150 60 L250 60 L256 140 Q300 150 320 170 L330 368 Q330 380 318 380 L82 380 Q70 380 70 368 L80 170 Q100 150 144 140 Z" />,
    detalles: (
      <>
        <rect x="132" y="266" width="136" height="64" rx="6" fill="rgba(0,0,0,.06)" stroke="rgba(0,0,0,.18)" />
        <path d="M200 266 L200 330" stroke="rgba(0,0,0,.18)" />
        <path d="M150 66 L250 66" stroke="rgba(0,0,0,.14)" strokeWidth="2" strokeDasharray="4 4" />
      </>
    ),
    exterior: (c) => (
      <>
        <path d="M154 64 C150 18 250 18 246 64" fill="none" stroke={c} strokeWidth="9" />
        <path d="M154 64 C150 18 250 18 246 64" fill="none" stroke="rgba(0,0,0,.2)" strokeWidth="9" />
        <path d="M82 176 C52 186 40 212 30 246 M318 176 C348 186 360 212 370 246" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
        <path d="M82 176 C52 186 40 212 30 246 M318 176 C348 186 360 212 370 246" fill="none" stroke="rgba(0,0,0,.22)" strokeWidth="7" strokeLinecap="round" />
      </>
    ),
    area: { x: 162, y: 78, w: 76, h: 76 },
    sombra: 'tela',
  },
  llavero: {
    forma: <rect x="120" y="126" width="160" height="210" rx="44" />,
    fondo: () => (
      <>
        <circle cx="200" cy="70" r="34" fill="none" stroke="url(#METAL)" strokeWidth="8" />
        <rect x="194" y="98" width="12" height="34" rx="6" fill="none" stroke="#94a3b8" strokeWidth="5" />
      </>
    ),
    detalles: <circle cx="200" cy="152" r="10" fill="#f1f5f9" stroke="rgba(0,0,0,.2)" strokeWidth="2" />,
    area: { x: 140, y: 182, w: 120, h: 120 },
    sombra: 'plano',
  },
  sticker: {
    fondo: () => <circle cx="200" cy="204" r="156" fill="#fff" filter="url(#SOMBRA)" />,
    forma: <circle cx="200" cy="204" r="140" />,
    detalles: <path d="M90 140 A126 126 0 0 1 200 76" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="6" strokeLinecap="round" />,
    area: { x: 112, y: 116, w: 176, h: 176 },
    sombra: 'plano',
  },
  etiqueta: {
    fondo: () => (
      <>
        <rect x="138" y="62" width="124" height="48" rx="10" fill="#334155" />
        <path d="M128 112 L272 112 L282 142 L282 350 Q282 374 258 374 L142 374 Q118 374 118 350 L118 142 Z" fill="#e0f2fe" opacity=".8" stroke="rgba(15,23,42,.18)" strokeWidth="2" />
      </>
    ),
    forma: <rect x="118" y="176" width="164" height="140" />,
    exterior: () => <path d="M132 124 L132 356" stroke="rgba(255,255,255,.7)" strokeWidth="6" strokeLinecap="round" />,
    area: { x: 138, y: 190, w: 124, h: 112 },
    sombra: 'cilindro',
    ancho: { x: 118, w: 164 },
  },
}

export const TIPOS_MOCKUP = Object.keys(TIPOS)

function luminancia(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

export const colorTextoAuto = (fondo) => (luminancia(fondo) > 0.6 ? '#05111D' : '#FFFFFF')

export default function Mockup({ tipo, color = '#F8FAFC', logo, usarIsotipo = true, texto = '', fuente = 'Sora', colorTexto, tecnica = '', className = '' }) {
  const t = TIPOS[tipo] || TIPOS.camiseta
  const uid = useId().replace(/:/g, '')
  const id = (n) => `${n}-${uid}`
  const { x, y, w, h } = t.area
  const imagen = logo || (usarIsotipo ? isotipo : null)
  const tinta = colorTexto || colorTextoAuto(color)
  const hayTexto = texto.trim().length > 0
  const altoLogo = hayTexto && imagen ? h * 0.68 : h
  const tamTexto = Math.min(hayTexto && imagen ? h * 0.3 : h * 0.42, (w * 1.7) / Math.max(texto.length, 3))
  const claro = luminancia(color) > 0.6
  // El grabado láser se ve oscuro sobre superficies claras y plateado sobre las oscuras.
  const efecto = /bordado/i.test(tecnica) ? 'bordado' : /grabado/i.test(tecnica) ? (claro ? 'grabado-oscuro' : 'grabado-claro') : null
  const ancho = t.ancho || { x: 20, w: 360 }

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={`Maqueta ${tipo}`}>
      <defs>
        <linearGradient id={id('cil')} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".32" />
          <stop offset=".18" stopColor="#000" stopOpacity=".06" />
          <stop offset=".34" stopColor="#fff" stopOpacity=".38" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".06" />
          <stop offset=".85" stopColor="#000" stopOpacity=".14" />
          <stop offset="1" stopColor="#000" stopOpacity=".34" />
        </linearGradient>
        <linearGradient id={id('cilH')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".45" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={id('tela')} cx=".45" cy=".3" r=".85">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </radialGradient>
        <linearGradient id={id('plano')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="METAL" x1="0" x2="1">
          <stop offset="0" stopColor="#64748b" />
          <stop offset=".35" stopColor="#f8fafc" />
          <stop offset=".6" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
        <filter id="SOMBRA" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity=".25" />
        </filter>
        <filter id={id('suelo')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={id('bordado')} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4 0.35" numOctaves="2" seed="3" result="ruido" />
          <feColorMatrix in="ruido" type="saturate" values="0" result="gris" />
          <feComposite in="SourceGraphic" in2="gris" operator="arithmetic" k2="1" k3=".35" k4="-.17" result="hilo" />
          <feComposite in="hilo" in2="SourceGraphic" operator="in" result="recorte" />
          <feDropShadow in="recorte" dx=".6" dy="1.2" stdDeviation=".7" floodOpacity=".55" />
        </filter>
        <filter id={id('grabado-claro')}>
          <feColorMatrix type="matrix" values="0 0 0 0 .88  0 0 0 0 .9  0 0 0 0 .93  0 0 0 .95 0" result="plata" />
          <feDropShadow in="plata" dx="0" dy="-.6" stdDeviation=".4" floodColor="#000" floodOpacity=".5" />
        </filter>
        <filter id={id('grabado-oscuro')}>
          <feColorMatrix type="matrix" values="0 0 0 0 .2  0 0 0 0 .23  0 0 0 0 .28  0 0 0 .85 0" result="grafito" />
          <feDropShadow in="grafito" dx="0" dy=".7" stdDeviation=".3" floodColor="#fff" floodOpacity=".7" />
        </filter>
        <clipPath id={id('clip')}>{t.forma}</clipPath>
      </defs>

      <ellipse cx="200" cy="384" rx="140" ry="10" fill="#0f172a" opacity=".16" filter={`url(#${id('suelo')})`} />

      <g transform={t.transform}>
        {t.fondo?.(color)}
        <g fill={color} style={{ transition: 'fill .45s ease' }}>{t.forma}</g>
        <g clipPath={`url(#${id('clip')})`}>
          {t.sombra === 'cilindro' && <rect x={ancho.x} y="0" width={ancho.w} height="400" fill={`url(#${id('cil')})`} />}
          {t.sombra === 'cilindroH' && <rect x="0" y="184" width="400" height="32" fill={`url(#${id('cilH')})`} />}
          {t.sombra === 'tela' && <rect width="400" height="400" fill={`url(#${id('tela')})`} />}
          {t.sombra === 'plano' && <rect width="400" height="400" fill={`url(#${id('plano')})`} />}
          {t.detalles}
        </g>
        {t.exterior?.(color)}

        <g filter={efecto ? `url(#${id(efecto)})` : undefined} clipPath={`url(#${id('clip')})`}>
          {imagen && <image href={imagen} x={x} y={y} width={w} height={altoLogo} preserveAspectRatio="xMidYMid meet" />}
          {hayTexto && (
            <text
              x={x + w / 2}
              y={imagen ? y + altoLogo + tamTexto * 0.95 : y + h / 2 + tamTexto * 0.35}
              textAnchor="middle"
              fontFamily={`'${fuente}', sans-serif`}
              fontWeight="700"
              fontSize={tamTexto}
              fill={tinta}
            >
              {texto}
            </text>
          )}
        </g>
      </g>
    </svg>
  )
}
