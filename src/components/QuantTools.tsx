import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const ToolsContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.secondary.charcoal};
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

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ToolCard = styled(motion.div)`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  position: relative;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, ${theme.colors.accent.militaryGreen}20 0%, transparent 50%);
    opacity: 0;
    transition: opacity ${theme.transitions.medium};
    pointer-events: none;
  }
`

const ToolIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: ${theme.colors.accent.militaryGreen};
    fill: none;
    stroke-width: 1.5;
  }
`

const ToolTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`

const ToolDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`

const tools = [
  {
    title: 'Funding Rate Analytics',
    description: 'Real-time funding rate tracking across all supported exchanges with historical trend analysis',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 13h2v7H3zm4-8h2v12H7zm4-2h2v14h-2zm4 4h2v10h-2zm4-2h2v12h-2z" />
        <path d="M3 3h18v2H3z" />
      </svg>
    )
  },
  {
    title: 'Position Calculator',
    description: 'Calculate optimal position sizes and leverage for delta neutral strategies automatically',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    )
  },
  {
    title: 'Risk Dashboard',
    description: 'Monitor exposure, liquidation levels, and P&L across all positions in real-time',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
    )
  },
  {
    title: 'Alert System',
    description: 'Custom alerts for funding rate changes, arbitrage opportunities, and risk thresholds',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M10 2v2m4-2v2m-7 8v5m10-5v5M5 9h14l-1 10H6L5 9z" />
        <path d="M9 9v1m6-1v1" />
      </svg>
    )
  },
  {
    title: 'Historical Backtesting',
    description: 'Test your strategies against historical funding rate data to optimize performance',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2v4l3-3m-3 3l-3-3" />
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  },
  {
    title: 'API Integration',
    description: 'Programmatic access to all platform features for automated trading strategies',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M10 12l-2 2 2 2m4 0l2-2-2-2" />
      </svg>
    )
  }
]

export const QuantTools: React.FC = () => {
  return (
    <ToolsContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Be Your Own Quant</SectionTitle>
          <SectionSubtitle>
            Providing Tools that let you analyze, execute, and manage complex 
            trading strategies without writing a single line of code.
          </SectionSubtitle>
        </SectionHeader>
        
        <ToolsGrid>
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ToolIcon>{tool.icon}</ToolIcon>
              <ToolTitle>{tool.title}</ToolTitle>
              <ToolDescription>{tool.description}</ToolDescription>
            </ToolCard>
          ))}
        </ToolsGrid>
      </ContentWrapper>
    </ToolsContainer>
  )
}