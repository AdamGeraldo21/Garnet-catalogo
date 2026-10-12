import { useEffect, useState } from 'react'

const CLAVE = 'ganet-catalogo-cotizacion'

function leer() {
  try {
    const raw = localStorage.getItem(CLAVE)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useCotizacion() {
  const [items, setItems] = useState(leer)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // almacenamiento no disponible: la lista vive solo en memoria
    }
  }, [items])

  const agregar = (producto, cantidad = 1, opcion = producto.opciones?.[0] || '') => {
    const clave = `${producto.id}::${opcion}`
    setItems((prev) => {
      const existe = prev.find((i) => i.clave === clave)
      if (existe) {
        return prev.map((i) => (i.clave === clave ? { ...i, cantidad: i.cantidad + cantidad } : i))
      }
      return [...prev, { clave, id: producto.id, nombre: producto.nombre, unidad: producto.unidad, categoria: producto.categoria, icono: producto.icono, opcion, cantidad }]
    })
  }

  const cambiarCantidad = (clave, cantidad) => {
    setItems((prev) =>
      cantidad <= 0 ? prev.filter((i) => i.clave !== clave) : prev.map((i) => (i.clave === clave ? { ...i, cantidad } : i)),
    )
  }

  const quitar = (clave) => setItems((prev) => prev.filter((i) => i.clave !== clave))
  const vaciar = () => setItems([])
  const cantidadDe = (id) => items.filter((i) => i.id === id).reduce((s, i) => s + i.cantidad, 0)
  const total = items.reduce((s, i) => s + i.cantidad, 0)

  return { items, agregar, cambiarCantidad, quitar, vaciar, cantidadDe, total }
}

export function construirMensaje(items, cliente) {
  const lineas = ['Hola Ganet, quisiera solicitar una cotización de:', '']
  items.forEach((i, n) => {
    const detalle = i.opcion ? ` (${i.opcion})` : ''
    lineas.push(`${n + 1}. ${i.nombre}${detalle} — ${i.cantidad} × ${i.unidad}`)
  })
  lineas.push('')
  if (cliente.nombre) lineas.push(`*Nombre:* ${cliente.nombre}`)
  if (cliente.empresa) lineas.push(`*Empresa:* ${cliente.empresa}`)
  if (cliente.nota) lineas.push(`*Nota:* ${cliente.nota}`)
  return lineas.join('\n').trim()
}

export function abrirWhatsapp(numero, mensaje) {
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank', 'noopener')
}
