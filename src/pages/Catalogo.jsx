import { useMemo } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, PackageSearch, Search, X } from 'lucide-react'
import ProductoCard from '../components/ProductoCard'
import Icono from '../components/Icono'
import { PageHeader } from '../components/Animados'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo'

const normalizar = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Catalogo() {
  const { categoria = 'todos' } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const busqueda = params.get('q') || ''
  const soloPersonalizables = params.get('personalizable') === '1'
  const actual = CATEGORIAS.find((c) => c.id === categoria)

  const setBusqueda = (q) => {
    const p = new URLSearchParams(params)
    q ? p.set('q', q) : p.delete('q')
    setParams(p, { replace: true })
  }
  const togglePersonalizables = () => {
    const p = new URLSearchParams(params)
    soloPersonalizables ? p.delete('personalizable') : p.set('personalizable', '1')
    setParams(p, { replace: true })
  }
  const elegir = (id) => navigate({ pathname: id === 'todos' ? '/catalogo' : `/catalogo/${id}`, search: params.toString() })

  const productos = useMemo(() => {
    const q = normalizar(busqueda.trim())
    return PRODUCTOS.filter((p) => {
      if (actual && p.categoria !== actual.id) return false
      if (soloPersonalizables && !p.mockup) return false
      if (!q) return true
      const cat = CATEGORIAS.find((c) => c.id === p.categoria)
      return normalizar([p.nombre, p.descripcion, ...(p.opciones || []), cat.nombre].join(' ')).includes(q)
    })
  }, [actual, busqueda, soloPersonalizables])

  return (
    <>
      <PageHeader
        etiqueta="Catálogo"
        titulo={actual ? actual.nombre : 'Nuestro catálogo'}
        subtitulo={actual ? actual.descripcion : 'Elige los artículos, personalízalos con tu marca y envíanos tu lista para recibir la cotización.'}
        imagen={actual ? actual.imagen : './img/hero/papeleria.webp'}
      >
        <nav className="mt-6 flex items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span>/</span>
          <Link to="/catalogo" className={actual ? 'hover:text-white' : 'text-white'}>Catálogo</Link>
          {actual && (
            <>
              <span>/</span>
              <span className="text-white">{actual.corto}</span>
            </>
          )}
        </nav>
      </PageHeader>

      {/* Líneas como tarjetas con foto */}
      <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 sm:px-6">
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {CATEGORIAS.map((c) => {
            const activa = c.id === categoria
            return (
              <button
                key={c.id}
                onClick={() => elegir(activa ? 'todos' : c.id)}
                className={`group relative h-36 w-40 shrink-0 snap-start overflow-hidden rounded-2xl text-left shadow-lg transition hover:-translate-y-1 sm:w-auto ${
                  activa ? 'ring-4 ring-ganet-cyan' : 'ring-1 ring-black/5'
                }`}
              >
                <img src={c.imagen} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${activa ? 'from-ganet-blue/95 via-ganet-blue/60' : 'from-ganet-ink/95 via-ganet-ink/50'} to-transparent`} />
                <span className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow`}>
                  <Icono nombre={c.icono} className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-3 bottom-3 text-white">
                  <span className="block text-sm font-semibold leading-tight">{c.corto}</span>
                  <span className="text-xs text-white/70">{PRODUCTOS.filter((p) => p.categoria === c.id).length} artículos</span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
        <div className="sticky top-[5rem] z-30 -mx-4 bg-slate-50/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative block lg:w-80">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar productos…"
                className="w-full rounded-full border-0 bg-white py-3 pl-10 pr-9 text-sm shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ganet-sky"
              />
              {busqueda && (
                <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Limpiar búsqueda">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-1 lg:px-0">
              <Chip activo={!actual} onClick={() => elegir('todos')}>Todos</Chip>
              {CATEGORIAS.map((c) => (
                <Chip key={c.id} activo={categoria === c.id} onClick={() => elegir(c.id)}>
                  <Icono nombre={c.icono} className="h-3.5 w-3.5" />
                  {c.corto}
                </Chip>
              ))}
            </div>

            <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
              <span className={`relative h-6 w-11 rounded-full transition ${soloPersonalizables ? 'bg-ganet-blue' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${soloPersonalizables ? 'left-[1.375rem]' : 'left-0.5'}`} />
              </span>
              <input type="checkbox" className="sr-only" checked={soloPersonalizables} onChange={togglePersonalizables} />
              Solo personalizables
            </label>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          {productos.length} {productos.length === 1 ? 'artículo' : 'artículos'}
          {busqueda && <> para “{busqueda}”</>}
        </p>

        {productos.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productos.map((p, i) => (
              <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
                <ProductoCard producto={p} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 px-6 py-16 text-center">
            <PackageSearch className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 font-semibold text-ganet-ink">No encontramos resultados</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Prueba con otra palabra o escríbenos: conseguimos productos que no estén en el catálogo.
            </p>
            <Link to="/catalogo" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ganet-ink px-5 py-2 text-sm font-semibold text-white hover:bg-ganet-blue">
              Ver todo el catálogo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </>
  )
}

function Chip({ activo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
        activo ? 'bg-ganet-ink text-white shadow-md shadow-ganet-ink/20' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-ganet-blue hover:ring-ganet-sky/60'
      }`}
    >
      {children}
    </button>
  )
}
