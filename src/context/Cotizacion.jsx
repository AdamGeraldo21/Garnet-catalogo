import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const CLAVE = 'ganet-catalogo-cotizacion-v2'
const Contexto = createContext(null)

function leer() {
  try {
    const raw = localStorage.getItem(CLAVE)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CotizacionProvider({ children }) {
  const [items, setItems] = useState(leer)
  const [abierta, setAbierta] = useState(false)
  const [aviso, setAviso] = useState('')
  const timer = useRef()

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // almacenamiento no disponible: la lista vive solo en memoria
    }
  }, [items])

  // detalles: { opcion, color, tecnica, texto, conLogo }
  const agregar = useCallback((producto, cantidad = 1, detalles = {}) => {
    const d = { opcion: producto.opciones?.[0] || '', ...detalles }
    const clave = `${producto.id}::${JSON.stringify(d)}`
    setItems((prev) => {
      const existe = prev.find((i) => i.clave === clave)
      if (existe) return prev.map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + cantidad } : i))
      return [...prev, { clave, id: producto.id, nombre: producto.nombre, unidad: producto.unidad, icono: producto.icono, mockup: producto.mockup, imagen: producto.imagen, detalles: d, cantidad }]
    })
    setAviso(`${producto.nombre} agregado a tu cotización`)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAviso(''), 2400)
  }, [])

  const cambiarCantidad = (clave, cantidad) =>
    setItems((prev) => (cantidad <= 0 ? prev.filter((i) => i.clave !== clave) : prev.map((i) => (i.clave === clave ? { ...i, cantidad } : i))))
  const quitar = (clave) => setItems((prev) => prev.filter((i) => i.clave !== clave))
  const vaciar = () => setItems([])
  const cantidadDe = (id) => items.filter((i) => i.id === id).reduce((s, i) => s + i.cantidad, 0)
  const total = items.reduce((s, i) => s + i.cantidad, 0)

  const valor = { items, agregar, cambiarCantidad, quitar, vaciar, cantidadDe, total, abierta, abrir: () => setAbierta(true), cerrar: () => setAbierta(false), aviso }
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export const useCotizacion = () => useContext(Contexto)

export function describirDetalles(d = {}) {
  return [
    d.opcion,
    d.color && `Color: ${d.color}`,
    d.tecnica && `Técnica: ${d.tecnica}`,
    d.texto && `Texto: "${d.texto}"`,
    d.conLogo && 'Con logo',
  ].filter(Boolean)
}

export function construirMensaje(items, cliente) {
  const lineas = ['Hola Ganet, quisiera solicitar una cotización de:', '']
  items.forEach((i, n) => {
    lineas.push(`${n + 1}. *${i.nombre}* — ${i.cantidad} × ${i.unidad}`)
    const det = describirDetalles(i.detalles)
    if (det.length) lineas.push(`    ${det.join(' · ')}`)
  })
  if (items.some((i) => i.detalles?.conLogo)) {
    lineas.push('', '_Adjunto mi logo en este chat._')
  }
  lineas.push('')
  if (cliente.nombre) lineas.push(`*Nombre:* ${cliente.nombre}`)
  if (cliente.empresa) lineas.push(`*Empresa:* ${cliente.empresa}`)
  if (cliente.nota) lineas.push(`*Nota:* ${cliente.nota}`)
  return lineas.join('\n').trim()
}

export function abrirWhatsapp(numero, mensaje) {
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener')
}
