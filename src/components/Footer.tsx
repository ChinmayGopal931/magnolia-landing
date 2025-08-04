import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme'

const FooterContainer = styled.footer`
  background: ${theme.colors.primary.darkBlack};
  border-top: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['2xl']} ${theme.spacing['2xl']} ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl} 0;
`

const SecurityStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: ${theme.spacing['3xl']};
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.tertiary};
`

const StatusLight = styled.div<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.active ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  box-shadow: ${props => props.active ? `0 0 8px ${theme.colors.accent.militaryGreen}` : 'none'};
`

const BottomBar = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.secondary.borderGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
`

const Copyright = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.disabled};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`

const Links = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
`

const Link = styled.a`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
  transition: ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.accent.militaryGreen};
  }
`

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SecurityStatus>
          <StatusIndicator>
            <StatusLight />
            <span>MAINNET</span>
          </StatusIndicator>
          <StatusIndicator>
            <StatusLight active />
            <span>TESTNET</span>
          </StatusIndicator>
        </SecurityStatus>
      </FooterContent>
      
      <BottomBar>
        <Copyright>
          PROJECT MAGNOLIA © 2025
        </Copyright>
        
        <Links>
          <Link href="#contact">CONTACT</Link>
        </Links>
      </BottomBar>
    </FooterContainer>
  )
}

export default Footer
export { Footer }
