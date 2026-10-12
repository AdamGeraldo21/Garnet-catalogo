import { Link } from 'react-router-dom'
import { ArrowRight, Check, FileSearch, MessageCircle, Presentation, Repeat } from 'lucide-react'
import Icono from '../components/Icono'
import { PageHeader, Reveal, Titulo } from '../components/Animados'
import { CATEGORIAS, EMPRESA, SERVICIOS } from '../data/catalogo'
import { abrirWhatsapp } from '../context/Cotizacion'

const IMAGENES = ['./img/hero/contabilidad.webp', './img/hero/equipo.webp', './img/hero/oficina.webp']

const PROCESO = [
  { icono: MessageCircle, titulo: 'Conversamos', texto: 'Entendemos tu empresa, tu sector y tus obligaciones.' },
  { icono: FileSearch, titulo: 'Diagnóstico', texto: 'Revisamos tu situación contable y fiscal actual.' },
  { icono: Presentation, titulo: 'Propuesta', texto: 'Te presentamos un plan de trabajo claro y a la medida.' },
  { icono: Repeat, titulo: 'Acompañamiento', texto: 'Damos seguimiento continuo y reportes periódicos.' },
]

export default function Servicios() {
  const solicitar = (nombre) => abrirWhatsapp(EMPRESA.whatsapp, `Hola Ganet, me interesa el servicio de ${nombre}. ¿Podemos conversar?`)

  return (
    <>
      <PageHeader
        etiqueta="Servicios profesionales"
        titulo={<>Contabilidad, auditoría y <span className="text-gradient">asesoría fiscal</span></>}
        subtitulo="Además de suplir tu empresa, cuidamos sus números: cumplimiento, precisión y ahorro fiscal dentro de la ley."
        imagen="./img/hero/contabilidad.webp"
      />

      <section className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-6">
        {SERVICIOS.map((s, i) => (
          <div key={s.id} className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <Reveal className="relative">
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img src={IMAGENES[i]} alt="" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" />
              </div>
              <span className="absolute -bottom-6 left-8 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-ganet-cyan to-ganet-blue text-ganet-ink shadow-2xl shadow-ganet-blue/40">
                <Icono nombre={s.icono} className="h-9 w-9" />
              </span>
              <span className="absolute -top-16 right-2 -z-10 font-display text-9xl font-extrabold text-slate-200">0{i + 1}</span>
            </Reveal>
            <Reveal retraso={120}>
              <Titulo etiqueta={`Servicio 0${i + 1}`}>{s.nombre}</Titulo>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">{s.descripcion}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.puntos.map((p) => (
                  <li key={p} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-ganet-ink shadow-sm ring-1 ring-slate-200">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ganet-lime/20 text-ganet-green"><Check className="h-3.5 w-3.5" /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <button onClick={() => solicitar(s.nombre)} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ganet-ink px-6 py-3.5 font-semibold text-white transition hover:bg-ganet-blue">
                Solicitar información <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        ))}
      </section>

      <section className="relative isolate overflow-hidden bg-ganet-ink py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <Titulo etiqueta="Cómo trabajamos" centro oscuro>Un proceso claro de principio a fin</Titulo>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO.map(({ icono: I, titulo, texto }, i) => (
              <Reveal key={titulo} retraso={i * 100}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:border-ganet-cyan/40 hover:bg-white/10">
                  <span className="absolute right-6 top-5 font-display text-4xl font-extrabold text-white/10">{i + 1}</span>
                  <I className="h-8 w-8 text-ganet-cyan" />
                  <h3 className="mt-5 font-display text-lg font-bold">{titulo}</h3>
                  <p className="mt-2 text-sm text-slate-400">{texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <Titulo etiqueta="Suministro empresarial">Y todo lo que tu oficina necesita</Titulo>
          <Link to="/catalogo" className="group inline-flex items-center gap-2 font-semibold text-ganet-blue">
            Ver catálogo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIAS.map((c, i) => (
            <Reveal key={c.id} retraso={i * 60}>
              <Link to={`/catalogo/${c.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-lg">
                <img src={c.imagen} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ganet-ink via-ganet-ink/30 to-transparent" />
                <span className="absolute inset-x-4 bottom-4 font-semibold text-white">{c.corto}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
