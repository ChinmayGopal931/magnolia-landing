import { GlobalStyles } from './GlobalStyles'
import {
  Navigation,
  Hero,
  Features,
  PositionBuilder,
  Footer,
  ScanEffects
} from './components'

function App() {
  return (
    <>
      <GlobalStyles />
      <ScanEffects />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <PositionBuilder />
      </main>
      <Footer />
    </>
  )
}

export default App
