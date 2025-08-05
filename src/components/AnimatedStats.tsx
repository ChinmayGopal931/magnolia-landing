import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { animate } from 'animejs'
import { theme } from '../theme'

interface AnimatedStatsProps {
  value: number | string
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
}

const StatsContainer = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover {
    .stats-bg {
      opacity: 0.1;
    }
    
    .stats-value {
      transform: scale(1.05);
    }
  }
`

const StatsBg = styled.div`
  position: absolute;
  inset: -10px;
  background: ${theme.colors.accent.militaryGreen};
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: blur(20px);
`

const StatsLabel = styled.div`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.light};
  letter-spacing: ${theme.typography.letterSpacing.normal};
  color: ${theme.colors.text.tertiary};
  text-transform: none;
  margin-bottom: ${theme.spacing.sm};
`

const StatsValue = styled.div`
  font-family: ${theme.typography.fontFamily.mono};
  font-size: clamp(${theme.typography.fontSize.lg}, 4vw, ${theme.typography.fontSize['2xl']});
  font-weight: ${theme.typography.fontWeight.thin};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  color: ${theme.colors.accent.militaryGreen};
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
`

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ 
  value, 
  label, 
  prefix = '', 
  suffix = '', 
  decimals = 0 
}) => {
  const valueRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!valueRef.current || typeof value !== 'number') return

    const animatedValue = { val: 0 }
    
    animate(animatedValue, {
      val: value,
      round: decimals === 0 ? 1 : Math.pow(10, decimals),
      duration: 2000,
      ease: 'outExpo',
      update: function() {
        if (valueRef.current) {
          const displayValue = decimals === 0 
            ? Math.floor(animatedValue.val).toLocaleString()
            : animatedValue.val.toFixed(decimals)
          valueRef.current.innerHTML = `${prefix}${displayValue}${suffix}`
        }
      }
    })
  }, [value, prefix, suffix, decimals])

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      animate(valueRef.current, {
        translateX: (x - rect.width / 2) * 0.1,
        translateY: (y - rect.height / 2) * 0.1,
        duration: 300,
        ease: 'outQuad'
      })
    }

    const handleMouseLeave = () => {
      animate(valueRef.current, {
        translateX: 0,
        translateY: 0,
        duration: 600,
        ease: 'outElastic'
      })
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)

    const currentContainer = containerRef.current
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove)
        currentContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <StatsContainer ref={containerRef}>
      <StatsBg className="stats-bg" />
      <StatsLabel>{label}</StatsLabel>
      <StatsValue ref={valueRef} className="stats-value">
        {typeof value === 'string' ? value : `${prefix}0${suffix}`}
      </StatsValue>
    </StatsContainer>
  )
}

export default AnimatedStats
export { AnimatedStats }