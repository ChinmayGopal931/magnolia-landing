# Project Magnolia - Comprehensive Styling Guide

## Design Philosophy

Project Magnolia embodies a **military-tactical aesthetic** with a focus on precision, clarity, and technical sophistication. The design language draws inspiration from:

- Military command centers and tactical interfaces
- Terminal/CLI aesthetics
- Sci-fi HUD displays
- Minimalist brutalism with green accent colors

## Core Design Principles

1. **Ultra-Minimalist**: Clean, sparse layouts with generous negative space
2. **Military Precision**: Sharp edges, thin lines, uppercase typography
3. **Dark Environment**: Deep blacks and grays creating high contrast
4. **Tactical Green**: Military green (#00CC33) as the primary accent
5. **Technical Typography**: Thin weights, wide letter spacing, uppercase headers
6. **Subtle Atmospherics**: Noise overlays, scan lines, and grid patterns

## Technology Stack

- **Styled Components**: CSS-in-JS for component styling
- **Framer Motion**: Declarative animations
- **Anime.js**: Complex timeline animations
- **Custom Theme System**: Centralized design tokens

## Color Palette

### Primary Colors
```css
primary: {
  black: '#0A0A0A',        /* Main background */
  darkBlack: '#0D0D0D',    /* Deeper sections */
  background: '#060606',   /* Base background */
}
```

### Secondary Colors
```css
secondary: {
  gunmetal: '#1A1A1A',     /* Card backgrounds */
  darkGray: '#242424',     /* Elevated surfaces */
  mediumGray: '#2D2D2D',   /* Hover states */
  borderGray: '#333333',   /* All borders */
  charcoal: '#1E1E1E',     /* Alternative backgrounds */
}
```

### Accent Colors
```css
accent: {
  militaryGreen: '#00CC33', /* Primary accent - tactical green */
  terminalGreen: '#00CC33', /* Same as military green */
  alertAmber: '#CC7722',    /* Warning states */
  alertRed: '#CC2222',      /* Error/critical states */
}
```

### Text Colors
```css
text: {
  primary: '#E8E8E8',       /* Headers, important text */
  secondary: '#B8B8B8',     /* Body text */
  tertiary: '#888888',      /* Metadata, labels */
  disabled: '#555555',      /* Disabled states */
}
```

## Typography System

### Font Families
```css
fontFamily: {
  primary: "'Archivo', 'Barlow', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Consolas', monospace",
}
```

### Font Sizes
```css
fontSize: {
  xs: '10px',    /* Tiny labels */
  sm: '11px',    /* Small text, buttons */
  base: '14px',  /* Body text */
  lg: '16px',    /* Subheadings */
  xl: '20px',    /* Section titles */
  '2xl': '24px', /* h3 */
  '3xl': '32px', /* h2 */
  '4xl': '48px', /* h1 */
}
```

### Font Weights
```css
fontWeight: {
  thin: 100,        /* Headers, display text */
  extraLight: 200,  /* Subtle emphasis */
  light: 300,       /* Body text, buttons */
  regular: 400,     /* Normal text */
}
```

### Letter Spacing
```css
letterSpacing: {
  tight: '0.02em',   /* Compact text */
  normal: '0.05em',  /* Standard spacing */
  wide: '0.08em',    /* Emphasized text */
  wider: '0.10em',   /* Headers */
  widest: '0.10em',  /* Uppercase headers */
}
```

### Line Heights
```css
lineHeight: {
  tight: 1.2,     /* Headers */
  normal: 1.5,    /* Body text */
  relaxed: 1.75,  /* Readable paragraphs */
}
```

## Spacing System

Based on 8px grid system:

```css
spacing: {
  xs: '4px',    /* Tight spacing */
  sm: '8px',    /* Small gaps */
  md: '16px',   /* Standard spacing */
  lg: '24px',   /* Section spacing */
  xl: '32px',   /* Large gaps */
  '2xl': '48px', /* Major sections */
  '3xl': '64px', /* Hero spacing */
  '4xl': '96px', /* Maximum spacing */
}
```

## Layout Principles

### Responsive Breakpoints
```css
breakpoints: {
  sm: '640px',   /* Mobile landscape */
  md: '768px',   /* Tablet */
  lg: '1024px',  /* Desktop */
  xl: '1280px',  /* Wide desktop */
  '2xl': '1536px' /* Ultra-wide */
}
```

### Container Patterns
1. **Full-bleed sections** with internal max-width constraints
2. **Centered content** with max-width: 1200px
3. **Grid-based layouts** using CSS Grid with responsive columns
4. **Generous padding** that scales down on mobile

### Mobile-First Approach
- Start with mobile layout
- Progressive enhancement for larger screens
- Touch-friendly tap targets (min 44px)
- Simplified navigation with hamburger menu

## Component Styling Patterns

### Cards
```css
background: ${theme.colors.secondary.gunmetal};
border: 1px solid ${theme.colors.secondary.borderGray};
padding: ${theme.spacing.lg};
transition: ${theme.transitions.fast};

&:hover {
  border-color: ${theme.colors.accent.militaryGreen};
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
}
```

### Buttons
```css
/* Primary CTA */
background: ${theme.colors.accent.militaryGreen};
color: ${theme.colors.primary.black};
border: 1px solid ${theme.colors.accent.militaryGreen};
text-transform: uppercase;
letter-spacing: ${theme.typography.letterSpacing.wide};
padding: ${theme.spacing.md} ${theme.spacing.xl};

&:hover {
  background: transparent;
  color: ${theme.colors.accent.militaryGreen};
}

/* Secondary */
background: transparent;
border: 1px solid ${theme.colors.secondary.borderGray};
color: ${theme.colors.text.secondary};

&:hover {
  border-color: ${theme.colors.accent.militaryGreen};
  color: ${theme.colors.accent.militaryGreen};
}
```

### Form Elements
```css
background: ${theme.colors.primary.black};
border: 1px solid ${theme.colors.secondary.borderGray};
color: ${theme.colors.text.primary};
font-family: ${theme.typography.fontFamily.mono};

&:focus {
  outline: none;
  border-color: ${theme.colors.accent.militaryGreen};
  box-shadow: 0 0 0 1px ${theme.colors.accent.militaryGreen};
}
```

## Animation & Effects

### Transitions
```css
transitions: {
  fast: '200ms cubic-bezier(0.23, 1, 0.32, 1)',
  medium: '400ms cubic-bezier(0.23, 1, 0.32, 1)',
  slow: '800ms cubic-bezier(0.23, 1, 0.32, 1)',
}
```

### Common Animations

#### Scan Line Effect
```css
@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

#### Glitch Text
```css
@keyframes glitch {
  /* Creates RGB split effect */
  0%, 100% {
    text-shadow: 
      0.05em 0 rgba(255, 0, 0, 0.3),
      -0.05em 0 rgba(0, 255, 255, 0.3);
  }
  /* Multiple keyframes for glitch variation */
}
```

#### Flicker
```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Framer Motion Patterns
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
```

## Visual Effects

### Background Grid
```css
background-image: 
  linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px);
background-size: 50px 50px;
opacity: 0.7;
```

### Noise Overlay
- SVG-based noise filter
- Very subtle (opacity: 0.015)
- Animated position for organic feel
- Disabled on mobile for performance

### Vignette
```css
background: radial-gradient(
  ellipse at center,
  transparent 0%,
  transparent 40%,
  rgba(0, 0, 0, 0.1) 60%,
  rgba(0, 0, 0, 0.3) 100%
);
```

### Corner Brackets
- Fixed position decorative elements
- 30px x 30px corners
- Military green color
- 0.3 opacity for subtlety

## Interactive States

### Hover Effects
- Border color transitions to military green
- Subtle glow effect with box-shadow
- Slight scale or translateY transforms
- Color shifts for text elements

### Active States
- Small translateY(1px) for button presses
- Scale(0.98) for larger elements
- Immediate feedback without delay

### Focus States
- Clear outline with military green
- Increased contrast
- Box-shadow for depth

## Performance Optimizations

1. **Lazy Loading**: Heavy components use React.lazy()
2. **Animation Performance**: 
   - will-change for animated properties
   - GPU-accelerated transforms
   - Reduced animation on mobile
3. **Responsive Images**: Appropriate sizing for different screens
4. **Minimal Repaints**: Fixed positioning for overlays

## Implementation Guidelines

### Setting Up the Theme
```jsx
import { theme } from './theme'
import { GlobalStyles } from './GlobalStyles'
import styled from 'styled-components'

// Apply global styles
<GlobalStyles />

// Use theme in components
const Component = styled.div`
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md};
`
```

### Responsive Design
```jsx
const ResponsiveContainer = styled.div`
  padding: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['2xl']};
  }
`
```

### Animation Setup
```jsx
import { motion } from 'framer-motion'
import anime from 'animejs'

// Framer Motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
/>

// Anime.js for complex timelines
anime({
  targets: '.element',
  translateX: 250,
  duration: 800,
  easing: 'easeOutExpo'
})
```

## Accessibility Considerations

1. **Color Contrast**: Green on black meets WCAG AA standards
2. **Focus Indicators**: Clear visible focus states
3. **Touch Targets**: Minimum 44px for mobile
4. **Reduced Motion**: Respect prefers-reduced-motion
5. **Semantic HTML**: Proper heading hierarchy

## Visual Hierarchy

1. **Primary Focus**: Military green elements
2. **Secondary Focus**: High contrast white text
3. **Supporting Elements**: Gray borders and backgrounds
4. **De-emphasized**: Tertiary gray text

## Summary

To recreate this design system:

1. **Start with the theme object** containing all design tokens
2. **Apply global styles** for consistent base styling
3. **Use styled-components** for component-specific styles
4. **Implement subtle atmospheric effects** (noise, grid, vignette)
5. **Add purposeful animations** that enhance the tactical feel
6. **Maintain strict typography rules** (thin, uppercase, wide spacing)
7. **Keep layouts minimal** with generous spacing
8. **Use military green sparingly** for maximum impact

The key to this design is restraint - every element should feel intentional, precise, and technical. The military-tactical theme comes through in the details: the green accent color, the uppercase typography, the grid overlays, and the subtle scan line effects that create an atmosphere of a high-tech command center.