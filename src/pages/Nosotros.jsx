import { Link } from 'react-router-dom'
import { ArrowRight, Eye, Rocket } from 'lucide-react'
import Icono from '../components/Icono'
import AnatomiaMarca from '../components/AnatomiaMarca'
import { Contador, PageHeader, Reveal, Titulo } from '../components/Animados'
import isotipo from '../assets/logo-mark.png'
import sello from '../assets/sello.png'
import { CATEGORIAS, EMPRESA, PRODUCTOS, SERVICIOS } from '../data/catalogo'
import { MISION, POR_QUE, QUIENES_SOMOS, VALORES, VISION } from '../data/nosotros'

export default function Nosotros() {
  return (
    <>
      <PageHeader
        etiqueta="Sobre nosotros"
        titulo={<>Somos tu <span className="text-gradient">aliado integral</span></>}
        subtitulo="Suministros, personalización y servicios contables reunidos en una sola empresa dominicana."
        imagen="./img/hero/equipo.webp"
      />

      {/* Quiénes somos */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <Titulo etiqueta="Quiénes somos">Ganet Soluciones Empresariales</Titulo>
          {QUIENES_SOMOS.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-slate-600">{p}</p>
          ))}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              [CATEGORIAS.length, 'Líneas'],
              [PRODUCTOS.length, 'Artículos', '+'],
              [SERVICIOS.length, 'Servicios'],
            ].map(([n, l, pre]) => (
              <div key={l} className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200">
                <p className="font-display text-3xl font-extrabold text-ganet-ink"><Contador hasta={n} prefijo={pre} /></p>
                <p className="text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal retraso={150} className="relative grid grid-cols-2 gap-4">
          <img src="./img/hero/oficina.webp" alt="" className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-xl" />
          <div className="grid gap-4 pt-12">
            <img src="./img/productos/st-01.webp" alt="" className="aspect-square w-full rounded-[2rem] object-cover shadow-xl" />
            <img src="./img/productos/po-02.webp" alt="" className="aspect-square w-full rounded-[2rem] object-cover shadow-xl" />
          </div>
          <div className="absolute -bottom-6 left-1/2 grid h-24 w-24 -translate-x-1/2 animate-float-lento place-items-center rounded-3xl bg-ganet-ink shadow-2xl shadow-ganet-blue/20">
            <img src={isotipo} alt="" className="h-14 w-auto" />
          </div>
        </Reveal>
      </section>

      {/* Misión y visión */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 md:grid-cols-2">
        {[
          { icono: Rocket, titulo: 'Misión', texto: MISION, clase: 'from-ganet-blue to-ganet-sky' },
          { icono: Eye, titulo: 'Visión', texto: VISION, clase: 'from-ganet-green to-ganet-lime' },
        ].map(({ icono: I, titulo, texto, clase }, i) => (
          <Reveal key={titulo} retraso={i * 120}>
            <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:shadow-xl sm:p-10">
              <div className={`absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${clase} opacity-15 blur-2xl transition duration-700 group-hover:scale-125`} />
              <span className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${clase} text-white shadow-lg`}>
                <I className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-bold text-ganet-ink">{titulo}</h3>
              <p className="relative mt-3 leading-relaxed text-slate-600">{texto}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Valores */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <Titulo etiqueta="Nuestros valores" centro>Lo que nos mueve</Titulo>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <Reveal key={v.titulo} retraso={i * 90}>
                <div className="group h-full rounded-3xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-ganet-sky hover:shadow-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ganet-cyan/15 to-ganet-lime/15 text-ganet-blue transition group-hover:from-ganet-cyan group-hover:to-ganet-blue group-hover:text-white">
                    <Icono nombre={v.icono} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ganet-ink">{v.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnatomiaMarca />

      {/* Por qué elegirnos */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <Titulo etiqueta="¿Por qué Ganet?">Razones para trabajar juntos</Titulo>
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {POR_QUE.map((r, i) => (
            <Reveal key={r.titulo} retraso={i * 80} className="flex gap-5">
              <span className="font-display text-4xl font-extrabold text-slate-200">0{i + 1}</span>
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ganet-ink">
                  <Icono nombre={r.icono} className="h-5 w-5 text-ganet-blue" /> {r.titulo}
                </h3>
                <p className="mt-1 text-slate-500">{r.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fundador */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="relative mx-auto grid max-w-5xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#EAF4FB] via-white to-[#EEF6E8] p-8 text-ganet-ink ring-1 ring-slate-200 sm:p-12 md:grid-cols-[auto_1fr]">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <img src={sello} alt="Sello Ganet" className="relative mx-auto w-40 animate-[orbit_30s_linear_infinite] opacity-90 sm:w-52" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ganet-green">Fundador</p>
            <h3 className="mt-2 font-display text-3xl font-bold">{EMPRESA.ceo}</h3>
            <p className="text-ganet-blue">CEO & Founder</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Al frente de Ganet, impulsa una empresa pensada para que cada cliente tenga un aliado que entienda sus necesidades y cuide cada detalle, desde una resma de papel hasta sus estados financieros.
            </p>
            <Link to="/contacto" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-ganet-ink px-6 py-3 font-semibold text-white transition hover:bg-ganet-blue">
              Hablemos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
