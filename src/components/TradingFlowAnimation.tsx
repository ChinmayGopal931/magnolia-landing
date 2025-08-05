import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { animate, createTimeline, stagger } from 'animejs'
import { theme } from '../theme'

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: ${theme.colors.primary.background};
  border: 1px solid ${theme.colors.secondary.borderGray};
  overflow: hidden;
  margin: ${theme.spacing['3xl']} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 500px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 400px;
  }
`

const VisualizationWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SVGCanvas = styled.svg`
  width: 100%;
  height: 100%;
  max-width: 1000px;
`

const ExchangeNode = styled.g`
  cursor: pointer;
  
  &:hover .exchange-rect {
    stroke: ${theme.colors.accent.militaryGreen};
    stroke-width: 2;
  }
`

const DataParticle = styled.circle`
  fill: ${theme.colors.accent.militaryGreen};
  filter: drop-shadow(0 0 4px ${theme.colors.accent.militaryGreen});
`

const ConnectionLine = styled.path`
  fill: none;
  stroke: ${theme.colors.secondary.borderGray};
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0.5;
`

const TradingFlowAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const animationsRef = useRef<any[]>([])

  useEffect(() => {
    if (!svgRef.current) return

    // Define positions for nodes
    const hyperliquidPos = { x: 150, y: 150 }
    const driftPos = { x: 150, y: 350 }
    const enginePos = { x: 500, y: 250 }
    const userPos = { x: 850, y: 250 }

    // Create timeline for complex animations
    const timeline = createTimeline({
      loop: true,
      ease: 'inOutQuad'
    })

    // Animate exchange pulses
    timeline.add('.exchange-pulse', {
      r: [25, 35, 25],
      opacity: [1, 0.3, 1],
      duration: 2000,
      loop: true,
      ease: 'inOutSine'
    }, 0)

    // Animate data flow from exchanges to engine
    const particles = svgRef.current.querySelectorAll('.data-particle')
    particles.forEach((particle, index) => {
      timeline.add(particle, {
        opacity: [0, 1, 1, 0],
        duration: 2000,
        delay: index * 300,
        loop: true,
        ease: 'linear'
      }, 0)
    })

    // Animate connection lines
    const connectionLines = svgRef.current.querySelectorAll('.connection-line')
    connectionLines.forEach((line) => {
      const length = (line as SVGPathElement).getTotalLength()
      ;(line as SVGPathElement).style.strokeDasharray = `${length}`
      ;(line as SVGPathElement).style.strokeDashoffset = `${length}`
      
      timeline.add(line, {
        strokeDashoffset: 0,
        duration: 3000,
        loop: true,
        alternate: true,
        ease: 'linear'
      }, 0)
    })

    // Engine rotation animation
    const engineGearAnim = animate('.engine-gear', {
      rotate: 360,
      duration: 10000,
      loop: true,
      ease: 'linear'
    })
    animationsRef.current.push(engineGearAnim)

    // Funding rate bars animation
    timeline.add('.funding-bar', {
      scaleY: [0.3, 1, 0.3],
      duration: 2000,
      delay: stagger(200),
      loop: true,
      ease: 'inOutElastic'
    }, 0)

    // Delta neutral balance animation
    timeline.add('.balance-indicator', {
      translateY: [-5, 5, -5],
      duration: 3000,
      loop: true,
      ease: 'inOutSine'
    }, 0)

    // Order flow animation
    const orderPaths = svgRef.current.querySelectorAll('.order-path')
    orderPaths.forEach((path, index) => {
      const length = (path as SVGPathElement).getTotalLength()
      ;(path as SVGPathElement).style.strokeDasharray = `${length}`
      ;(path as SVGPathElement).style.strokeDashoffset = `${length}`
      
      const orderAnim = animate(path, {
        strokeDashoffset: 0,
        duration: 1500,
        delay: index * 500,
        loop: true,
        ease: 'inOutExpo'
      })
      animationsRef.current.push(orderAnim)
    })

    // Particle system for data flow
    const createParticleAnimation = (startX: number, startY: number, endX: number, endY: number, delay: number) => {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      particle.setAttribute('r', '3')
      particle.setAttribute('fill', theme.colors.accent.militaryGreen)
      particle.style.filter = `drop-shadow(0 0 4px ${theme.colors.accent.militaryGreen})`
      svgRef.current?.appendChild(particle)

      const particleAnim = animate(particle, {
        cx: [startX, endX],
        cy: [startY, endY],
        opacity: [0, 1, 1, 0],
        duration: 2000,
        delay: delay,
        ease: 'inOutQuad',
        complete: () => particle.remove(),
        loop: true
      })
      animationsRef.current.push(particleAnim)
    }

    // Create continuous particle flow
    const particleInterval = setInterval(() => {
      createParticleAnimation(hyperliquidPos.x + 50, hyperliquidPos.y, enginePos.x - 50, enginePos.y - 50, 0)
      createParticleAnimation(driftPos.x + 50, driftPos.y, enginePos.x - 50, enginePos.y + 50, 500)
      createParticleAnimation(enginePos.x + 50, enginePos.y, userPos.x - 50, userPos.y, 1000)
    }, 3000)

    animationsRef.current.push(timeline)

    return () => {
      animationsRef.current.forEach(anim => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause()
        }
      })
      clearInterval(particleInterval)
    }
  }, [])

  return (
    <AnimationContainer ref={containerRef}>
      <VisualizationWrapper>
        <SVGCanvas ref={svgRef} viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="0.5" opacity="0.2"/>
            </pattern>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Connection lines */}
          <ConnectionLine className="connection-line" d="M 200 150 Q 350 150 450 200" />
          <ConnectionLine className="connection-line" d="M 200 350 Q 350 350 450 300" />
          <ConnectionLine className="connection-line" d="M 550 250 L 800 250" />
          
          {/* Hyperliquid Exchange */}
          <ExchangeNode transform="translate(150, 150)">
            <rect className="exchange-rect" x="-50" y="-30" width="100" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.secondary.borderGray} strokeWidth="1" rx="4" />
            <circle className="exchange-pulse" cx="0" cy="0" r="25" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="1" opacity="0.5" />
            <text x="0" y="5" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12" fontFamily={theme.typography.fontFamily.mono}>HYPERLIQUID</text>
            <rect className="funding-bar" x="-30" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
            <rect className="funding-bar" x="-10" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
            <rect className="funding-bar" x="10" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
          </ExchangeNode>
          
          {/* Drift Exchange */}
          <ExchangeNode transform="translate(150, 350)">
            <rect className="exchange-rect" x="-50" y="-30" width="100" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.secondary.borderGray} strokeWidth="1" rx="4" />
            <circle className="exchange-pulse" cx="0" cy="0" r="25" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="1" opacity="0.5" />
            <text x="0" y="5" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12" fontFamily={theme.typography.fontFamily.mono}>DRIFT</text>
            <rect className="funding-bar" x="-30" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
            <rect className="funding-bar" x="-10" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
            <rect className="funding-bar" x="10" y="20" width="10" height="20" fill={theme.colors.accent.militaryGreen} opacity="0.6" transform-origin="center bottom" />
          </ExchangeNode>
          
          {/* Central Engine */}
          <g transform="translate(500, 250)">
            <rect x="-80" y="-60" width="160" height="120" fill={theme.colors.primary.darkBlack} stroke={theme.colors.accent.militaryGreen} strokeWidth="2" rx="4" />
            <text x="0" y="-40" textAnchor="middle" fill={theme.colors.text.primary} fontSize="14" fontFamily={theme.typography.fontFamily.mono}>TRADING ENGINE</text>
            
            {/* Engine gears */}
            <g className="engine-gear" transform-origin="center">
              <circle cx="0" cy="0" r="30" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
              <circle cx="0" cy="0" r="20" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
              <path d="M -30 0 L 30 0 M 0 -30 L 0 30 M -21 -21 L 21 21 M -21 21 L 21 -21" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
            </g>
            
            {/* Delta neutral indicator */}
            <g className="balance-indicator">
              <line x1="-40" y1="40" x2="40" y2="40" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" />
              <circle cx="-20" cy="40" r="4" fill={theme.colors.accent.militaryGreen} />
              <circle cx="20" cy="40" r="4" fill={theme.colors.accent.militaryGreen} />
              <text x="0" y="55" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>DELTA NEUTRAL</text>
            </g>
          </g>
          
          {/* User/Quant Node */}
          <g transform="translate(850, 250)">
            <rect x="-60" y="-40" width="120" height="80" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.secondary.borderGray} strokeWidth="1" rx="4" />
            <text x="0" y="-10" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12" fontFamily={theme.typography.fontFamily.mono}>QUANT TRADER</text>
            <text x="0" y="10" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>BUILD STRATEGIES</text>
            <circle cx="0" cy="30" r="15" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="1" opacity="0.5" filter="url(#glow)" />
          </g>
          
          {/* Order flow paths */}
          <path className="order-path" d="M 200 150 Q 350 200 500 200" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
          <path className="order-path" d="M 200 350 Q 350 300 500 300" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" strokeDasharray="10 5" opacity="0.6" />
          
          {/* Labels */}
          <text x="300" y="130" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>FUNDING RATES</text>
          <text x="300" y="380" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>PRICE FEEDS</text>
          <text x="675" y="230" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>OPTIMIZED POSITIONS</text>
        </SVGCanvas>
      </VisualizationWrapper>
    </AnimationContainer>
  )
}

export default TradingFlowAnimation
export { TradingFlowAnimation }