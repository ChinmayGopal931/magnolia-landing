import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { animate, createTimeline, stagger } from 'animejs'
import { theme } from '../theme'

const Container = styled.section`
  min-height: 100vh;
  background: ${theme.colors.primary.darkBlack};
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`

const SectionTitle = styled.h2`
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

const WorkflowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const StepCard = styled.div`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
    transform: translateY(-5px);
    
    .step-icon {
      transform: scale(1.1) rotate(10deg);
    }
  }
`

const StepNumber = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px;
  height: 40px;
  background: ${theme.colors.accent.militaryGreen};
  color: ${theme.colors.primary.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.mono};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.lg};
`

const StepIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${theme.spacing.lg};
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: ${theme.colors.accent.militaryGreen};
    fill: none;
    stroke-width: 1;
    transition: all 0.3s ease;
  }
`

const StepTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`

const StepDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.text.secondary};
  text-align: center;
`

const FlowDiagram = styled.div`
  position: relative;
  height: 400px;
  margin: ${theme.spacing['4xl']} 0;
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['2xl']};
  overflow: hidden;
`

const FlowSVG = styled.svg`
  width: 100%;
  height: 100%;
`

const InteractiveDemo = styled.div`
  background: ${theme.colors.primary.black};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['4xl']};
  text-align: center;
`

const DemoButton = styled.button`
  background: ${theme.colors.accent.militaryGreen};
  border: 1px solid ${theme.colors.accent.militaryGreen};
  color: ${theme.colors.primary.black};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: transparent;
    color: ${theme.colors.accent.militaryGreen};
  }
  
  &:active {
    transform: scale(0.95);
  }
`

const DemoDisplay = styled.div`
  margin-top: ${theme.spacing['2xl']};
  height: 200px;
  position: relative;
  overflow: hidden;
`

const workflowSteps = [
  {
    title: 'Monitor Markets',
    description: 'Real-time scanning of funding rates and price spreads across exchanges',
    icon: 'monitor'
  },
  {
    title: 'Identify Opportunities',
    description: 'AI-powered detection of profitable delta-neutral arbitrage positions',
    icon: 'search'
  },
  {
    title: 'Execute Trades',
    description: 'Automated order placement with smart routing and slippage protection',
    icon: 'execute'
  },
  {
    title: 'Manage Risk',
    description: 'Continuous position monitoring and automated rebalancing',
    icon: 'shield'
  }
]

const WorkflowAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<SVGSVGElement>(null)
  const [demoActive, setDemoActive] = useState(false)
  const animationsRef = useRef<any[]>([])

  useEffect(() => {
    // Scroll-triggered animations for step cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.8, 1],
              duration: 800,
              ease: 'outExpo',
              delay: stagger(100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = containerRef.current?.querySelectorAll('.step-card')
    cards?.forEach(card => observer.observe(card))

    // Create flow diagram animation
    if (flowRef.current) {
      const flowTimeline = createTimeline({
        loop: true,
        ease: 'linear'
      })

      // Setup path animations
      const flowPaths = flowRef.current.querySelectorAll('.flow-path')
      flowPaths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength()
        ;(path as SVGPathElement).style.strokeDasharray = `${length}`
        ;(path as SVGPathElement).style.strokeDashoffset = `${length}`
        
        flowTimeline.add(path, {
          strokeDashoffset: 0,
          duration: 2000,
          delay: index * 500
        }, 0)
      })

      // Animate data points
      flowTimeline.add('.data-point', {
        r: [0, 4, 0],
        opacity: [0, 1, 0],
        duration: 1000,
        delay: stagger(200, { start: 500 })
      }, 0)

      animationsRef.current.push(flowTimeline)
    }

    const animations = animationsRef.current
    return () => {
      observer.disconnect()
      animations.forEach(anim => {
        if (anim && typeof anim.pause === 'function') {
          anim.pause()
        }
      })
    }
  }, [])

  const handleDemoClick = () => {
    setDemoActive(true)
    
    // Create demo animation
    const demoTimeline = createTimeline({
      ease: 'outExpo'
    })

    demoTimeline
      .add('.demo-exchange', {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(100)
      })
      .add('.demo-connection', {
        strokeDashoffset: 0,
        duration: 800
      })
      .add('.demo-particle', {
        cx: 400,
        cy: 100,
        opacity: [0, 1, 1, 0],
        duration: 1500,
        loop: true
      })

    setTimeout(() => setDemoActive(false), 5000)
  }

  return (
    <Container ref={containerRef}>
      <ContentWrapper>
        <SectionTitle>
          How <span>Magnolia</span> Works
        </SectionTitle>

        <WorkflowContainer>
          {workflowSteps.map((step, index) => (
            <StepCard key={index} className="step-card">
              <StepNumber>{index + 1}</StepNumber>
              <StepIcon className="step-icon">
                {step.icon === 'monitor' && (
                  <svg viewBox="0 0 60 60">
                    <rect x="10" y="10" width="40" height="30" rx="2" />
                    <line x1="20" y1="50" x2="40" y2="50" />
                    <line x1="30" y1="40" x2="30" y2="50" />
                    <polyline points="20,25 25,20 30,25 35,15 40,20" />
                  </svg>
                )}
                {step.icon === 'search' && (
                  <svg viewBox="0 0 60 60">
                    <circle cx="25" cy="25" r="15" />
                    <line x1="35" y1="35" x2="45" y2="45" />
                    <circle cx="25" cy="25" r="5" fill={theme.colors.accent.militaryGreen} />
                  </svg>
                )}
                {step.icon === 'execute' && (
                  <svg viewBox="0 0 60 60">
                    <polygon points="15,15 45,30 15,45" fill={theme.colors.accent.militaryGreen} opacity="0.3" />
                    <polygon points="15,15 45,30 15,45" />
                  </svg>
                )}
                {step.icon === 'shield' && (
                  <svg viewBox="0 0 60 60">
                    <path d="M30,10 L45,20 L45,35 C45,45 30,50 30,50 C30,50 15,45 15,35 L15,20 Z" />
                    <polyline points="20,30 25,35 40,20" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" />
                  </svg>
                )}
              </StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepCard>
          ))}
        </WorkflowContainer>

        <FlowDiagram>
          <FlowSVG ref={flowRef} viewBox="0 0 800 300">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={theme.colors.accent.militaryGreen} />
              </marker>
            </defs>

            {/* Flow paths */}
            <path className="flow-path" d="M 100 150 L 250 150" stroke={theme.colors.secondary.borderGray} strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5" />
            <path className="flow-path" d="M 300 150 L 450 150" stroke={theme.colors.secondary.borderGray} strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5" />
            <path className="flow-path" d="M 500 150 L 650 150" stroke={theme.colors.secondary.borderGray} strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5 5" />
            
            {/* Nodes */}
            <g transform="translate(50, 150)">
              <rect x="-40" y="-30" width="80" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
              <text textAnchor="middle" y="5" fill={theme.colors.text.primary} fontSize="12">MARKET</text>
            </g>
            
            <g transform="translate(275, 150)">
              <circle r="30" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
              <text textAnchor="middle" y="5" fill={theme.colors.text.primary} fontSize="12">SCAN</text>
            </g>
            
            <g transform="translate(475, 150)">
              <rect x="-40" y="-30" width="80" height="60" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
              <text textAnchor="middle" y="5" fill={theme.colors.text.primary} fontSize="12">EXECUTE</text>
            </g>
            
            <g transform="translate(700, 150)">
              <circle r="30" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
              <text textAnchor="middle" y="5" fill={theme.colors.text.primary} fontSize="12">PROFIT</text>
            </g>
            
            {/* Data points */}
            <circle className="data-point" cx="150" cy="150" r="0" fill={theme.colors.accent.militaryGreen} />
            <circle className="data-point" cx="375" cy="150" r="0" fill={theme.colors.accent.militaryGreen} />
            <circle className="data-point" cx="575" cy="150" r="0" fill={theme.colors.accent.militaryGreen} />
          </FlowSVG>
        </FlowDiagram>

        <InteractiveDemo>
          <h3 style={{ 
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.light,
            marginBottom: theme.spacing.lg
          }}>
            See It In Action
          </h3>
          <DemoButton onClick={handleDemoClick} disabled={demoActive}>
            {demoActive ? 'Running Demo...' : 'Start Demo'}
          </DemoButton>
          
          <DemoDisplay>
            {demoActive && (
              <svg width="100%" height="100%" viewBox="0 0 800 200">
                <rect className="demo-exchange" x="50" y="50" width="100" height="100" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
                <text x="100" y="100" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12">HYPERLIQUID</text>
                
                <rect className="demo-exchange" x="650" y="50" width="100" height="100" fill={theme.colors.secondary.gunmetal} stroke={theme.colors.accent.militaryGreen} />
                <text x="700" y="100" textAnchor="middle" fill={theme.colors.text.primary} fontSize="12">DRIFT</text>
                
                <path className="demo-connection" d="M 150 100 L 650 100" stroke={theme.colors.secondary.borderGray} strokeWidth="2" strokeDasharray="5 5" />
                
                <circle className="demo-particle" cx="150" cy="100" r="5" fill={theme.colors.accent.militaryGreen} />
              </svg>
            )}
          </DemoDisplay>
        </InteractiveDemo>
      </ContentWrapper>
    </Container>
  )
}

export default WorkflowAnimation
export { WorkflowAnimation }