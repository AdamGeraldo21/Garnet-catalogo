import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import logo from '../assets/logo.png'
import { CATEGORIAS, EMPRESA } from '../data/catalogo'
import { LINKS } from './Navbar'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ganet-ink text-slate-400">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-ganet-blue/20 blur-[100px]" />
      <div className="h-1 bg-gradient-to-r from-ganet-cyan via-ganet-blue to-ganet-lime" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <img src={logo} alt="Ganet Soluciones Empresariales S.R.L." className="h-20 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Tu aliado integral: suministros, personalización y servicios contables para que tu empresa funcione sin pausas.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-ganet-cyan">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Líneas</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <Link to={`/catalogo/${c.id}`} className="transition hover:text-ganet-cyan">{c.corto}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-ganet-cyan" />{EMPRESA.telefonos.join(' · ')}</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-ganet-cyan" /><a href={`mailto:${EMPRESA.email}`} className="break-all hover:text-ganet-cyan">{EMPRESA.email}</a></li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-ganet-cyan" />{EMPRESA.direccion}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {EMPRESA.nombre} · RNC {EMPRESA.rnc}</p>
          <p className="text-slate-500">Hecho en Santo Domingo, República Dominicana</p>
        </div>
      </div>
    </footer>
  )
}
