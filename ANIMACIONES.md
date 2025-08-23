# 🎭 Sistema de Animaciones - NEA Culture Translator

## ✨ Características Implementadas

### 1. **Animaciones de Entrada al Hacer Scroll**
- **Fade Up**: Elementos aparecen deslizándose hacia arriba
- **Fade In**: Elementos aparecen con transparencia
- **Slide Left/Right**: Elementos se deslizan desde los lados
- **Scale In**: Elementos aparecen escalando
- **Bounce In**: Elementos aparecen con efecto rebote

### 2. **Animaciones de la Vista Principal**
- **Hero Section**: Animación de entrada escalonada para título, subtítulo y botón
- **Partículas Flotantes**: Efecto de partículas que flotan en el hero
- **Botón Pulsante**: Efecto de brillo pulsante en el botón principal
- **Cards Flotantes**: Efecto de flotación suave en las tarjetas

### 3. **Contadores Animados**
- **Estadísticas**: Contadores que se incrementan al hacer scroll
- **Efecto Suave**: Animación con función de easing personalizada
- **Activación por Scroll**: Solo se activan cuando son visibles

### 4. **Efectos de Transición**
- **Smooth Scroll**: Navegación suave entre secciones
- **Staggered Animations**: Animaciones escalonadas para elementos hijos
- **Performance Optimized**: Optimizaciones para mejor rendimiento

## 🛠️ Componentes Creados

### `useScrollAnimation` Hook
```typescript
const { ref, isVisible } = useScrollAnimation({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  triggerOnce: true
});
```

### `AnimatedSection` Component
```typescript
<AnimatedSection 
  animation="fade-up" 
  delay={200}
  duration={1000}
>
  {/* Contenido animado */}
</AnimatedSection>
```

### `FloatingParticles` Component
```typescript
<FloatingParticles count={20} />
```

### `AnimatedCounter` Component
```typescript
<AnimatedCounter
  end={1500}
  duration={2000}
  prefix="+"
  suffix="k"
  className="text-4xl font-bold text-primary"
/>
```

## 🎨 Clases CSS Disponibles

### Animaciones Base
- `.animate-fade-up`
- `.animate-fade-in`
- `.animate-slide-left`
- `.animate-slide-right`
- `.animate-scale-in`
- `.animate-bounce-in`

### Efectos Especiales
- `.hero-entrance` - Entrada del hero
- `.float-animation` - Flotación suave
- `.pulse-glow` - Brillo pulsante
- `.stagger-children` - Animaciones escalonadas

## 🚀 Uso

### 1. **Animación Simple**
```typescript
import { AnimatedSection } from '@/components/ui/animated-section';

<AnimatedSection animation="fade-up">
  <h2>Mi Título</h2>
</AnimatedSection>
```

### 2. **Animación con Delay**
```typescript
<AnimatedSection 
  animation="scale-in" 
  delay={300}
>
  <Card>Mi Tarjeta</Card>
</AnimatedSection>
```

### 3. **Animación Personalizada**
```typescript
<AnimatedSection 
  animation="bounce-in"
  delay={500}
  duration={1500}
  threshold={0.2}
>
  <Button>Mi Botón</Button>
</AnimatedSection>
```

## 📱 Responsive y Performance

- **Intersection Observer**: Detección eficiente de elementos visibles
- **CSS Transforms**: Animaciones optimizadas con GPU
- **Will-change**: Optimizaciones de rendimiento
- **Backface-visibility**: Mejoras en dispositivos móviles

## 🎯 Casos de Uso

1. **Hero Sections**: Entrada dramática con elementos escalonados
2. **Cards de Contenido**: Aparición suave al hacer scroll
3. **Estadísticas**: Contadores que se activan al ser visibles
4. **Formularios**: Elementos que aparecen secuencialmente
5. **Footer**: Animación de entrada al final de la página

## 🔧 Personalización

### Modificar Velocidades
```css
.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}
```

### Añadir Nuevas Animaciones
```css
@keyframes miAnimacion {
  from { opacity: 0; transform: rotate(180deg); }
  to { opacity: 1; transform: rotate(0deg); }
}

.animate-mi-animacion {
  animation: miAnimacion 1s ease-out forwards;
}
```

## 📊 Métricas de Performance

- **Tiempo de Compilación**: ~12.4s
- **Bundle Size**: 378.39 kB (121.67 kB gzipped)
- **CSS Size**: 64.12 kB (11.49 kB gzipped)
- **Imágenes**: 142.08 kB

---

**Desarrollado por AsyncDevs** 🚀  
**HackIAthon by Devlights 2025** 🏆 