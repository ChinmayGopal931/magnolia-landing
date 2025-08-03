import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '../theme'

const RadarContainer = styled.div`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  position: relative;
  margin: 0 auto;
`

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
`

interface RadarBlip {
  id: string
  angle: number
  distance: number
  size: number
  label: string
}

export const Radar: React.FC = () => {
  const [blips, setBlips] = useState<RadarBlip[]>([])
  const [sweepAngle, setSweepAngle] = useState(0)
  
  useEffect(() => {
    const sweepInterval = setInterval(() => {
      setSweepAngle(prev => (prev + 2) % 360)
    }, 50)
    
    return () => clearInterval(sweepInterval)
  }, [])
  
  useEffect(() => {
    const blipInterval = setInterval(() => {
      const newBlips: RadarBlip[] = []
      for (let i = 0; i < 8; i++) {
        newBlips.push({
          id: `blip-${i}`,
          angle: Math.random() * 360,
          distance: 30 + Math.random() * 120,
          size: 2 + Math.random() * 4,
          label: ['ETH', 'BTC', 'USDC', 'ARB', 'OP', 'MATIC', 'AVAX', 'SOL'][i]
        })
      }
      setBlips(newBlips)
    }, 3000)
    
    return () => clearInterval(blipInterval)
  }, [])
  
  const centerX = 250
  const centerY = 250
  const maxRadius = 200
  
  return (
    <RadarContainer>
      <StyledSVG viewBox="0 0 500 500">
        <defs>
          <radialGradient id="radarGradient">
            <stop offset="0%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0.2" />
            <stop offset="100%" stopColor={theme.colors.accent.militaryGreen} stopOpacity="0" />
          </radialGradient>
          
          <filter id="radarGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Radar circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, index) => (
          <circle
            key={index}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            fill="none"
            stroke={theme.colors.secondary.borderGray}
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        
        {/* Cross lines */}
        <line
          x1={centerX - maxRadius}
          y1={centerY}
          x2={centerX + maxRadius}
          y2={centerY}
          stroke={theme.colors.secondary.borderGray}
          strokeWidth="0.5"
          opacity="0.3"
        />
        <line
          x1={centerX}
          y1={centerY - maxRadius}
          x2={centerX}
          y2={centerY + maxRadius}
          stroke={theme.colors.secondary.borderGray}
          strokeWidth="0.5"
          opacity="0.3"
        />
        
        {/* Diagonal lines */}
        {[45, 135, 225, 315].map(angle => {
          const rad = (angle * Math.PI) / 180
          const x2 = centerX + Math.cos(rad) * maxRadius
          const y2 = centerY + Math.sin(rad) * maxRadius
          const x1 = centerX - Math.cos(rad) * maxRadius
          const y1 = centerY - Math.sin(rad) * maxRadius
          
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={theme.colors.secondary.borderGray}
              strokeWidth="0.5"
              opacity="0.2"
            />
          )
        })}
        
        {/* Sweep line */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.cos((sweepAngle - 90) * Math.PI / 180) * maxRadius}
          y2={centerY + Math.sin((sweepAngle - 90) * Math.PI / 180) * maxRadius}
          stroke={theme.colors.accent.militaryGreen}
          strokeWidth="1"
          opacity="0.6"
          filter="url(#radarGlow)"
        />
        
        {/* Sweep trail */}
        <defs>
          <mask id="sweepMask">
            <rect width="500" height="500" fill="black" />
            <path
              d={`M ${centerX} ${centerY} L ${centerX} ${centerY - maxRadius} A ${maxRadius} ${maxRadius} 0 0 1 ${
                centerX + Math.cos((sweepAngle - 90) * Math.PI / 180) * maxRadius
              } ${centerY + Math.sin((sweepAngle - 90) * Math.PI / 180) * maxRadius} Z`}
              fill="white"
            />
          </mask>
        </defs>
        
        <circle
          cx={centerX}
          cy={centerY}
          r={maxRadius}
          fill="url(#radarGradient)"
          mask="url(#sweepMask)"
          opacity="0.3"
        />
        
        {/* Blips */}
        {blips.map(blip => {
          const rad = (blip.angle * Math.PI) / 180
          const x = centerX + Math.cos(rad) * blip.distance
          const y = centerY + Math.sin(rad) * blip.distance
          const isVisible = Math.abs((sweepAngle - blip.angle + 360) % 360) < 60
          
          return (
            <g key={blip.id}>
              <motion.circle
                cx={x}
                cy={y}
                r={blip.size}
                fill={theme.colors.accent.militaryGreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? [0, 1, 0.5] : 0 }}
                transition={{ duration: 1 }}
                filter="url(#radarGlow)"
              />
              
              {isVisible && (
                <motion.text
                  x={x + 10}
                  y={y - 5}
                  fill={theme.colors.accent.militaryGreen}
                  fontSize="9"
                  fontFamily={theme.typography.fontFamily.mono}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.4] }}
                  transition={{ duration: 1 }}
                >
                  {blip.label}
                </motion.text>
              )}
              
              {isVisible && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={blip.size + 10}
                  fill="none"
                  stroke={theme.colors.accent.militaryGreen}
                  strokeWidth="0.5"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1 }}
                />
              )}
            </g>
          )
        })}
        
        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill={theme.colors.accent.militaryGreen}
          filter="url(#radarGlow)"
        />
        
        {/* Labels */}
        <text
          x={centerX}
          y={30}
          textAnchor="middle"
          fill={theme.colors.text.tertiary}
          fontSize="10"
          fontFamily={theme.typography.fontFamily.mono}
          letterSpacing={theme.typography.letterSpacing.wider}
        >
          ASSET TRACKING
        </text>
        
        {/* Range indicators */}
        {[50, 100, 150, 200].map((range, index) => (
          <text
            key={index}
            x={centerX + 5}
            y={centerY - range + 5}
            fill={theme.colors.text.tertiary}
            fontSize="8"
            fontFamily={theme.typography.fontFamily.mono}
            opacity="0.5"
          >
            {range}km
          </text>
        ))}
      </StyledSVG>
    </RadarContainer>
  )
}