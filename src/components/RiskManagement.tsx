import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const RiskContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.secondary.gunmetal};
  position: relative;
  overflow: hidden;
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
  font-size: ${theme.typography.fontSize['2xl']};
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
`

const SectionSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const RiskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const RiskCard = styled(motion.div)`
  background: ${theme.colors.secondary.charcoal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['2xl']};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.accent.militaryGreen};
    transform: scaleY(0);
    transform-origin: top;
    transition: transform ${theme.transitions.medium};
  }
  
  &:hover::before {
    transform: scaleY(1);
  }
`

const RiskIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: ${theme.colors.accent.militaryGreen};
    fill: none;
    stroke-width: 1;
    opacity: 0.8;
  }
`

const RiskTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`

const RiskDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`

const RiskFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const RiskFeature = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  
  &::before {
    content: '■';
    color: ${theme.colors.accent.militaryGreen};
    font-size: 8px;
  }
`

const MetricsBar = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.secondary.charcoal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  margin-top: ${theme.spacing['3xl']};
  justify-content: space-around;
  flex-wrap: wrap;
`

const MetricItem = styled.div`
  text-align: center;
`

const MetricValue = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.accent.militaryGreen};
  margin-bottom: ${theme.spacing.xs};
`

const MetricLabel = styled.div`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
`

const riskFeatures = [
  {
    title: "Automated Stop Loss",
    description: "Protect your capital with intelligent stop-loss mechanisms that execute across all positions simultaneously.",
    features: [
      "Cross-exchange position monitoring",
      "Dynamic stop-loss adjustment",
      "Partial position closing",
      "Slippage protection"
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M8 16l8-8" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: "Liquidation Prevention",
    description: "Advanced algorithms monitor your positions 24/7 to prevent liquidations before they happen.",
    features: [
      "Real-time margin monitoring",
      "Auto-deleveraging system",
      "Position health alerts",
      "Emergency position closure"
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Exposure Limits",
    description: "Set maximum exposure limits per exchange, asset, or strategy to maintain balanced risk.",
    features: [
      "Per-exchange limits",
      "Asset concentration rules",
      "Strategy allocation caps",
      "Automated rebalancing"
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    )
  },
  {
    title: "Risk Analytics",
    description: "Comprehensive risk metrics and analytics to understand your exposure at all times.",
    features: [
      "Value at Risk (VaR) calculations",
      "Stress testing scenarios",
      "Historical drawdown analysis",
      "Correlation monitoring"
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 8 4-4" />
      </svg>
    )
  }
]

export const RiskManagement: React.FC = () => {
  return (
    <RiskContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Military-Grade Risk Management</SectionTitle>
          <SectionSubtitle>
            Your capital protection is our primary objective. Multiple layers of 
            risk controls work together to keep your positions safe.
          </SectionSubtitle>
        </SectionHeader>
        
        <RiskGrid>
          {riskFeatures.map((feature, index) => (
            <RiskCard
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RiskIcon>{feature.icon}</RiskIcon>
              <RiskTitle>{feature.title}</RiskTitle>
              <RiskDescription>{feature.description}</RiskDescription>
              <RiskFeatures>
                {feature.features.map((item, i) => (
                  <RiskFeature key={i}>{item}</RiskFeature>
                ))}
              </RiskFeatures>
            </RiskCard>
          ))}
        </RiskGrid>
        
        <MetricsBar
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MetricItem>
            <MetricValue>99.9%</MetricValue>
            <MetricLabel>Uptime</MetricLabel>
          </MetricItem>
          <MetricItem>
            <MetricValue>&lt;100ms</MetricValue>
            <MetricLabel>Response Time</MetricLabel>
          </MetricItem>
          <MetricItem>
            <MetricValue>0</MetricValue>
            <MetricLabel>Liquidations</MetricLabel>
          </MetricItem>
          <MetricItem>
            <MetricValue>24/7</MetricValue>
            <MetricLabel>Monitoring</MetricLabel>
          </MetricItem>
        </MetricsBar>
      </ContentWrapper>
    </RiskContainer>
  )
}