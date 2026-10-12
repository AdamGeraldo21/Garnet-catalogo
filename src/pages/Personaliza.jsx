import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Sparkles } from 'lucide-react'
import Mockup from '../components/Mockup'
import { ControlesPersonalizacion, detallesCotizacion, propsMockup } from '../components/Personalizador'
import { PageHeader, Reveal, Titulo } from '../components/Animados'
import { PRODUCTOS, coloresDe } from '../data/catalogo'
import { useCotizacion } from '../context/Cotizacion'

const PERSONALIZABLES = PRODUCTOS.filter((p) => p.mockup)

export default function Personaliza() {
  const { agregar } = useCotizacion()
  const [producto, setProducto] = useState(PERSONALIZABLES[0])
  const [estado, setEstado] = useState({
    color: coloresDe(PERSONALIZABLES[0])[0],
    tecnica: PERSONALIZABLES[0].tecnicas?.[0] || '',
    logo: null,
    usarIsotipo: true,
    texto: 'TU MARCA',
    fuente: 'Sora',
    colorTexto: '',
  })
  const set = (c) => setEstado((e) => ({ ...e, ...c }))

  const elegir = (p) => {
    const colores = coloresDe(p)
    setProducto(p)
    set({
      color: colores.find((c) => c.hex === estado.color.hex) || colores[0],
      tecnica: p.tecnicas?.includes(estado.tecnica) ? estado.tecnica : p.tecnicas?.[0] || '',
    })
  }

  return (
    <>
      <PageHeader
        etiqueta="Estudio de personalización"
        titulo={<>Diseña con tu marca, <span className="text-gradient">en vivo</span></>}
        subtitulo="Sube tu logo una vez y pruébalo en todos nuestros productos. Cambia colores, técnicas y textos, y agrega a tu cotización lo que más te guste."
        imagen="./img/hero/flatlay-amarillo.webp"
      />

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 lg:grid-cols-[200px_minmax(0,1fr)_380px] [&>*]:min-w-0">
          {/* Selector de producto: en escritorio ocupa el alto de la fila y se desplaza */}
          <div className="relative border-b border-slate-200 bg-slate-50/70 lg:border-b-0 lg:border-r">
          <div className="no-scrollbar flex gap-2 overflow-x-auto p-3 lg:absolute lg:inset-0 lg:flex-col lg:overflow-y-auto">
            {PERSONALIZABLES.map((p) => {
              const activo = p.id === producto.id
              return (
                <button
                  key={p.id}
                  onClick={() => elegir(p)}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl p-2 pr-3 text-left transition ${activo ? 'bg-white text-ganet-ink shadow-md ring-1 ring-ganet-sky/40' : 'text-slate-600 hover:bg-white hover:text-ganet-ink'}`}
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${activo ? 'bg-sky-50' : 'bg-white ring-1 ring-slate-200'}`}>
                    <Mockup tipo={p.mockup} color={coloresDe(p)[activo ? coloresDe(p).findIndex((c) => c.hex === estado.color.hex) : 0]?.hex || estado.color.hex} usarIsotipo={false} className="h-11 w-11" />
                  </span>
                  <span className="text-sm font-medium leading-tight">{p.nombre}</span>
                </button>
              )
            })}
          </div>
          </div>

          {/* Escenario */}
          <div className="relative grid min-h-[22rem] place-items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-100 p-6 sm:min-h-[32rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,189,250,.25),transparent_60%)]" />
            <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700" style={{ background: `${estado.color.hex}40` }} />
            <Mockup key={producto.id} tipo={producto.mockup} color={estado.color.hex} {...propsMockup(estado)} className="relative w-full max-w-md animate-fade-up drop-shadow-xl" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ganet-ink shadow-sm ring-1 ring-slate-200 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-ganet-blue" /> {producto.nombre} · {estado.color.nombre}
            </div>
          </div>

          {/* Controles */}
          <div className="flex flex-col gap-6 border-t border-slate-200 p-6 sm:p-7 lg:border-l lg:border-t-0">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Producto</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ganet-ink">{producto.nombre}</h2>
              <Link to={`/producto/${producto.id}`} className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-ganet-blue hover:underline">
                Ver ficha completa <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ControlesPersonalizacion producto={producto} estado={estado} set={set} />
            <button
              onClick={() => agregar(producto, 1, detallesCotizacion(estado, producto.opciones?.[0] || ''))}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3.5 font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/25 transition hover:brightness-110"
            >
              <Plus className="h-4 w-4" /> Agregar a mi cotización
            </button>
          </div>
        </div>
      </section>

      {/* Tu marca en todo */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <Titulo etiqueta="Tu marca en todo">Así se ve tu identidad en cada producto</Titulo>
          <p className="mt-3 max-w-2xl text-slate-500">Toca cualquiera para editarlo arriba.</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PERSONALIZABLES.map((p, i) => {
            const colores = coloresDe(p)
            const color = colores.find((c) => c.hex === estado.color.hex) || colores[0]
            return (
              <Reveal key={p.id} retraso={(i % 5) * 60}>
                <button
                  onClick={() => {
                    elegir(p)
                    window.scrollTo({ top: 200, behavior: 'smooth' })
                  }}
                  className={`group w-full overflow-hidden rounded-3xl bg-white text-left ring-1 transition hover:-translate-y-1 hover:shadow-xl ${p.id === producto.id ? 'ring-2 ring-ganet-blue' : 'ring-slate-200'}`}
                >
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-sky-50 p-3">
                    <Mockup tipo={p.mockup} color={color.hex} {...propsMockup({ ...estado, tecnica: p.tecnicas?.includes(estado.tecnica) ? estado.tecnica : p.tecnicas?.[0] })} className="h-full w-full transition duration-500 group-hover:scale-105" />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-ganet-ink">{p.nombre}</p>
                </button>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
