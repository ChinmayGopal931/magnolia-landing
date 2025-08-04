import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import { NetworkVisualization } from './NetworkVisualization'
import { EncryptedText } from './EncryptedText'

const FeaturesContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.primary.darkBlack};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
  position: relative;
`


const SectionTitle = styled.h2`
  font-size: clamp(${theme.typography.fontSize['2xl']}, 5vw, ${theme.typography.fontSize['3xl']});
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${theme.colors.text.primary};
  margin: 0;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 1px;
    background: ${theme.colors.accent.militaryGreen};
    margin-top: ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    &::after {
      width: 60px;
    }
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing['2xl']};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.lg};
  }
`

const MissionBrief = styled(motion.div)`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  position: relative;
  transition: ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`

const MissionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const MissionIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.secondary.borderGray};
  border-radius: 4px;
  flex-shrink: 0;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
  }
`

const MissionIconInner = styled.div`
  width: 20px;
  height: 20px;
  background: ${theme.colors.accent.militaryGreen};
  opacity: 0.3;
  border-radius: 2px;
`

const MissionTitle = styled.h3`
  font-size: clamp(${theme.typography.fontSize.base}, 3vw, ${theme.typography.fontSize.lg});
  font-weight: ${theme.typography.fontWeight.extraLight};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${theme.colors.text.primary};
  margin: 0;
  line-height: 1.3;
`

const MissionDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.text.secondary};
  margin: 0;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
  }
`

const MissionSpecs = styled.ul`
  list-style: none;
  margin-top: ${theme.spacing.lg};
  padding: 0;
`

const MissionSpec = styled.li`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.text.tertiary};
  padding: ${theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: '>';
    color: ${theme.colors.accent.militaryGreen};
    margin-right: ${theme.spacing.sm};
  }
`

const VisualizationSection = styled.div`
  margin: ${theme.spacing['4xl']} 0;
`

const ProtocolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing['2xl']};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const ProtocolCard = styled(motion.div)<{ active?: boolean }>`
  background: ${theme.colors.primary.black};
  border: 1px solid ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 30%,
      ${theme.colors.accent.militaryGreen} 50%,
      transparent 70%
    );
    opacity: 0;
    transform: translateX(-100%);
    transition: ${theme.transitions.slow};
  }
  
  &:hover::before {
    opacity: 0.1;
    transform: translateX(100%);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    min-height: 60px;
  }
`

const ProtocolName = styled.div<{ active?: boolean }>`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: clamp(${theme.typography.fontSize.xs}, 2.5vw, ${theme.typography.fontSize.sm});
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.text.primary};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`

const StatusDot = styled.div<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  box-shadow: ${props => props.active ? `0 0 8px ${theme.colors.accent.militaryGreen}` : 'none'};
`

const missions = [
  {
    title: 'Project Magnolia',
    description: 'Execute market-neutral strategies across multiple chains to farm OI. Maintain zero directional exposure while capturing yield spreads.',
    specs: [
      'Real-time hedge calculation',
      'Cross-chain position sync',
      'Automated rebalancing',
      'Risk exposure monitoring'
    ]
  },
  {
    title: 'FUNDING OPTIMIZATION',
    description: 'Optimise your position by dynamically chaniging underlying assets based on funding rates. ',
    specs: [
      'APY aggregation engine',
      'Gas-optimized routing',
      'Slippage protection',
      'Compound frequency optimization'
    ]
  },
  {
    title: 'POSITION MONITORING SYSTEM',
    description: 'Real-time notifications on your positions across exchanges. Get alerted on funding rate changes, liquidation risks, and performance metrics.',
    specs: [
      '24/7 position tracking',
      'Liquidation alerts',
      'Performance analytics',
      'Custom alert parameters'
    ]
  },
  {
    title: 'Arbitrage Scanner',
    description: 'Advanced opportunity detection engine that continuously scans for profitable spreads across exchanges. Never miss a delta neutral arbitrage opportunity.',
    specs: [
      'Real-time spread monitoring',
      'Cross-exchange price discovery',
      'Funding rate arbitrage alerts',
      'Historical opportunity analysis'
    ]
  }
]

const protocols = [
  { name: 'Hyperliquid', active: true },
  { name: 'Drift', active: true },
  { name: 'GMX', active: false },
  { name: 'Paradex', active: false },
  { name: 'Lighter', active: false },
  { name: 'HyperUnit', active: false },
]

const Features: React.FC = () => {
  return (
    <FeaturesContainer id="operations">
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Core Features</SectionTitle>
        </SectionHeader>
        
        <FeatureGrid>
          {missions.map((mission, index) => (
            <MissionBrief
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MissionHeader>
                <MissionIcon>
                  <MissionIconInner />
                </MissionIcon>
                <MissionTitle>{mission.title}</MissionTitle>
              </MissionHeader>
              
              <MissionDescription>{mission.description}</MissionDescription>
              
              <MissionSpecs>
                {mission.specs.map((spec, specIndex) => (
                  <MissionSpec key={specIndex}>{spec}</MissionSpec>
                ))}
              </MissionSpecs>
            </MissionBrief>
          ))}
        </FeatureGrid>
        
        <VisualizationSection>
          <SectionHeader>
            <SectionTitle>Exchange Connections</SectionTitle>
          </SectionHeader>
          
          <NetworkVisualization />
        </VisualizationSection>
        
        
        <SectionHeader>
          <SectionTitle>Supported Exchanges</SectionTitle>
        </SectionHeader>
        
        <ProtocolGrid>
          {protocols.map((protocol, index) => (
            <ProtocolCard
              key={index}
              active={protocol.active}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <ProtocolName active={protocol.active}>
                <EncryptedText 
                  text={protocol.name} 
                  active={protocol.active}
                >
                  <StatusDot active={protocol.active} />
                </EncryptedText>
              </ProtocolName>
            </ProtocolCard>
          ))}
        </ProtocolGrid>
      </ContentWrapper>
    </FeaturesContainer>
  )
}

export default Features
export { Features }
