import { ArrowRight } from 'lucide-react'
import Icono from './Icono'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo'

export default function Categorias({ onElegir }) {
  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:-mt-20 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CATEGORIAS.map((c, i) => {
          const cantidad = PRODUCTOS.filter((p) => p.categoria === c.id).length
          return (
            <button
              key={c.id}
              onClick={() => onElegir(c.id)}
              style={{ animationDelay: `${i * 70}ms` }}
              className="group relative animate-fade-up overflow-hidden rounded-2xl bg-white p-4 text-left shadow-lg shadow-slate-900/5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:ring-ganet-sky/50"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-md`}>
                <Icono nombre={c.icono} className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold leading-tight text-ganet-ink">{c.corto}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                {cantidad} artículos
                <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </p>
              <span className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${c.color} transition-transform duration-300 group-hover:scale-x-100`} />
            </button>
          )
        })}
      </div>
    </section>
  )
}
