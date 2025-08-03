import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../theme'

const BuilderContainer = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.primary.black};
  position: relative;
`

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing['3xl']};
  text-align: center;
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
  margin: 0 auto;
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 1px;
    background: ${theme.colors.accent.militaryGreen};
    margin: ${theme.spacing.md} auto 0;
  }
`

const BuilderInterface = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: ${theme.spacing.xl};
  min-height: 600px;
  
  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`

const Panel = styled.div`
  background: ${theme.colors.secondary.gunmetal};
  border: 1px solid ${theme.colors.secondary.borderGray};
  padding: ${theme.spacing.lg};
  position: relative;
  
  &::before {
    content: attr(data-panel);
    position: absolute;
    top: -10px;
    left: ${theme.spacing.md};
    background: ${theme.colors.secondary.gunmetal};
    padding: 0 ${theme.spacing.sm};
    font-family: ${theme.typography.fontFamily.mono};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.thin};
    letter-spacing: ${theme.typography.letterSpacing.wider};
    color: ${theme.colors.accent.militaryGreen};
    text-transform: uppercase;
  }
`

const AssetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
`

const AssetItem = styled(motion.div)<{ selected?: boolean }>`
  background: ${props => props.selected ? theme.colors.primary.black : 'transparent'};
  border: 1px solid ${props => props.selected ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:hover {
    border-color: ${theme.colors.accent.militaryGreen};
  }
`

const AssetInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AssetName = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.text.primary};
`

const AssetValue = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.accent.militaryGreen};
`

const PositionDisplay = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const PositionDiagram = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PositionSVG = styled.svg`
  width: 100%;
  height: 100%;
`

const MetricsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const MetricItem = styled.div`
  border-bottom: 1px solid ${theme.colors.secondary.borderGray};
  padding-bottom: ${theme.spacing.md};
`

const MetricLabel = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.xs};
`

const MetricValue = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.thin};
  color: ${theme.colors.accent.militaryGreen};
  letter-spacing: ${theme.typography.letterSpacing.wide};
`

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`

const Input = styled.input`
  background: ${theme.colors.primary.black};
  border: 1px solid ${theme.colors.secondary.borderGray};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fontFamily.mono};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  padding: ${theme.spacing.md};
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent.militaryGreen};
  }
  
  &::placeholder {
    color: ${theme.colors.text.disabled};
  }
`

const ExecuteButton = styled(motion.button)`
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
  width: 100%;
  margin-top: ${theme.spacing.lg};
  
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

const assets = [
  { name: 'ETH', apy: '12.5%', tvl: '$2.3B' },
  { name: 'USDC', apy: '8.2%', tvl: '$1.8B' },
  { name: 'ARB', apy: '18.7%', tvl: '$450M' },
  { name: 'OP', apy: '15.3%', tvl: '$380M' },
]

export const PositionBuilder: React.FC = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([])
  const [amount, setAmount] = useState('')
  const [leverage, setLeverage] = useState('1.0')
  
  const toggleAsset = (asset: string) => {
    setSelectedAssets(prev => 
      prev.includes(asset) 
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    )
  }
  
  const calculateMetrics = () => {
    const baseApy = selectedAssets.length > 0 ? 15.5 : 0
    const leverageMultiplier = parseFloat(leverage) || 1
    return {
      expectedApy: (baseApy * leverageMultiplier).toFixed(2),
      deltaExposure: '0.00',
      liquidationPrice: selectedAssets.length > 0 ? '$1,245.67' : '$0.00',
      gasEstimate: selectedAssets.length > 0 ? '0.023 ETH' : '0.00 ETH'
    }
  }
  
  const metrics = calculateMetrics()
  
  return (
    <BuilderContainer id="deployment">
      <ContentWrapper>
        <SectionHeader>
          <SectionCode>SECTOR E-5</SectionCode>
          <SectionTitle>POSITION BUILDER INTERFACE</SectionTitle>
        </SectionHeader>
        
        <BuilderInterface>
          <Panel data-panel="ASSET SELECTION">
            <AssetList>
              {assets.map((asset, index) => (
                <AssetItem
                  key={asset.name}
                  selected={selectedAssets.includes(asset.name)}
                  onClick={() => toggleAsset(asset.name)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AssetInfo>
                    <AssetName>{asset.name}</AssetName>
                    <div>
                      <AssetValue>{asset.apy} APY</AssetValue>
                      <AssetValue style={{ fontSize: '9px', opacity: 0.7 }}>
                        TVL: {asset.tvl}
                      </AssetValue>
                    </div>
                  </AssetInfo>
                </AssetItem>
              ))}
            </AssetList>
            
            <ControlPanel>
              <Input
                type="text"
                placeholder="AMOUNT (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                type="text"
                placeholder="LEVERAGE (1.0 - 3.0)"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
              />
            </ControlPanel>
          </Panel>
          
          <Panel data-panel="POSITION VISUALIZATION">
            <PositionDisplay>
              <PositionDiagram>
                <PositionSVG viewBox="0 0 600 300">
                  <defs>
                    <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke={theme.colors.secondary.borderGray} strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  
                  <rect width="600" height="300" fill="url(#gridPattern)" />
                  
                  <AnimatePresence>
                    {selectedAssets.map((asset, index) => {
                      const x = 150 + (index % 2) * 300
                      const y = 75 + Math.floor(index / 2) * 150
                      
                      return (
                        <motion.g
                          key={asset}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r="40"
                            fill="none"
                            stroke={theme.colors.accent.militaryGreen}
                            strokeWidth="1"
                          />
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={theme.colors.accent.militaryGreen}
                            fontSize="14"
                            fontFamily={theme.typography.fontFamily.mono}
                          >
                            {asset}
                          </text>
                          
                          {index > 0 && (
                            <motion.line
                              x1={150 + ((index - 1) % 2) * 300}
                              y1={75 + Math.floor((index - 1) / 2) * 150}
                              x2={x}
                              y2={y}
                              stroke={theme.colors.secondary.borderGray}
                              strokeWidth="0.5"
                              strokeDasharray="5,5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            />
                          )}
                        </motion.g>
                      )
                    })}
                  </AnimatePresence>
                  
                  {selectedAssets.length > 0 && (
                    <motion.text
                      x="300"
                      y="280"
                      textAnchor="middle"
                      fill={theme.colors.text.tertiary}
                      fontSize="10"
                      fontFamily={theme.typography.fontFamily.mono}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      DELTA NEUTRAL CONFIGURATION ACTIVE
                    </motion.text>
                  )}
                </PositionSVG>
              </PositionDiagram>
            </PositionDisplay>
          </Panel>
          
          <Panel data-panel="POSITION METRICS">
            <MetricsPanel>
              <MetricItem>
                <MetricLabel>EXPECTED APY</MetricLabel>
                <MetricValue>{metrics.expectedApy}%</MetricValue>
              </MetricItem>
              
              <MetricItem>
                <MetricLabel>DELTA EXPOSURE</MetricLabel>
                <MetricValue>{metrics.deltaExposure}</MetricValue>
              </MetricItem>
              
              <MetricItem>
                <MetricLabel>LIQUIDATION PRICE</MetricLabel>
                <MetricValue>{metrics.liquidationPrice}</MetricValue>
              </MetricItem>
              
              <MetricItem>
                <MetricLabel>GAS ESTIMATE</MetricLabel>
                <MetricValue>{metrics.gasEstimate}</MetricValue>
              </MetricItem>
            </MetricsPanel>
            
            <ExecuteButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={selectedAssets.length === 0}
            >
              EXECUTE POSITION
            </ExecuteButton>
          </Panel>
        </BuilderInterface>
      </ContentWrapper>
    </BuilderContainer>
  )
}