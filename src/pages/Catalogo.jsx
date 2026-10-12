import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDownAZ, ArrowRight, ChevronLeft, ChevronRight, PackageSearch, Palette, Search, SlidersHorizontal, X } from 'lucide-react'
import ProductoCard from '../components/ProductoCard'
import Icono from '../components/Icono'
import { PageHeader } from '../components/Animados'
import { CATEGORIAS, PRODUCTOS } from '../data/catalogo'

const POR_PAGINA = 8
const ORDENES = [
  { id: 'destacados', label: 'Destacados' },
  { id: 'az', label: 'Nombre A–Z' },
  { id: 'za', label: 'Nombre Z–A' },
]
const PESO_ETIQUETA = { 'Más pedido': 0, Personalizable: 1, Nuevo: 2 }

const normalizar = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const coincide = (p, q) => {
  if (!q) return true
  const cat = CATEGORIAS.find((c) => c.id === p.categoria)
  return normalizar([p.nombre, p.descripcion, ...(p.opciones || []), cat.nombre].join(' ')).includes(q)
}

export default function Catalogo() {
  const { categoria = 'todos' } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const grilla = useRef(null)
  const buscador = useRef(null)

  const busqueda = params.get('q') || ''
  const soloPersonalizables = params.get('personalizable') === '1'
  const orden = params.get('orden') || 'destacados'
  const pagina = Math.max(1, parseInt(params.get('pagina'), 10) || 1)
  const actual = CATEGORIAS.find((c) => c.id === categoria)

  // Cambia parámetros de la URL; cualquier filtro nuevo vuelve a la página 1.
  const actualizar = (cambios, { resetPagina = true } = {}) => {
    const p = new URLSearchParams(params)
    Object.entries(cambios).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)))
    if (resetPagina) p.delete('pagina')
    setParams(p, { replace: true })
  }
  const elegir = (id) => {
    const p = new URLSearchParams(params)
    p.delete('pagina')
    navigate({ pathname: id === 'todos' ? '/catalogo' : `/catalogo/${id}`, search: p.toString() }, { replace: true })
  }
  const irAPagina = (n) => {
    actualizar({ pagina: n > 1 ? String(n) : '' }, { resetPagina: false })
    const top = grilla.current.getBoundingClientRect().top + window.scrollY - 190
    window.scrollTo({ top, behavior: 'smooth' })
  }
  const limpiar = () => navigate({ pathname: '/catalogo' }, { replace: true })

  // Atajo "/" para enfocar la búsqueda.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        buscador.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const q = normalizar(busqueda.trim())
  const base = useMemo(() => PRODUCTOS.filter((p) => (!soloPersonalizables || p.mockup) && coincide(p, q)), [q, soloPersonalizables])
  const conteo = useMemo(() => Object.fromEntries(CATEGORIAS.map((c) => [c.id, base.filter((p) => p.categoria === c.id).length])), [base])

  const productos = useMemo(() => {
    const lista = base.filter((p) => !actual || p.categoria === actual.id)
    if (orden === 'az') return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    if (orden === 'za') return [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))
    return [...lista].sort((a, b) => (PESO_ETIQUETA[a.etiqueta] ?? 9) - (PESO_ETIQUETA[b.etiqueta] ?? 9))
  }, [base, actual, orden])

  const totalPaginas = Math.max(1, Math.ceil(productos.length / POR_PAGINA))
  const paginaReal = Math.min(pagina, totalPaginas)
  const desde = (paginaReal - 1) * POR_PAGINA
  const visibles = productos.slice(desde, desde + POR_PAGINA)

  const filtrosActivos = [
    actual && { label: actual.corto, quitar: () => elegir('todos') },
    busqueda && { label: `“${busqueda}”`, quitar: () => actualizar({ q: '' }) },
    soloPersonalizables && { label: 'Personalizables', quitar: () => actualizar({ personalizable: '' }) },
  ].filter(Boolean)

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
        {/* Barra de herramientas */}
        <div className="relative z-30 -mx-2 px-2 py-2 sm:-mx-3 sm:px-3 md:sticky md:top-[5rem]">
          <div className="rounded-3xl bg-white/95 p-3 shadow-xl shadow-slate-900/[0.06] ring-1 ring-slate-200/80 backdrop-blur-xl sm:p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="group relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-ganet-blue" />
                <input
                  ref={buscador}
                  value={busqueda}
                  onChange={(e) => actualizar({ q: e.target.value })}
                  placeholder="Buscar resmas, polos, tazas, desinfectante…"
                  className="w-full rounded-2xl border-0 bg-slate-100/80 py-3 pl-11 pr-20 text-sm transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ganet-sky"
                />
                {busqueda ? (
                  <button onClick={() => actualizar({ q: '' })} className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300" aria-label="Limpiar búsqueda">
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-300 bg-white px-2 py-0.5 font-sans text-[11px] text-slate-400 md:block">/</kbd>
                )}
              </label>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => actualizar({ personalizable: soloPersonalizables ? '' : '1' })}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    soloPersonalizables ? 'bg-ganet-ink text-white shadow-lg shadow-ganet-ink/20' : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  <Palette className={`h-4 w-4 ${soloPersonalizables ? 'text-ganet-cyan' : ''}`} />
                  <span className="whitespace-nowrap">Personalizables</span>
                </button>

                <label className="relative">
                  <ArrowDownAZ className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <select
                    value={orden}
                    onChange={(e) => actualizar({ orden: e.target.value === 'destacados' ? '' : e.target.value })}
                    className="cursor-pointer appearance-none rounded-2xl border-0 bg-slate-100/80 py-3 pl-10 pr-9 text-sm font-medium text-slate-600 transition hover:bg-slate-200/80 focus:outline-none focus:ring-2 focus:ring-ganet-sky"
                    aria-label="Ordenar"
                  >
                    {ORDENES.map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                  <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </label>
              </div>
            </div>

            <Pestanas categoria={categoria} conteo={conteo} total={base.length} elegir={elegir} />
          </div>
        </div>

        {/* Resumen y filtros activos */}
        <div ref={grilla} className="mt-5 flex flex-wrap items-center gap-2 px-1 text-sm">
          <span className="mr-2 text-slate-500">
            {productos.length > 0 ? (
              <>
                Mostrando <b className="font-semibold text-ganet-ink">{desde + 1}–{desde + visibles.length}</b> de{' '}
                <b className="font-semibold text-ganet-ink">{productos.length}</b> {productos.length === 1 ? 'artículo' : 'artículos'}
              </>
            ) : (
              'Sin resultados'
            )}
          </span>
          {filtrosActivos.map((f) => (
            <button key={f.label} onClick={f.quitar} className="group inline-flex items-center gap-1.5 rounded-full bg-ganet-sky/10 px-3 py-1 text-xs font-medium text-ganet-blue ring-1 ring-ganet-sky/30 transition hover:bg-ganet-sky/20">
              {f.label}
              <X className="h-3 w-3 transition group-hover:rotate-90" />
            </button>
          ))}
          {filtrosActivos.length > 1 && (
            <button onClick={limpiar} className="text-xs font-medium text-slate-400 underline-offset-2 hover:text-red-500 hover:underline">
              Limpiar todo
            </button>
          )}
        </div>

        {visibles.length > 0 ? (
          <>
            <div key={`${categoria}-${q}-${orden}-${soloPersonalizables}-${paginaReal}`} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibles.map((p, i) => (
                <div key={p.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <ProductoCard producto={p} className="h-full" />
                </div>
              ))}
            </div>
            <Paginacion actual={paginaReal} total={totalPaginas} ir={irAPagina} />
          </>
        ) : (
          <div className="mt-8 rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 px-6 py-16 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-ganet-cyan/15 to-ganet-lime/15">
              <PackageSearch className="h-10 w-10 text-ganet-blue" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ganet-ink">No encontramos resultados</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Prueba con otra palabra o escríbenos: conseguimos productos que no estén en el catálogo.
            </p>
            <button onClick={limpiar} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ganet-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ganet-blue">
              Ver todo el catálogo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>
    </>
  )
}

// Pestañas de líneas con indicador deslizante y contador por línea.
function Pestanas({ categoria, conteo, total, elegir }) {
  const pista = useRef(null)
  const refs = useRef({})
  const [ind, setInd] = useState(null)
  const [bordes, setBordes] = useState({ izq: false, der: false })
  const opciones = [{ id: 'todos', corto: 'Todos', icono: 'LayoutGrid' }, ...CATEGORIAS]

  const revisarBordes = () => {
    const el = pista.current
    if (!el) return
    setBordes({ izq: el.scrollLeft > 4, der: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
  }

  useLayoutEffect(() => {
    const medir = () => {
      const el = refs.current[categoria]
      if (!el) return
      setInd({ left: el.offsetLeft, width: el.offsetWidth })
      const p = pista.current
      if (p && (el.offsetLeft < p.scrollLeft || el.offsetLeft + el.offsetWidth > p.scrollLeft + p.clientWidth)) {
        p.scrollTo({ left: el.offsetLeft - 48, behavior: 'smooth' })
      }
      revisarBordes()
    }
    medir()
    const obs = new ResizeObserver(medir)
    if (pista.current) obs.observe(pista.current)
    document.fonts?.ready.then(medir)
    return () => obs.disconnect()
  }, [categoria])

  const desplazar = (dir) => pista.current?.scrollBy({ left: dir * 240, behavior: 'smooth' })

  return (
    <div className="relative mt-3 border-t border-slate-100 pt-3">
      {bordes.izq && (
        <button onClick={() => desplazar(-1)} className="absolute left-0 top-3 z-20 grid h-11 w-10 place-items-center bg-gradient-to-r from-white via-white to-transparent text-slate-500" aria-label="Ver anteriores">
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <div ref={pista} onScroll={revisarBordes} className="no-scrollbar relative flex gap-1 overflow-x-auto">
        {ind && (
          <span
            className="absolute top-0 h-11 rounded-2xl bg-ganet-ink shadow-lg shadow-ganet-ink/20 transition-all duration-300 ease-out"
            style={{ left: ind.left, width: ind.width }}
          />
        )}
        {opciones.map((c) => {
          const activo = c.id === categoria
          const n = c.id === 'todos' ? total : conteo[c.id]
          return (
            <button
              key={c.id}
              ref={(el) => (refs.current[c.id] = el)}
              onClick={() => elegir(c.id)}
              disabled={!activo && n === 0}
              className={`relative z-10 flex h-11 shrink-0 items-center gap-2 rounded-2xl px-4 text-sm font-medium transition-colors disabled:opacity-35 ${
                activo ? 'text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ganet-ink'
              }`}
            >
              <Icono nombre={c.icono} className={`h-4 w-4 ${activo ? 'text-ganet-cyan' : ''}`} />
              {c.corto}
              <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold ${activo ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {n}
              </span>
            </button>
          )
        })}
      </div>
      {bordes.der && (
        <button onClick={() => desplazar(1)} className="absolute right-0 top-3 z-20 grid h-11 w-10 place-items-center bg-gradient-to-l from-white via-white to-transparent text-slate-500" aria-label="Ver más">
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

// Números de página con elipsis: 1 … 4 5 6 … 10
function paginasVisibles(actual, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set([1, total, actual - 1, actual, actual + 1].filter((n) => n >= 1 && n <= total))
  const lista = [...set].sort((a, b) => a - b)
  return lista.flatMap((n, i) => (i > 0 && n - lista[i - 1] > 1 ? ['…', n] : [n]))
}

function Paginacion({ actual, total, ir }) {
  if (total <= 1) return null
  return (
    <nav className="mt-14 flex flex-col items-center gap-4" aria-label="Paginación">
      <div className="flex items-center gap-1.5 rounded-2xl bg-white p-1.5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200">
        <button
          onClick={() => ir(actual - 1)}
          disabled={actual === 1}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-35 sm:px-4"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>
        {paginasVisibles(actual, total).map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="grid h-11 w-8 place-items-center text-slate-400">…</span>
          ) : (
            <button
              key={n}
              onClick={() => ir(n)}
              aria-current={n === actual ? 'page' : undefined}
              className={`grid h-11 min-w-11 place-items-center rounded-xl px-2 text-sm font-semibold transition ${
                n === actual ? 'bg-gradient-to-br from-ganet-cyan to-ganet-blue text-ganet-ink shadow-lg shadow-ganet-blue/30' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {n}
            </button>
          ),
        )}
        <button
          onClick={() => ir(actual + 1)}
          disabled={actual === total}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-35 sm:px-4"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-lime transition-all duration-500" style={{ width: `${(actual / total) * 100}%` }} />
      </div>
      <p className="text-xs text-slate-400">Página {actual} de {total}</p>
    </nav>
  )
}
