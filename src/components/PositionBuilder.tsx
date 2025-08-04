import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const BuilderContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.primary.black};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
  text-align: center;
`

const SectionTitle = styled.h2`
  font-size: clamp(${theme.typography.fontSize.xl}, 4vw, ${theme.typography.fontSize['2xl']});
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  text-transform: none;
  color: ${theme.colors.text.primary};
  margin: 0 auto;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 1px;
    background: ${theme.colors.secondary.borderGray};
    margin: ${theme.spacing.md} auto 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    &::after {
      width: 40px;
    }
  }
`

const SectionSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.sm};
    max-width: 100%;
    padding: 0 ${theme.spacing.sm};
  }
`

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    margin-top: ${theme.spacing['2xl']};
  }
`

const ChartCard = styled(motion.div)`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`

const ChartTitle = styled.h3`
  font-size: clamp(${theme.typography.fontSize.base}, 3vw, ${theme.typography.fontSize.lg});
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.3;
`

const ChartDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
    margin-bottom: ${theme.spacing.md};
  }
`

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  margin-top: ${theme.spacing.lg};
  overflow-x: auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 220px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 200px;
    margin-top: ${theme.spacing.md};
  }
`

const ChartSVG = styled.svg`
  width: 100%;
  height: 100%;
  min-width: 300px;
  
  /* Make text more readable on mobile */
  text {
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: 12px;
    }
  }
`

const LegendContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.md};
    justify-content: center;
  }
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.secondary};
  white-space: nowrap;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 10px;
    gap: 6px;
  }
`

const LegendDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  flex-shrink: 0;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 10px;
    height: 10px;
  }
`

// Generate smooth curve data
const generateSmoothCurve = (points: number, amplitude: number, offset: number, frequency: number = 1) => {
  const data = []
  for (let i = 0; i < points; i++) {
    const x = (i / (points - 1)) * Math.PI * 2 * frequency
    const y = Math.sin(x) * amplitude + offset + (Math.sin(x * 3) * amplitude * 0.3)
    data.push({ x: i * (300 / (points - 1)), y: 125 - y })
  }
  return data
}

// Convert points to SVG path
const pointsToPath = (points: { x: number; y: number }[]) => {
  if (points.length === 0) return ''
  
  const path = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prevPoint = points[i - 1]
    const cpx = (prevPoint.x + point.x) / 2
    return `${acc} C ${cpx} ${prevPoint.y}, ${cpx} ${point.y}, ${point.x} ${point.y}`
  }, '')
  
  return path
}

const PositionBuilder: React.FC = () => {
  // Generate curves for different scenarios
  const driftCurve = generateSmoothCurve(50, 30, 60, 1.2)
  const hyperliquidCurve = generateSmoothCurve(50, 25, 40, 1.2)
  const btcFundingCurve = generateSmoothCurve(50, 35, 50, 0.8)
  
  return (
    <BuilderContainer id="deployment">
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Capture the Spread</SectionTitle>
          <SectionSubtitle>
            Our platform identifies and captures funding rate differentials across exchanges. 
            Here's how we help you profit from market inefficiencies while maintaining delta neutrality.
          </SectionSubtitle>
        </SectionHeader>
        
        <ChartsGrid>
          <ChartCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ChartTitle>Cross-Exchange Arbitrage</ChartTitle>
            <ChartDescription>
              Capture the spread between funding rates on different exchanges
            </ChartDescription>
            
            <ChartContainer>
              <ChartSVG viewBox="0 0 300 250">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                <g opacity="0.1">
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={theme.colors.secondary.borderGray} />
                  ))}
                  {[0, 75, 150, 225, 300].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={theme.colors.secondary.borderGray} />
                  ))}
                </g>
                
                {/* Area between curves */}
                <path
                  d={`${pointsToPath(driftCurve)} L ${hyperliquidCurve[hyperliquidCurve.length - 1].x} ${hyperliquidCurve[hyperliquidCurve.length - 1].y} ${pointsToPath(hyperliquidCurve.slice().reverse())} Z`}
                  fill="url(#areaGradient)"
                  opacity="0.6"
                />
                
                {/* Drift curve */}
                <path
                  d={pointsToPath(driftCurve)}
                  fill="none"
                  stroke={theme.colors.accent.alertAmber}
                  strokeWidth="2"
                />
                
                {/* Hyperliquid curve */}
                <path
                  d={pointsToPath(hyperliquidCurve)}
                  fill="none"
                  stroke={theme.colors.accent.militaryGreen}
                  strokeWidth="2"
                />
                
                {/* X-axis */}
                <line x1="0" y1="200" x2="300" y2="200" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
                
                {/* Arrow indicating spread */}
                <g transform="translate(150, 100)">
                  <line x1="0" y1="-15" x2="0" y2="15" stroke={theme.colors.accent.militaryGreen} strokeWidth="1" opacity="0.6" />
                  <polygon points="0,-15 -3,-10 3,-10" fill={theme.colors.accent.militaryGreen} opacity="0.6" />
                  <polygon points="0,15 -3,10 3,10" fill={theme.colors.accent.militaryGreen} opacity="0.6" />
                </g>
              </ChartSVG>
            </ChartContainer>
            
            <LegendContainer>
              <LegendItem>
                <LegendDot color={theme.colors.accent.alertAmber} />
                <span>Drift Protocol</span>
              </LegendItem>
              <LegendItem>
                <LegendDot color={theme.colors.accent.militaryGreen} />
                <span>Hyperliquid</span>
              </LegendItem>
            </LegendContainer>
          </ChartCard>
          
          <ChartCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ChartTitle>Positive Funding Capture</ChartTitle>
            <ChartDescription>
              Earn funding rates when they're consistently positive
            </ChartDescription>
            
            <ChartContainer>
              <ChartSVG viewBox="0 0 300 250">
                <defs>
                  <linearGradient id="fundingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                <g opacity="0.1">
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={theme.colors.secondary.borderGray} />
                  ))}
                  {[0, 75, 150, 225, 300].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={theme.colors.secondary.borderGray} />
                  ))}
                </g>
                
                {/* Zero line */}
                <line x1="0" y1="125" x2="300" y2="125" stroke={theme.colors.secondary.borderGray} strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                
                {/* Area under curve */}
                <path
                  d={`${pointsToPath(btcFundingCurve)} L 300 125 L 0 125 Z`}
                  fill="url(#fundingGradient)"
                />
                
                {/* BTC funding curve */}
                <path
                  d={pointsToPath(btcFundingCurve)}
                  fill="none"
                  stroke={theme.colors.accent.militaryGreen}
                  strokeWidth="2"
                />
                
                {/* X-axis */}
                <line x1="0" y1="200" x2="300" y2="200" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
                
                {/* Zero line label */}
                <text x="5" y="120" fill={theme.colors.text.tertiary} fontSize="10" fontFamily={theme.typography.fontFamily.mono}>
                  0%
                </text>
                
                {/* Positive area indicator */}
                <text x="150" y="90" textAnchor="middle" fill={theme.colors.accent.militaryGreen} fontSize="12" fontFamily={theme.typography.fontFamily.mono} opacity="0.6">
                  POSITIVE
                </text>
              </ChartSVG>
            </ChartContainer>
            
            <LegendContainer>
              <LegendItem>
                <LegendDot color={theme.colors.accent.militaryGreen} />
                <span>BTC-PERP Funding Rate</span>
              </LegendItem>
            </LegendContainer>
          </ChartCard>
          
          <ChartCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChartTitle>Delta Neutral Strategy</ChartTitle>
            <ChartDescription>
              Long one asset, short another - profit from the spread
            </ChartDescription>
            
            <ChartContainer>
              <ChartSVG viewBox="0 0 300 250">
                <defs>
                  <linearGradient id="longGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="shortGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={theme.colors.accent.alertAmber} stopOpacity="0.05" />
                    <stop offset="100%" stopColor={theme.colors.accent.alertAmber} stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                <g opacity="0.1">
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={theme.colors.secondary.borderGray} />
                  ))}
                  {[0, 75, 150, 225, 300].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={theme.colors.secondary.borderGray} />
                  ))}
                </g>
                
                {/* Zero line */}
                <line x1="0" y1="100" x2="300" y2="100" stroke={theme.colors.secondary.borderGray} strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
                
                {/* Long position area */}
                <path
                  d={`M 0 100 L 0 50 L 150 50 L 150 100 Z`}
                  fill="url(#longGradient)"
                />
                
                {/* Short position area */}
                <path
                  d={`M 150 100 L 150 150 L 300 150 L 300 100 Z`}
                  fill="url(#shortGradient)"
                />
                
                {/* Position lines */}
                <line x1="0" y1="50" x2="150" y2="50" stroke={theme.colors.accent.militaryGreen} strokeWidth="2" />
                <line x1="150" y1="150" x2="300" y2="150" stroke={theme.colors.accent.alertAmber} strokeWidth="2" />
                
                {/* X-axis */}
                <line x1="0" y1="200" x2="300" y2="200" stroke={theme.colors.secondary.borderGray} strokeWidth="1" />
                
                {/* Labels */}
                <text x="75" y="40" textAnchor="middle" fill={theme.colors.accent.militaryGreen} fontSize="11" fontFamily={theme.typography.fontFamily.mono}>
                  LONG
                </text>
                <text x="225" y="170" textAnchor="middle" fill={theme.colors.accent.alertAmber} fontSize="11" fontFamily={theme.typography.fontFamily.mono}>
                  SHORT
                </text>
              </ChartSVG>
            </ChartContainer>
            
            <LegendContainer>
              <LegendItem>
                <LegendDot color={theme.colors.accent.militaryGreen} />
                <span>Long Position</span>
              </LegendItem>
              <LegendItem>
                <LegendDot color={theme.colors.accent.alertAmber} />
                <span>Short Position</span>
              </LegendItem>
            </LegendContainer>
          </ChartCard>
        </ChartsGrid>
      </ContentWrapper>
    </BuilderContainer>
  )
}

export default PositionBuilder
export { PositionBuilder }
