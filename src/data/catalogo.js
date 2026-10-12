// Datos del catálogo. Para agregar un producto, añade un objeto a PRODUCTOS.
// - categoria: id de una entrada de CATEGORIAS
// - imagen (opcional): ruta a una foto en /public, p. ej. './productos/resma.jpg'
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

export const CATEGORIAS = [
  {
    id: 'oficina',
    nombre: 'Artículos para Oficina',
    corto: 'Oficina',
    icono: 'Briefcase',
    color: 'from-ganet-blue to-ganet-sky',
    acento: '#039EFF',
    descripcion:
      'Suministros de escritorio y papelería para mantener un ambiente de trabajo eficiente.',
  },
  {
    id: 'papeleria',
    nombre: 'Papelería y Materiales Escolares',
    corto: 'Papelería',
    icono: 'PencilRuler',
    color: 'from-ganet-sky to-ganet-cyan',
    acento: '#22BDFA',
    descripcion:
      'Amplia variedad de productos de calidad para escuelas, oficinas y uso personal.',
  },
  {
    id: 'pop',
    nombre: 'Artículos Personalizados (POP)',
    corto: 'Artículos POP',
    icono: 'Gift',
    color: 'from-ganet-lime to-ganet-green',
    acento: '#7BB331',
    descripcion:
      'Productos con tu marca para promociones y eventos que fortalecen tu imagen.',
  },
  {
    id: 'textil',
    nombre: 'Bordados y Serigrafía',
    corto: 'Bordados',
    icono: 'Shirt',
    color: 'from-ganet-green to-ganet-blue',
    acento: '#308527',
    descripcion:
      'Personalización de uniformes, ropa corporativa y textiles con acabado profesional.',
  },
  {
    id: 'stickers',
    nombre: 'Stickers Personalizados',
    corto: 'Stickers',
    icono: 'Sticker',
    color: 'from-ganet-cyan to-ganet-lime',
    acento: '#03E9FF',
    descripcion:
      'Diseño y producción de stickers adaptados a cada promoción y cliente.',
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza e Insumos Químicos',
    corto: 'Limpieza',
    icono: 'SprayCan',
    color: 'from-ganet-sky to-ganet-green',
    acento: '#22BDFA',
    descripcion:
      'Para restaurantes, cocinas industriales, hogares y vehículos.',
  },
]

export const SERVICIOS = [
  {
    id: 'contabilidad',
    nombre: 'Contabilidad',
    icono: 'Calculator',
    descripcion:
      'Servicios contables completos: registros, informes financieros y análisis de costos, cumpliendo las normativas fiscales y contables.',
    puntos: ['Registros contables', 'Estados financieros', 'Análisis de costos'],
  },
  {
    id: 'auditoria',
    nombre: 'Auditoría',
    icono: 'ShieldCheck',
    descripcion:
      'Auditorías internas y externas que aseguran la precisión y confiabilidad de tu información financiera, identificando mejoras y reduciendo riesgos.',
    puntos: ['Auditoría interna', 'Auditoría externa', 'Control de riesgos'],
  },
  {
    id: 'fiscal',
    nombre: 'Asesoría Fiscal',
    icono: 'Landmark',
    descripcion:
      'Optimizamos la carga tributaria de tu empresa cumpliendo con la ley y buscando ahorros fiscales.',
    puntos: ['Planificación tributaria', 'Declaraciones DGII', 'Ahorro fiscal legal'],
  },
]

export const PRODUCTOS = [
  // Oficina
  { id: 'of-01', categoria: 'oficina', nombre: 'Resma de papel bond', descripcion: 'Papel blanco de alta blancura para impresión y copiado.', opciones: ['Carta 8½×11', 'Legal 8½×14'], unidad: 'Resma (500 hojas)', etiqueta: 'Más pedido', icono: 'FileStack' },
  { id: 'of-02', categoria: 'oficina', nombre: 'Folders y carpetas', descripcion: 'Folders manila, carpetas de 3 aros y archivadores de palanca.', opciones: ['Manila', '3 aros', 'Palanca'], unidad: 'Caja / unidad', icono: 'FolderOpen' },
  { id: 'of-03', categoria: 'oficina', nombre: 'Grapadoras y grapas', descripcion: 'Grapadoras de escritorio y de alto rendimiento con sus grapas.', opciones: ['Estándar', 'Alto rendimiento'], unidad: 'Unidad', icono: 'Paperclip' },
  { id: 'of-04', categoria: 'oficina', nombre: 'Bolígrafos y marcadores', descripcion: 'Bolígrafos, resaltadores y marcadores permanentes y de pizarra.', opciones: ['Azul', 'Negro', 'Rojo', 'Surtido'], unidad: 'Caja (12 u)', etiqueta: 'Más pedido', icono: 'PenLine' },
  { id: 'of-05', categoria: 'oficina', nombre: 'Tóner y cartuchos', descripcion: 'Consumibles de impresión para las principales marcas.', opciones: ['HP', 'Canon', 'Epson', 'Brother'], unidad: 'Unidad', icono: 'Printer' },
  { id: 'of-06', categoria: 'oficina', nombre: 'Organizadores de escritorio', descripcion: 'Bandejas, porta lápices y organizadores para un escritorio en orden.', opciones: ['Metal', 'Acrílico'], unidad: 'Unidad', icono: 'LayoutGrid' },

  // Papelería y escolares
  { id: 'pa-01', categoria: 'papeleria', nombre: 'Cuadernos', descripcion: 'Cuadernos cosidos y espiral, rayados o cuadriculados.', opciones: ['100 hojas', '200 hojas', 'Espiral'], unidad: 'Paquete', etiqueta: 'Más pedido', icono: 'NotebookPen' },
  { id: 'pa-02', categoria: 'papeleria', nombre: 'Lápices y colores', descripcion: 'Lápices de grafito, colores de madera y crayones.', opciones: ['Lápiz #2', 'Colores x12', 'Colores x24', 'Crayones'], unidad: 'Caja', icono: 'Pencil' },
  { id: 'pa-03', categoria: 'papeleria', nombre: 'Kit escolar completo', descripcion: 'Paquete armado por grado con los útiles de la lista escolar.', opciones: ['Inicial', 'Primaria', 'Secundaria'], unidad: 'Kit', etiqueta: 'Nuevo', icono: 'Backpack' },
  { id: 'pa-04', categoria: 'papeleria', nombre: 'Cartulinas y foamis', descripcion: 'Cartulinas, papel construcción y foamis para manualidades.', opciones: ['Colores surtidos', 'Escarchado'], unidad: 'Paquete', icono: 'Layers' },
  { id: 'pa-05', categoria: 'papeleria', nombre: 'Tijeras, pegamento y reglas', descripcion: 'Material básico de corte, pegado y medición.', opciones: ['Escolar', 'Oficina'], unidad: 'Unidad', icono: 'Scissors' },
  { id: 'pa-06', categoria: 'papeleria', nombre: 'Calculadoras', descripcion: 'Calculadoras básicas, de escritorio y científicas.', opciones: ['Básica', 'Escritorio', 'Científica'], unidad: 'Unidad', icono: 'Calculator' },

  // POP
  { id: 'po-01', categoria: 'pop', nombre: 'Tazas personalizadas', descripcion: 'Tazas de cerámica con tu logo o diseño a full color.', opciones: ['Blanca 11 oz', 'Mágica', 'Interior de color'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'Coffee' },
  { id: 'po-02', categoria: 'pop', nombre: 'Termos y botellas', descripcion: 'Termos de acero y botellas deportivas grabadas.', opciones: ['Acero 500 ml', 'Plástico 600 ml'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'CupSoda' },
  { id: 'po-03', categoria: 'pop', nombre: 'Bolígrafos promocionales', descripcion: 'Bolígrafos con tu marca impresa, ideales para eventos.', opciones: ['Plástico', 'Metálico'], unidad: 'Ciento', etiqueta: 'Más pedido', icono: 'PenTool' },
  { id: 'po-04', categoria: 'pop', nombre: 'Libretas corporativas', descripcion: 'Libretas con tapa personalizada y elástico.', opciones: ['A5', 'A6'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'BookOpen' },
  { id: 'po-05', categoria: 'pop', nombre: 'Llaveros y lanyards', descripcion: 'Llaveros acrílicos o metálicos y cintas porta carnet.', opciones: ['Llavero', 'Lanyard'], unidad: 'Unidad', icono: 'KeyRound' },
  { id: 'po-06', categoria: 'pop', nombre: 'Bolsas ecológicas', descripcion: 'Tote bags de tela o non-woven con impresión.', opciones: ['Tela', 'Non-woven'], unidad: 'Unidad', icono: 'ShoppingBag' },

  // Bordados y serigrafía
  { id: 'te-01', categoria: 'textil', nombre: 'Polos bordados', descripcion: 'Polo shirts corporativos con logo bordado.', opciones: ['S', 'M', 'L', 'XL', 'XXL'], unidad: 'Unidad', etiqueta: 'Más pedido', icono: 'Shirt' },
  { id: 'te-02', categoria: 'textil', nombre: 'T-shirts serigrafiados', descripcion: 'Camisetas de algodón con impresión serigráfica.', opciones: ['Blanco', 'Color'], unidad: 'Unidad', etiqueta: 'Personalizable', icono: 'Shirt' },
  { id: 'te-03', categoria: 'textil', nombre: 'Gorras bordadas', descripcion: 'Gorras con bordado frontal y lateral.', opciones: ['Trucker', 'Clásica'], unidad: 'Unidad', icono: 'HardHat' },
  { id: 'te-04', categoria: 'textil', nombre: 'Uniformes corporativos', descripcion: 'Camisas, chaquetas y pantalones con identidad de marca.', opciones: ['Camisa', 'Chaqueta', 'Conjunto'], unidad: 'Unidad', icono: 'BadgeCheck' },
  { id: 'te-05', categoria: 'textil', nombre: 'Delantales y chacabanas', descripcion: 'Para cocina, restaurantes y servicio, bordados con tu logo.', opciones: ['Delantal', 'Chacabana'], unidad: 'Unidad', icono: 'ChefHat' },

  // Stickers
  { id: 'st-01', categoria: 'stickers', nombre: 'Stickers troquelados', descripcion: 'Corte a la forma de tu diseño en vinil resistente.', opciones: ['Mate', 'Brillante', 'Holográfico'], unidad: 'Ciento', etiqueta: 'Personalizable', icono: 'Sticker' },
  { id: 'st-02', categoria: 'stickers', nombre: 'Etiquetas para productos', descripcion: 'Etiquetas en rollo para envases, frascos y empaques.', opciones: ['Redonda', 'Rectangular'], unidad: 'Rollo', etiqueta: 'Más pedido', icono: 'Tag' },
  { id: 'st-03', categoria: 'stickers', nombre: 'Rotulación de vehículos', descripcion: 'Vinil impreso o de corte para flotillas y vehículos.', opciones: ['Puertas', 'Vidrio trasero', 'Full wrap'], unidad: 'Proyecto', icono: 'Car' },
  { id: 'st-04', categoria: 'stickers', nombre: 'Vinil para vitrinas', descripcion: 'Rotulación de cristales, vitrinas y señalización interior.', opciones: ['Esmerilado', 'Full color'], unidad: 'Pie²', etiqueta: 'Nuevo', icono: 'Store' },

  // Limpieza
  { id: 'li-01', categoria: 'limpieza', nombre: 'Desinfectante multiusos', descripcion: 'Limpia y desinfecta pisos y superficies con aroma duradero.', opciones: ['Lavanda', 'Limón', 'Pino'], unidad: 'Galón', etiqueta: 'Más pedido', icono: 'Droplets' },
  { id: 'li-02', categoria: 'limpieza', nombre: 'Desengrasante industrial', descripcion: 'Para cocinas industriales, campanas y equipos de restaurante.', opciones: ['Galón', 'Cubeta 5 gal'], unidad: 'Galón', icono: 'FlaskConical' },
  { id: 'li-03', categoria: 'limpieza', nombre: 'Lavaplatos líquido', descripcion: 'Concentrado de alto rendimiento para uso doméstico y comercial.', opciones: ['Galón', 'Cubeta 5 gal'], unidad: 'Galón', icono: 'Sparkles' },
  { id: 'li-04', categoria: 'limpieza', nombre: 'Cloro y blanqueador', descripcion: 'Hipoclorito para desinfección y lavandería.', opciones: ['Galón', 'Cubeta 5 gal'], unidad: 'Galón', icono: 'Beaker' },
  { id: 'li-05', categoria: 'limpieza', nombre: 'Línea automotriz', descripcion: 'Shampoo para vehículos, silicona, cera y limpiavidrios.', opciones: ['Shampoo', 'Silicona', 'Cera', 'Limpiavidrios'], unidad: 'Galón', icono: 'CarFront' },
  { id: 'li-06', categoria: 'limpieza', nombre: 'Papel y dispensadores', descripcion: 'Papel higiénico, toallas de mano y dispensadores.', opciones: ['Papel jumbo', 'Toalla en rollo', 'Dispensador'], unidad: 'Fardo', icono: 'ScrollText' },
]
