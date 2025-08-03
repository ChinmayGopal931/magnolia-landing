import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  margin-top: 60px;
  overflow: hidden;
`

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
`

const ScanLine = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 255, 65, 0.4),
    transparent
  );
  left: 0;
`

const Classification = styled.div`
  position: absolute;
  top: ${theme.spacing['2xl']};
  left: ${theme.spacing['2xl']};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  
  &::before {
    content: '[';
    color: ${theme.colors.accent.militaryGreen};
    margin-right: 4px;
  }
  
  &::after {
    content: ']';
    color: ${theme.colors.accent.militaryGreen};
    margin-left: 4px;
  }
`

const MainContent = styled.div`
  text-align: center;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
`

const OperationHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
`

const OperationTitle = styled(motion.h1)`
  font-size: clamp(${theme.typography.fontSize['3xl']}, 5vw, ${theme.typography.fontSize['4xl']});
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  margin: 0;
  
  span {
    color: ${theme.colors.accent.militaryGreen};
  }
`

const OperationSubtitle = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatusCard = styled(motion.div)`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.accent.militaryGreen};
    transform: scaleX(0);
    transform-origin: left;
    transition: ${theme.transitions.medium};
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`

const StatusLabel = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.sm};
`

const StatusValue = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.accent.militaryGreen};
`

const CTAContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  justify-content: center;
  margin-top: ${theme.spacing['3xl']};
`

const CTAButton = styled(motion.button)`
  background: transparent;
  border: 1px solid ${theme.colors.accent.militaryGreen};
  color: ${theme.colors.accent.militaryGreen};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.extraLight};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  text-transform: uppercase;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: ${theme.transitions.fast};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${theme.colors.accent.militaryGreen};
    transition: ${theme.transitions.medium};
    z-index: -1;
  }
  
  &:hover {
    color: ${theme.colors.primary.black};
    
    &::before {
      left: 0;
    }
  }
`

const SecondaryButton = styled(CTAButton)`
  border-color: ${theme.colors.secondary.borderGray};
  color: ${theme.colors.text.secondary};
  
  &::before {
    background: ${theme.colors.secondary.darkGray};
  }
  
  &:hover {
    color: ${theme.colors.text.primary};
    border-color: ${theme.colors.secondary.darkGray};
  }
`

export const Hero: React.FC = () => {
  const [stats, setStats] = useState({
    chains: 7,
    tvl: 0,
    positions: 0,
    apy: 0
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        chains: 7,
        tvl: Math.floor(Math.random() * 1000000000),
        positions: Math.floor(Math.random() * 10000),
        apy: (Math.random() * 50).toFixed(2)
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <HeroContainer>
      <BackgroundGrid />
      
      <ScanLine
        initial={{ y: '-100%' }}
        animate={{ y: '100vh' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      <Classification>CLASSIFICATION: UNCLASSIFIED</Classification>
      
      <MainContent>
        <OperationHeader>
          <OperationTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Project: <span>Magnolia</span>
          </OperationTitle>
          
          <OperationSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            POSITION MANAGEMENT SYSTEM
          </OperationSubtitle>
        </OperationHeader>
        
        <StatusGrid>
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatusLabel>CHAINS ACTIVE</StatusLabel>
            <StatusValue>{stats.chains}</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatusLabel>TOTAL VALUE LOCKED</StatusLabel>
            <StatusValue>${(stats.tvl / 1000000).toFixed(1)}M</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatusLabel>ACTIVE POSITIONS</StatusLabel>
            <StatusValue>{stats.positions.toLocaleString()}</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatusLabel>AVG APY</StatusLabel>
            <StatusValue>{stats.apy}%</StatusValue>
          </StatusCard>
        </StatusGrid>
        
        <CTAContainer>
          <CTAButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            INITIATE DEPLOYMENT
          </CTAButton>
          
          <SecondaryButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ACCESS INTELLIGENCE
          </SecondaryButton>
        </CTAContainer>
      </MainContent>
    </HeroContainer>
  )
}