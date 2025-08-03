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
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: none;
  margin: 0;
  
  span {
    color: ${theme.colors.accent.militaryGreen};
  }
`

const OperationSubtitle = styled(motion.p)`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.secondary};
  text-transform: none;
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
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
  }
`

const StatusLabel = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.tertiary};
  text-transform: none;
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
  background: ${theme.colors.accent.militaryGreen};
  border: 1px solid ${theme.colors.accent.militaryGreen};
  color: ${theme.colors.primary.black};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: ${theme.transitions.fast};
  
  &:hover {
    background: transparent;
    color: ${theme.colors.accent.militaryGreen};
  }
`


export const Hero: React.FC = () => {
  const [stats, setStats] = useState({
    opportunities: 0,
    tvl: 0,
    positions: 0,
    apy: '0.00'
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        opportunities: Math.floor(Math.random() * 15) + 3,
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
            Cross-DEX Position Builder
          </OperationSubtitle>
          
          <OperationSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              fontSize: theme.typography.fontSize.sm, 
              color: theme.colors.accent.militaryGreen,
              marginTop: theme.spacing.sm 
            }}
          >
            Automated arbitrage detection • Real-time funding spreads • Multi-exchange aggregation
          </OperationSubtitle>
        </OperationHeader>
        
        <StatusGrid>
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatusLabel>Live Arbitrage</StatusLabel>
            <StatusValue>{stats.opportunities}</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatusLabel>Total Value Locked</StatusLabel>
            <StatusValue>${(stats.tvl / 1000000).toFixed(1)}M</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatusLabel>Active Positions</StatusLabel>
            <StatusValue>{stats.positions.toLocaleString()}</StatusValue>
          </StatusCard>
          
          <StatusCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatusLabel>Average APY</StatusLabel>
            <StatusValue>{stats.apy}%</StatusValue>
          </StatusCard>
        </StatusGrid>
        
        <CTAContainer>
          <CTAButton
            as="a"
            href="https://project-magnolia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Launch App
          </CTAButton>
        
        </CTAContainer>
      </MainContent>
    </HeroContainer>
  )
}