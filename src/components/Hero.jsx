import { ArrowRight, ClipboardList } from 'lucide-react'
import Icono from './Icono'
import logo from '../assets/logo-mark.png'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo'

export default function Hero({ onElegirCategoria, onAbrirCotizacion }) {
  const n = CATEGORIAS.length

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-ganet-ink pb-28 pt-28 text-white sm:pt-32 lg:pb-36">
      {/* Fondo: cuadrícula, luces y la "G" gigante del manual de marca */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 animate-glow rounded-full bg-ganet-blue/30 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 animate-glow rounded-full bg-ganet-green/30 blur-[120px] [animation-delay:2s]" />
      <div className="absolute right-1/3 top-1/3 -z-10 h-64 w-64 animate-glow rounded-full bg-ganet-cyan/20 blur-[100px] [animation-delay:1s]" />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-10 -z-10 select-none font-display text-[22rem] font-extrabold leading-none text-white/[0.03] sm:text-[30rem]"
      >
        G
      </span>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Texto */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-ganet-cyan/30 bg-ganet-cyan/10 px-3 py-1 text-xs font-medium text-ganet-cyan">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ganet-lime" />
            Catálogo {new Date().getFullYear()}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Todo lo que tu empresa necesita,
            <span className="block text-gradient">en un solo lugar.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            Suministros de oficina, papelería, artículos promocionales, bordados, stickers y productos de limpieza,
            además de contabilidad y asesoría fiscal para que tu negocio funcione sin pausas.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3 font-semibold text-ganet-ink shadow-xl shadow-ganet-blue/30 transition hover:brightness-110"
            >
              Explorar catálogo
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <button
              onClick={onAbrirCotizacion}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-ganet-lime hover:text-ganet-lime"
            >
              <ClipboardList className="h-4 w-4" />
              Pedir cotización
            </button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
              [n, 'Líneas de productos'],
              [`+${PRODUCTOS.length}`, 'Artículos'],
              ['100%', 'Personalizable'],
            ].map(([valor, etiqueta]) => (
              <div key={etiqueta}>
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{valor}</dt>
                <dd className="mt-1 text-xs text-slate-400">{etiqueta}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Isotipo con órbita de categorías */}
        <div className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[28rem]">
          <div className="absolute inset-[8%] rounded-full border border-dashed border-ganet-sky/25" />
          <div className="absolute inset-[24%] rounded-full border border-ganet-cyan/15" />
          <div className="absolute inset-[30%] rounded-full bg-ganet-blue/20 blur-3xl" />

          <img
            src={logo}
            alt="Isotipo Ganet"
            className="absolute left-[29%] top-[29%] w-[42%] animate-float drop-shadow-[0_0_40px_rgba(3,233,255,0.45)]"
          />

          <div className="absolute inset-[8%] animate-orbit">
            {CATEGORIAS.map((c, i) => {
              const angulo = (i / n) * 2 * Math.PI - Math.PI / 2
              return (
                <button
                  key={c.id}
                  onClick={() => onElegirCategoria(c.id)}
                  title={c.nombre}
                  aria-label={c.nombre}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 50 * Math.cos(angulo)}%`, top: `${50 + 50 * Math.sin(angulo)}%` }}
                >
                  <span
                    className={`grid h-12 w-12 animate-orbit-rev place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-lg ring-4 ring-ganet-ink transition hover:scale-110 sm:h-14 sm:w-14`}
                  >
                    <Icono nombre={c.icono} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Borde inferior curvo */}
      <svg className="absolute inset-x-0 bottom-0 h-16 w-full text-slate-50 sm:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C360,120 1080,0 1440,56 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}
