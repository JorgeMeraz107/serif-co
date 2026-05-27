# Serif & Co. — Sitio Web

Agencia Creativa · Diseño Editorial · Santo Domingo

---

## Estructura del Proyecto

```
serif-co/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Estilos principales (variables, layout, animaciones)
├── js/
│   └── main.js         ← GSAP, intro sequence, scroll reveals, cursor
└── README.md
```

---

## Cómo correr el proyecto

### Opción 1 — VS Code Live Server (recomendado)
1. Abrir la carpeta `serif-co/` en VS Code
2. Instalar la extensión **Live Server**
3. Click derecho en `index.html` → **Open with Live Server**
4. Se abre en `http://127.0.0.1:5500`

### Opción 2 — Python (sin instalar nada)
```bash
cd serif-co
python3 -m http.server 3000
# Abrir http://localhost:3000
```

### Opción 3 — Node.js serve
```bash
npx serve serif-co
```

---

## Dependencias externas (CDN)
- **GSAP 3.12.5** — Animaciones
- **ScrollTrigger** — Animaciones on scroll
- **Google Fonts** — Cormorant Garamond + DM Sans

No requiere instalación de npm. Todas las dependencias se cargan via CDN.

---

## Personalización

### Colores (css/style.css — línea 1)
```css
--cream: #f5f0e8;    /* Fondo principal */
--ink: #0e0d0b;      /* Texto / negro */
--accent: #c8a96e;   /* Dorado */
--warm-gray: #9e9890;
```

### Imágenes de proyectos
Reemplaza los `div.project-img` con etiquetas `<img>`:
```html
<div class="project-img-wrap">
  <img src="assets/multiservicios.jpg" alt="Multiservicios RD" />
</div>
```

### Video de Nosotros
Reemplaza `div.video-placeholder` con un iframe de YouTube/Vimeo:
```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID" 
        frameborder="0" allowfullscreen></iframe>
```

---

## Secciones incluidas
1. ✅ Intro animada (fade + auto-dismiss + skip)
2. ✅ Navbar con hover animado + mobile menu
3. ✅ Hero con tipografía grande
4. ✅ Marquee animado
5. ✅ Proyectos (Multiservicios RD, Salon Shekinah)
6. ✅ Servicios (lista editorial con hover)
7. ✅ Nosotros con video placeholder
8. ✅ Contacto
9. ✅ Blog (placeholder)
10. ✅ Footer
11. ✅ Custom cursor
12. ✅ Scroll reveal con GSAP
13. ✅ Responsive mobile
