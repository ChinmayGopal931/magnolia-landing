import { Suspense, lazy } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Navigation } from './components'
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

function App() {
  return (
    <>
      <GlobalStyles />
      <Suspense fallback={null}>
        <ScanEffects />
      </Suspense>
      <Navigation />
      <main>
        <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
          <Hero />
          <Features />
          <PositionBuilder />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
