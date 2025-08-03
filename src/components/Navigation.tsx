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
  padding: 0 ${theme.spacing['2xl']};
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 10, 0.95);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const LogoText = styled.h1`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  color: ${theme.colors.text.primary};
  margin: 0;
  
  span {
    color: ${theme.colors.accent.militaryGreen};
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

const NavLink = styled.a`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.extraLight};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${theme.colors.text.secondary};
  position: relative;
  transition: ${theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${theme.colors.accent.militaryGreen};
    transition: ${theme.transitions.fast};
  }
  
  &:hover {
    color: ${theme.colors.accent.militaryGreen};
    
    &::after {
      width: 100%;
    }
  }
`

const SystemStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
`

const TimeDisplay = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.accent.militaryGreen};
`

export const Navigation: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 100)
    
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}:${milliseconds}`
  }
  
  return (
    <NavContainer>
      <Logo>
        <StatusIndicator status="active" />
        <LogoText>Project<span>-</span>magnolia</LogoText>
      </Logo>
      
      <NavLinks>
      </NavLinks>
      
      <SystemStatus>
        <StatusItem>
          <StatusIndicator status="active" />
          <span>SYSTEM OPERATIONAL</span>
        </StatusItem>
        <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
      </SystemStatus>
    </NavContainer>
  )
}