# 🌍 IberApp - Traductor Cultural del NEA

**Conecta culturas a través del lenguaje del Noreste Argentino**

IberApp es una aplicación web innovadora que utiliza Inteligencia Artificial para traducir expresiones culturales del NEA (Noreste de Argentina) y generar experiencias turísticas personalizadas, creando puentes culturales entre diferentes orígenes y la rica cultura del NEA.

## 🎯 ¿Qué hace IberApp?

### 🔤 Traductor Cultural con IA
- **Traduce jergas y expresiones del NEA** como "che", "mate", "mitaí", "sapucai"
- **Explica el contexto cultural** detrás de cada expresión
- **Crea puentes culturales** comparando con expresiones similares del país de origen del usuario
- **Multiidioma**: Respuestas adaptadas al origen cultural del usuario

### ✨ Generador de Experiencias Culturales
- **Experiencias personalizadas** basadas en el origen cultural del usuario
- **Actividades auténticas** que conectan la cultura del visitante con el NEA
- **Recomendaciones específicas** para cada ciudad: Corrientes, Resistencia, Posadas, Formosa
- **Powered by Gemini AI** para generar contenido cultural único

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS + Tailwind Animate
- **IA**: Google Gemini API para traducciones y experiencias culturales
- **Base de Datos**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts para visualizaciones
- **Icons**: Radix Icons + Lucide React

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ y npm
- Cuenta de Supabase
- API Key de Google Gemini

### Instalación Local

```bash
# Clona el repositorio
git clone <YOUR_GIT_URL>
cd iberapp

# Instala dependencias
npm install

# Configura variables de entorno
cp .env.example .env.local
```

### Variables de Entorno Necesarias

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
VITE_GEMINI_API_KEY=tu_gemini_api_key
```

### Configuración de Base de Datos

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script SQL en `database/schema.sql` en el SQL Editor de Supabase
3. Configura las políticas RLS ejecutando `database/fix_policies.sql`

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📂 Estructura del Proyecto

```
src/
├── components/ui/          # Componentes UI reutilizables (shadcn/ui)
├── data/                   # Datos de ejemplo y configuraciones
├── hooks/                  # Custom React hooks
├── lib/                    # Servicios y utilidades
│   ├── gemini.ts          # Servicio de Google Gemini AI
│   ├── supabase.ts        # Cliente y servicios de Supabase
│   └── utils.ts           # Utilidades generales
├── pages/                  # Páginas principales
│   ├── Index.tsx          # Página principal con traductor y experiencias
│   └── NotFound.tsx       # Página 404
└── utils/                  # Utilidades de debugging y testing
```

## 🌟 Características Principales

### Traductor Cultural
- **Entrada de texto** para expresiones del NEA
- **Origen cultural** del usuario para personalizar respuestas
- **Traducción contextual** con explicación cultural
- **Puentes culturales** que conectan con la cultura de origen
- **Ejemplos de uso** en contexto real

### Experiencias Culturales
- **Formulario personalizado** con nombre, origen y destino NEA
- **IA generativa** que crea experiencias únicas
- **Actividades recomendadas** específicas por ciudad
- **Conexiones culturales** entre origen y destino
- **Consejos prácticos** para la visita

### Diseño y UX
- **Responsive design** para móviles y desktop
- **Animaciones suaves** con framer-motion
- **Particles flotantes** para ambiente inmersivo
- **Tema coherente** con colores tierra y acentos cálidos
- **Componentes accesibles** siguiendo estándares WCAG

## 🎨 Personalización Visual

El proyecto utiliza un sistema de colores personalizado inspirado en la cultura del NEA:

```css
:root {
  --background: hsl(var(--background));
  --foreground: hsl(var(--foreground));
  --primary: hsl(var(--primary));      /* Colores tierra */
  --secondary: hsl(var(--secondary));  /* Acentos naturales */
  --accent: hsl(var(--accent));        /* Highlights cálidos */
}
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Build para producción
npm run build:dev    # Build en modo desarrollo
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
```

## 📱 Características Técnicas

- **PWA Ready**: Configurado para ser instalable como app
- **Optimizado**: Lazy loading y code splitting
- **Accesible**: Componentes con soporte para lectores de pantalla
- **TypeScript**: Tipado estático para mejor desarrollo
- **Error Boundary**: Manejo robusto de errores
- **Loading States**: Estados de carga para mejor UX

## 🤝 Desarrollo y Contribución

### Estructura de Componentes
- Componentes UI en `src/components/ui/` siguiendo patrones de shadcn/ui
- Custom hooks en `src/hooks/` para lógica reutilizable
- Servicios centralizados en `src/lib/` para APIs externas

### Estándares de Código
- ESLint configurado con reglas de React y TypeScript
- Prettier para formateo consistente
- Convenciones de nombres en camelCase
- Comentarios en español para contexto cultural

## 🏆 Desarrollado por AsyncDevs

Proyecto desarrollado para el **HackIAthon by Devlights 2025** 🚀

**Equipo AsyncDevs:**
- Enfoque en IA cultural y experiencias personalizadas
- Innovación en turismo cultural argentino
- Tecnologías modernas y UX centrada en el usuario

## 📄 Licencia

Este proyecto fue desarrollado como parte de un hackathon y está disponible bajo licencia MIT.

---

**¿Listo para explorar la cultura del NEA? ¡Empezá tu experiencia cultural con IberApp!** 🌍✨
