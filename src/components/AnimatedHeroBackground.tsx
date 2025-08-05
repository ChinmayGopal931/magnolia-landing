import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { animate, stagger } from 'animejs'
import { theme } from '../theme'

const BackgroundCanvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`

const ParticleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const GridLine = styled.div`
  position: absolute;
  background: ${theme.colors.accent.militaryGreen};
  opacity: 0.1;
  
  &.horizontal {
    height: 1px;
    width: 100%;
    left: 0;
  }
  
  &.vertical {
    width: 1px;
    height: 100%;
    top: 0;
  }
`

const DataStream = styled.div`
  position: absolute;
  font-family: ${theme.typography.fontFamily.mono};
  font-size: 10px;
  color: ${theme.colors.accent.militaryGreen};
  opacity: 0;
  white-space: nowrap;
`

const AnimatedHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const animationsRef = useRef<any[]>([])

  useEffect(() => {
    if (!containerRef.current || !particlesRef.current) return

    const container = containerRef.current
    const particles = particlesRef.current

    // Create animated grid
    const gridLines = 10
    for (let i = 0; i < gridLines; i++) {
      const hLine = document.createElement('div')
      hLine.className = 'horizontal grid-line'
      hLine.style.top = `${(i + 1) * (100 / (gridLines + 1))}%`
      container.appendChild(hLine)

      const vLine = document.createElement('div')
      vLine.className = 'vertical grid-line'
      vLine.style.left = `${(i + 1) * (100 / (gridLines + 1))}%`
      container.appendChild(vLine)
    }

    // Animate grid lines
    const gridAnimation = animate('.grid-line', {
      opacity: [0, 0.1, 0.05],
      duration: 3000,
      delay: stagger(100),
      loop: true,
      ease: 'inOutSine'
    })
    animationsRef.current.push(gridAnimation)

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = '4px'
      particle.style.height = '4px'
      particle.style.background = theme.colors.accent.militaryGreen
      particle.style.borderRadius = '50%'
      particle.style.filter = `drop-shadow(0 0 6px ${theme.colors.accent.militaryGreen})`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particles.appendChild(particle)

      const particleAnimation = animate(particle, {
        translateX: () => Math.random() * 400 - 200,
        translateY: () => Math.random() * 400 - 200,
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        duration: Math.random() * 5000 + 5000,
        ease: 'inOutQuad',
        complete: () => {
          particle.remove()
          createParticle()
        }
      })
      animationsRef.current.push(particleAnimation)
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 200)
    }

    // Create data streams
    const dataTexts = [
      'FUNDING_RATE: +0.0125%',
      'DELTA_NEUTRAL: ACTIVE',
      'ARB_OPPORTUNITY: $1,234',
      'POSITION_SIZE: $50,000',
      'HEDGE_RATIO: 1.00',
      'SLIPPAGE: 0.02%',
      'GAS_OPTIMIZED: TRUE',
      'REBALANCE_REQUIRED: FALSE'
    ]

    const createDataStream = () => {
      const stream = document.createElement('div')
      stream.className = 'data-stream'
      stream.textContent = dataTexts[Math.floor(Math.random() * dataTexts.length)]
      stream.style.left = `${Math.random() * 80 + 10}%`
      stream.style.top = `${Math.random() * 80 + 10}%`
      Object.assign(stream.style, {
        position: 'absolute',
        fontFamily: theme.typography.fontFamily.mono,
        fontSize: '10px',
        color: theme.colors.accent.militaryGreen,
        opacity: '0',
        whiteSpace: 'nowrap'
      })
      container.appendChild(stream)

      const streamAnimation = animate(stream, {
        opacity: [0, 0.6, 0],
        translateY: [-20, 0, 20],
        duration: 3000,
        ease: 'outExpo',
        complete: () => {
          stream.remove()
        }
      })
      animationsRef.current.push(streamAnimation)
    }

    // Periodically create data streams
    const dataStreamInterval = setInterval(createDataStream, 1500)

    // Create connection lines animation
    const createConnectionLine = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.style.position = 'absolute'
      svg.style.width = '100%'
      svg.style.height = '100%'
      svg.style.pointerEvents = 'none'
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const endX = Math.random() * 100
      const endY = Math.random() * 100
      
      path.setAttribute('d', `M ${startX}% ${startY}% L ${endX}% ${endY}%`)
      path.setAttribute('stroke', theme.colors.accent.militaryGreen)
      path.setAttribute('stroke-width', '1')
      path.setAttribute('fill', 'none')
      path.setAttribute('opacity', '0')
      path.setAttribute('stroke-dasharray', '5 5')
      
      svg.appendChild(path)
      container.appendChild(svg)

      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`

      const lineAnimation = animate(path, {
        opacity: [0, 0.3, 0],
        strokeDashoffset: 0,
        duration: 2000,
        ease: 'inOutQuad',
        complete: () => {
          svg.remove()
        }
      })
      animationsRef.current.push(lineAnimation)
    }

    // Periodically create connection lines
    const connectionInterval = setInterval(createConnectionLine, 3000)

    // Cleanup function
    const animations = animationsRef.current
    return () => {
      animations.forEach(animation => {
        if (animation && typeof animation.pause === 'function') {
          animation.pause()
        }
      })
      clearInterval(dataStreamInterval)
      clearInterval(connectionInterval)
    }
  }, [])

  return (
    <BackgroundCanvas ref={containerRef}>
      <ParticleContainer ref={particlesRef} />
    </BackgroundCanvas>
  )
}

export default AnimatedHeroBackground
export { AnimatedHeroBackground }