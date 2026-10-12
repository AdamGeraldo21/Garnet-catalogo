# Ganet — Catálogo web

Sitio de **Ganet Soluciones Empresariales S.R.L.**: catálogo de productos, estudio de personalización en vivo, servicios contables y cotización por WhatsApp.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `#/` | Inicio: banner animado, favoritos, demo de personalización, servicios |
| `#/catalogo` y `#/catalogo/:linea` | Catálogo con líneas, búsqueda y filtros |
| `#/producto/:id` | Ficha del producto con vista previa personalizable |
| `#/personaliza` | Estudio: sube tu logo y pruébalo en todos los productos |
| `#/servicios` | Contabilidad, auditoría y asesoría fiscal |
| `#/nosotros` | Quiénes somos, misión, visión, valores y marca |
| `#/contacto` | Formulario (WhatsApp / correo) y mapa |

Se usa `HashRouter`, así que funciona en cualquier hosting estático (GitHub Pages, Netlify, cPanel) sin configurar redirecciones.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera /dist listo para publicar
```

Stack: Vite + React 18 + React Router + Tailwind CSS + lucide-react.

## Editar contenido

- [`src/data/catalogo.js`](src/data/catalogo.js): datos de la empresa, líneas, servicios, productos y paletas de colores.
- [`src/data/nosotros.js`](src/data/nosotros.js): textos de la página Nosotros (misión, visión, valores).

### Productos

Cada producto admite:

- `imagen`: foto en `public/img/productos/` (se recomienda `.webp`, ~900 px de ancho).
- `mockup`: maqueta personalizable (`camiseta`, `polo`, `camisa`, `gorra`, `taza`, `termo`, `bolsa`, `libreta`, `boligrafo`, `delantal`, `llavero`, `sticker`, `etiqueta`). Las maquetas están en [`src/components/Mockup.jsx`](src/components/Mockup.jsx).
- `colores`: paleta de `COLORES` (`textil`, `pop`, `metal`, `natural`).
- `tecnicas`: técnicas que el cliente puede elegir (bordado y grabado láser tienen efecto visual propio).

Si usas un ícono nuevo de [lucide](https://lucide.dev/icons), agrégalo también a [`src/components/Icono.jsx`](src/components/Icono.jsx).

## Fotos

Las fotos actuales son imágenes de dominio público / CC0 obtenidas de [Openverse](https://openverse.org) (detalle en [`creditos-imagenes.json`](creditos-imagenes.json)). Sirven como referencia; lo ideal es reemplazarlas por fotos reales de los productos de Ganet manteniendo el mismo nombre de archivo.
