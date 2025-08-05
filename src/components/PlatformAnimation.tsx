import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { animate, createTimeline, stagger } from 'animejs'
import { theme } from '../theme'

const AnimationSection = styled.section`
  min-height: 100vh;
  background: ${theme.colors.primary.darkBlack};
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: clamp(${theme.typography.fontSize['2xl']}, 5vw, ${theme.typography.fontSize['3xl']});
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
  
  span {
    color: ${theme.colors.accent.militaryGreen};
  }
`

const AnimationCanvas = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  border-radius: 8px;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 500px;
  }
`

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
`

const InfoPanel = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  max-width: 300px;
  
  h3 {
    color: ${theme.colors.accent.militaryGreen};
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
    line-height: 1.5;
  }
`

const ControlPanel = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing['2xl']};
`

const ControlButton = styled.button`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
    color: ${theme.colors.accent.militaryGreen};
  }
  
  &.active {
    background: ${theme.colors.accent.militaryGreen};
    color: ${theme.colors.primary.black};
  }
`

const PlatformAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timelineRef = useRef<any>(null)

  const steps = [
    {
      title: "Market Monitoring",
      description: "Continuously scanning Hyperliquid and Drift for funding rates, price discrepancies, and arbitrage opportunities."
    },
    {
      title: "Quant Engine Analysis",
      description: "Our proprietary algorithms analyze market data to identify profitable delta-neutral positions and calculate optimal entry points."
    },
    {
      title: "Position Execution",
      description: "Automatically execute balanced long/short positions across exchanges to capture funding rate arbitrage while maintaining zero directional risk."
    },
    {
      title: "Notification System",
      description: "Real-time alerts on position status, funding rate changes, and rebalancing requirements sent directly to your dashboard."
    },
    {
      title: "Risk Management",
      description: "Continuous monitoring and automatic rebalancing to maintain delta neutrality and protect your capital."
    }
  ]

  useEffect(() => {
    if (!svgRef.current) return

    const timeline = createTimeline({
      loop: true,
      autoplay: isPlaying,
      update: function(anim) {
        const progress = anim.progress / 100
        const step = Math.floor(progress * steps.length)
        if (step !== currentStep && step < steps.length) {
          setCurrentStep(step)
        }
      }
    })

    // Step 1: Market Data Collection
    timeline.add('.exchange-node', {
      scale: [0.8, 1.1, 1],
      opacity: [0.5, 1],
      duration: 1000,
      delay: stagger(200)
    })

    // Data flows from exchanges
    timeline.add('.data-flow-1', {
      strokeDashoffset: [100, 0],
      opacity: [0, 1],
      duration: 1500
    }, '-=500')

    // Step 2: Quant Engine Processing
    timeline.add('.quant-engine', {
      scale: [0.9, 1.05, 1],
      duration: 1000
    })

    timeline.add('.engine-gear', {
      rotate: 360,
      duration: 2000,
      loop: 3
    }, '-=1000')

    timeline.add('.analysis-particle', {
      r: [0, 5, 0],
      opacity: [0, 1, 0],
      duration: 800,
      delay: stagger(100)
    }, '-=1500')

    // Step 3: Position Execution
    timeline.add('.position-indicator', {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(100)
    })

    timeline.add('.execution-line', {
      strokeDashoffset: [50, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=300')

    // Step 4: Notification System
    timeline.add('.notification-pulse', {
      scale: [1, 1.5, 1],
      opacity: [1, 0.3, 1],
      duration: 1000
    })

    timeline.add('.notification-item', {
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(150)
    }, '-=500')

    // Step 5: Risk Management
    timeline.add('.risk-shield', {
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000
    })

    timeline.add('.balance-bar', {
      scaleX: [0, 1],
      duration: 1500,
      delay: stagger(200)
    }, '-=500')

    timelineRef.current = timeline

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause()
      }
    }
  }, [isPlaying, currentStep, steps.length])

  const togglePlayback = () => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.pause()
      } else {
        timelineRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart()
      setCurrentStep(0)
      setIsPlaying(true)
    }
  }

  return (
    <AnimationSection>
      <ContentWrapper>
        <Title>
          How <span>Magnolia</span> Works
        </Title>

        <AnimationCanvas>
          <SVGContainer ref={svgRef} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0" />
                <stop offset="50%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="1" />
                <stop offset="100%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0" />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="0.5" opacity="0.2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Exchange Nodes */}
            <g className="exchange-node" transform="translate(150, 150)">
              <rect x="-60" y="-40" width="120" height="80" fill={theme.colors.primary.darkBlack} stroke={theme.colors.accent.militaryGreen} strokeWidth="2" rx="4" />
              <text x="0" y="0" textAnchor="middle" fill={theme.colors.text.primary} fontSize="14" fontFamily={theme.typography.fontFamily.mono}>HYPERLIQUID</text>
              <text x="0" y="20" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10">Funding: +0.025%</text>
            </g>

            <g className="exchange-node" transform="translate(150, 350)">
              <rect x="-60" y="-40" width="120" height="80" fill={theme.colors.primary.darkBlack} stroke={theme.colors.accent.militaryGreen} strokeWidth="2" rx="4" />
              <text x="0" y="0" textAnchor="middle" fill={theme.colors.text.primary} fontSize="14" fontFamily={theme.typography.fontFamily.mono}>DRIFT</text>
              <text x="0" y="20" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10">Funding: -0.015%</text>
            </g>

            {/* Data Flow Lines */}
            <path className="data-flow-1" d="M 210 150 Q 350 200 450 250" fill="none" stroke="url(#dataGradient)" strokeWidth="2" strokeDasharray="5 5" opacity="0" />
            <path className="data-flow-1" d="M 210 350 Q 350 300 450 250" fill="none" stroke="url(#dataGradient)" strokeWidth="2" strokeDasharray="5 5" opacity="0" />

            {/* Quant Engine */}
            <g className="quant-engine" transform="translate(500, 250)">
              <rect x="-80" y="-60" width="160" height="120" fill={theme.colors.primary.darkBlack} stroke={theme.colors.accent.militaryGreen} strokeWidth="2" rx="4" />
              <text x="0" y="-35" textAnchor="middle" fill={theme.colors.text.primary} fontSize="16" fontWeight="bold">QUANT ENGINE</text>
              
              {/* Engine Gears */}
              <g className="engine-gear" style={{ transformOrigin: 'center' }}>
                <circle cx="0" cy="0" r="25" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
                <path d="M -25 0 L 25 0 M 0 -25 L 0 25 M -18 -18 L 18 18 M -18 18 L 18 -18" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
              </g>
              
              {/* Analysis Particles */}
              <circle className="analysis-particle" cx="-30" cy="20" r="0" fill={theme.colors.accent.militaryGreen} />
              <circle className="analysis-particle" cx="0" cy="20" r="0" fill={theme.colors.accent.militaryGreen} />
              <circle className="analysis-particle" cx="30" cy="20" r="0" fill={theme.colors.accent.militaryGreen} />
            </g>

            {/* Position Indicators */}
            <g transform="translate(700, 150)">
              <rect className="position-indicator" x="-50" y="-30" width="100" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} strokeWidth="1" rx="4" opacity="0" />
              <text x="0" y="0" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12">LONG BTC</text>
              <text x="0" y="20" textAnchor="middle" fill={theme.colors.accent.militaryGreen} fontSize="10">+$50,000</text>
            </g>

            <g transform="translate(700, 350)">
              <rect className="position-indicator" x="-50" y="-30" width="100" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} strokeWidth="1" rx="4" opacity="0" />
              <text x="0" y="0" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12">SHORT BTC</text>
              <text x="0" y="20" textAnchor="middle" fill={theme.colors.accent.militaryGreen} fontSize="10">-$50,000</text>
            </g>

            {/* Execution Lines */}
            <path className="execution-line" d="M 580 220 L 650 180" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" strokeDasharray="5 5" opacity="0" />
            <path className="execution-line" d="M 580 280 L 650 320" fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" strokeDasharray="5 5" opacity="0" />

            {/* Notification System */}
            <g transform="translate(900, 250)">
              <rect x="-80" y="-60" width="160" height="120" fill={theme.colors.primary.darkBlack} stroke={theme.colors.secondary.borderGray} strokeWidth="1" rx="4" />
              <text x="0" y="-35" textAnchor="middle" fill={theme.colors.text.primary} fontSize="14">NOTIFICATIONS</text>
              
              <circle className="notification-pulse" cx="0" cy="-35" r="5" fill={theme.colors.accent.militaryGreen} opacity="0" />
              
              <g className="notification-item" opacity="0">
                <rect x="-70" y="-15" width="140" height="25" fill={theme.colors.secondary.gunmetal} rx="2" />
                <text x="0" y="-2" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10">Position Opened</text>
              </g>
              
              <g className="notification-item" opacity="0">
                <rect x="-70" y="15" width="140" height="25" fill={theme.colors.secondary.gunmetal} rx="2" />
                <text x="0" y="28" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10">Funding +0.04%</text>
              </g>
            </g>

            {/* Risk Management Shield */}
            <g className="risk-shield" transform="translate(500, 450)" opacity="0">
              <path d="M 0 -30 L 20 -20 L 20 0 C 20 15 0 25 0 25 C 0 25 -20 15 -20 0 L -20 -20 Z" 
                fill="none" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12">PROTECTED</text>
            </g>

            {/* Balance Bars */}
            <g transform="translate(300, 500)">
              <rect className="balance-bar" x="0" y="0" width="0" height="10" fill={theme.colors.accent.militaryGreen} opacity="0.6">
                <animate attributeName="width" to="200" dur="1.5s" fill="freeze" />
              </rect>
              <rect className="balance-bar" x="200" y="0" width="0" height="10" fill={theme.colors.secondary.borderGray} opacity="0.6">
                <animate attributeName="width" to="200" dur="1.5s" fill="freeze" />
              </rect>
              <text x="200" y="30" textAnchor="middle" fill={theme.colors.text.tertiary} fontSize="10">DELTA NEUTRAL</text>
            </g>
          </SVGContainer>

          <InfoPanel>
            <h3>{steps[currentStep].title}</h3>
            <p>{steps[currentStep].description}</p>
          </InfoPanel>
        </AnimationCanvas>

        <ControlPanel>
          <ControlButton onClick={togglePlayback}>
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </ControlButton>
          <ControlButton onClick={restart}>
            RESTART
          </ControlButton>
        </ControlPanel>
      </ContentWrapper>
    </AnimationSection>
  )
}

export default PlatformAnimation
export { PlatformAnimation }