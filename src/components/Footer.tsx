import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme'

const FooterContainer = styled.footer`
  background: ${theme.colors.primary.darkBlack};
  border-top: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']} ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`

const FooterSection = styled.div`
  position: relative;
`

const SectionTitle = styled.h4`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.widest};
  color: ${theme.colors.accent.militaryGreen};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.lg};
  
  &::after {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: ${theme.colors.accent.militaryGreen};
    margin-top: ${theme.spacing.sm};
  }
`

const SpecList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const SpecItem = styled.li`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.tertiary};
  padding: ${theme.spacing.xs} 0;
  display: flex;
  align-items: baseline;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '//';
    color: ${theme.colors.secondary.borderGray};
    flex-shrink: 0;
  }
`

const VersionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

const VersionItem = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.tertiary};
  display: flex;
  justify-content: space-between;
  
  span:last-child {
    color: ${theme.colors.text.secondary};
  }
`

const ContractAddresses = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

const ContractItem = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.text.tertiary};
  word-break: break-all;
  
  &:hover {
    color: ${theme.colors.accent.militaryGreen};
    cursor: pointer;
  }
`

const SecurityStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
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
  margin-top: ${theme.spacing['3xl']};
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

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>SYSTEM SPECIFICATIONS</SectionTitle>
          <VersionInfo>
            <VersionItem>
              <span>VERSION</span>
              <span>2.7.3-STABLE</span>
            </VersionItem>
            <VersionItem>
              <span>BUILD</span>
              <span>20240115.1847</span>
            </VersionItem>
            <VersionItem>
              <span>PROTOCOL</span>
              <span>DELTA-V3</span>
            </VersionItem>
            <VersionItem>
              <span>UPTIME</span>
              <span>99.97%</span>
            </VersionItem>
          </VersionInfo>
          
          <SecurityStatus>
            <StatusIndicator>
              <StatusLight active />
              <span>MAINNET</span>
            </StatusIndicator>
            <StatusIndicator>
              <StatusLight active />
              <span>ORACLE</span>
            </StatusIndicator>
            <StatusIndicator>
              <StatusLight active />
              <span>KEEPER</span>
            </StatusIndicator>
            <StatusIndicator>
              <StatusLight />
              <span>TESTNET</span>
            </StatusIndicator>
          </SecurityStatus>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>OPERATIONAL PROTOCOLS</SectionTitle>
          <SpecList>
            <SpecItem>CROSS-CHAIN MESSAGE PASSING PROTOCOL</SpecItem>
            <SpecItem>AUTOMATED MARKET MAKER INTEGRATION</SpecItem>
            <SpecItem>ORACLE PRICE FEED AGGREGATION</SpecItem>
            <SpecItem>LIQUIDATION PROTECTION SYSTEM</SpecItem>
            <SpecItem>GAS OPTIMIZATION ENGINE</SpecItem>
            <SpecItem>POSITION HEALTH MONITORING</SpecItem>
            <SpecItem>EMERGENCY SHUTDOWN PROCEDURES</SpecItem>
            <SpecItem>MULTI-SIG GOVERNANCE MODEL</SpecItem>
          </SpecList>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>VERIFICATION CODES</SectionTitle>
          <ContractAddresses>
            <ContractItem>
              CORE: 0x7a250d56...4f47
            </ContractItem>
            <ContractItem>
              VAULT: 0x2170ed0e...ac9c
            </ContractItem>
            <ContractItem>
              ROUTER: 0x10ed43c7...8d0a
            </ContractItem>
            <ContractItem>
              ORACLE: 0x0567f2f4...b829
            </ContractItem>
          </ContractAddresses>
          
          <div style={{ marginTop: theme.spacing.xl }}>
            <SpecItem style={{ fontSize: '9px' }}>
              CHECKSUM: 0xAB7F9E2D
            </SpecItem>
            <SpecItem style={{ fontSize: '9px' }}>
              SIG: 0x1B4F0E9851971998E732078544185890542571B
            </SpecItem>
          </div>
        </FooterSection>
      </FooterContent>
      
      <BottomBar>
        <Copyright>
          DELTA-NEUTRAL OPERATIONS © 2024 | CLASSIFICATION: UNCLASSIFIED
        </Copyright>
        
        <Links>
          <Link href="#documentation">DOCS</Link>
          <Link href="#github">GITHUB</Link>
          <Link href="#audit">AUDIT</Link>
          <Link href="#contact">CONTACT</Link>
        </Links>
      </BottomBar>
    </FooterContainer>
  )
}