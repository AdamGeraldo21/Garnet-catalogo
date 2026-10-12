import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ClipboardList, Menu, X } from 'lucide-react'
import logo from '../assets/logo-mark.png'
import { useCotizacion } from '../context/Cotizacion'

export const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/personaliza', label: 'Personaliza' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { total, abrir } = useCotizacion()
  const { pathname } = useLocation()
  const [solido, setSolido] = useState(false)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setAbierto(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solido || abierto ? 'bg-ganet-ink/85 shadow-lg shadow-black/20 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt="" className="h-9 w-auto lg:h-10" />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-[0.18em] text-white">GANET</span>
            <span className="block text-[10px] tracking-wide text-ganet-sky">Soluciones Empresariales</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-white text-ganet-ink shadow' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={abrir}
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-4 py-2.5 text-sm font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/30 transition hover:brightness-110"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Mi cotización</span>
            {total > 0 && (
              <span key={total} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-fade-up place-items-center rounded-full bg-ganet-lime px-1 text-[11px] font-bold text-ganet-ink ring-2 ring-ganet-ink">
                {total}
              </span>
            )}
          </button>
          <button
            onClick={() => setAbierto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-white lg:hidden"
            aria-label="Menú"
          >
            {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0">
          <div className="border-t border-white/10 px-4 pb-4 pt-2">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `block rounded-xl px-3 py-3 ${isActive ? 'bg-white/10 text-ganet-cyan' : 'text-slate-200'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
