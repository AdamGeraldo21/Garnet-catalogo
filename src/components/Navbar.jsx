import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, ClipboardList, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react'
import isotipo from '../assets/logo-mark.png'
import wordmark from '../assets/wordmark.png'
import Icono from './Icono'
import { CATEGORIAS, EMPRESA, PRODUCTOS } from '../data/catalogo'
import { abrirWhatsapp, useCotizacion } from '../context/Cotizacion'

export const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo', menu: true },
  { to: '/personaliza', label: 'Personaliza', nuevo: true },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const activo = (pathname, to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

export function Marca({ className = '' }) {
  return (
    <Link to="/" className={`group flex shrink-0 items-center gap-3 ${className}`} aria-label="Ganet, ir al inicio">
      <img src={isotipo} alt="" className="h-10 w-auto transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
      <span className="flex flex-col gap-1 border-l border-white/15 pl-3">
        <img src={wordmark} alt="GANET" className="h-[1.15rem] w-auto" />
        <span className="hidden text-[10px] font-medium tracking-[0.12em] text-ganet-sky/90 sm:block">Soluciones Empresariales</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const { total, abrir } = useCotizacion()
  const { pathname } = useLocation()
  const [scroll, setScroll] = useState(0)
  const [progreso, setProgreso] = useState(0)
  const [movil, setMovil] = useState(false)
  const [menu, setMenu] = useState(false)
  const flotante = scroll > 40

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(window.scrollY)
      setProgreso(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMovil(false)
    setMenu(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = movil ? 'hidden' : ''
  }, [movil])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* Franja de contacto: solo arriba del todo y en pantallas grandes */}
        <div className={`hidden overflow-hidden transition-all duration-500 lg:block ${flotante ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-slate-400">
            <div className="flex items-center gap-6">
              <a href={`tel:+${EMPRESA.whatsapp}`} className="flex items-center gap-1.5 transition hover:text-white">
                <Phone className="h-3.5 w-3.5 text-ganet-cyan" /> {EMPRESA.telefonos.join(' · ')}
              </a>
              <a href={`mailto:${EMPRESA.email}`} className="flex items-center gap-1.5 transition hover:text-white">
                <Mail className="h-3.5 w-3.5 text-ganet-cyan" /> {EMPRESA.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-ganet-cyan" /> Alameda, Santo Domingo
              </span>
            </div>
            <button
              onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, vengo de la página web.')}
              className="flex items-center gap-1.5 font-medium text-ganet-lime transition hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Cotiza por WhatsApp
            </button>
          </div>
          <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Barra principal: transparente arriba, isla flotante al hacer scroll */}
        <div className={`transition-all duration-500 ${flotante ? 'px-3 pt-3 sm:px-4' : 'px-0 pt-0'}`}>
          <div
            className={`relative mx-auto transition-all duration-500 ${
              flotante
                ? 'max-w-6xl rounded-2xl border border-white/10 bg-ganet-ink/75 shadow-2xl shadow-black/30 backdrop-blur-xl'
                : 'max-w-7xl border border-transparent'
            }`}
            onMouseLeave={() => setMenu(false)}
          >
            <nav className={`flex items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 ${flotante ? 'h-16' : 'h-20'}`}>
              <Marca />

              <Enlaces pathname={pathname} menuAbierto={menu} setMenu={setMenu} />

              <div className="flex items-center gap-2">
                <button
                  onClick={abrir}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-4 py-2.5 text-sm font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/20 transition hover:shadow-ganet-cyan/50"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <ClipboardList className="relative h-4 w-4" />
                  <span className="relative hidden sm:inline">Mi cotización</span>
                  {total > 0 && (
                    <span key={total} className="relative grid h-5 min-w-5 animate-fade-up place-items-center rounded-full bg-ganet-ink px-1.5 text-[11px] font-bold text-ganet-cyan">
                      {total}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMovil(true)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
                  aria-label="Abrir menú"
                >
                  <span className="flex w-5 flex-col items-end gap-1.5">
                    <span className="h-0.5 w-5 rounded bg-white" />
                    <span className="h-0.5 w-3.5 rounded bg-ganet-cyan" />
                    <span className="h-0.5 w-5 rounded bg-white" />
                  </span>
                </button>
              </div>
            </nav>

            <MegaMenu abierto={menu} />

            {/* Progreso de lectura */}
            <div className={`absolute inset-x-4 -bottom-px h-0.5 overflow-hidden rounded-full transition-opacity duration-300 ${flotante ? 'opacity-100' : 'opacity-0'}`}>
              <div className="h-full origin-left bg-gradient-to-r from-ganet-cyan via-ganet-blue to-ganet-lime" style={{ transform: `scaleX(${progreso})` }} />
            </div>
          </div>
        </div>
      </header>

      <MenuMovil abierto={movil} cerrar={() => setMovil(false)} pathname={pathname} />
    </>
  )
}

// Enlaces con un indicador que se desliza hacia el enlace activo o el que está bajo el ratón.
function Enlaces({ pathname, menuAbierto, setMenu }) {
  const contenedor = useRef(null)
  const refs = useRef({})
  const [hover, setHover] = useState(null)
  const [ind, setInd] = useState(null)
  const actual = LINKS.find((l) => activo(pathname, l.to))?.to
  const objetivo = hover ?? actual

  useLayoutEffect(() => {
    const medir = () => {
      const el = refs.current[objetivo]
      if (!el || !contenedor.current) return setInd(null)
      const c = contenedor.current.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setInd({ left: r.left - c.left, width: r.width })
    }
    medir()
    // Se vuelve a medir cuando cargan las fuentes o cambia el tamaño de los enlaces.
    const obs = new ResizeObserver(medir)
    if (contenedor.current) obs.observe(contenedor.current)
    document.fonts?.ready.then(medir)
    return () => obs.disconnect()
  }, [objetivo])

  return (
    <div ref={contenedor} className="relative hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur lg:flex" onMouseLeave={() => setHover(null)}>
      {ind && (
        <span
          className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-white/10 ring-1 ring-white/15 transition-all duration-300 ease-out"
          style={{ left: ind.left, width: ind.width }}
        >
          <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-lime shadow-[0_0_10px_rgba(92,211,230,0.5)]" />
        </span>
      )}
      {LINKS.map((l) => {
        const esActivo = activo(pathname, l.to)
        return (
          <NavLink
            key={l.to}
            to={l.to}
            ref={(el) => (refs.current[l.to] = el)}
            onMouseEnter={() => {
              setHover(l.to)
              setMenu(Boolean(l.menu))
            }}
            className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              esActivo || hover === l.to ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {l.label}
            {l.menu && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${menuAbierto ? 'rotate-180' : ''}`} />}
            {l.nuevo && <span className="ml-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-ganet-lime" title="Nuevo" />}
          </NavLink>
        )
      })}
    </div>
  )
}

function MegaMenu({ abierto }) {
  return (
    <div
      className={`absolute inset-x-0 top-full hidden px-2 pt-3 transition-all duration-300 lg:block ${
        abierto ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-ganet-ink/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="grid grid-cols-[1fr_15rem] gap-5">
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIAS.map((c) => (
              <Link key={c.id} to={`/catalogo/${c.id}`} className="group relative h-28 overflow-hidden rounded-2xl">
                <img src={c.imagen} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-ganet-ink via-ganet-ink/60 to-transparent" />
                <span className={`absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${c.color} text-white shadow`}>
                  <Icono nombre={c.icono} className="h-4 w-4" />
                </span>
                <span className="absolute inset-x-3 bottom-2.5">
                  <span className="block text-sm font-semibold text-white">{c.corto}</span>
                  <span className="text-[11px] text-slate-400">{PRODUCTOS.filter((p) => p.categoria === c.id).length} artículos</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-ganet-blue to-ganet-cyan p-5 text-ganet-ink">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Nuevo</p>
              <p className="mt-1 font-display text-lg font-bold leading-tight">Personaliza con tu logo en vivo</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/personaliza" className="inline-flex items-center justify-between rounded-xl bg-ganet-ink px-3 py-2 text-sm font-semibold text-white">
                Abrir estudio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/catalogo" className="inline-flex items-center justify-between rounded-xl bg-white/30 px-3 py-2 text-sm font-semibold">
                Ver todo el catálogo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuMovil({ abierto, cerrar, pathname }) {
  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${abierto ? '' : 'pointer-events-none'}`} aria-hidden={!abierto}>
      <div className={`absolute inset-0 bg-ganet-ink transition-opacity duration-500 ${abierto ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ganet-blue/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-ganet-green/15 blur-3xl" />
      </div>

      <div className={`relative flex h-full flex-col px-5 pb-8 pt-4 transition-all duration-500 ${abierto ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="flex h-14 items-center justify-between">
          <Marca />
          <button onClick={cerrar} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white" aria-label="Cerrar menú">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-10 flex flex-col">
          {LINKS.map((l, i) => {
            const esActivo = activo(pathname, l.to)
            return (
              <NavLink
                key={l.to}
                to={l.to}
                style={{ transitionDelay: abierto ? `${120 + i * 60}ms` : '0ms' }}
                className={`group flex items-center justify-between border-b border-white/5 py-4 transition-all duration-500 ${
                  abierto ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
                }`}
              >
                <span className={`font-display text-3xl font-bold ${esActivo ? 'text-gradient' : 'text-white'}`}>
                  <span className="mr-3 align-middle text-xs font-medium text-slate-500">0{i + 1}</span>
                  {l.label}
                </span>
                <ArrowRight className={`h-5 w-5 transition ${esActivo ? 'text-ganet-cyan' : 'text-slate-600 group-hover:text-white'}`} />
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-auto space-y-3 pt-8 text-sm text-slate-400">
          <a href={`tel:+${EMPRESA.whatsapp}`} className="flex items-center gap-3"><Phone className="h-4 w-4 text-ganet-cyan" /> {EMPRESA.telefonos.join(' · ')}</a>
          <a href={`mailto:${EMPRESA.email}`} className="flex items-center gap-3"><Mail className="h-4 w-4 text-ganet-cyan" /> {EMPRESA.email}</a>
          <button
            onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, vengo de la página web.')}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
