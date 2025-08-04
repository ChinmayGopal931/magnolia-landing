import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../theme'

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${theme.colors.primary.black};
  border-bottom: 1px solid ${theme.colors.secondary.borderGray};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.md};
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 10, 0.95);
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing['2xl']};
  }
`

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
  
  span {
    width: 100%;
    height: 2px;
    background: ${theme.colors.text.primary};
    transition: ${theme.transitions.fast};
    transform-origin: 1px;
    
    &:nth-child(1) {
      transform: ${props => props['aria-expanded'] === 'true' ? 'rotate(45deg)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props['aria-expanded'] === 'true' ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props['aria-expanded'] === 'true' ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: ${theme.transitions.medium};
  padding: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const LogoText = styled.h1`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.primary};
  margin: 0;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
  }
  
  span {
    color: ${theme.colors.text.secondary};
  }
`

const StatusIndicator = styled.div<{ status: 'active' | 'warning' | 'critical' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => 
    props.status === 'active' ? theme.colors.accent.militaryGreen :
    props.status === 'warning' ? theme.colors.accent.alertAmber :
    theme.colors.accent.alertRed
  };
  box-shadow: 0 0 10px ${props => 
    props.status === 'active' ? theme.colors.accent.militaryGreen :
    props.status === 'warning' ? theme.colors.accent.alertAmber :
    theme.colors.accent.alertRed
  };
  animation: ${props => props.status !== 'active' ? 'pulse 2s infinite' : 'none'};
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
`


const SystemStatus = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.tertiary};
  text-transform: none;
`

const TimeDisplay = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.secondary};
`

export const Navigation: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // Reduced frequency for better performance
    
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  
  return (
    <>
      <NavContainer>
        <Logo>
          <StatusIndicator status="active" />
          <LogoText>DeFi<span>-</span>Builder</LogoText>
        </Logo>
        
        <NavLinks>
        </NavLinks>
        
        <SystemStatus>
          <StatusItem>
            <StatusIndicator status="active" />
            <span>Live on Testnet</span>
          </StatusItem>
          <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
        </SystemStatus>
        
        <HamburgerButton
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </HamburgerButton>
      </NavContainer>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <StatusItem>
          <StatusIndicator status="active" />
          <span>Live on Testnet</span>
        </StatusItem>
        <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
      </MobileMenu>
    </>
  )
}