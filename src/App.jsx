import { useCallback, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categorias from './components/Categorias'
import Catalogo from './components/Catalogo'
import ProductoModal from './components/ProductoModal'
import CotizacionDrawer from './components/CotizacionDrawer'
import { BotonWhatsapp, Cinta, ComoFunciona, Contacto, Servicios } from './components/Secciones'
import { CATEGORIAS } from './data/catalogo'
import { useCotizacion } from './hooks/useCotizacion'

export default function App() {
  const cotizacion = useCotizacion()
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [productoVisto, setProductoVisto] = useState(null)
  const [drawerAbierto, setDrawerAbierto] = useState(false)
  const [aviso, setAviso] = useState('')
  const timerAviso = useRef()

  const elegirCategoria = (id) => {
    setCategoria(id)
    setBusqueda('')
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const agregar = (producto, cantidad, opcion) => {
    cotizacion.agregar(producto, cantidad, opcion)
    setAviso(`${producto.nombre} agregado a tu cotización`)
    window.clearTimeout(timerAviso.current)
    timerAviso.current = window.setTimeout(() => setAviso(''), 2200)
  }

  const cerrarModal = useCallback(() => setProductoVisto(null), [])
  const cerrarDrawer = useCallback(() => setDrawerAbierto(false), [])

  return (
    <>
      <Navbar total={cotizacion.total} onAbrirCotizacion={() => setDrawerAbierto(true)} />
      <main>
        <Hero onElegirCategoria={elegirCategoria} onAbrirCotizacion={() => setDrawerAbierto(true)} />
        <Categorias onElegir={elegirCategoria} />
        <Catalogo
          categoria={categoria}
          setCategoria={setCategoria}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          cantidadDe={cotizacion.cantidadDe}
          onVer={setProductoVisto}
          onAgregar={(p) => agregar(p, 1)}
        />
        <Cinta />
        <Servicios />
        <ComoFunciona />
      </main>
      <Contacto />

      <BotonWhatsapp />

      {productoVisto && (
        <ProductoModal
          producto={productoVisto}
          categoria={CATEGORIAS.find((c) => c.id === productoVisto.categoria)}
          onCerrar={cerrarModal}
          onAgregar={agregar}
        />
      )}

      <CotizacionDrawer abierto={drawerAbierto} onCerrar={cerrarDrawer} cotizacion={cotizacion} />

      {/* Aviso al agregar */}
      <div
        className={`fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
          aviso && !drawerAbierto ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={() => setDrawerAbierto(true)}
          className="flex items-center gap-3 whitespace-nowrap rounded-full bg-ganet-ink px-5 py-3 text-sm text-white shadow-2xl ring-1 ring-white/10"
        >
          <span className="h-2 w-2 rounded-full bg-ganet-lime" />
          <span className="max-w-[60vw] truncate">{aviso}</span>
          <span className="font-semibold text-ganet-cyan">Ver lista</span>
        </button>
      </div>
    </>
  )
}
