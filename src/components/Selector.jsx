import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import Icono from './Icono'

// Lista desplegable con estilo propio (la nativa del navegador no se puede diseñar).
// grupos: [{ titulo?, opciones: [{ valor, label, icono?, detalle? }] }]
export default function Selector({ valor, onChange, grupos, placeholder = 'Elige una opción', className = '', boton = '', etiqueta }) {
  const [abierto, setAbierto] = useState(false)
  const [foco, setFoco] = useState(-1)
  const raiz = useRef(null)
  const lista = useRef(null)
  const id = useId()
  const opciones = grupos.flatMap((g) => g.opciones)
  const actual = opciones.find((o) => o.valor === valor)

  useEffect(() => {
    if (!abierto) return
    const fuera = (e) => !raiz.current?.contains(e.target) && setAbierto(false)
    document.addEventListener('pointerdown', fuera)
    return () => document.removeEventListener('pointerdown', fuera)
  }, [abierto])

  useEffect(() => {
    if (abierto) lista.current?.querySelector(`[data-i="${foco}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [foco, abierto])

  const abrir = () => {
    setFoco(Math.max(0, opciones.findIndex((o) => o.valor === valor)))
    setAbierto(true)
  }
  const elegir = (o) => {
    onChange(o.valor)
    setAbierto(false)
  }
  const onKey = (e) => {
    if (!abierto && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      return abrir()
    }
    if (!abierto) return
    if (e.key === 'Escape') setAbierto(false)
    else if (e.key === 'ArrowDown') setFoco((f) => Math.min(f + 1, opciones.length - 1))
    else if (e.key === 'ArrowUp') setFoco((f) => Math.max(f - 1, 0))
    else if (e.key === 'Enter' || e.key === ' ') opciones[foco] && elegir(opciones[foco])
    else return
    e.preventDefault()
  }

  let i = -1
  return (
    <div ref={raiz} className={`relative ${abierto ? 'z-50' : ''} ${className}`} onKeyDown={onKey}>
      <button
        type="button"
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={etiqueta}
        className={`flex w-full items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ganet-sky bg-slate-50 px-4 py-3 text-left text-sm ring-1 transition ${
          abierto ? 'bg-white ring-2 ring-ganet-sky' : 'ring-slate-200 hover:bg-white hover:ring-slate-300'
        } ${boton}`}
      >
        {actual?.icono && (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-ganet-cyan/20 to-ganet-blue/20 text-ganet-blue">
            <Icono nombre={actual.icono} className="h-4 w-4" />
          </span>
        )}
        <span className={`min-w-0 flex-1 truncate ${actual ? 'font-medium text-ganet-ink' : 'text-slate-400'}`}>{actual?.label || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${abierto ? 'rotate-180 text-ganet-blue' : ''}`} />
      </button>

      <div
        className={`absolute left-0 right-0 top-full z-40 mt-2 min-w-[18rem] origin-top sm:min-w-[20rem] transition-all duration-200 ${
          abierto ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        <ul
          ref={lista}
          id={id}
          role="listbox"
          className="max-h-[min(30rem,65vh)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200"
        >
          {grupos.map((g, gi) => (
            <li key={g.titulo || gi} role="presentation">
              {g.titulo && (
                <p className={`px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 ${gi > 0 ? 'mt-2 border-t border-slate-100 pt-3' : 'pt-1'}`}>
                  {g.titulo}
                </p>
              )}
              <ul role="group">
                {g.opciones.map((o) => {
                  i += 1
                  const n = i
                  const sel = o.valor === valor
                  return (
                    <li
                      key={o.valor}
                      data-i={n}
                      role="option"
                      aria-selected={sel}
                      onClick={() => elegir(o)}
                      onMouseEnter={() => setFoco(n)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        foco === n ? 'bg-sky-50' : ''
                      } ${sel ? 'font-semibold text-ganet-ink' : 'text-slate-600'}`}
                    >
                      {o.icono && (
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                            sel ? 'bg-gradient-to-br from-ganet-cyan to-ganet-blue text-white shadow' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icono nombre={o.icono} className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{o.label}</span>
                        {o.detalle && <span className="block truncate text-xs font-normal text-slate-400">{o.detalle}</span>}
                      </span>
                      {sel && <Check className="h-4 w-4 shrink-0 text-ganet-blue" />}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
