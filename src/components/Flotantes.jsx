import { MessageCircle } from 'lucide-react'
import { EMPRESA } from '../data/catalogo'
import { abrirWhatsapp, useCotizacion } from '../context/Cotizacion'

export function BotonWhatsapp() {
  return (
    <button
      onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, vengo de la página web.')}
      className="boton-whatsapp group fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
      <MessageCircle className="relative h-6 w-6" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-ganet-ink px-3 py-1.5 text-xs font-medium opacity-0 shadow-lg transition group-hover:opacity-100">
        ¿Hablamos?
      </span>
    </button>
  )
}

export function Aviso() {
  const { aviso, abierta, abrir } = useCotizacion()
  const visible = aviso && !abierta
  return (
    <div
      className={`fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <button
        onClick={abrir}
        className="flex items-center gap-3 whitespace-nowrap rounded-full bg-ganet-ink px-5 py-3 text-sm text-white shadow-2xl ring-1 ring-white/10"
      >
        <span className="h-2 w-2 rounded-full bg-ganet-lime" />
        <span className="max-w-[60vw] truncate">{aviso}</span>
        <span className="font-semibold text-ganet-cyan">Ver lista</span>
      </button>
    </div>
  )
}
