import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { PageHeader, Reveal } from '../components/Animados'
import { CATEGORIAS, EMPRESA, SERVICIOS } from '../data/catalogo'
import { abrirWhatsapp } from '../context/Cotizacion'

const INTERESES = [...CATEGORIAS.map((c) => c.nombre), ...SERVICIOS.map((s) => s.nombre), 'Otro']

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', interes: INTERESES[0], mensaje: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const mensaje = () =>
    [
      'Hola Ganet, les escribo desde la página web.',
      '',
      `*Nombre:* ${form.nombre}`,
      form.empresa ? `*Empresa:* ${form.empresa}` : null,
      form.telefono ? `*Teléfono:* ${form.telefono}` : null,
      `*Interés:* ${form.interes}`,
      '',
      form.mensaje,
    ]
      .filter((l) => l !== null)
      .join('\n')
      .trim()

  const enviarWhatsapp = (e) => {
    e.preventDefault()
    abrirWhatsapp(EMPRESA.whatsapp, mensaje())
  }

  const enviarCorreo = () => {
    window.location.href = `mailto:${EMPRESA.email}?subject=${encodeURIComponent(`Contacto web — ${form.interes}`)}&body=${encodeURIComponent(mensaje())}`
  }

  const datos = [
    { icono: Phone, label: 'Teléfonos', valor: EMPRESA.telefonos.join('  ·  '), href: `tel:+${EMPRESA.whatsapp}` },
    { icono: MessageCircle, label: 'WhatsApp', valor: EMPRESA.telefonos[0], href: `https://wa.me/${EMPRESA.whatsapp}` },
    { icono: Mail, label: 'Correo', valor: EMPRESA.email, href: `mailto:${EMPRESA.email}` },
    { icono: MapPin, label: 'Dirección', valor: EMPRESA.direccion },
  ]

  const campo = 'w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ganet-sky'

  return (
    <>
      <PageHeader
        etiqueta="Contacto"
        titulo={<>Hablemos de <span className="text-gradient">tu empresa</span></>}
        subtitulo="Cuéntanos qué necesitas y te respondemos con una propuesta a la medida."
        imagen="./img/hero/flatlay-azul.webp"
      />

      <section className="relative z-10 mx-auto -mt-10 grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <form onSubmit={enviarWhatsapp} className="relative rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-ganet-ink">Escríbenos</h2>
            <p className="mt-1 text-sm text-slate-500">Al enviar se abre WhatsApp (o tu correo) con el mensaje listo.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input required value={form.nombre} onChange={set('nombre')} placeholder="Nombre *" className={campo} />
              <input value={form.empresa} onChange={set('empresa')} placeholder="Empresa" className={campo} />
              <input value={form.telefono} onChange={set('telefono')} placeholder="Teléfono" type="tel" className={campo} />
              <select value={form.interes} onChange={set('interes')} className={campo}>
                {INTERESES.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
              <textarea required value={form.mensaje} onChange={set('mensaje')} rows={5} placeholder="¿En qué te podemos ayudar? *" className={`${campo} resize-none sm:col-span-2`} />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition hover:brightness-105">
                <Send className="h-4 w-4" /> Enviar por WhatsApp
              </button>
              <button
                type="button"
                onClick={(e) => e.currentTarget.form.reportValidity() && enviarCorreo()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-ganet-ink transition hover:border-ganet-blue hover:text-ganet-blue"
              >
                <Mail className="h-4 w-4" /> Por correo
              </button>
            </div>
          </form>
        </Reveal>

        <div className="space-y-4">
          {datos.map(({ icono: I, label, valor, href }, i) => (
            <Reveal key={label} retraso={i * 80}>
              <div className="group flex items-center gap-4 rounded-2xl bg-ganet-ink p-5 text-white transition hover:-translate-y-0.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ganet-cyan to-ganet-blue text-ganet-ink transition group-hover:rotate-6">
                  <I className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="break-words font-medium hover:text-ganet-cyan">{valor}</a>
                  ) : (
                    <p className="font-medium">{valor}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-slate-200">
          <iframe
            title="Ubicación de Ganet"
            src={`https://maps.google.com/maps?q=${encodeURIComponent('Residencial Tierra Llana, Alameda, Santo Domingo Oeste, República Dominicana')}&z=15&output=embed`}
            className="h-96 w-full grayscale-[30%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>
    </>
  )
}
