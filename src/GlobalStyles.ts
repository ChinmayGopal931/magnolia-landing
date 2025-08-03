import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: ${theme.colors.primary.background};
    color: ${theme.colors.text.secondary};
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.light};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.normal};
    letter-spacing: ${theme.typography.letterSpacing.normal};
    overflow-x: hidden;
    position: relative;
    
  }

  ::selection {
    background: ${theme.colors.accent.militaryGreen};
    color: ${theme.colors.primary.black};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.thin};
    letter-spacing: ${theme.typography.letterSpacing.wider};
    text-transform: uppercase;
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    line-height: ${theme.typography.lineHeight.tight};
  }

  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    line-height: ${theme.typography.lineHeight.tight};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.accent.militaryGreen};
    }
  }

  button {
    background: none;
    border: 1px solid ${theme.colors.secondary.borderGray};
    color: ${theme.colors.text.secondary};
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.light};
    font-size: ${theme.typography.fontSize.sm};
    letter-spacing: ${theme.typography.letterSpacing.widest};
    text-transform: uppercase;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    cursor: pointer;
    transition: ${theme.transitions.fast};
    position: relative;
    overflow: hidden;
    
    &:hover {
      color: ${theme.colors.accent.militaryGreen};
      border-color: ${theme.colors.accent.militaryGreen};
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.2);
    }
    
    &:active {
      transform: translateY(1px);
    }
    
    &:disabled {
      color: ${theme.colors.text.disabled};
      border-color: ${theme.colors.text.disabled};
      cursor: not-allowed;
    }
  }

  input, textarea {
    background: ${theme.colors.primary.black};
    border: 1px solid ${theme.colors.secondary.borderGray};
    color: ${theme.colors.text.primary};
    font-family: ${theme.typography.fontFamily.mono};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.light};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    transition: ${theme.transitions.fast};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.accent.militaryGreen};
      box-shadow: 0 0 0 1px ${theme.colors.accent.militaryGreen};
    }
    
    &::placeholder {
      color: ${theme.colors.text.disabled};
    }
  }

  code {
    font-family: ${theme.typography.fontFamily.mono};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.thin};
    background: ${theme.colors.secondary.gunmetal};
    padding: 2px 6px;
    border: 1px solid ${theme.colors.secondary.borderGray};
  }

  @keyframes scan {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100vh);
    }
  }

  @keyframes flicker {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  @keyframes glitch {
    0% {
      text-shadow: 
        0.05em 0 rgba(255, 0, 0, 0.3),
        -0.05em 0 rgba(0, 255, 255, 0.3);
    }
    14% {
      text-shadow: 
        0.05em 0 rgba(255, 0, 0, 0.3),
        -0.05em 0 rgba(0, 255, 255, 0.3);
    }
    15% {
      text-shadow: 
        -0.05em -0.025em rgba(255, 0, 0, 0.3),
        0.025em 0.025em rgba(0, 255, 255, 0.3);
    }
    49% {
      text-shadow: 
        -0.05em -0.025em rgba(255, 0, 0, 0.3),
        0.025em 0.025em rgba(0, 255, 255, 0.3);
    }
    50% {
      text-shadow: 
        0.025em 0.05em rgba(255, 0, 0, 0.3),
        0.025em 0 rgba(0, 255, 255, 0.3);
    }
    99% {
      text-shadow: 
        0.025em 0.05em rgba(255, 0, 0, 0.3),
        0.025em 0 rgba(0, 255, 255, 0.3);
    }
    100% {
      text-shadow: 
        -0.025em 0 rgba(255, 0, 0, 0.3),
        -0.025em -0.025em rgba(0, 255, 255, 0.3);
    }
  }
`