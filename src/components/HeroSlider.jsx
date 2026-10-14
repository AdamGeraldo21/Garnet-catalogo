import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react'
import Icono from './Icono'
import { useCotizacion } from '../context/Cotizacion'

// Cada diapositiva: texto a la izquierda y una foto grande a la derecha con un dato real.
const SLIDES = [
  {
    id: 'todo',
    etiqueta: `Catálogo ${new Date().getFullYear()}`,
    titulo: ['Todo lo que tu empresa necesita,', 'en un solo lugar.'],
    texto: 'Oficina, papelería, artículos promocionales, bordados, stickers y limpieza. Un solo proveedor, una sola llamada.',
    foto: './img/hero/flatlay-azul.webp',
    pie: 'Suministros de oficina y papelería',
    dato: { icono: 'Boxes', valor: '6 líneas', texto: 'de productos para tu empresa' },
    cta: { to: '/catalogo', label: 'Explorar catálogo' },
  },
  {
    id: 'marca',
    etiqueta: 'Personalización',
    titulo: ['Tu marca,', 'en todo lo que usas.'],
    texto: 'Polos bordados, tazas, termos, gorras y stickers. Elige el color, sube tu logo y mira cómo queda antes de pedirlo.',
    foto: './img/productos/st-01.webp',
    pie: 'Stickers troquelados con logo',
    dato: { icono: 'Palette', valor: 'Bordado y serigrafía', texto: 'sublimación y grabado láser' },
    cta: { to: '/personaliza', label: 'Personalizar ahora' },
  },
  {
    id: 'oficina',
    etiqueta: 'Oficina y papelería',
    titulo: ['Suministros que', 'nunca se agotan.'],
    texto: 'Resmas, carpetas, tóner, cuadernos y todo lo que tu equipo usa a diario, entregado en tu empresa.',
    foto: './img/hero/oficina.webp',
    pie: 'Entrega directa en tu oficina',
    dato: { icono: 'Truck', valor: 'Entrega', texto: 'en Santo Domingo y alrededores' },
    cta: { to: '/catalogo/oficina', label: 'Ver artículos de oficina' },
  },
  {
    id: 'numeros',
    etiqueta: 'Contabilidad y asesoría',
    titulo: ['Tus números,', 'en orden y a tiempo.'],
    texto: 'Contabilidad, auditoría y asesoría fiscal para cumplir con la ley y tomar mejores decisiones.',
    foto: './img/hero/contabilidad.webp',
    pie: 'Contabilidad, auditoría y asesoría fiscal',
    dato: { icono: 'ShieldCheck', valor: 'Al día con la DGII', texto: 'declaraciones y estados financieros' },
    cta: { to: '/servicios', label: 'Conocer servicios' },
  },
]

const DURACION = 7000

export default function HeroSlider() {
  const { abrir } = useCotizacion()
  const [actual, setActual] = useState(0)
  const toque = useRef(null)
  const s = SLIDES[actual]

  const ir = (n) => setActual((n + SLIDES.length) % SLIDES.length)

  // Avanza solo; cada cambio manual reinicia el temporizador.
  useEffect(() => {
    const t = setTimeout(() => ir(actual + 1), DURACION)
    return () => clearTimeout(t)
  }, [actual])

  return (
    <section
      className="relative isolate overflow-hidden bg-ganet-ink pb-24 pt-28 text-white lg:pb-32 lg:pt-36"
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (toque.current ?? 0)
        if (Math.abs(dx) > 50) ir(actual + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 md:px-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 2xl:px-6">
        {/* Texto */}
        <div key={s.id} className="min-w-0">
          <p className="flex animate-fade-up items-center gap-3 text-sm font-medium text-ganet-sky">
            <span className="h-px w-8 bg-current opacity-60" />
            {s.etiqueta}
          </p>
          <h1 className="mt-6 animate-fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight [animation-delay:80ms] sm:text-5xl lg:text-[3.9rem]">
            {s.titulo[0]} <span className="text-gradient text-ganet-sky">{s.titulo[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-slate-300 [animation-delay:160ms] sm:text-lg">{s.texto}</p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link to={s.cta.to} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ganet-ink transition hover:bg-ganet-sky hover:text-white">
              {s.cta.label}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <button onClick={abrir} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white/5">
              <ClipboardList className="h-4 w-4" />
              Pedir cotización
            </button>
          </div>

          {/* Indicadores discretos */}
          <div className="mt-12 flex items-center gap-2">
            {SLIDES.map((sl, i) => (
              <button
                key={sl.id}
                onClick={() => ir(i)}
                aria-label={`Ir a ${sl.etiqueta}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === actual ? 'w-8 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Foto */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ganet-night sm:aspect-[5/5] lg:aspect-[4/4.4]">
            {SLIDES.map((sl, i) => (
              <img
                key={sl.id}
                src={sl.foto}
                alt={sl.pie}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out ${i === actual ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            <p key={`p-${s.id}`} className="absolute bottom-5 right-5 max-w-[55%] animate-fade-up text-right text-sm font-medium text-white/90">{s.pie}</p>
          </div>

          <div key={`d-${s.id}`} className="absolute -bottom-6 -left-4 flex max-w-[16rem] animate-fade-up items-center gap-3 rounded-2xl bg-white p-4 text-ganet-ink shadow-xl shadow-black/20 [animation-delay:200ms] sm:-left-8">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-ganet-blue">
              <Icono nombre={s.dato.icono} className="h-5 w-5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-sm font-bold">{s.dato.valor}</span>
              <span className="text-xs text-slate-500">{s.dato.texto}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Flechas a los lados */}
      {[
        { dir: -1, Icono: ChevronLeft, lado: 'left-3 xl:left-8', label: 'Anterior' },
        { dir: 1, Icono: ChevronRight, lado: 'right-3 xl:right-8', label: 'Siguiente' },
      ].map(({ dir, Icono: I, lado, label }) => (
        <button
          key={dir}
          onClick={() => ir(actual + dir)}
          aria-label={label}
          className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white transition hover:border-white hover:bg-white hover:text-ganet-ink md:grid ${lado}`}
        >
          <I className="h-5 w-5" />
        </button>
      ))}

      <svg className="absolute inset-x-0 bottom-0 h-12 w-full text-slate-50 sm:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C360,120 1080,0 1440,56 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}
