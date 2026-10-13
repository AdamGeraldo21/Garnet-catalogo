import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { Camera, Check, ChevronDown, ChevronRight, MessageCircle, Minus, Palette, Plus, ShieldCheck, Sparkles, Truck, ZoomIn } from 'lucide-react'
import ProductoCard from '../components/ProductoCard'
import VistaProducto from '../components/VistaProducto'
import Icono from '../components/Icono'
import { ControlesPersonalizacion, detallesCotizacion, propsMockup, usePersonalizacion } from '../components/Personalizador'
import { Reveal, Titulo } from '../components/Animados'
import { EMPRESA, PRODUCTOS, categoriaDe, productoPorId } from '../data/catalogo'
import { abrirWhatsapp, describirDetalles, useCotizacion } from '../context/Cotizacion'
import NoEncontrado from './NoEncontrado'

// Puntos destacados por línea (se muestran en la ficha).
const DESTACADOS = {
  oficina: ['Marcas reconocidas', 'Por caja o por unidad', 'Reabastecimiento para tu oficina'],
  papeleria: ['Calidad escolar y profesional', 'Listas escolares completas', 'Precios por volumen'],
  pop: ['Con el logo de tu empresa', 'Ideal para eventos y regalos', 'Varias técnicas de impresión'],
  textil: ['Bordado y serigrafía duraderos', 'Tallas S a XXL', 'Uniformes para todo tu equipo'],
  stickers: ['Vinil resistente al agua', 'Corte a la medida', 'Impresión a todo color'],
  limpieza: ['Hogar, oficina e industria', 'Por galón o cubeta', 'Aromas a elección'],
}
const CANTIDADES_RAPIDAS = [1, 5, 10, 25, 50, 100]
const VOLUMEN = 25

export default function Producto() {
  const { id } = useParams()
  const producto = productoPorId(id)
  if (!producto) return <NoEncontrado />
  return <Detalle key={producto.id} producto={producto} />
}

function Detalle({ producto }) {
  const categoria = categoriaDe(producto)
  const { agregar } = useCotizacion()
  const [estado, set] = usePersonalizacion(producto)
  const [opcion, setOpcion] = useState(producto.opciones?.[0] || '')
  const [cantidad, setCantidad] = useState(1)
  const [vista, setVista] = useState(producto.mockup ? 'mockup' : 'foto')
  const [agregado, setAgregado] = useState(false)
  const relacionados = PRODUCTOS.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 4)
  const esTalla = /^(S|M|L|XL|XXL)$/.test(producto.opciones?.[0] || '')

  const detalles = producto.mockup ? detallesCotizacion(estado, opcion) : { opcion }
  const resumen = describirDetalles(detalles)

  const consultar = () =>
    abrirWhatsapp(EMPRESA.whatsapp, `Hola Ganet, quisiera información sobre *${producto.nombre}* (${cantidad} × ${producto.unidad}).\n${resumen.join(' · ')}`)

  const agregarLista = () => {
    agregar(producto, cantidad, detalles)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 1800)
  }

  // Vistas disponibles en la galería
  const vistas = [
    producto.mockup && { id: 'mockup', label: 'Personalizado', icono: Palette },
    producto.imagen && { id: 'foto', label: 'Foto', icono: Camera },
  ].filter(Boolean)

  useEffect(() => {
    document.body.dataset.barraProducto = ''
    return () => delete document.body.dataset.barraProducto
  }, [])

  let paso = 0

  return (
    <>
      {/* Encabezado con la ruta y un brillo del color de la línea */}
      <section className="relative overflow-hidden bg-ganet-ink pb-8 pt-24 lg:pt-36">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: categoria.acento }} />
        <nav className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 text-sm sm:px-6" aria-label="Ruta">
          {[
            ['/', 'Inicio'],
            ['/catalogo', 'Catálogo'],
            [`/catalogo/${categoria.id}`, categoria.corto],
          ].map(([to, label]) => (
            <span key={to} className="flex items-center gap-1.5">
              <Link to={to} className="rounded-full px-2.5 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white">{label}</Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            </span>
          ))}
          <span className="truncate rounded-full bg-white/10 px-3 py-1 font-medium text-white">{producto.nombre}</span>
        </nav>
      </section>

      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-ganet-ink to-transparent opacity-[0.04]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Galería */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.75rem] opacity-25 blur-2xl" style={{ background: `linear-gradient(135deg, ${categoria.acento}, transparent 70%)` }} />
              <Visor producto={producto} categoria={categoria} vista={vista} estado={estado} />
            </div>

            {vistas.length > 1 && (
              <div className="mt-4 flex gap-3">
                {vistas.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVista(v.id)}
                    className={`group relative h-20 w-20 overflow-hidden rounded-2xl bg-white transition sm:h-24 sm:w-24 ${
                      vista === v.id ? 'ring-2 ring-ganet-blue ring-offset-2 ring-offset-slate-50' : 'opacity-70 ring-1 ring-slate-200 hover:opacity-100'
                    }`}
                    title={v.label}
                  >
                    {v.id === 'mockup' && <VistaProducto producto={producto} categoria={categoria} color={estado.color.hex} modo="mockup" />}
                    {v.id === 'foto' && <img src={producto.imagen} alt="" className="h-full w-full object-cover" />}
                    <span className="absolute inset-x-1 bottom-1 flex items-center justify-center gap-1 rounded-lg bg-white/90 py-0.5 text-[10px] font-semibold text-ganet-ink backdrop-blur">
                      <v.icono className="h-3 w-3" /> {v.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="lg:pt-4">
            <Link
              to={`/catalogo/${categoria.id}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white py-1 pl-1 pr-4 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:ring-ganet-sky/50"
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${categoria.color} text-white`}>
                <Icono nombre={categoria.icono} className="h-3.5 w-3.5" />
              </span>
              {categoria.nombre}
            </Link>

            <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight text-ganet-ink sm:text-[2.6rem]">{producto.nombre}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {producto.etiqueta && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ganet-lime/15 px-3 py-1 text-xs font-semibold text-ganet-green">
                  <Sparkles className="h-3 w-3" /> {producto.etiqueta}
                </span>
              )}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Se vende por: {producto.unidad}</span>
              {producto.mockup && <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-ganet-blue">Personalizable</span>}
            </div>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">{producto.descripcion}</p>

            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {(DESTACADOS[categoria.id] || []).map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ganet-lime/20 text-ganet-green">
                    <Check className="h-3 w-3" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>

            {/* Configurador por pasos */}
            <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/[0.05] ring-1 ring-slate-200">
              <div className="space-y-7 p-6 sm:p-8">
                {producto.opciones?.length > 0 && (
                  <Paso n={++paso} titulo={esTalla ? 'Elige la talla' : 'Elige la opción'} extra={opcion}>
                    <div className="flex flex-wrap gap-2">
                      {producto.opciones.map((o) => {
                        const sel = opcion === o
                        return (
                          <button
                            key={o}
                            onClick={() => setOpcion(o)}
                            className={`relative inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                              esTalla ? 'min-w-12 justify-center' : ''
                            } ${sel ? 'bg-sky-50 text-ganet-ink ring-2 ring-ganet-blue' : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-white hover:ring-slate-300'}`}
                          >
                            {sel && !esTalla && <Check className="h-3.5 w-3.5 text-ganet-blue" />}
                            {o}
                          </button>
                        )
                      })}
                    </div>
                  </Paso>
                )}

                {producto.mockup && (
                  <Paso n={++paso} titulo="Personalízalo">
                    <ControlesPersonalizacion
                      producto={producto}
                      estado={estado}
                      set={(c) => {
                        set(c)
                        setVista('mockup')
                      }}
                    />
                  </Paso>
                )}

                <Paso n={++paso} titulo="¿Cuántos necesitas?" extra={producto.unidad}>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                      <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="grid h-11 w-11 place-items-center rounded-l-2xl text-slate-500 transition hover:bg-white hover:text-ganet-ink" aria-label="Menos">
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-16 border-0 bg-transparent text-center text-lg font-bold text-ganet-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                        aria-label="Cantidad"
                      />
                      <button onClick={() => setCantidad((c) => c + 1)} className="grid h-11 w-11 place-items-center rounded-r-2xl text-slate-500 transition hover:bg-white hover:text-ganet-ink" aria-label="Más">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {CANTIDADES_RAPIDAS.filter((n) => n > 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setCantidad(n)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${cantidad === n ? 'bg-ganet-ink text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Volumen cantidad={cantidad} />
                </Paso>
              </div>

              {/* Resumen y acciones */}
              <div className="border-t border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50/60 p-6 sm:px-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Tu selección</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-ganet-ink px-3 py-1 text-xs font-semibold text-white">
                    {cantidad} × {producto.unidad}
                  </span>
                  {resumen.map((r) => (
                    <span key={r} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">{r}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={agregarLista}
                    className={`group inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 font-semibold shadow-lg transition ${
                      agregado ? 'bg-ganet-lime text-white shadow-ganet-lime/30' : 'bg-gradient-to-r from-ganet-cyan to-ganet-blue text-white shadow-ganet-blue/25 hover:brightness-105'
                    }`}
                  >
                    {agregado ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5 transition group-hover:rotate-90" />}
                    {agregado ? '¡Agregado a tu cotización!' : 'Agregar a mi cotización'}
                  </button>
                  <button
                    onClick={consultar}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-[#1da851] ring-1 ring-[#25D366]/40 transition hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="h-5 w-5" /> Consultar
                  </button>
                </div>
              </div>
            </div>

            {/* Garantías */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-white py-4 ring-1 ring-slate-200">
              {[
                [ShieldCheck, 'Calidad', 'garantizada'],
                [Truck, 'Entrega', 'a tu empresa'],
                [Sparkles, 'Precios', 'por volumen'],
              ].map(([I, a, b]) => (
                <div key={a} className="flex flex-col items-center gap-1.5 px-2 text-center">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-50 text-ganet-blue">
                    <I className="h-4 w-4" />
                  </span>
                  <p className="text-xs leading-tight text-slate-500">
                    <b className="block font-semibold text-ganet-ink">{a}</b>
                    {b}
                  </p>
                </div>
              ))}
            </div>

            <Acordeon producto={producto} />
          </div>
        </div>
      </section>

      {/* Barra fija en móvil (en un portal: la animación de página rompe position: fixed) */}
      {createPortal(
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ganet-ink">{producto.nombre}</p>
            <p className="text-xs text-slate-500">{cantidad} × {producto.unidad}</p>
          </div>
          <button onClick={agregarLista} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white ${agregado ? 'bg-ganet-lime' : 'bg-gradient-to-r from-ganet-cyan to-ganet-blue'}`}>
            {agregado ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {agregado ? 'Listo' : 'Agregar'}
          </button>
        </div>
      </div>,
      document.body,
      )}

      {relacionados.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-20 pb-28 lg:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <Titulo etiqueta="También te puede interesar">Más de {categoria.corto}</Titulo>
              <Link to={`/catalogo/${categoria.id}`} className="text-sm font-semibold text-ganet-blue hover:underline">Ver toda la línea →</Link>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relacionados.map((p, i) => (
                <Reveal key={p.id} retraso={i * 80}>
                  <ProductoCard producto={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function Paso({ n, titulo, extra, children }) {
  return (
    <div className="relative pl-12">
      <span className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-ganet-cyan to-ganet-blue text-sm font-bold text-white shadow-md shadow-ganet-blue/20">
        {n}
      </span>
      <p className="flex min-h-8 items-center text-sm font-semibold text-ganet-ink">
        {titulo} {extra && <span className="ml-1.5 font-normal text-slate-400">· {extra}</span>}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

// Imagen principal con lupa al pasar el ratón (solo fotos).
function Visor({ producto, categoria, vista, estado }) {
  const [zoom, setZoom] = useState(null)
  const src = vista === 'foto' ? producto.imagen : null

  return (
    <div className="group relative aspect-square overflow-hidden rounded-[2.25rem] bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
      {src ? (
        <div
          key={src}
          className="h-full w-full animate-fade-up cursor-zoom-in overflow-hidden"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
          }}
          onMouseLeave={() => setZoom(null)}
        >
          <img
            key={src}
            src={src}
            alt={producto.nombre}
            className="h-full w-full object-cover transition-transform duration-300 ease-out"
            style={zoom ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
        </div>
      ) : (
        <VistaProducto producto={producto} categoria={categoria} color={estado.color.hex} modo="mockup" personalizacion={propsMockup(estado)} />
      )}

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ganet-ink shadow-sm backdrop-blur">
          {src ? (
            <>
              <ZoomIn className="h-3.5 w-3.5 text-ganet-blue" /> {<><span className="hidden sm:inline">Pasa el ratón para ampliar</span><span className="sm:hidden">Foto del producto</span></>}
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-ganet-blue" /> Vista previa en vivo · {estado.color.nombre}
            </>
          )}
        </span>
      </div>
      {vista !== 'mockup' && producto.mockup && (
        <p className="absolute inset-x-4 bottom-4 rounded-xl bg-white/90 px-3 py-2 text-[11px] text-slate-500 backdrop-blur">
          Foto de referencia: el producto se fabrica con el color y la personalización que elijas.
        </p>
      )}
    </div>
  )
}

// Indicador de precio por volumen.
function Volumen({ cantidad }) {
  const lleno = Math.min(cantidad / VOLUMEN, 1)
  return (
    <div className="mt-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <div className="flex items-center justify-between text-xs">
        <span className={lleno >= 1 ? 'font-semibold text-ganet-green' : 'text-slate-500'}>
          {lleno >= 1 ? '¡Aplica precio por volumen!' : `Desde ${VOLUMEN} unidades obtienes precio por volumen`}
        </span>
        <span className="font-semibold tabular-nums text-slate-400">{Math.min(cantidad, VOLUMEN)}/{VOLUMEN}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-ganet-cyan via-ganet-blue to-ganet-lime transition-all duration-500" style={{ width: `${lleno * 100}%` }} />
      </div>
    </div>
  )
}

function Acordeon({ producto }) {
  const [abierto, setAbierto] = useState('detalles')
  const secciones = [
    {
      id: 'detalles',
      titulo: 'Detalles del producto',
      texto: `${producto.descripcion} Presentación: ${producto.unidad}.${producto.opciones?.length ? ` Disponible en: ${producto.opciones.join(', ')}.` : ''}`,
    },
    producto.mockup && {
      id: 'personalizacion',
      titulo: 'Personalización',
      texto: `Técnicas disponibles: ${producto.tecnicas?.join(', ') || 'a consultar'}. Envíanos tu logo en buena resolución (PNG, SVG o PDF) por WhatsApp y te enviamos una prueba antes de producir.`,
    },
    {
      id: 'entrega',
      titulo: 'Entrega y cotización',
      texto: 'Arma tu lista y envíala por WhatsApp. Te respondemos con precios, tiempos de entrega y condiciones de pago. Entregamos directamente en tu empresa.',
    },
  ].filter(Boolean)

  return (
    <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
      {secciones.map((s) => {
        const ab = abierto === s.id
        return (
          <div key={s.id}>
            <button onClick={() => setAbierto(ab ? '' : s.id)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-ganet-ink hover:bg-slate-50">
              {s.titulo}
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${ab ? 'rotate-180 text-ganet-blue' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${ab ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <p className="min-h-0 overflow-hidden px-5 text-sm leading-relaxed text-slate-600">
                <span className="block pb-4">{s.texto}</span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
