export const theme = {
  colors: {
    primary: {
      black: '#0A0A0A',
      darkBlack: '#0D0D0D',
      background: '#060606',
    },
    secondary: {
      gunmetal: '#1A1A1A',
      darkGray: '#242424',
      mediumGray: '#2D2D2D',
      borderGray: '#333333',
      charcoal: '#1E1E1E',
    },
    accent: {
      militaryGreen: '#00CC33',
      terminalGreen: '#00CC33',
      alertAmber: '#CC7722',
      alertRed: '#CC2222',
    },
    text: {
      primary: '#E8E8E8',
      secondary: '#B8B8B8',
      tertiary: '#888888',
      disabled: '#555555',
    },
  },
  typography: {
    fontFamily: {
      primary: "'Archivo', 'Barlow', -apple-system, system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Consolas', monospace",
    },
    fontSize: {
      xs: '10px',
      sm: '11px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px',
    },
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      normal: 400,
    },
    letterSpacing: {
      tight: '0.02em',
      normal: '0.05em',
      wide: '0.08em',
      wider: '0.10em',
      widest: '0.10em',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },
  transitions: {
    fast: '200ms cubic-bezier(0.23, 1, 0.32, 1)',
    medium: '400ms cubic-bezier(0.23, 1, 0.32, 1)',
    slow: '800ms cubic-bezier(0.23, 1, 0.32, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

export type Theme = typeof theme