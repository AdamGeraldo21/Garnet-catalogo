import Icono from './Icono'
import Mockup from './Mockup'

// Portada del producto: maqueta personalizable, foto o un arte con los colores de la categoría.
export default function VistaProducto({ producto, categoria, color, modo, className = '', personalizacion = {} }) {
  const usarMockup = modo ? modo === 'mockup' : Boolean(producto.mockup)

  if (usarMockup && producto.mockup) {
    return (
      <div className={`relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_28%,#ffffff_0%,#f1f3f6_55%,#e4e8ee_100%)] ${className}`}>
        <Mockup tipo={producto.mockup} color={color} {...personalizacion} className="relative h-[86%] w-[86%] transition duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
      </div>
    )
  }

  if (producto.imagen) {
    return (
      <div className={`h-full w-full overflow-hidden bg-slate-100 ${className}`}>
        <img src={producto.imagen} alt={producto.nombre} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${categoria.color} ${className}`}>
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white/20 text-white shadow-xl ring-1 ring-white/40 backdrop-blur-sm transition duration-500 group-hover:scale-110">
          <Icono nombre={producto.icono} className="h-10 w-10" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}
