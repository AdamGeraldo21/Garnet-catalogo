import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Palette, Plus } from 'lucide-react'
import VistaProducto from './VistaProducto'
import { categoriaDe, coloresDe } from '../data/catalogo'
import { useCotizacion } from '../context/Cotizacion'

const ESTILO_ETIQUETA = {
  'Más pedido': 'bg-ganet-lime text-ganet-ink',
  Personalizable: 'bg-ganet-ink text-ganet-cyan',
  Nuevo: 'bg-white text-ganet-blue',
}

export default function ProductoCard({ producto, className = '' }) {
  const { agregar, cantidadDe } = useCotizacion()
  const categoria = categoriaDe(producto)
  const colores = coloresDe(producto)
  const [color, setColor] = useState(colores[0])
  const enLista = cantidadDe(producto.id)

  return (
    <article className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-900/10 ${className}`}>
      <Link to={`/producto/${producto.id}`} className="relative block aspect-[4/3.3]">
        <VistaProducto producto={producto} categoria={categoria} color={color?.hex} />
        <span className="absolute left-3 top-3 rounded-full bg-ganet-ink/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {categoria.corto}
        </span>
        {producto.etiqueta && (
          <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow ${ESTILO_ETIQUETA[producto.etiqueta]}`}>
            {producto.etiqueta}
          </span>
        )}
        {producto.mockup && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ganet-ink shadow-sm">
            <Palette className="h-3 w-3 text-ganet-blue" /> {color?.nombre}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {colores.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Color">
            {colores.slice(0, 7).map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c)}
                title={c.nombre}
                aria-label={c.nombre}
                className={`h-6 w-6 rounded-full ring-1 ring-black/10 transition hover:scale-110 ${color?.hex === c.hex ? 'ring-2 ring-ganet-blue ring-offset-2' : ''}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        )}

        <Link to={`/producto/${producto.id}`} className="font-semibold text-ganet-ink transition hover:text-ganet-blue">
          {producto.nombre}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{producto.descripcion}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-xs text-slate-400">{producto.unidad}</span>
          <button
            onClick={() => agregar(producto, 1, color ? { color: color.nombre, colorHex: color.hex } : {})}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
              enLista ? 'bg-ganet-lime/15 text-ganet-green ring-1 ring-ganet-lime/50' : 'bg-ganet-ink text-white hover:bg-ganet-blue'
            }`}
          >
            {enLista ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {enLista ? `En lista (${enLista})` : 'Cotizar'}
          </button>
        </div>
      </div>
    </article>
  )
}
