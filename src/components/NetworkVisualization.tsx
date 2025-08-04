import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import { EncryptedText } from './EncryptedText'

const SVGContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing['2xl']} 0;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
    margin: ${theme.spacing.xl} 0;
    padding: 0 ${theme.spacing.sm};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 250px;
    margin: ${theme.spacing.lg} 0;
    padding: 0;
  }
`

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  max-width: 1000px;
`

const NodeLabel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.typography.fontFamily.mono};
  font-size: 11px;
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  color: ${theme.colors.text.tertiary};
  white-space: nowrap;
  pointer-events: auto;
  cursor: pointer;
  
  span {
    font-family: ${theme.typography.fontFamily.mono} !important;
    font-size: 11px !important;
    font-weight: ${theme.typography.fontWeight.thin} !important;
    letter-spacing: ${theme.typography.letterSpacing.wider} !important;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 9px;
    
    span {
      font-size: 9px !important;
    }
  }
`

interface Node {
  id: string
  x: number
  y: number
  label: string
  active: boolean
}

const nodes: Node[] = [
  { id: 'hyperliquid', x: 350, y: 150, label: 'HYPERLIQUID', active: true },
  { id: 'drift', x: 650, y: 150, label: 'DRIFT', active: true },
  { id: 'gmx', x: 200, y: 250, label: 'GMX', active: false },
  { id: 'paradex', x: 500, y: 320, label: 'PARADEX', active: false },
  { id: 'lighter', x: 800, y: 250, label: 'LIGHTER', active: false },
  { id: 'HyperUnit', x: 500, y: 50, label: 'HyperUnit', active: false },
]

const connections = [
  { from: 'hyperliquid', to: 'drift' },
  { from: 'hyperliquid', to: 'gmx' },
  { from: 'drift', to: 'lighter' },
  { from: 'HyperUnit', to: 'hyperliquid' },
  { from: 'HyperUnit', to: 'drift' },
  { from: 'gmx', to: 'paradex' },
  { from: 'paradex', to: 'lighter' },
]

export const NetworkVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isMobile, setIsMobile] = React.useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Keep Hyperliquid and Drift always active, others inactive
  useEffect(() => {
    nodes.forEach(node => {
      if (node.id === 'hyperliquid' || node.id === 'drift') {
        node.active = true
      } else {
        node.active = false
      }
    })
  }, [])
  
  return (
    <SVGContainer>
      <StyledSVG ref={svgRef} viewBox="0 0 1000 400" style={{ position: 'relative' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={theme.colors.secondary.gunmetal} strokeWidth="1" opacity="0.5"/>
          </pattern>
          
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={theme.colors.accent.militaryGreen} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        <rect width="1000" height="400" fill="url(#grid)" />
        
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null
          
          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={theme.colors.secondary.borderGray}
                strokeWidth="2"
                opacity="0.4"
              />
              {!isMobile && (
                <motion.circle
                  r="3"
                  fill={theme.colors.accent.militaryGreen}
                  initial={{ cx: fromNode.x, cy: fromNode.y }}
                  animate={{ cx: toNode.x, cy: toNode.y }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "linear"
                  }}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.3}s`}
                  />
                </motion.circle>
              )}
            </g>
          )
        })}
        
        {/* Bridging powered by LiFi text - top right */}
        <g>
          <rect
            x="680"
            y="12"
            width="305"
            height="30"
            fill={theme.colors.primary.black}
            opacity="0.9"
            rx="2"
          />
          <text
            x="695"
            y="30"
            textAnchor="start"
            fill={theme.colors.accent.militaryGreen}
            fontSize={isMobile ? "10" : "12"}
            fontFamily={theme.typography.fontFamily.mono}
            fontWeight={theme.typography.fontWeight.regular}
            letterSpacing={theme.typography.letterSpacing.wide}
            opacity="1"
          >
            BRIDGING POWERED BY LIFI
          </text>
          <image
            href="/logo_lifi_dark.svg"
            x="895"
            y="18"
            width="55"
            height="18"
            opacity="1"
          />
        </g>
        
        {nodes.map(node => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill="none"
              stroke={node.active ? theme.colors.accent.militaryGreen : hoveredNode === node.id ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray}
              strokeWidth="1"
              opacity={node.active ? "0.8" : hoveredNode === node.id ? "0.6" : "0.3"}
              filter={node.active ? "url(#glow)" : "none"}
              animate={{
                r: node.active ? [30, 35, 30] : hoveredNode === node.id ? 32 : 30,
              }}
              transition={{
                duration: 2,
                repeat: node.active ? Infinity : 0,
              }}
              style={{ cursor: !node.active ? 'pointer' : 'default' }}
              onMouseEnter={() => !node.active && setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
            
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={theme.colors.primary.black}
              opacity="0.8"
              style={{ cursor: !node.active ? 'pointer' : 'default' }}
              onMouseEnter={() => !node.active && setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
            
            {node.active ? (
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={theme.colors.accent.militaryGreen}
                fontSize={isMobile ? "9" : "11"}
                fontFamily={theme.typography.fontFamily.mono}
                fontWeight={theme.typography.fontWeight.thin}
                letterSpacing={theme.typography.letterSpacing.wider}
              >
                {node.label}
              </text>
            ) : (
              <foreignObject
                x={node.x - 60}
                y={node.y - 12}
                width="120"
                height="24"
                style={{ overflow: 'visible' }}
              >
                <NodeLabel onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}>
                  <EncryptedText 
                    text={node.label} 
                    revealText="COMING SOON"
                    active={false}
                  />
                </NodeLabel>
              </foreignObject>
            )}
            
            {node.active && !isMobile && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="40"
                fill="none"
                stroke={theme.colors.accent.militaryGreen}
                strokeWidth="0.5"
                opacity="0.3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </g>
        ))}
        
 
      </StyledSVG>
    </SVGContainer>
  )
}