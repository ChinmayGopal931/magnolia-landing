import { Suspense, lazy } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Navigation, GenerativeBackground } from './components'
import styled from 'styled-components'
import { theme } from './theme'

// Lazy load heavy components
const Hero = lazy(() => import('./components/Hero'))
const Features = lazy(() => import('./components/Features'))
const PositionBuilder = lazy(() => import('./components/PositionBuilder'))
const Footer = lazy(() => import('./components/Footer'))
const ScanEffects = lazy(() => import('./components/ScanEffects'))

const LoadingFallback = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary.background};
  color: ${theme.colors.text.tertiary};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
`

const AppContainer = styled.div`
  position: relative;
`

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 150vh;
  z-index: 0;
  pointer-events: none;
`

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <BackgroundOverlay>
        <GenerativeBackground />
      </BackgroundOverlay>
      <Suspense fallback={null}>
        <ScanEffects />
      </Suspense>
      <Navigation />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
          <Hero />
          <Features />
          <PositionBuilder />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </AppContainer>
  )
}

export default App
