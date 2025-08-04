import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const AbstractionContainer = styled.section`
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
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: ${theme.spacing.xl};
  align-items: stretch;
  margin-top: ${theme.spacing['4xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`

const ComparisonColumn = styled.div<{ isTraditional?: boolean }>`
  background: ${props => props.isTraditional ? theme.colors.secondary.charcoal : theme.colors.secondary.gunmetal};
  border: 1px solid ${props => props.isTraditional ? theme.colors.secondary.borderGray : theme.colors.accent.militaryGreen}33;
  padding: ${theme.spacing['2xl']};
  position: relative;
  
  ${props => props.isTraditional && `
    opacity: 0.8;
  `}
`

const ColumnHeader = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const Step = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`

const StepNumber = styled.div<{ isMagnolia?: boolean }>`
  min-width: 24px;
  height: 24px;
  background: ${props => props.isMagnolia ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  color: ${props => props.isMagnolia ? theme.colors.primary.black : theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.normal};
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.h4`
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.normal};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`

const StepDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    transform: rotate(90deg);
    margin: ${theme.spacing.xl} 0;
  }
`

const Arrow = styled.div`
  width: 60px;
  height: 2px;
  background: ${theme.colors.accent.militaryGreen};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: -6px;
    width: 0;
    height: 0;
    border-left: 12px solid ${theme.colors.accent.militaryGreen};
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`

const HighlightBox = styled(motion.div)`
  background: ${theme.colors.accent.militaryGreen}10;
  border: 1px solid ${theme.colors.accent.militaryGreen}33;
  padding: ${theme.spacing.xl};
  margin-top: ${theme.spacing['3xl']};
  text-align: center;
`

const HighlightText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.accent.militaryGreen};
  font-weight: ${theme.typography.fontWeight.light};
  margin: 0;
`

const traditionalSteps = [
  {
    title: "Monitor Multiple Exchanges",
    description: "Manually track funding rates across different platforms"
  },
  {
    title: "Calculate Position Sizes",
    description: "Use spreadsheets to determine optimal leverage and sizing"
  },
  {
    title: "Execute Manually",
    description: "Place orders on each exchange separately"
  },
  {
    title: "Track Performance",
    description: "Maintain complex spreadsheets for P&L tracking"
  },
  {
    title: "Manage Risk",
    description: "Constantly monitor positions for liquidation risk"
  },
  {
    title: "Rebalance Positions",
    description: "Manually adjust positions when rates change"
  }
]

const magnoliaSteps = [
  {
    title: "Connect Exchanges",
    description: "One-time setup with read-only API keys"
  },
  {
    title: "Set Strategy Parameters",
    description: "Define your risk tolerance and target returns"
  },
  {
    title: "Deploy Capital",
    description: "Execute multi-exchange positions with one click"
  },
  {
    title: "Monitor Dashboard",
    description: "Real-time performance and risk metrics"
  },
  {
    title: "Receive Alerts",
    description: "Get notified of opportunities and risks via Telegram"
  },
  {
    title: "Auto-Optimize",
    description: "Let the system rebalance based on your parameters"
  }
]

export const ComplexityAbstraction: React.FC = () => {
  return (
    <AbstractionContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Abstracting Away Complexity</SectionTitle>
          <SectionSubtitle>
            What used to take hours of manual calculation and execution across multiple platforms 
            now happens automatically. Focus on strategy, not spreadsheets.
          </SectionSubtitle>
        </SectionHeader>
        
        <ComparisonGrid>
          <ComparisonColumn isTraditional>
            <ColumnHeader>Traditional Approach</ColumnHeader>
            <StepsList>
              {traditionalSteps.map((step, index) => (
                <Step
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StepNumber>{index + 1}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </StepContent>
                </Step>
              ))}
            </StepsList>
          </ComparisonColumn>
          
          <ArrowContainer>
            <Arrow />
          </ArrowContainer>
          
          <ComparisonColumn>
            <ColumnHeader>Project Magnolia</ColumnHeader>
            <StepsList>
              {magnoliaSteps.map((step, index) => (
                <Step
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StepNumber isMagnolia>{index + 1}</StepNumber>
                  <StepContent>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </StepContent>
                </Step>
              ))}
            </StepsList>
          </ComparisonColumn>
        </ComparisonGrid>
        
        <HighlightBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <HighlightText>
            6 manual steps reduced to 1 automated workflow
          </HighlightText>
        </HighlightBox>
      </ContentWrapper>
    </AbstractionContainer>
  )
}