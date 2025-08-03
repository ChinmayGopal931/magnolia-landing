import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const SVGContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing['3xl']} 0;
`

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  max-width: 800px;
`

interface Node {
  id: string
  x: number
  y: number
  label: string
  active: boolean
}

const nodes: Node[] = [
  { id: 'hyperliquid', x: 300, y: 150, label: 'HYPERLIQUID', active: true },
  { id: 'drift', x: 500, y: 150, label: 'DRIFT', active: true },
  { id: 'gmx', x: 200, y: 250, label: 'GMX', active: false },
  { id: 'paradex', x: 400, y: 300, label: 'PARADEX', active: false },
  { id: 'lighter', x: 600, y: 250, label: 'LIGHTER', active: false },
  { id: 'HyperUnit', x: 400, y: 50, label: 'HyperUnit', active: false },
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
      <StyledSVG ref={svgRef} viewBox="0 0 800 400">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke={theme.colors.secondary.gunmetal} strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={theme.colors.accent.militaryGreen} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        <rect width="800" height="400" fill="url(#grid)" />
        
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
                strokeWidth="0.5"
                opacity="0.5"
              />
              <motion.circle
                r="2"
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
            </g>
          )
        })}
        
        {nodes.map(node => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill="none"
              stroke={node.active ? theme.colors.accent.militaryGreen : theme.colors.secondary.borderGray}
              strokeWidth="1"
              opacity={node.active ? "0.8" : "0.3"}
              filter={node.active ? "url(#glow)" : "none"}
              animate={{
                r: node.active ? [30, 35, 30] : 30,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={theme.colors.primary.black}
              opacity="0.8"
            />
            
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.active ? theme.colors.accent.militaryGreen : theme.colors.text.tertiary}
              fontSize="11"
              fontFamily={theme.typography.fontFamily.mono}
              fontWeight={theme.typography.fontWeight.thin}
              letterSpacing={theme.typography.letterSpacing.wider}
            >
              {node.label}
            </text>
            
            {node.active && (
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