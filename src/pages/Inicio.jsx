import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronLeft, ChevronRight, ClipboardList, MessageCircle, Send, Truck } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import ProductoCard from '../components/ProductoCard'
import Mockup from '../components/Mockup'
import Icono from '../components/Icono'
import { Contador, Reveal, Titulo } from '../components/Animados'
import { CATEGORIAS, COLORES, EMPRESA, PRODUCTOS, SERVICIOS, productoPorId } from '../data/catalogo'
import { abrirWhatsapp, useCotizacion } from '../context/Cotizacion'

export default function Inicio() {
  return (
    <>
      <HeroSlider />
      <Cinta />
      <Destacados />
      <PersonalizaEnVivo />
      <Cifras />
      <NosotrosTeaser />
      <ServiciosTeaser />
      <ComoCotizar />
      <LlamadoFinal />
    </>
  )
}

function Cinta() {
  const textos = [...CATEGORIAS.map((c) => c.nombre), ...SERVICIOS.map((s) => s.nombre)]
  return (
    <div className="mask-fade-x overflow-hidden bg-slate-50 py-6">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...textos, ...textos].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-bold uppercase tracking-[0.15em] text-slate-300">
            {t}
            <span className="h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-ganet-cyan to-ganet-lime" />
          </span>
        ))}
      </div>
    </div>
  )
}

// Los artículos esenciales que se muestran en el carrusel del inicio.
const ESENCIALES = ['of-01', 'te-01', 'po-01', 'pa-01', 'li-01', 'st-01']
const INTERVALO = 3500

function Destacados() {
  const items = ESENCIALES.map(productoPorId).filter(Boolean)
  const n = items.length
  const pista = useRef(null)
  const [i, setI] = useState(0)
  const [animar, setAnimar] = useState(true)
  const [paso, setPaso] = useState(0)

  // Ancho de una tarjeta + separación, para desplazar la pista.
  useEffect(() => {
    const medir = () => {
      const el = pista.current?.children[0]
      if (el) setPaso(el.getBoundingClientRect().width + 24)
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  // Avanza solo; cada movimiento (automático o manual) reinicia el temporizador.
  useEffect(() => {
    const t = setTimeout(() => setI((x) => x + 1), INTERVALO)
    return () => clearTimeout(t)
  }, [i])

  // Al pasar a la copia, vuelve al original sin animación (el salto es invisible).
  useEffect(() => {
    if (i < n) return
    const t = setTimeout(() => {
      setAnimar(false)
      setI((v) => (v >= n ? v - n : v))
    }, 720)
    return () => clearTimeout(t)
  }, [i, n])

  // Al reiniciar sin animación, se reactiva en el siguiente cuadro.
  useEffect(() => {
    if (animar) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimar(true)))
    return () => cancelAnimationFrame(r)
  }, [animar])

  const siguiente = () => setI((x) => Math.min(x + 1, 2 * n - 1))
  const anterior = () => {
    if (i > 0) return setI(i - 1)
    // Desde la primera: salta a la copia sin animación y retrocede una.
    setAnimar(false)
    setI(n)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setAnimar(true)
      setI(n - 1)
    }))
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-ganet-cyan/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-ganet-lime/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <Titulo etiqueta="Lo más pedido">Lo esencial para tu empresa</Titulo>
          <Link to="/catalogo" className="group inline-flex items-center gap-2 text-sm font-semibold text-ganet-blue">
            Ver catálogo completo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal retraso={100} className="relative mt-12">
          <div className="overflow-hidden px-1 py-4">
            <div
              ref={pista}
              className={`flex gap-6 ${animar ? 'transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]' : ''}`}
              style={{ transform: `translateX(-${i * paso}px)` }}
            >
              {[...items, ...items].map((p, k) => (
                <div key={`${p.id}-${k}`} className="w-[82%] shrink-0 sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)]">
                  <ProductoCard producto={p} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          {[
            { fn: anterior, Icono: ChevronLeft, lado: 'left-0 -translate-x-1/3 xl:-translate-x-1/2', label: 'Anterior' },
            { fn: siguiente, Icono: ChevronRight, lado: 'right-0 translate-x-1/3 xl:translate-x-1/2', label: 'Siguiente' },
          ].map(({ fn, Icono: I, lado, label }) => (
            <button
              key={label}
              onClick={fn}
              aria-label={label}
              className={`absolute top-1/2 z-10 -mt-6 grid h-11 w-11 place-items-center rounded-full bg-white sm:-mt-7 sm:h-14 sm:w-14 text-ganet-ink shadow-xl shadow-slate-900/15 ring-1 ring-slate-200 transition hover:scale-110 hover:bg-ganet-ink hover:text-white ${lado}`}
            >
              <I className="h-6 w-6" />
            </button>
          ))}

          <div className="mt-6 flex justify-center gap-2">
            {items.map((p, k) => (
              <button
                key={p.id}
                onClick={() => setI(k)}
                aria-label={p.nombre}
                className={`h-2 rounded-full transition-all duration-500 ${i % n === k ? 'w-10 bg-gradient-to-r from-ganet-cyan to-ganet-blue' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const TIPOS_DEMO = [
  { tipo: 'camiseta', nombre: 'Camiseta', paleta: 'textil', tecnica: 'Serigrafía' },
  { tipo: 'polo', nombre: 'Polo', paleta: 'textil', tecnica: 'Bordado' },
  { tipo: 'taza', nombre: 'Taza', paleta: 'pop' },
  { tipo: 'gorra', nombre: 'Gorra', paleta: 'textil', tecnica: 'Bordado' },
  { tipo: 'termo', nombre: 'Termo', paleta: 'metal', tecnica: 'Grabado láser' },
  { tipo: 'bolsa', nombre: 'Bolsa', paleta: 'natural' },
]

function PersonalizaEnVivo() {
  const [tipo, setTipo] = useState(TIPOS_DEMO[0])
  const [n, setN] = useState(0)
  const [auto, setAuto] = useState(true)
  const paleta = COLORES[tipo.paleta]
  const color = paleta[n % paleta.length]

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setN((x) => x + 1), 1600)
    return () => clearInterval(t)
  }, [auto])

  return (
    <section className="relative isolate overflow-hidden bg-ganet-ink py-24 text-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute -right-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full blur-[140px] transition-colors duration-700" style={{ background: `${color.hex}55` }} />
      <div className="absolute -left-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-ganet-blue/25 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <Titulo etiqueta="Personaliza en vivo" oscuro>
            Míralo con tu marca <span className="text-gradient">antes de pedirlo</span>
          </Titulo>
          <p className="mt-5 max-w-lg text-slate-400">
            Elige el producto, prueba colores y técnicas, sube tu logo y escribe tu eslogan. Lo que ves es lo que nos llega en tu cotización.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {TIPOS_DEMO.map((t) => (
              <button
                key={t.tipo}
                onClick={() => {
                  setTipo(t)
                  setN(0)
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  tipo.tipo === t.tipo ? 'bg-white text-ganet-ink' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {t.nombre}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            {paleta.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => {
                  setAuto(false)
                  setN(i)
                }}
                title={c.nombre}
                className={`h-9 w-9 rounded-full ring-1 ring-white/20 transition hover:scale-110 ${color.hex === c.hex ? 'scale-110 ring-2 ring-ganet-cyan ring-offset-2 ring-offset-ganet-ink' : ''}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Color: <span className="font-semibold text-white">{color.nombre}</span>
            {tipo.tecnica && <> · Técnica: <span className="font-semibold text-white">{tipo.tecnica}</span></>}
          </p>

          <Link
            to="/personaliza"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3.5 font-semibold text-ganet-ink shadow-xl shadow-ganet-blue/30 transition hover:brightness-110"
          >
            Abrir el estudio de personalización
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal retraso={150} className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur" />
          <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-200" />
          <div className="absolute inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_35%,rgba(34,189,250,.25),transparent_60%)]" />
          <Mockup key={tipo.tipo} tipo={tipo.tipo} color={color.hex} tecnica={tipo.tecnica} texto="TU MARCA" className="absolute inset-10 animate-fade-up" />
          <span className="absolute right-2 top-10 rotate-6 sm:-right-3 rounded-2xl bg-ganet-lime px-4 py-2 text-sm font-bold text-ganet-ink shadow-xl">¡Pruébalo!</span>
        </Reveal>
      </div>
    </section>
  )
}

function Cifras() {
  const datos = [
    { n: CATEGORIAS.length, label: 'Líneas de productos' },
    { n: PRODUCTOS.length, prefijo: '+', label: 'Artículos en catálogo' },
    { n: SERVICIOS.length, label: 'Servicios profesionales' },
    { n: 100, sufijo: '%', label: 'Personalizable con tu marca' },
  ]
  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 lg:grid-cols-4">
        {datos.map((d) => (
          <div key={d.label} className="bg-white p-6 text-center sm:p-8">
            <p className="font-display text-4xl font-extrabold text-ganet-ink sm:text-5xl">
              <Contador hasta={d.n} prefijo={d.prefijo} sufijo={d.sufijo} />
            </p>
            <p className="mt-2 text-sm text-slate-500">{d.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function NosotrosTeaser() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
      <Reveal className="relative">
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img src="./img/hero/equipo.webp" alt="Equipo de trabajo" className="aspect-[4/3.4] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ganet-ink/70 via-transparent" />
        </div>
        <div className="absolute -bottom-8 right-4 w-56 animate-float-lento rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-100 sm:-right-8">
          <p className="font-display text-sm font-bold text-ganet-ink">{EMPRESA.ceo}</p>
          <p className="text-xs text-slate-500">CEO & Founder</p>
          <p className="mt-3 text-sm text-slate-600">Al frente de un equipo que cuida cada detalle de tu empresa.</p>
        </div>
        <div className="absolute -left-5 -top-5 h-24 w-24 rounded-3xl bg-gradient-to-br from-ganet-cyan to-ganet-lime opacity-80 blur-[2px]" />
      </Reveal>

      <Reveal retraso={120}>
        <Titulo etiqueta="Sobre nosotros">
          Un aliado, <span className="text-gradient">todas las soluciones</span>
        </Titulo>
        <p className="mt-5 text-slate-600">
          En Ganet Soluciones Empresariales reunimos en un solo lugar lo que tu empresa necesita para operar: suministros, personalización de marca, productos de limpieza y servicios contables.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {['Un solo proveedor para todo', 'Atención personalizada', 'Calidad garantizada', 'Entrega a tu empresa'].map((t) => (
            <li key={t} className="flex items-center gap-3 text-sm font-medium text-ganet-ink">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ganet-lime/20 text-ganet-green"><Check className="h-3.5 w-3.5" /></span>
              {t}
            </li>
          ))}
        </ul>
        <Link to="/nosotros" className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ganet-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ganet-blue">
          Conoce nuestra historia <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

function ServiciosTeaser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <Titulo etiqueta="Servicios profesionales" centro>
            También cuidamos <span className="text-gradient">tus números</span>
          </Titulo>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.id} retraso={i * 100}>
              <Link to="/servicios" className="group relative block h-full overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-ganet-cyan/20 to-ganet-lime/20 transition group-hover:scale-150" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ganet-ink text-ganet-cyan shadow-lg">
                  <Icono nombre={s.icono} className="h-6 w-6" />
                </span>
                <h3 className="relative mt-6 font-display text-xl font-bold text-ganet-ink">{s.nombre}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-500">{s.descripcion}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ganet-blue transition group-hover:gap-3">
                  Saber más <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const PASOS = [
  { icono: ClipboardList, titulo: 'Arma tu lista', texto: 'Explora el catálogo, personaliza y agrega lo que necesitas.' },
  { icono: Send, titulo: 'Envíala por WhatsApp', texto: 'Con un clic nos llega tu pedido detallado, sin formularios largos.' },
  { icono: Truck, titulo: 'Recibe y aprueba', texto: 'Te enviamos precios y tiempos. Aprobada, la llevamos a tu empresa.' },
]

function ComoCotizar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal>
        <Titulo etiqueta="Cómo cotizar" centro>
          Tres pasos, cero complicaciones
        </Titulo>
      </Reveal>
      <ol className="relative mt-16 grid gap-12 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-9 hidden h-0.5 bg-gradient-to-r from-ganet-cyan via-ganet-blue to-ganet-lime md:block" />
        {PASOS.map(({ icono: I, titulo, texto }, i) => (
          <Reveal as="li" key={titulo} retraso={i * 150} className="relative text-center">
            <span className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-3xl bg-white text-ganet-blue shadow-xl ring-1 ring-slate-200">
              <I className="h-8 w-8" />
              <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-ganet-lime text-sm font-bold text-ganet-ink">{i + 1}</span>
            </span>
            <h3 className="mt-6 font-display text-lg font-semibold text-ganet-ink">{titulo}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500">{texto}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function LlamadoFinal() {
  const { abrir } = useCotizacion()
  return (
    <section className="px-4 pb-24 sm:px-6">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ganet-blue via-ganet-sky to-ganet-cyan p-10 text-ganet-ink sm:p-16">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <span className="pointer-events-none absolute -right-10 -top-24 select-none font-display text-[18rem] font-extrabold leading-none text-white/20">G</span>
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">¿Listo para equipar tu empresa?</h2>
          <p className="mt-4 text-lg text-ganet-ink/80">Arma tu cotización en minutos o escríbenos directamente. Te respondemos rápido.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={abrir} className="inline-flex items-center gap-2 rounded-full bg-ganet-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ganet-night">
              <ClipboardList className="h-4 w-4" /> Ver mi cotización
            </button>
            <button
              onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, quisiera más información.')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ganet-ink transition hover:bg-slate-100"
            >
              <MessageCircle className="h-4 w-4" /> Escríbenos
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
