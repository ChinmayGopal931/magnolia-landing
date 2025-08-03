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
  { id: 'eth', x: 400, y: 200, label: 'ETH', active: true },
  { id: 'arb', x: 250, y: 100, label: 'ARB', active: true },
  { id: 'op', x: 550, y: 100, label: 'OP', active: true },
  { id: 'polygon', x: 200, y: 250, label: 'POLY', active: true },
  { id: 'avax', x: 600, y: 250, label: 'AVAX', active: true },
  { id: 'bsc', x: 300, y: 350, label: 'BSC', active: false },
  { id: 'sol', x: 500, y: 350, label: 'SOL', active: true },
]

const connections = [
  { from: 'eth', to: 'arb' },
  { from: 'eth', to: 'op' },
  { from: 'eth', to: 'polygon' },
  { from: 'eth', to: 'avax' },
  { from: 'arb', to: 'polygon' },
  { from: 'op', to: 'avax' },
  { from: 'polygon', to: 'bsc' },
  { from: 'avax', to: 'sol' },
  { from: 'bsc', to: 'sol' },
]

export const NetworkVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    const interval = setInterval(() => {
      nodes.forEach(node => {
        node.active = Math.random() > 0.2
      })
    }, 3000)
    
    return () => clearInterval(interval)
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
        
        <text
          x="10"
          y="20"
          fill={theme.colors.text.tertiary}
          fontSize="10"
          fontFamily={theme.typography.fontFamily.mono}
          letterSpacing={theme.typography.letterSpacing.wider}
        >
          NETWORK STATUS: OPERATIONAL
        </text>
        
        <text
          x="790"
          y="20"
          textAnchor="end"
          fill={theme.colors.accent.militaryGreen}
          fontSize="10"
          fontFamily={theme.typography.fontFamily.mono}
          letterSpacing={theme.typography.letterSpacing.wider}
        >
          LATENCY: {Math.floor(Math.random() * 50 + 10)}MS
        </text>
      </StyledSVG>
    </SVGContainer>
  )
}