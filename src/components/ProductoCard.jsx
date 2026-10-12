import { Check, Plus } from 'lucide-react'
import ArteProducto from './ArteProducto'

const ESTILO_ETIQUETA = {
  'Más pedido': 'bg-ganet-lime text-ganet-ink',
  Personalizable: 'bg-white text-ganet-blue',
  Nuevo: 'bg-ganet-ink text-ganet-cyan',
}

export default function ProductoCard({ producto, categoria, enCotizacion, onVer, onAgregar }) {
  return (
    <article className="group flex animate-fade-up flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ganet-blue/10">
      <button onClick={onVer} className="relative h-44 w-full" aria-label={`Ver ${producto.nombre}`}>
        <ArteProducto producto={producto} categoria={categoria} />
        <span className="absolute left-3 top-3 rounded-full bg-ganet-ink/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {categoria.corto}
        </span>
        {producto.etiqueta && (
          <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow ${ESTILO_ETIQUETA[producto.etiqueta]}`}>
            {producto.etiqueta}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-ganet-ink">{producto.nombre}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{producto.descripcion}</p>

        {producto.opciones?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {producto.opciones.slice(0, 3).map((o) => (
              <span key={o} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">
                {o}
              </span>
            ))}
            {producto.opciones.length > 3 && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">+{producto.opciones.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-xs text-slate-400">{producto.unidad}</span>
          <button
            onClick={onAgregar}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
              enCotizacion
                ? 'bg-ganet-lime/15 text-ganet-green ring-1 ring-ganet-lime/50'
                : 'bg-ganet-ink text-white hover:bg-ganet-blue'
            }`}
          >
            {enCotizacion ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {enCotizacion ? `En lista (${enCotizacion})` : 'Cotizar'}
          </button>
        </div>
      </div>
    </article>
  )
}
