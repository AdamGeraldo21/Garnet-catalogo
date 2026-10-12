import { useEffect, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import ArteProducto from './ArteProducto'

export default function ProductoModal({ producto, categoria, onCerrar, onAgregar }) {
  const [opcion, setOpcion] = useState(producto.opciones?.[0] || '')
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ganet-ink/70 backdrop-blur-sm" onClick={onCerrar} />

      <div className="relative grid max-h-[92vh] w-full max-w-3xl animate-fade-up overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-2">
        <button
          onClick={onCerrar}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-600 shadow hover:text-ganet-ink"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="group h-56 md:h-full md:min-h-[24rem]">
          <ArteProducto producto={producto} categoria={categoria} grande />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: categoria.acento }}>
            {categoria.nombre}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-ganet-ink">{producto.nombre}</h3>
          <p className="mt-3 text-slate-600">{producto.descripcion}</p>

          {producto.opciones?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-ganet-ink">Opción</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {producto.opciones.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOpcion(o)}
                    className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                      opcion === o ? 'bg-ganet-ink text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm font-medium text-ganet-ink">
              Cantidad <span className="font-normal text-slate-400">· {producto.unidad}</span>
            </p>
            <div className="mt-2 inline-flex items-center rounded-full ring-1 ring-slate-200">
              <button onClick={() => setCantidad((c) => Math.max(1, c - 1))} className="grid h-10 w-10 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Menos">
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-14 border-0 bg-transparent text-center font-semibold focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button onClick={() => setCantidad((c) => c + 1)} className="grid h-10 w-10 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Más">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-6 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
            Precios según cantidad y personalización. Agrégalo a tu lista y te enviamos la cotización formal.
          </p>

          <button
            onClick={() => {
              onAgregar(producto, cantidad, opcion)
              onCerrar()
            }}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-6 py-3 font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/25 transition hover:brightness-110 md:mt-auto"
          >
            <Plus className="h-4 w-4" />
            Agregar a mi cotización
          </button>
        </div>
      </div>
    </div>
  )
}
