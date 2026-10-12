import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react'
import Mockup from './Mockup'
import isotipo from '../assets/logo-mark.png'
import { COLORES } from '../data/catalogo'
import { useCotizacion } from '../context/Cotizacion'

const SLIDES = [
  {
    id: 'todo',
    etiqueta: `Catálogo ${new Date().getFullYear()}`,
    titulo: ['Todo lo que tu empresa necesita,', 'en un solo lugar.'],
    texto: 'Oficina, papelería, artículos promocionales, bordados, stickers y limpieza. Un solo proveedor, una sola llamada.',
    fondo: './img/hero/flatlay-azul.webp',
    cta: { to: '/catalogo', label: 'Explorar catálogo' },
    visual: 'collage',
    fotos: ['./img/productos/of-02.webp', './img/productos/po-02.webp', './img/productos/pa-02.webp', './img/productos/li-01.webp'],
  },
  {
    id: 'marca',
    etiqueta: 'Personalización',
    titulo: ['Tu marca,', 'en todo lo que usas.'],
    texto: 'Polos bordados, tazas, termos, gorras y más. Elige el color, sube tu logo y mira cómo queda antes de pedirlo.',
    fondo: './img/hero/flatlay-amarillo.webp',
    cta: { to: '/personaliza', label: 'Personalizar ahora' },
    visual: 'mockups',
  },
  {
    id: 'oficina',
    etiqueta: 'Oficina y papelería',
    titulo: ['Suministros que', 'nunca se agotan.'],
    texto: 'Resmas, carpetas, tóner, cuadernos y todo lo que tu equipo usa a diario, entregado en tu empresa.',
    fondo: './img/hero/oficina.webp',
    cta: { to: '/catalogo/oficina', label: 'Ver artículos de oficina' },
    visual: 'collage',
    fotos: ['./img/productos/of-01.webp', './img/productos/of-04.webp', './img/productos/pa-01.webp', './img/productos/pa-06.webp'],
  },
  {
    id: 'numeros',
    etiqueta: 'Contabilidad y asesoría',
    titulo: ['Tus números,', 'en orden y a tiempo.'],
    texto: 'Contabilidad, auditoría y asesoría fiscal para cumplir con la ley y tomar mejores decisiones.',
    fondo: './img/hero/contabilidad.webp',
    cta: { to: '/servicios', label: 'Conocer servicios' },
    visual: 'finanzas',
  },
]

const DURACION = 7000

export default function HeroSlider() {
  const { abrir } = useCotizacion()
  const [actual, setActual] = useState(0)
  const toque = useRef(null)
  const s = SLIDES[actual]

  const ir = (n) => setActual((n + SLIDES.length) % SLIDES.length)

  // Avanza solo, sin detenerse; cada cambio manual reinicia el temporizador.
  useEffect(() => {
    const t = setTimeout(() => ir(actual + 1), DURACION)
    return () => clearTimeout(t)
  }, [actual])

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ganet-ink pb-32 pt-28 text-white lg:min-h-[92vh] lg:pt-36"
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (toque.current ?? 0)
        if (Math.abs(dx) > 50) ir(actual + (dx < 0 ? 1 : -1))
      }}
    >
      {/* Fondos con transición */}
      {SLIDES.map((sl, i) => (
        <div key={sl.id} className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${i === actual ? 'opacity-100' : 'opacity-0'}`}>
          <img key={i === actual ? `${sl.id}-on` : sl.id} src={sl.fondo} alt="" className={`h-full w-full object-cover ${i === actual ? 'animate-kenburns' : ''}`} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ganet-ink via-ganet-ink/90 to-ganet-ink/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ganet-ink via-transparent to-ganet-ink/60" />
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 animate-glow rounded-full bg-ganet-blue/30 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 animate-glow rounded-full bg-ganet-green/30 blur-[120px] [animation-delay:2s]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 md:px-20 2xl:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div key={s.id}>
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-ganet-cyan/30 bg-ganet-cyan/10 px-3 py-1 text-xs font-medium text-ganet-cyan backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ganet-lime" />
            {s.etiqueta}
          </span>
          <h1 className="mt-6 animate-fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight [animation-delay:80ms] sm:text-5xl lg:text-[4.2rem]">
            {s.titulo[0]}
            <span className="block text-gradient">{s.titulo[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base text-slate-300 [animation-delay:160ms] sm:text-lg">{s.texto}</p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link
              to={s.cta.to}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3.5 font-semibold text-ganet-ink shadow-xl shadow-ganet-blue/30 transition hover:brightness-110"
            >
              {s.cta.label}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <button
              onClick={abrir}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:border-ganet-lime hover:text-ganet-lime"
            >
              <ClipboardList className="h-4 w-4" />
              Pedir cotización
            </button>
          </div>
        </div>

        <div key={`v-${s.id}`} className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[30rem]">
          {s.visual === 'collage' && <Collage fotos={s.fotos} />}
          {s.visual === 'mockups' && <Mockups />}
          {s.visual === 'finanzas' && <Finanzas />}
        </div>
      </div>

      {/* Flechas a los lados */}
      {[
        { dir: -1, Icono: ChevronLeft, lado: 'left-3 xl:left-8', label: 'Anterior' },
        { dir: 1, Icono: ChevronRight, lado: 'right-3 xl:right-8', label: 'Siguiente' },
      ].map(({ dir, Icono, lado, label }) => (
        <button
          key={dir}
          onClick={() => ir(actual + dir)}
          aria-label={label}
          className={`group absolute top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition hover:border-ganet-cyan hover:bg-ganet-cyan hover:text-ganet-ink md:grid ${lado}`}
        >
          <Icono className="h-6 w-6 transition group-hover:scale-110" />
        </button>
      ))}

      {/* Indicadores */}
      <div className="absolute inset-x-0 bottom-20 z-10 mx-auto flex max-w-7xl items-center gap-6 px-4 sm:bottom-24 sm:px-6 md:px-20 2xl:px-6">
        <span className="font-display text-sm tabular-nums text-slate-400">
          <span className="text-lg font-bold text-white">{String(actual + 1).padStart(2, '0')}</span> / {String(SLIDES.length).padStart(2, '0')}
        </span>
        <div className="flex flex-1 gap-2">
          {SLIDES.map((sl, i) => (
            <button key={sl.id} onClick={() => ir(i)} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15 sm:max-w-24" aria-label={`Ir a ${sl.etiqueta}`}>
              {i < actual && <span className="absolute inset-0 bg-white/60" />}
              {i === actual && (
                <span
                  key={actual}
                  className="absolute inset-0 origin-left animate-progreso bg-gradient-to-r from-ganet-cyan to-ganet-lime"
                  style={{ animationDuration: `${DURACION}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <svg className="absolute inset-x-0 bottom-0 h-14 w-full text-slate-50 sm:h-20" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C360,120 1080,0 1440,56 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}

function Collage({ fotos }) {
  // Capas separadas: posición + entrada, giro fijo y flotación (cada animación usa transform).
  const pos = ['left-0 top-[4%] w-[52%]', 'right-0 top-0 w-[44%]', 'left-[6%] bottom-[2%] w-[42%]', 'right-[4%] bottom-[8%] w-[50%]']
  const giro = ['-rotate-6', 'rotate-6', 'rotate-3', '-rotate-3']
  return (
    <>
      {fotos.map((f, i) => (
        <div key={f} className={`absolute animate-fade-up ${pos[i]}`} style={{ animationDelay: `${i * 120}ms` }}>
          <div className={giro[i]}>
            <div className="animate-float-lento overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1.5 shadow-2xl shadow-black/40 backdrop-blur" style={{ animationDelay: `${i * 1.2}s` }}>
              <img src={f} alt="" className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-24 w-24 animate-fade-up place-items-center rounded-3xl border border-white/20 bg-ganet-ink/70 shadow-2xl shadow-ganet-cyan/30 backdrop-blur-xl [animation-delay:500ms]">
          <img src={isotipo} alt="" className="h-14 w-auto drop-shadow-[0_0_20px_rgba(3,233,255,0.6)]" />
        </div>
      </div>
    </>
  )
}

function Mockups() {
  const paleta = COLORES.textil
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => n + 1), 1400)
    return () => clearInterval(t)
  }, [])
  const color = (d) => paleta[(i + d) % paleta.length].hex
  const items = [
    { tipo: 'polo', clase: 'left-[2%] top-[4%] w-[60%]', d: 0, tecnica: 'Bordado' },
    { tipo: 'taza', clase: 'right-0 top-[26%] w-[44%] [animation-delay:2s]', d: 3 },
    { tipo: 'gorra', clase: 'left-[14%] bottom-0 w-[46%] [animation-delay:4s]', d: 5, tecnica: 'Bordado' },
  ]
  return (
    <>
      <div className="absolute inset-[10%] rounded-full bg-white/5 ring-1 ring-white/10" />
      {items.map((m) => (
        <div key={m.tipo} className={`absolute animate-float-lento ${m.clase}`}>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <Mockup tipo={m.tipo} color={color(m.d)} tecnica={m.tecnica} className="w-full" />
          </div>
        </div>
      ))}
      <div className="absolute bottom-[10%] right-[2%] flex gap-1.5 rounded-full border border-white/15 bg-ganet-ink/70 p-2 backdrop-blur">
        {paleta.slice(0, 6).map((c, n) => (
          <span key={c.hex} className={`h-5 w-5 rounded-full ring-1 ring-white/20 transition ${n === i % 6 ? 'scale-125 ring-2 ring-ganet-cyan' : ''}`} style={{ background: c.hex }} />
        ))}
      </div>
    </>
  )
}

function Finanzas() {
  const barras = [42, 68, 54, 82, 61, 90, 74]
  return (
    <div className="absolute inset-[6%] animate-fade-up">
      <div className="h-full rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Estado financiero</p>
            <p className="mt-1 font-display text-xl font-bold">Resumen mensual</p>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-ganet-cyan to-ganet-blue text-ganet-ink">
            <Calculator className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-8 flex h-[45%] items-end gap-3">
          {barras.map((b, i) => (
            <div key={i} className="flex h-full flex-1 items-end">
              <div
                className="w-full origin-bottom animate-barra rounded-t-lg bg-gradient-to-t from-ganet-blue to-ganet-cyan"
                style={{ height: `${b}%`, animationDelay: `${i * 0.25}s` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2.5">
          {['Registros al día', 'Declaraciones DGII', 'Auditoría interna'].map((t) => (
            <div key={t} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-ganet-lime" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
