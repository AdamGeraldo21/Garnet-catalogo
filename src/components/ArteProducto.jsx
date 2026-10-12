import Icono from './Icono'

// Portada visual del producto: usa la foto si existe; si no, un arte con los colores de la categoría.
export default function ArteProducto({ producto, categoria, className = '', grande = false }) {
  if (producto.imagen) {
    return <img src={producto.imagen} alt={producto.nombre} className={`h-full w-full object-cover ${className}`} />
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${categoria.color} ${className}`}>
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15" />
      <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-ganet-ink/15" />
      <Icono
        nombre={categoria.icono}
        className="absolute -bottom-4 -right-4 h-28 w-28 rotate-[-12deg] text-white/10"
        strokeWidth={1.25}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={`grid place-items-center rounded-3xl bg-white/20 text-white shadow-xl ring-1 ring-white/40 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:rotate-[-4deg] ${
            grande ? 'h-28 w-28' : 'h-20 w-20'
          }`}
        >
          <Icono nombre={producto.icono} className={grande ? 'h-14 w-14' : 'h-10 w-10'} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}
