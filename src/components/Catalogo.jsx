import { useMemo } from 'react'
import { PackageSearch, Search, X } from 'lucide-react'
import ProductoCard from './ProductoCard'
import Icono from './Icono'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo'

const normalizar = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Catalogo({ categoria, setCategoria, busqueda, setBusqueda, cantidadDe, onVer, onAgregar }) {
  const categoriaPorId = useMemo(() => Object.fromEntries(CATEGORIAS.map((c) => [c.id, c])), [])

  const productos = useMemo(() => {
    const q = normalizar(busqueda.trim())
    return PRODUCTOS.filter((p) => {
      if (categoria !== 'todos' && p.categoria !== categoria) return false
      if (!q) return true
      const texto = normalizar([p.nombre, p.descripcion, ...(p.opciones || []), categoriaPorId[p.categoria].nombre].join(' '))
      return texto.includes(q)
    })
  }, [categoria, busqueda, categoriaPorId])

  const actual = categoriaPorId[categoria]

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ganet-blue">Catálogo</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ganet-ink sm:text-4xl">
            {actual ? actual.nombre : 'Nuestros productos'}
          </h2>
          <p className="mt-2 max-w-2xl text-slate-500">
            {actual ? actual.descripcion : 'Elige los artículos, agrégalos a tu lista y te enviamos la cotización por WhatsApp.'}
          </p>
        </div>
        <p className="text-sm text-slate-400">
          {productos.length} {productos.length === 1 ? 'artículo' : 'artículos'}
        </p>
      </div>

      {/* Barra de filtros fija al hacer scroll */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 bg-slate-50/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos…"
              className="w-full rounded-full border-0 bg-white py-2.5 pl-10 pr-9 text-sm shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ganet-sky"
            />
            {busqueda && (
              <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Limpiar búsqueda">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-1 lg:px-0">
            <Chip activo={categoria === 'todos'} onClick={() => setCategoria('todos')}>
              Todos
            </Chip>
            {CATEGORIAS.map((c) => (
              <Chip key={c.id} activo={categoria === c.id} onClick={() => setCategoria(c.id)}>
                <Icono nombre={c.icono} className="h-3.5 w-3.5" />
                {c.corto}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {productos.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productos.map((p) => (
            <ProductoCard
              key={p.id}
              producto={p}
              categoria={categoriaPorId[p.categoria]}
              enCotizacion={cantidadDe(p.id)}
              onVer={() => onVer(p)}
              onAgregar={() => onAgregar(p)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 px-6 py-16 text-center">
          <PackageSearch className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 font-semibold text-ganet-ink">No encontramos “{busqueda}”</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Prueba con otra palabra o escríbenos: conseguimos productos que no estén en el catálogo.
          </p>
          <button
            onClick={() => {
              setBusqueda('')
              setCategoria('todos')
            }}
            className="mt-6 rounded-full bg-ganet-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ganet-blue"
          >
            Ver todo el catálogo
          </button>
        </div>
      )}
    </section>
  )
}

function Chip({ activo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
        activo
          ? 'bg-ganet-ink text-white shadow-md shadow-ganet-ink/20'
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-ganet-blue hover:ring-ganet-sky/60'
      }`}
    >
      {children}
    </button>
  )
}
