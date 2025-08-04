import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../theme'



const noiseAnimation = keyframes`
  0%, 100% {
    background-position: 0 0;
  }
  10% {
    background-position: -5% -10%;
  }
  20% {
    background-position: -15% 5%;
  }
  30% {
    background-position: 7% -25%;
  }
  40% {
    background-position: 20% 25%;
  }
  50% {
    background-position: -25% 10%;
  }
  60% {
    background-position: 15% 5%;
  }
  70% {
    background-position: 0% 15%;
  }
  80% {
    background-position: 25% 35%;
  }
  90% {
    background-position: -10% 10%;
  }
`



const NoiseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.015;
  z-index: 1;
  
  /* Disable noise effect on mobile for performance */
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSI+CiAgICA8ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjUiLz4KICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIxIi8+Cjwvc3ZnPg==');
    animation: ${noiseAnimation} 1s steps(10) infinite;
    will-change: transform;
  }
`

const VignetteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 2;
`

const GridOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 50px,
      rgba(0, 255, 65, 0.01) 50px,
      rgba(0, 255, 65, 0.01) 51px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 50px,
      rgba(0, 255, 65, 0.01) 50px,
      rgba(0, 255, 65, 0.01) 51px
    );
  z-index: 1;
`

const CornerBrackets = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
  
  &::before,
  &::after,
  & > span::before,
  & > span::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border: 1px solid ${theme.colors.accent.militaryGreen};
    opacity: 0.3;
  }
  
  &::before {
    top: 20px;
    left: 20px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    top: 20px;
    right: 20px;
    border-left: none;
    border-bottom: none;
  }
  
  & > span::before {
    bottom: 20px;
    left: 20px;
    border-right: none;
    border-top: none;
  }
  
  & > span::after {
    bottom: 20px;
    right: 20px;
    border-left: none;
    border-top: none;
  }
`

const ScanEffects: React.FC = () => {
  return (
    <>
      <NoiseOverlay />
      <GridOverlay />
      <VignetteOverlay />
      <CornerBrackets>
        <span />
      </CornerBrackets>
    </>
  )
}

export default ScanEffects
export { ScanEffects }
