import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, MessageCircle, Minus, Palette, Plus, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import ProductoCard from '../components/ProductoCard'
import VistaProducto from '../components/VistaProducto'
import { ControlesPersonalizacion, detallesCotizacion, propsMockup, usePersonalizacion } from '../components/Personalizador'
import { Reveal, Titulo } from '../components/Animados'
import { EMPRESA, PRODUCTOS, categoriaDe, productoPorId } from '../data/catalogo'
import { abrirWhatsapp, describirDetalles, useCotizacion } from '../context/Cotizacion'
import NoEncontrado from './NoEncontrado'

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
  const relacionados = PRODUCTOS.filter((p) => p.categoria === producto.categoria && p.id !== producto.id).slice(0, 4)

  const detalles = producto.mockup ? detallesCotizacion(estado, opcion) : { opcion }

  const consultar = () =>
    abrirWhatsapp(
      EMPRESA.whatsapp,
      `Hola Ganet, quisiera información sobre *${producto.nombre}* (${cantidad} × ${producto.unidad}).\n${describirDetalles(detalles).join(' · ')}`,
    )

  return (
    <>
      <section className="relative overflow-hidden bg-ganet-ink pb-10 pt-24 lg:pt-28">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-slate-400 sm:px-6">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-white">Catálogo</Link>
          <span>/</span>
          <Link to={`/catalogo/${categoria.id}`} className="hover:text-white">{categoria.corto}</Link>
          <span>/</span>
          <span className="truncate text-white">{producto.nombre}</span>
        </div>
      </section>

      <section className="mx-auto -mt-4 grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Vista previa */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="group relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
            <VistaProducto
              producto={producto}
              categoria={categoria}
              color={estado.color.hex}
              modo={vista}
              personalizacion={propsMockup(estado)}
            />
            {producto.mockup && vista === 'mockup' && (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ganet-ink/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-ganet-cyan" /> Vista previa en vivo
              </span>
            )}
          </div>

          {producto.mockup && producto.imagen && (
            <div className="mt-4 flex gap-3">
              <Miniatura activa={vista === 'mockup'} onClick={() => setVista('mockup')} icono={Palette} label="Personalizado">
                <VistaProducto producto={producto} categoria={categoria} color={estado.color.hex} modo="mockup" />
              </Miniatura>
              <Miniatura activa={vista === 'foto'} onClick={() => setVista('foto')} icono={Camera} label="Foto de referencia">
                <img src={producto.imagen} alt="" className="h-full w-full object-cover" />
              </Miniatura>
            </div>
          )}
        </div>

        {/* Información y personalización */}
        <div className="pt-4 lg:pt-10">
          <Link to={`/catalogo/${categoria.id}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: categoria.acento }}>
            <ArrowLeft className="h-3.5 w-3.5" /> {categoria.nombre}
          </Link>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ganet-ink sm:text-4xl">{producto.nombre}</h1>
          {producto.etiqueta && (
            <span className="mt-3 inline-block rounded-full bg-ganet-lime/20 px-3 py-1 text-xs font-semibold text-ganet-green">{producto.etiqueta}</span>
          )}
          <p className="mt-4 text-lg text-slate-600">{producto.descripcion}</p>

          <div className="mt-8 space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
            {producto.opciones?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-ganet-ink">{producto.mockup && /^(S|M|L|XL|XXL)$/.test(producto.opciones[0]) ? 'Talla' : 'Opción'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {producto.opciones.map((o) => (
                    <button
                      key={o}
                      onClick={() => setOpcion(o)}
                      className={`min-w-11 rounded-xl px-3.5 py-2 text-sm transition ${opcion === o ? 'bg-ganet-ink font-semibold text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {producto.mockup && (
              <ControlesPersonalizacion
                producto={producto}
                estado={estado}
                set={(c) => {
                  set(c)
                  setVista('mockup')
                }}
              />
            )}

            <div>
              <p className="text-sm font-medium text-ganet-ink">
                Cantidad <span className="font-normal text-slate-400">· {producto.unidad}</span>
              </p>
              <div className="mt-3 inline-flex items-center rounded-full ring-1 ring-slate-200">
                <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="grid h-11 w-11 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Menos">
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-16 border-0 bg-transparent text-center font-semibold focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button onClick={() => setCantidad((c) => c + 1)} className="grid h-11 w-11 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Más">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => agregar(producto, cantidad, detalles)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3.5 font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/25 transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" /> Agregar a mi cotización
              </button>
              <button onClick={consultar} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-ganet-ink transition hover:border-[#25D366] hover:text-[#1da851]">
                <MessageCircle className="h-4 w-4" /> Consultar
              </button>
            </div>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              [ShieldCheck, 'Calidad garantizada'],
              [Truck, 'Entrega a tu empresa'],
              [Sparkles, 'Precios por volumen'],
            ].map(([I, t]) => (
              <li key={t} className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                <I className="h-4 w-4 text-ganet-blue" /> {t}
              </li>
            ))}
          </ul>
          {producto.mockup && producto.imagen && (
            <p className="mt-4 text-xs text-slate-400">La foto es de referencia; el producto final se fabrica con el color y la personalización que elijas.</p>
          )}
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Titulo etiqueta="También te puede interesar">Más de {categoria.corto}</Titulo>
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

function Miniatura({ activa, onClick, icono: I, label, children }) {
  return (
    <button
      onClick={onClick}
      className={`group relative h-24 w-24 overflow-hidden rounded-2xl bg-white ring-2 transition ${activa ? 'ring-ganet-blue' : 'ring-slate-200 hover:ring-slate-300'}`}
      title={label}
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-ganet-ink/75 py-1 text-[10px] font-medium text-white">
        <I className="h-3 w-3" /> {label.split(' ')[0]}
      </span>
    </button>
  )
}
