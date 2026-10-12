# Ganet — Catálogo

Catálogo web de **Ganet Soluciones Empresariales S.R.L.**: artículos de oficina, papelería, artículos POP, bordados y serigrafía, stickers, productos de limpieza y servicios contables.

El visitante arma una lista de cotización y la envía por WhatsApp con un clic.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera /dist listo para publicar
```

Stack: Vite + React 18 + Tailwind CSS + lucide-react.

## Editar el catálogo

Todo el contenido está en [`src/data/catalogo.js`](src/data/catalogo.js):

- `EMPRESA`: datos de contacto y número de WhatsApp (formato `1829XXXXXXX`).
- `CATEGORIAS`: líneas de productos (nombre, ícono, colores).
- `SERVICIOS`: contabilidad, auditoría y asesoría fiscal.
- `PRODUCTOS`: cada artículo. Campos: `id`, `categoria`, `nombre`, `descripcion`, `opciones`, `unidad`, `etiqueta` (`'Más pedido'`, `'Personalizable'`, `'Nuevo'`), `icono` (nombre de [lucide](https://lucide.dev/icons)) e `imagen` opcional.

### Agregar fotos reales

Coloca la foto en `public/productos/` y añade `imagen: './productos/nombre.jpg'` al producto. Si no tiene foto, se muestra un arte generado con los colores de la categoría.

Si usas un ícono nuevo, agrégalo también al mapa de [`src/components/Icono.jsx`](src/components/Icono.jsx).
