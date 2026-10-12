import { useEffect, useState } from 'react'
import { ClipboardList, Minus, Plus, Send, Trash2, X } from 'lucide-react'
import Icono from './Icono'
import { EMPRESA } from '../data/catalogo'
import { abrirWhatsapp, construirMensaje } from '../hooks/useCotizacion'

export default function CotizacionDrawer({ abierto, onCerrar, cotizacion }) {
  const { items, cambiarCantidad, quitar, vaciar, total } = cotizacion
  const [cliente, setCliente] = useState({ nombre: '', empresa: '', nota: '' })

  useEffect(() => {
    if (!abierto) return
    const onKey = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  const enviar = () => abrirWhatsapp(EMPRESA.whatsapp, construirMensaje(items, cliente))

  return (
    <div className={`fixed inset-0 z-50 ${abierto ? '' : 'pointer-events-none'}`} aria-hidden={!abierto}>
      <div
        onClick={onCerrar}
        className={`absolute inset-0 bg-ganet-ink/60 backdrop-blur-sm transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          abierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="relative overflow-hidden bg-ganet-ink px-6 py-5 text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ganet-blue/40 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <ClipboardList className="h-5 w-5 text-ganet-cyan" />
                Mi cotización
              </h2>
              <p className="text-xs text-slate-400">
                {total} {total === 1 ? 'unidad' : 'unidades'} · {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>
            <button onClick={onCerrar} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-ganet-cyan/20 to-ganet-lime/20">
              <ClipboardList className="h-9 w-9 text-ganet-blue" />
            </span>
            <h3 className="mt-5 font-semibold text-ganet-ink">Tu lista está vacía</h3>
            <p className="mt-1 text-sm text-slate-500">Agrega productos del catálogo con el botón “Cotizar”.</p>
            <a href="#catalogo" onClick={onCerrar} className="mt-6 rounded-full bg-ganet-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ganet-blue">
              Ir al catálogo
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto px-6">
              {items.map((i) => (
                <li key={i.clave} className="flex gap-3 py-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-ganet-blue">
                    <Icono nombre={i.icono} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ganet-ink">{i.nombre}</p>
                    <p className="text-xs text-slate-500">
                      {i.opcion && <>{i.opcion} · </>}
                      {i.unidad}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-full ring-1 ring-slate-200">
                        <button onClick={() => cambiarCantidad(i.clave, i.cantidad - 1)} className="grid h-7 w-7 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Menos">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{i.cantidad}</span>
                        <button onClick={() => cambiarCantidad(i.clave, i.cantidad + 1)} className="grid h-7 w-7 place-items-center text-slate-500 hover:text-ganet-ink" aria-label="Más">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => quitar(i.clave)} className="text-slate-400 hover:text-red-500" aria-label="Quitar">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-slate-100 bg-slate-50 px-6 py-5">
              <div className="grid grid-cols-2 gap-3">
                <Campo placeholder="Tu nombre" value={cliente.nombre} onChange={(v) => setCliente({ ...cliente, nombre: v })} />
                <Campo placeholder="Empresa (opcional)" value={cliente.empresa} onChange={(v) => setCliente({ ...cliente, empresa: v })} />
              </div>
              <textarea
                rows={2}
                value={cliente.nota}
                onChange={(e) => setCliente({ ...cliente, nota: e.target.value })}
                placeholder="Detalles: colores, logo, fecha de entrega…"
                className="w-full resize-none rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ganet-sky"
              />
              <button
                onClick={enviar}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-105"
              >
                <Send className="h-4 w-4" />
                Enviar por WhatsApp
              </button>
              <button onClick={vaciar} className="w-full text-center text-xs text-slate-400 hover:text-red-500">
                Vaciar lista
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function Campo({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ganet-sky"
    />
  )
}
