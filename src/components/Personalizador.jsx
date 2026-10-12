import { useRef, useState } from 'react'
import { ImagePlus, Pipette, Type, X } from 'lucide-react'
import { coloresDe } from '../data/catalogo'

const FUENTES = ['Sora', 'Poppins', 'Bebas Neue', 'Playfair Display', 'Pacifico']

export function usePersonalizacion(producto) {
  const colores = coloresDe(producto)
  const [estado, setEstado] = useState({
    color: colores[0] || { nombre: 'Blanco', hex: '#F8FAFC' },
    tecnica: producto.tecnicas?.[0] || '',
    logo: null,
    usarIsotipo: true,
    texto: '',
    fuente: 'Sora',
    colorTexto: '',
  })
  const set = (cambios) => setEstado((e) => ({ ...e, ...cambios }))
  return [estado, set]
}

// Props listas para <Mockup />
export const propsMockup = (e) => ({ logo: e.logo, usarIsotipo: e.usarIsotipo, texto: e.texto, fuente: e.fuente, colorTexto: e.colorTexto, tecnica: e.tecnica })

export function detallesCotizacion(e, opcion) {
  return {
    opcion,
    color: e.color.nombre,
    colorHex: e.color.hex,
    tecnica: e.tecnica,
    texto: e.texto.trim(),
    conLogo: Boolean(e.logo),
  }
}

export function ControlesPersonalizacion({ producto, estado, set, oscuro = false }) {
  const colores = coloresDe(producto)
  const archivo = useRef()
  const [error, setError] = useState('')
  const etiqueta = `text-sm font-medium ${oscuro ? 'text-white' : 'text-ganet-ink'}`
  const chip = (activo) =>
    `rounded-full px-3.5 py-1.5 text-sm transition ${
      activo
        ? 'bg-gradient-to-r from-ganet-cyan to-ganet-blue font-semibold text-ganet-ink'
        : oscuro
          ? 'bg-white/10 text-slate-300 hover:bg-white/20'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`

  const subir = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) return setError('El archivo debe ser una imagen.')
    if (f.size > 4 * 1024 * 1024) return setError('La imagen debe pesar menos de 4 MB.')
    setError('')
    const lector = new FileReader()
    lector.onload = () => set({ logo: lector.result })
    lector.readAsDataURL(f)
    e.target.value = ''
  }

  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <p className={etiqueta}>
          Color <span className={oscuro ? 'font-normal text-slate-400' : 'font-normal text-slate-400'}>· {estado.color.nombre}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {colores.map((c) => (
            <button
              key={c.hex}
              onClick={() => set({ color: c })}
              title={c.nombre}
              aria-label={c.nombre}
              className={`h-9 w-9 rounded-full ring-1 ring-black/10 transition hover:scale-110 ${
                estado.color.hex === c.hex ? `ring-2 ring-ganet-cyan ring-offset-2 ${oscuro ? 'ring-offset-ganet-ink' : ''}` : ''
              }`}
              style={{ background: c.hex }}
            />
          ))}
          <label
            title="Color personalizado"
            className={`relative grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-[conic-gradient(#f43f5e,#facc15,#22c55e,#03E9FF,#039EFF,#a855f7,#f43f5e)] ring-1 ring-black/10 transition hover:scale-110`}
          >
            <Pipette className="h-4 w-4 text-white drop-shadow" />
            <input
              type="color"
              value={estado.color.hex}
              onChange={(e) => set({ color: { nombre: `Personalizado ${e.target.value.toUpperCase()}`, hex: e.target.value } })}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>

      {/* Técnica */}
      {producto.tecnicas?.length > 0 && (
        <div>
          <p className={etiqueta}>Técnica</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {producto.tecnicas.map((t) => (
              <button key={t} onClick={() => set({ tecnica: t })} className={chip(estado.tecnica === t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Logo */}
      <div>
        <p className={etiqueta}>Tu logo</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {estado.logo ? (
            <div className={`flex items-center gap-3 rounded-2xl p-2 pr-3 ${oscuro ? 'bg-white/10' : 'bg-slate-100'}`}>
              <img src={estado.logo} alt="Tu logo" className="h-10 w-10 rounded-lg bg-white object-contain p-1" />
              <span className={`text-sm ${oscuro ? 'text-slate-200' : 'text-slate-600'}`}>Logo cargado</span>
              <button onClick={() => set({ logo: null })} className="text-slate-400 hover:text-red-500" aria-label="Quitar logo">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => archivo.current?.click()}
              className={`inline-flex items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-2.5 text-sm font-medium transition ${
                oscuro ? 'border-white/20 text-slate-200 hover:border-ganet-cyan hover:text-ganet-cyan' : 'border-slate-300 text-slate-600 hover:border-ganet-blue hover:text-ganet-blue'
              }`}
            >
              <ImagePlus className="h-4 w-4" /> Subir logo (PNG, JPG, SVG)
            </button>
          )}
          {!estado.logo && (
            <label className={`flex cursor-pointer items-center gap-2 text-sm ${oscuro ? 'text-slate-300' : 'text-slate-500'}`}>
              <input type="checkbox" checked={estado.usarIsotipo} onChange={(e) => set({ usarIsotipo: e.target.checked })} className="h-4 w-4 rounded accent-ganet-blue" />
              Logo de ejemplo
            </label>
          )}
          <input ref={archivo} type="file" accept="image/*" onChange={subir} className="hidden" />
        </div>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <p className={`mt-2 text-xs ${oscuro ? 'text-slate-500' : 'text-slate-400'}`}>Tu logo solo se usa para la vista previa; no se sube a ningún servidor.</p>
      </div>

      {/* Texto */}
      <div>
        <p className={etiqueta}>Texto o eslogan</p>
        <div className="relative mt-3">
          <Type className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={estado.texto}
            maxLength={24}
            onChange={(e) => set({ texto: e.target.value })}
            placeholder="Ej.: Tu Empresa S.R.L."
            className={`w-full rounded-xl border-0 py-2.5 pl-10 pr-3 text-sm ring-1 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ganet-sky ${
              oscuro ? 'bg-white/10 text-white ring-white/10' : 'bg-white ring-slate-200'
            }`}
          />
        </div>
        {estado.texto && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {FUENTES.map((f) => (
              <button key={f} onClick={() => set({ fuente: f })} className={chip(estado.fuente === f)} style={{ fontFamily: `'${f}'` }}>
                {f === 'Bebas Neue' ? 'BEBAS' : f.split(' ')[0]}
              </button>
            ))}
            <label className="relative ml-1 h-8 w-8 cursor-pointer rounded-full ring-1 ring-black/10" style={{ background: estado.colorTexto || '#ffffff' }} title="Color del texto">
              <input type="color" value={estado.colorTexto || '#ffffff'} onChange={(e) => set({ colorTexto: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
