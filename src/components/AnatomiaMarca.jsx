import { useEffect, useState } from 'react'
import { Crosshair, Ruler, ShieldCheck, Sparkles } from 'lucide-react'
import { Reveal, Titulo } from './Animados'
import { MARCA } from '../data/nosotros'

// Lámina interactiva del isotipo: la "G" se dibuja en SVG con las proporciones del logo
// y cada concepto del manual resalta la parte correspondiente.

const ESTILO = {
  curva: { Icono: ShieldCheck, color: 'from-ganet-cyan to-ganet-blue', punto: [16.4, 50] },
  barra: { Icono: Sparkles, color: 'from-ganet-lime to-ganet-green', punto: [75.4, 40.5] },
  corte: { Icono: Crosshair, color: 'from-ganet-sky to-ganet-lime', punto: [84.2, 49.6] },
  geometria: { Icono: Ruler, color: 'from-ganet-blue to-ganet-ink', punto: [54.6, 50] },
}
const INTERVALO = 4200

export default function AnatomiaMarca() {
  const [activo, setActivo] = useState(0)
  const [auto, setAuto] = useState(true)
  const parte = MARCA.partes[activo]

  useEffect(() => {
    if (!auto) return
    const t = setTimeout(() => setActivo((i) => (i + 1) % MARCA.partes.length), INTERVALO)
    return () => clearTimeout(t)
  }, [activo, auto])

  const elegir = (i) => {
    setAuto(false)
    setActivo(i)
  }

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-[#F2F8FC] to-white py-24">
      <div className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-ganet-cyan/10 blur-3xl" />
      <div className="absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-ganet-lime/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <Lamina parte={parte.id} etiqueta={parte.etiqueta} />
        </Reveal>

        <Reveal retraso={120}>
          <Titulo etiqueta="Nuestra marca">
            Una “G” con <span className="text-gradient">significado</span>
          </Titulo>
          <p className="mt-5 max-w-lg leading-relaxed text-slate-600">{MARCA.intro}</p>

          <ol className="mt-8 space-y-3">
            {MARCA.partes.map((p, i) => {
              const { Icono, color } = ESTILO[p.id]
              const esActivo = i === activo
              return (
                <li key={p.id}>
                  <button
                    onClick={() => elegir(i)}
                    onMouseEnter={() => elegir(i)}
                    className={`group relative w-full overflow-hidden rounded-2xl p-4 text-left transition-all duration-500 ${
                      esActivo ? 'bg-white shadow-xl shadow-slate-900/[0.06] ring-1 ring-slate-200' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-500 ${
                          esActivo ? `bg-gradient-to-br ${color} text-white shadow-lg` : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <Icono className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${esActivo ? 'text-ganet-blue' : 'text-slate-400'}`}>
                          0{i + 1} · {p.etiqueta}
                        </p>
                        <h3 className={`mt-0.5 font-display text-lg font-bold transition-colors ${esActivo ? 'text-ganet-ink' : 'text-slate-500'}`}>{p.titulo}</h3>
                        <div className={`grid transition-all duration-500 ${esActivo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <p className="min-h-0 overflow-hidden pt-1 text-sm leading-relaxed text-slate-600">{p.texto}</p>
                        </div>
                      </div>
                    </div>
                    {esActivo && auto && (
                      <span
                        key={activo}
                        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left animate-progreso bg-gradient-to-r ${color}`}
                        style={{ animationDuration: `${INTERVALO}ms` }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

// Coordenadas del isotipo (ancho 253, alto 303) con margen; el viewBox va de -20 a 273 / -20 a 323.
const G_CUERPO = 'M212 0 H140 A140 151.5 0 0 0 140 303 H253 V155 H199 V248 H140 A85 96.5 0 0 1 140 55 H212 Z'
const LINEAS_V = [0, 55, 140, 149, 199, 212, 253]
const LINEAS_H = [0, 55, 94, 145, 155, 248, 303]

function Lamina({ parte, etiqueta }) {
  const enfoque = (id) => (parte === id ? 1 : parte === 'corte' ? 0.55 : parte === 'geometria' ? 0.35 : 0.18)
  const [x, y] = ESTILO[parte].punto

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-900/[0.07] ring-1 ring-slate-200">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(74,180,230,.12),transparent_65%)]" />

      {/* Esquinas tipo lámina técnica */}
      {['left-5 top-5 border-l-2 border-t-2', 'right-5 top-5 border-r-2 border-t-2', 'bottom-5 left-5 border-b-2 border-l-2', 'bottom-5 right-5 border-b-2 border-r-2'].map((c) => (
        <span key={c} className={`absolute h-6 w-6 rounded-sm border-ganet-sky/40 ${c}`} />
      ))}
      <span className="absolute left-8 top-7 font-mono text-[10px] uppercase tracking-widest text-slate-400">Isotipo · Ganet</span>
      <span className="absolute bottom-7 right-8 font-mono text-[10px] uppercase tracking-widest text-slate-400">Manual de marca</span>

      <div className="absolute inset-[14%]">
        <svg viewBox="-20 -20 293 343" className="h-full w-full overflow-visible" aria-label="Isotipo de Ganet">
          <defs>
            <linearGradient id="g-azul" x1="0" x2="1">
              <stop offset="0" stopColor="#03E9FF" />
              <stop offset="1" stopColor="#039EFF" />
            </linearGradient>
            <linearGradient id="g-verde" x1="0" x2="1">
              <stop offset="0" stopColor="#9BCB3B" />
              <stop offset="1" stopColor="#1F7A2A" />
            </linearGradient>
            <filter id="g-brillo" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Guías de construcción */}
          <g
            className="transition-opacity duration-700"
            opacity={parte === 'geometria' ? 1 : 0.35}
            fill="none"
            stroke="#4AB4E6"
            strokeWidth={parte === 'geometria' ? 1.2 : 0.8}
          >
            {LINEAS_V.map((v) => (
              <line key={`v${v}`} x1={v} y1="-20" x2={v} y2="323" strokeDasharray="3 5" />
            ))}
            {LINEAS_H.map((h) => (
              <line key={`h${h}`} x1="-20" y1={h} x2="273" y2={h} strokeDasharray="3 5" />
            ))}
            <ellipse cx="140" cy="151.5" rx="140" ry="151.5" strokeDasharray="6 6" />
            <ellipse cx="140" cy="151.5" rx="85" ry="96.5" strokeDasharray="6 6" />
            <circle cx="140" cy="151.5" r="4" fill="#4AB4E6" stroke="none" />
          </g>

          {/* Halo de la parte activa */}
          <g filter="url(#g-brillo)" className="transition-opacity duration-700" opacity={parte === 'geometria' ? 0 : 0.45}>
            {parte === 'curva' && <path d={G_CUERPO} fill="#4AB4E6" />}
            {parte === 'barra' && <rect x="149" y="94" width="104" height="51" fill="#8DBB57" />}
            {parte === 'corte' && <rect x="190" y="138" width="70" height="24" fill="#5CD3E6" />}
          </g>

          <path d={G_CUERPO} fill="url(#g-azul)" className="transition-opacity duration-700" opacity={enfoque('curva')} />
          <rect x="149" y="94" width="104" height="51" fill="url(#g-verde)" className="transition-opacity duration-700" opacity={enfoque('barra')} />

          {/* Corte: cota entre la barra y la columna */}
          <g className="transition-opacity duration-700" opacity={parte === 'corte' ? 1 : 0}>
            <line x1="199" y1="150" x2="273" y2="150" stroke="#2F8FDB" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M262 140 L262 145 M262 155 L262 160" stroke="#2F8FDB" strokeWidth="2" />
            <path d="M258 141 L262 145 L266 141 M258 159 L262 155 L266 159" fill="none" stroke="#2F8FDB" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Marcador y etiqueta flotante */}
        <span className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-ganet-sky/40" />
          <span className="relative block h-4 w-4 rounded-full border-[3px] border-white bg-ganet-blue shadow-lg" />
          <span key={parte} className="absolute left-1/2 top-5 -translate-x-1/2 animate-fade-up whitespace-nowrap rounded-full bg-ganet-ink px-2.5 py-0.5 text-[11px] sm:top-6 sm:px-3 sm:py-1 sm:text-xs font-semibold text-white shadow-lg">
            {etiqueta}
          </span>
        </span>
      </div>
    </div>
  )
}
