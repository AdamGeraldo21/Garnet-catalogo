import { useEffect, useState } from 'react'
import { ClipboardList, Menu, X } from 'lucide-react'
import logo from '../assets/logo-mark.png'

const LINKS = [
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo cotizar' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar({ total, onAbrirCotizacion }) {
  const [solido, setSolido] = useState(false)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solido || abierto ? 'bg-ganet-ink/90 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-9 w-auto" />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-[0.18em] text-white">GANET</span>
            <span className="block text-[10px] tracking-wide text-ganet-sky">Soluciones Empresariales</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-slate-300 transition hover:text-ganet-cyan">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAbrirCotizacion}
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-ganet-cyan to-ganet-blue px-4 py-2 text-sm font-semibold text-ganet-ink shadow-lg shadow-ganet-blue/30 transition hover:brightness-110"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Mi cotización</span>
            {total > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ganet-lime px-1 text-[11px] font-bold text-ganet-ink ring-2 ring-ganet-ink">
                {total}
              </span>
            )}
          </button>
          <button
            onClick={() => setAbierto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
            aria-label="Menú"
          >
            {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {abierto && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block py-3 text-slate-200">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
