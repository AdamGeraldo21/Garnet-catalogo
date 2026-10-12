import { ArrowRight, Check, ClipboardList, Mail, MapPin, MessageCircle, Phone, Send, Truck } from 'lucide-react'
import Icono from './Icono'
import logo from '../assets/logo.png'
import sello from '../assets/sello.png'
import { CATEGORIAS, EMPRESA, SERVICIOS } from '../data/catalogo'
import { abrirWhatsapp } from '../hooks/useCotizacion'

export function Cinta() {
  const textos = [...CATEGORIAS.map((c) => c.nombre), ...SERVICIOS.map((s) => s.nombre)]
  return (
    <div className="mask-fade-x overflow-hidden border-y border-slate-200 bg-white py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...textos, ...textos].map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {t}
            <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-ganet-cyan to-ganet-lime" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Servicios() {
  return (
    <section id="servicios" className="relative isolate overflow-hidden bg-ganet-ink py-24 text-white">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-ganet-blue/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ganet-lime">Servicios profesionales</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Contabilidad, auditoría y <span className="text-gradient">asesoría</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Además de suplir tu empresa, cuidamos sus números. Cumplimiento, precisión y ahorro fiscal dentro de la ley.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICIOS.map((s, i) => (
            <article
              key={s.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-ganet-cyan/40 hover:bg-white/[0.07]"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-white/5">0{i + 1}</span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-ganet-cyan to-ganet-blue text-ganet-ink shadow-lg shadow-ganet-blue/30">
                <Icono nombre={s.icono} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold">{s.nombre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.descripcion}</p>
              <ul className="mt-5 space-y-2">
                {s.puntos.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-ganet-lime" />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => abrirWhatsapp(EMPRESA.whatsapp, `Hola Ganet, me interesa el servicio de ${s.nombre}. ¿Podemos conversar?`)}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ganet-cyan transition group-hover:gap-3"
              >
                Solicitar información <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const PASOS = [
  { icono: ClipboardList, titulo: 'Arma tu lista', texto: 'Explora el catálogo y agrega los productos con la cantidad y opción que necesitas.' },
  { icono: Send, titulo: 'Envíala por WhatsApp', texto: 'Con un clic nos llega tu pedido detallado, sin formularios largos.' },
  { icono: Truck, titulo: 'Recibe tu cotización', texto: 'Te respondemos con precios y tiempos de entrega. Aprobada, la llevamos a tu empresa.' },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ganet-blue">Cómo cotizar</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-ganet-ink sm:text-4xl">Tres pasos, cero complicaciones</h2>
      </div>

      <ol className="relative mt-14 grid gap-10 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-gradient-to-r from-ganet-cyan via-ganet-blue to-ganet-lime md:block" />
        {PASOS.map(({ icono: I, titulo, texto }, i) => (
          <li key={titulo} className="relative text-center">
            <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-ganet-blue shadow-lg ring-1 ring-slate-200">
              <I className="h-7 w-7" />
              <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ganet-lime text-xs font-bold text-ganet-ink">{i + 1}</span>
            </span>
            <h3 className="mt-5 font-semibold text-ganet-ink">{titulo}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500">{texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Contacto() {
  const datos = [
    { icono: Phone, label: 'Teléfonos', valor: EMPRESA.telefonos.join('  ·  '), href: `tel:+${EMPRESA.whatsapp}` },
    { icono: Mail, label: 'Correo', valor: EMPRESA.email, href: `mailto:${EMPRESA.email}` },
    { icono: MapPin, label: 'Dirección', valor: EMPRESA.direccion },
  ]

  return (
    <footer id="contacto" className="bg-slate-50 px-4 pb-10 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-ganet-ink via-ganet-deep to-ganet-ink p-8 text-white sm:p-12">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ganet-cyan/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-ganet-green/25 blur-3xl" />
        <img src={sello} alt="" className="absolute -bottom-10 -right-10 hidden w-56 rotate-12 opacity-10 lg:block" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿No encuentras lo que buscas? <span className="text-gradient">Lo conseguimos.</span>
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Escríbenos con lo que necesitas y te armamos una propuesta a la medida de tu empresa.
            </p>
            <button
              onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, quisiera más información sobre sus productos y servicios.')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition hover:brightness-105"
            >
              <MessageCircle className="h-5 w-5" />
              Escríbenos por WhatsApp
            </button>
          </div>

          <ul className="space-y-4">
            {datos.map(({ icono: I, label, valor, href }) => (
              <li key={label} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ganet-blue/20 text-ganet-cyan">
                  <I className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
                  {href ? (
                    <a href={href} className="break-words text-sm font-medium hover:text-ganet-cyan">{valor}</a>
                  ) : (
                    <p className="text-sm font-medium">{valor}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <img src={logo} alt="Ganet Soluciones Empresariales S.R.L." className="h-14 w-auto" />
        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} {EMPRESA.nombre}
          <span className="block text-xs text-slate-400">RNC {EMPRESA.rnc}</span>
        </p>
      </div>
    </footer>
  )
}

export function BotonWhatsapp() {
  return (
    <button
      onClick={() => abrirWhatsapp(EMPRESA.whatsapp, 'Hola Ganet, vengo del catálogo.')}
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle className="relative h-6 w-6" />
    </button>
  )
}
