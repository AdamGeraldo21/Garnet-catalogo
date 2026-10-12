import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import isotipo from '../assets/logo-mark.png'

export default function NoEncontrado() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden bg-ganet-ink px-4 pt-20 text-center text-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div>
        <img src={isotipo} alt="" className="mx-auto h-20 animate-float" />
        <p className="mt-8 font-display text-7xl font-extrabold text-gradient">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold">No encontramos esta página</h1>
        <p className="mt-2 text-slate-400">Puede que el enlace haya cambiado.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ganet-ink hover:bg-ganet-cyan">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
      </div>
    </section>
  )
}
