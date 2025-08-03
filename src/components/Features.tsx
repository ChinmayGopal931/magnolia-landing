import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import { NetworkVisualization } from './NetworkVisualization'

const FeaturesContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.primary.darkBlack};
  position: relative;
  overflow: hidden;
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
  position: relative;
`

const SectionCode = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  color: ${theme.colors.accent.militaryGreen};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.sm};
`

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
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
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['4xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const MissionBrief = styled(motion.div)`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.xl};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${theme.colors.accent.militaryGreen};
    opacity: 0;
    transition: ${theme.transitions.fast};
  }
  
  &:hover::before {
    opacity: 1;
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
  border: 1px solid ${theme.colors.accent.militaryGreen};
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border: 1px solid ${theme.colors.accent.militaryGreen};
  }
  
  &::before {
    top: -4px;
    left: -4px;
  }
  
  &::after {
    bottom: -4px;
    right: -4px;
  }
`

const MissionIconInner = styled.div`
  width: 20px;
  height: 20px;
  background: ${theme.colors.accent.militaryGreen};
  opacity: 0.2;
`

const MissionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.extraLight};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${theme.colors.text.primary};
  margin: 0;
`

const MissionDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${theme.colors.text.secondary};
  margin: 0;
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
    grid-template-columns: repeat(2, 1fr);
  }
`

const ProtocolCard = styled(motion.div)<{ active?: boolean }>`
  background: ${theme.colors.primary.black};
  border: 1px solid ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;
  
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
`

const ProtocolName = styled.div<{ active?: boolean }>`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.text.primary};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
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
    description: 'Execute market-neutral strategies across multiple chains with military precision. Maintain zero directional exposure while capturing yield spreads.',
    specs: [
      'REAL-TIME HEDGE CALCULATION',
      'CROSS-CHAIN POSITION SYNC',
      'AUTOMATED REBALANCING',
      'RISK EXPOSURE MONITORING'
    ]
  },
  {
    title: ' YIELD OPTIMIZATION',
    description: 'Deploy capital to highest-yielding protocols with strategic precision. Dynamic routing ensures maximum efficiency across all supported chains.',
    specs: [
      'APY AGGREGATION ENGINE',
      'GAS-OPTIMIZED ROUTING',
      'SLIPPAGE PROTECTION',
      'COMPOUND FREQUENCY OPTIMIZATION'
    ]
  },
  {
    title: 'POSITION MONITORING SYSTEM',
    description: 'Real-time surveillance of all active positions with military-grade alert systems. Never miss critical market movements or liquidation risks.',
    specs: [
      '24/7 POSITION TRACKING',
      'LIQUIDATION ALERTS',
      'PERFORMANCE ANALYTICS',
      'CUSTOM ALERT PARAMETERS'
    ]
  },
  {
    title: 'MULTI-CHAIN DEPLOYMENT',
    description: 'Seamless deployment across 7+ leading chains with unified command interface. Bridge assets and manage positions from a single control center.',
    specs: [
      'UNIFIED ASSET MANAGEMENT',
      'CROSS-CHAIN MESSAGING',
      'BRIDGE AGGREGATION',
      'CHAIN-SPECIFIC OPTIMIZATION'
    ]
  }
]

const protocols = [
  { name: 'HYPERLIQUID', active: true },
  { name: 'DRIFT', active: true },
  { name: 'GMX', active: false },
  { name: 'PARADEX', active: false },
  { name: 'LIGHTER', active: false },
  { name: 'HyperUnit', active: false },
]

export const Features: React.FC = () => {
  return (
    <FeaturesContainer id="operations">
      <ContentWrapper>
        <SectionHeader>
          <SectionCode>SECTOR A-7</SectionCode>
          <SectionTitle>Features</SectionTitle>
        </SectionHeader>
        
        <MissionGrid>
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
        </MissionGrid>
        
        <VisualizationSection>
          <SectionHeader>
            <SectionCode>SECTOR B-3</SectionCode>
            <SectionTitle>NETWORK TOPOLOGY</SectionTitle>
          </SectionHeader>
          
          <NetworkVisualization />
        </VisualizationSection>
        
        
        <SectionHeader>
          <SectionCode>SECTOR D-2</SectionCode>
          <SectionTitle>SUPPORTED PROTOCOLS</SectionTitle>
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
                <StatusDot active={protocol.active} />
                {protocol.name}
              </ProtocolName>
            </ProtocolCard>
          ))}
        </ProtocolGrid>
      </ContentWrapper>
    </FeaturesContainer>
  )
}