import { useEffect, useRef, useState } from 'react'

function useVisible(opciones = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setVisible(true)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        obs.disconnect()
      }
    }, opciones)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// Aparece con un desplazamiento suave al entrar en pantalla.
export function Reveal({ children, className = '', retraso = 0, as: Tag = 'div' }) {
  const [ref, visible] = useVisible()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${retraso}ms` }}
      className={`transition duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  )
}

// Número que cuenta hasta su valor cuando se ve.
export function Contador({ hasta, prefijo = '', sufijo = '', duracion = 1400 }) {
  const [ref, visible] = useVisible()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!visible) return
    let inicio
    let raf
    const paso = (t) => {
      inicio ??= t
      const p = Math.min((t - inicio) / duracion, 1)
      setN(Math.round(hasta * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [visible, hasta, duracion])
  return (
    <span ref={ref}>
      {prefijo}
      {n}
      {sufijo}
    </span>
  )
}

// Encabezado de páginas internas con foto de fondo.
export function PageHeader({ titulo, subtitulo, etiqueta, imagen, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-ganet-ink pb-24 pt-32 text-white lg:pb-28 lg:pt-40">
      {imagen && <img src={imagen} alt="" className="absolute inset-0 -z-20 h-full w-full animate-kenburns object-cover opacity-40" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ganet-ink via-ganet-ink/90 to-ganet-ink/40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {etiqueta && (
          <p className="flex items-center gap-3 text-sm font-medium text-ganet-sky">
            <span className="h-px w-8 bg-current opacity-60" />
            {etiqueta}
          </p>
        )}
        <h1 className="mt-5 max-w-3xl animate-fade-up font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{titulo}</h1>
        {subtitulo && <p className="mt-5 max-w-2xl animate-fade-up text-lg text-slate-300 [animation-delay:120ms]">{subtitulo}</p>}
        {children}
      </div>
      <svg className="absolute inset-x-0 bottom-0 h-12 w-full text-slate-50 sm:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C360,120 1080,0 1440,56 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}

export function Titulo({ etiqueta, children, centro = false, oscuro = false, className = '' }) {
  return (
    <div className={`${centro ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {etiqueta && (
        <p className={`flex items-center gap-3 text-sm font-medium ${centro ? 'justify-center' : ''} ${oscuro ? 'text-ganet-sky' : 'text-ganet-blue'}`}>
          <span className="h-px w-8 bg-current opacity-60" />
          {etiqueta}
        </p>
      )}
      <h2 className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${oscuro ? 'text-white' : 'text-ganet-ink'}`}>{children}</h2>
    </div>
  )
}
