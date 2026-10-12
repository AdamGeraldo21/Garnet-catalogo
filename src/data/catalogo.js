// Datos del catálogo. Para agregar un producto, añade un objeto a PRODUCTOS.
// - categoria: id de una entrada de CATEGORIAS
// - imagen (opcional): foto en /public, p. ej. './img/productos/mi-foto.webp'
// - mockup (opcional): maqueta personalizable (ver TIPOS_MOCKUP en components/Mockup.jsx)
// - colores (opcional): paleta de COLORES para la maqueta
// - tecnicas (opcional): técnicas de personalización disponibles
// - etiqueta (opcional): 'Más pedido' | 'Personalizable' | 'Nuevo'

export const EMPRESA = {
  nombre: 'Ganet Soluciones Empresariales S.R.L.',
  corto: 'Ganet',
  whatsapp: '18296874131',
  telefonos: ['(829) 687-4131', '(849) 262-0888'],
  email: 'solucionesganet@gmail.com',
  direccion: 'Residencial Tierra Llana, Bloque F6-3A, Alameda, Santo Domingo',
  rnc: '132-79298-1',
  ceo: 'Galvin Mercado',
}

const c = (nombre, hex) => ({ nombre, hex })

export const COLORES = {
  textil: [
    c('Blanco', '#F8FAFC'), c('Negro', '#111827'), c('Azul marino', '#1E3A5F'), c('Azul royal', '#1D4ED8'),
    c('Celeste', '#38BDF8'), c('Rojo', '#DC2626'), c('Verde', '#15803D'), c('Amarillo', '#FACC15'), c('Gris', '#9CA3AF'),
  ],
  pop: [
    c('Blanco', '#F8FAFC'), c('Negro', '#1F2937'), c('Azul', '#039EFF'), c('Rojo', '#E11D48'),
    c('Verde lima', '#7BB331'), c('Naranja', '#F97316'), c('Rosado', '#EC4899'), c('Turquesa', '#03E9FF'),
  ],
  metal: [
    c('Acero', '#CBD5E1'), c('Negro mate', '#1F2937'), c('Azul', '#039EFF'), c('Rojo', '#E11D48'),
    c('Verde', '#308527'), c('Blanco', '#F8FAFC'), c('Rosado', '#F472B6'),
  ],
  natural: [
    c('Crudo', '#EDE4D3'), c('Negro', '#1F2937'), c('Azul marino', '#1E3A5F'), c('Verde', '#308527'), c('Rojo', '#B91C1C'),
  ],
}

export const CATEGORIAS = [
  {
    id: 'oficina',
    nombre: 'Artículos para Oficina',
    corto: 'Oficina',
    icono: 'Briefcase',
    color: 'from-ganet-blue to-ganet-sky',
    acento: '#039EFF',
    imagen: './img/productos/of-02.webp',
    descripcion: 'Suministros de escritorio y papelería para mantener un ambiente de trabajo eficiente.',
  },
  {
    id: 'papeleria',
    nombre: 'Papelería y Materiales Escolares',
    corto: 'Papelería',
    icono: 'PencilRuler',
    color: 'from-ganet-sky to-ganet-cyan',
    acento: '#22BDFA',
    imagen: './img/productos/pa-02.webp',
    descripcion: 'Amplia variedad de productos de calidad para escuelas, oficinas y uso personal.',
  },
  {
    id: 'pop',
    nombre: 'Artículos Personalizados (POP)',
    corto: 'Artículos POP',
    icono: 'Gift',
    color: 'from-ganet-lime to-ganet-green',
    acento: '#7BB331',
    imagen: './img/productos/po-02.webp',
    descripcion: 'Productos con tu marca para promociones y eventos que fortalecen tu imagen.',
  },
  {
    id: 'textil',
    nombre: 'Bordados y Serigrafía',
    corto: 'Bordados',
    icono: 'Shirt',
    color: 'from-ganet-green to-ganet-blue',
    acento: '#308527',
    imagen: './img/productos/te-02.webp',
    descripcion: 'Personalización de uniformes, ropa corporativa y textiles con acabado profesional.',
  },
  {
    id: 'stickers',
    nombre: 'Stickers Personalizados',
    corto: 'Stickers',
    icono: 'Sticker',
    color: 'from-ganet-cyan to-ganet-lime',
    acento: '#03E9FF',
    imagen: './img/productos/st-01.webp',
    descripcion: 'Diseño y producción de stickers adaptados a cada promoción y cliente.',
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza e Insumos Químicos',
    corto: 'Limpieza',
    icono: 'SprayCan',
    color: 'from-ganet-sky to-ganet-green',
    acento: '#22BDFA',
    imagen: './img/productos/li-01.webp',
    descripcion: 'Para restaurantes, cocinas industriales, hogares y vehículos.',
  },
]

export const SERVICIOS = [
  {
    id: 'contabilidad',
    nombre: 'Contabilidad',
    icono: 'Calculator',
    descripcion:
      'Servicios contables completos: registros, informes financieros y análisis de costos, cumpliendo las normativas fiscales y contables.',
    puntos: ['Registros contables', 'Estados financieros', 'Análisis de costos', 'Nómina y conciliaciones'],
  },
  {
    id: 'auditoria',
    nombre: 'Auditoría',
    icono: 'ShieldCheck',
    descripcion:
      'Auditorías internas y externas que aseguran la precisión y confiabilidad de tu información financiera, identificando mejoras y reduciendo riesgos.',
    puntos: ['Auditoría interna', 'Auditoría externa', 'Control de riesgos', 'Informe de mejoras'],
  },
  {
    id: 'fiscal',
    nombre: 'Asesoría Fiscal',
    icono: 'Landmark',
    descripcion:
      'Optimizamos la carga tributaria de tu empresa cumpliendo con la ley y buscando ahorros fiscales.',
    puntos: ['Planificación tributaria', 'Declaraciones DGII', 'Ahorro fiscal legal', 'Acompañamiento continuo'],
  },
]

const TEC_TEXTIL = ['Bordado', 'Serigrafía', 'Sublimación']
const TEC_POP = ['Impresión full color', 'Serigrafía', 'Grabado láser']

export const PRODUCTOS = [
  // Oficina
  { id: 'of-01', categoria: 'oficina', nombre: 'Resma de papel bond', descripcion: 'Papel blanco de alta blancura para impresión y copiado, ideal para el uso diario de la oficina.', opciones: ['Carta 8½×11', 'Legal 8½×14'], unidad: 'Resma (500 hojas)', etiqueta: 'Más pedido', icono: 'FileStack', imagen: './img/productos/of-01.webp' },
  { id: 'of-02', categoria: 'oficina', nombre: 'Folders y carpetas', descripcion: 'Folders manila, carpetas de 3 aros y archivadores de palanca para mantener todo en orden.', opciones: ['Manila', '3 aros', 'Palanca'], unidad: 'Caja / unidad', icono: 'FolderOpen', imagen: './img/productos/of-02.webp' },
  { id: 'of-03', categoria: 'oficina', nombre: 'Grapadoras y perforadoras', descripcion: 'Grapadoras de escritorio, de alto rendimiento y perforadoras con sus repuestos.', opciones: ['Estándar', 'Alto rendimiento', 'Perforadora'], unidad: 'Unidad', icono: 'Paperclip', imagen: './img/productos/of-03.webp' },
  { id: 'of-04', categoria: 'oficina', nombre: 'Bolígrafos y marcadores', descripcion: 'Bolígrafos, resaltadores y marcadores permanentes y de pizarra.', opciones: ['Azul', 'Negro', 'Rojo', 'Surtido'], unidad: 'Caja (12 u)', etiqueta: 'Más pedido', icono: 'PenLine', imagen: './img/productos/of-04.webp' },
  { id: 'of-05', categoria: 'oficina', nombre: 'Tóner y cartuchos', descripcion: 'Consumibles de impresión para las principales marcas de impresoras.', opciones: ['HP', 'Canon', 'Epson', 'Brother'], unidad: 'Unidad', icono: 'Printer', imagen: './img/productos/of-05.webp' },
  { id: 'of-06', categoria: 'oficina', nombre: 'Organizadores de escritorio', descripcion: 'Bandejas, porta lápices y organizadores para un escritorio en orden.', opciones: ['Metal', 'Acrílico'], unidad: 'Unidad', icono: 'LayoutGrid', imagen: './img/productos/of-06.webp' },

  // Papelería y escolares
  { id: 'pa-01', categoria: 'papeleria', nombre: 'Cuadernos', descripcion: 'Cuadernos cosidos y de espiral, rayados o cuadriculados.', opciones: ['100 hojas', '200 hojas', 'Espiral'], unidad: 'Paquete', etiqueta: 'Más pedido', icono: 'NotebookPen', imagen: './img/productos/pa-01.webp' },
  { id: 'pa-02', categoria: 'papeleria', nombre: 'Lápices y colores', descripcion: 'Lápices de grafito, colores de madera y crayones.', opciones: ['Lápiz #2', 'Colores x12', 'Colores x24', 'Crayones'], unidad: 'Caja', icono: 'Pencil', imagen: './img/productos/pa-02.webp' },
  { id: 'pa-03', categoria: 'papeleria', nombre: 'Kit escolar completo', descripcion: 'Paquete armado por grado con los útiles de la lista escolar.', opciones: ['Inicial', 'Primaria', 'Secundaria'], unidad: 'Kit', etiqueta: 'Nuevo', icono: 'Backpack', imagen: './img/productos/pa-03.webp' },
  { id: 'pa-04', categoria: 'papeleria', nombre: 'Cartulinas y foamis', descripcion: 'Cartulinas, papel construcción y foamis para manualidades.', opciones: ['Colores surtidos', 'Escarchado'], unidad: 'Paquete', icono: 'Layers', imagen: './img/productos/pa-04.webp' },
  { id: 'pa-05', categoria: 'papeleria', nombre: 'Tijeras, pegamento y reglas', descripcion: 'Material básico de corte, pegado y medición.', opciones: ['Escolar', 'Oficina'], unidad: 'Unidad', icono: 'Scissors', imagen: './img/productos/pa-05.webp' },
  { id: 'pa-06', categoria: 'papeleria', nombre: 'Calculadoras', descripcion: 'Calculadoras básicas, de escritorio y científicas.', opciones: ['Básica', 'Escritorio', 'Científica'], unidad: 'Unidad', icono: 'Calculator', imagen: './img/productos/pa-06.webp' },

  // POP
  { id: 'po-01', categoria: 'pop', nombre: 'Tazas personalizadas', descripcion: 'Tazas de cerámica de 11 oz con tu logo o diseño a todo color. Ideales para regalos corporativos.', opciones: ['11 oz', '15 oz'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'Coffee', imagen: './img/productos/po-01.webp', mockup: 'taza', colores: 'pop', tecnicas: ['Sublimación', 'Impresión full color'] },
  { id: 'po-02', categoria: 'pop', nombre: 'Termos y botellas', descripcion: 'Termos de acero inoxidable que conservan la temperatura, grabados con tu marca.', opciones: ['500 ml', '750 ml'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'CupSoda', imagen: './img/productos/po-02.webp', mockup: 'termo', colores: 'metal', tecnicas: ['Grabado láser', 'Impresión full color'] },
  { id: 'po-03', categoria: 'pop', nombre: 'Bolígrafos promocionales', descripcion: 'Bolígrafos con tu marca impresa, el clásico infalible para ferias y eventos.', opciones: ['Plástico', 'Metálico'], unidad: 'Ciento', etiqueta: 'Más pedido', icono: 'PenTool', imagen: './img/productos/po-03.webp', mockup: 'boligrafo', colores: 'pop', tecnicas: TEC_POP },
  { id: 'po-04', categoria: 'pop', nombre: 'Libretas corporativas', descripcion: 'Libretas de tapa dura con elástico y cinta marcadora, con tu logo en portada.', opciones: ['A5', 'A6'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'BookOpen', imagen: './img/productos/po-04.webp', mockup: 'libreta', colores: 'pop', tecnicas: ['Grabado láser', 'Impresión full color'] },
  { id: 'po-05', categoria: 'pop', nombre: 'Llaveros', descripcion: 'Llaveros acrílicos, metálicos o de cuero con tu logo.', opciones: ['Acrílico', 'Metálico', 'Cuero'], unidad: 'Unidad', icono: 'KeyRound', imagen: './img/productos/po-05.webp', mockup: 'llavero', colores: 'pop', tecnicas: TEC_POP },
  { id: 'po-06', categoria: 'pop', nombre: 'Bolsas ecológicas', descripcion: 'Tote bags de tela o non-woven con impresión, reutilizables y llamativas.', opciones: ['Tela', 'Non-woven'], unidad: 'Unidad', icono: 'ShoppingBag', imagen: './img/productos/po-06.webp', mockup: 'bolsa', colores: 'natural', tecnicas: ['Serigrafía', 'Sublimación'] },

  // Bordados y serigrafía
  { id: 'te-01', categoria: 'textil', nombre: 'Polos bordados', descripcion: 'Polo shirts corporativos en piqué con logo bordado en el pecho.', opciones: ['S', 'M', 'L', 'XL', 'XXL'], unidad: 'Unidad', etiqueta: 'Más pedido', icono: 'Shirt', mockup: 'polo', colores: 'textil', tecnicas: TEC_TEXTIL },
  { id: 'te-02', categoria: 'textil', nombre: 'T-shirts serigrafiados', descripcion: 'Camisetas 100% algodón con impresión serigráfica de alta duración.', opciones: ['S', 'M', 'L', 'XL', 'XXL'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'Shirt', imagen: './img/productos/te-02.webp', mockup: 'camiseta', colores: 'textil', tecnicas: TEC_TEXTIL },
  { id: 'te-03', categoria: 'textil', nombre: 'Gorras bordadas', descripcion: 'Gorras de 6 paneles con bordado frontal y cierre ajustable.', opciones: ['Clásica', 'Trucker'], unidad: 'Unidad', icono: 'HardHat', mockup: 'gorra', colores: 'textil', tecnicas: ['Bordado', 'Serigrafía'] },
  { id: 'te-04', categoria: 'textil', nombre: 'Camisas de uniforme', descripcion: 'Camisas de manga larga con identidad de marca para tu equipo.', opciones: ['S', 'M', 'L', 'XL', 'XXL'], unidad: 'Unidad', icono: 'BadgeCheck', mockup: 'camisa', colores: 'textil', tecnicas: ['Bordado', 'Serigrafía'] },
  { id: 'te-05', categoria: 'textil', nombre: 'Delantales', descripcion: 'Para cocina, restaurantes y servicio, con bolsillo frontal y tu logo bordado.', opciones: ['Con bolsillo', 'Sin bolsillo'], unidad: 'Unidad', icono: 'ChefHat', mockup: 'delantal', colores: 'textil', tecnicas: ['Bordado', 'Serigrafía'] },

  // Stickers
  { id: 'st-01', categoria: 'stickers', nombre: 'Stickers troquelados', descripcion: 'Corte a la forma de tu diseño en vinil resistente al agua.', opciones: ['Mate', 'Brillante', 'Holográfico'], unidad: 'Ciento', etiqueta: 'Personalizable', icono: 'Sticker', imagen: './img/productos/st-01.webp', mockup: 'sticker', colores: 'pop', tecnicas: ['Impresión full color'] },
  { id: 'st-02', categoria: 'stickers', nombre: 'Etiquetas para productos', descripcion: 'Etiquetas en rollo para envases, frascos y empaques.', opciones: ['Redonda', 'Rectangular'], unidad: 'Rollo', etiqueta: 'Más pedido', icono: 'Tag', mockup: 'etiqueta', colores: 'pop', tecnicas: ['Impresión full color'] },
  { id: 'st-03', categoria: 'stickers', nombre: 'Rotulación de vehículos', descripcion: 'Vinil impreso o de corte para flotillas y vehículos de reparto.', opciones: ['Puertas', 'Vidrio trasero', 'Full wrap'], unidad: 'Proyecto', icono: 'Car', imagen: './img/productos/st-03.webp' },
  { id: 'st-04', categoria: 'stickers', nombre: 'Vinil para vitrinas', descripcion: 'Rotulación de cristales, vitrinas y señalización interior.', opciones: ['Esmerilado', 'Full color'], unidad: 'Pie²', etiqueta: 'Nuevo', icono: 'Store' },

  // Limpieza
  { id: 'li-01', categoria: 'limpieza', nombre: 'Desinfectante multiusos', descripcion: 'Limpia y desinfecta pisos y superficies con aroma duradero.', opciones: ['Lavanda', 'Limón', 'Pino'], unidad: 'Galón', etiqueta: 'Más pedido', icono: 'Droplets', imagen: './img/productos/li-01.webp' },
  { id: 'li-02', categoria: 'limpieza', nombre: 'Desengrasante industrial', descripcion: 'Para cocinas industriales, campanas y equipos de restaurante.', opciones: ['Galón', 'Cubeta 5 gal'], unidad: 'Galón', icono: 'FlaskConical', imagen: './img/productos/li-02.webp' },
  { id: 'li-03', categoria: 'limpieza', nombre: 'Lavaplatos líquido', descripcion: 'Concentrado de alto rendimiento para uso doméstico y comercial.', opciones: ['Galón', 'Cubeta 5 gal'], unidad: 'Galón', icono: 'Sparkles', imagen: './img/productos/li-03.webp' },
  { id: 'li-04', categoria: 'limpieza', nombre: 'Detergente y blanqueador', descripcion: 'Detergente líquido, cloro e hipoclorito para lavandería y desinfección.', opciones: ['Detergente', 'Cloro', 'Suavizante'], unidad: 'Galón', icono: 'Beaker', imagen: './img/productos/li-04.webp' },
  { id: 'li-05', categoria: 'limpieza', nombre: 'Línea automotriz', descripcion: 'Shampoo para vehículos, silicona, cera y limpiavidrios.', opciones: ['Shampoo', 'Silicona', 'Cera', 'Limpiavidrios'], unidad: 'Galón', icono: 'CarFront', imagen: './img/productos/li-05.webp' },
  { id: 'li-06', categoria: 'limpieza', nombre: 'Papel y dispensadores', descripcion: 'Papel higiénico, toallas de mano y dispensadores.', opciones: ['Papel jumbo', 'Toalla en rollo', 'Dispensador'], unidad: 'Fardo', icono: 'ScrollText', imagen: './img/productos/li-06.webp' },
]

export const categoriaDe = (producto) => CATEGORIAS.find((c) => c.id === producto.categoria)
export const productoPorId = (id) => PRODUCTOS.find((p) => p.id === id)
export const coloresDe = (producto) => COLORES[producto.colores] || []
