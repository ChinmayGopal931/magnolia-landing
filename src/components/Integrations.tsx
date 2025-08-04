import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const IntegrationsContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.primary.black};
  position: relative;
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

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const IntegrationCard = styled(motion.div)<{ isActive?: boolean }>`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${props => props.isActive ? theme.colors.accent.militaryGreen + '33' : theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.accent.militaryGreen};
  }
  
  ${props => !props.isActive && `
    opacity: 0.6;
  `}
`

const IntegrationIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.accent.militaryGreen};
`

const IntegrationName = styled.h3`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.normal};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`

const IntegrationStatus = styled.div<{ isActive?: boolean }>`
  font-size: ${theme.typography.fontSize.xs};
  color: ${props => props.isActive ? theme.colors.accent.militaryGreen : theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
`

const APISection = styled(motion.div)`
  background: ${theme.colors.secondary.charcoal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['3xl']};
  margin-top: ${theme.spacing['4xl']};
  text-align: center;
`

const APITitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.lg};
`

const APIDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto ${theme.spacing['2xl']};
  line-height: 1.6;
`

const APIFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const APIFeature = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
`

const APIFeatureTitle = styled.h4`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.normal};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`

const APIFeatureDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
`

const CodeBlock = styled.pre`
  background: ${theme.colors.primary.black};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.accent.militaryGreen};
  overflow-x: auto;
  text-align: left;
  margin-top: ${theme.spacing.xl};
`

const integrations = [
  { name: "Hyperliquid", icon: "HL", active: true },
  { name: "Drift", icon: "DR", active: true },
  { name: "LiFi Bridge", icon: "LF", active: true },
  { name: "Telegram", icon: "TG", active: true },
  { name: "GMX", icon: "GM", active: false },
  { name: "Paradex", icon: "PX", active: false },
  { name: "Vertex", icon: "VX", active: false },
  { name: "dYdX", icon: "DY", active: false }
]

const apiFeatures = [
  {
    title: "RESTful API",
    description: "Complete REST API for all platform operations"
  },
  {
    title: "WebSocket Streams",
    description: "Real-time data feeds for positions and markets"
  },
  {
    title: "SDK Libraries",
    description: "Python and TypeScript SDKs for rapid integration"
  }
]

export const Integrations: React.FC = () => {
  return (
    <IntegrationsContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Ecosystem Integrations</SectionTitle>
          <SectionSubtitle>
            Seamlessly connect with leading perpetuals DEXes and infrastructure. 
            More integrations launching soon.
          </SectionSubtitle>
        </SectionHeader>
        
        <IntegrationsGrid>
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              isActive={integration.active}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: integration.active ? 1 : 0.6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <IntegrationIcon>{integration.icon}</IntegrationIcon>
              <IntegrationName>{integration.name}</IntegrationName>
              <IntegrationStatus isActive={integration.active}>
                {integration.active ? 'Active' : 'Coming Soon'}
              </IntegrationStatus>
            </IntegrationCard>
          ))}
        </IntegrationsGrid>
        
        <APISection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <APITitle>Build on Project Magnolia</APITitle>
          <APIDescription>
            Access our comprehensive API to build custom trading strategies, 
            analytics dashboards, or integrate with your existing systems.
          </APIDescription>
          
          <APIFeatures>
            {apiFeatures.map((feature, index) => (
              <APIFeature key={index}>
                <APIFeatureTitle>{feature.title}</APIFeatureTitle>
                <APIFeatureDescription>{feature.description}</APIFeatureDescription>
              </APIFeature>
            ))}
          </APIFeatures>
          
          <CodeBlock>
{`// Example: Open a delta neutral position
const position = await magnolia.positions.create({
  strategy: 'delta_neutral',
  longExchange: 'hyperliquid',
  shortExchange: 'drift',
  asset: 'BTC',
  size: 10000,
  maxSlippage: 0.1
})`}
          </CodeBlock>
        </APISection>
      </ContentWrapper>
    </IntegrationsContainer>
  )
}