import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CotizacionDrawer from './components/CotizacionDrawer'
import { Aviso, BotonWhatsapp } from './components/Flotantes'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
import Personaliza from './pages/Personaliza'
import Servicios from './pages/Servicios'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import NoEncontrado from './pages/NoEncontrado'

const TITULOS = {
  '/': 'Inicio',
  '/catalogo': 'Catálogo',
  '/producto': 'Producto',
  '/personaliza': 'Personaliza',
  '/servicios': 'Servicios',
  '/nosotros': 'Sobre nosotros',
  '/contacto': 'Contacto',
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const base = '/' + (pathname.split('/')[1] || '')
    document.title = `${TITULOS[base] || 'Ganet'} — Ganet Soluciones Empresariales`
  }, [pathname])

  return (
    <>
      <Navbar />
      <main key={pathname} className="animate-pagina">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:categoria" element={<Catalogo />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/personaliza" element={<Personaliza />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
      <BotonWhatsapp />
      <Aviso />
      <CotizacionDrawer />
    </>
  )
}
