import React, { useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'

interface Point3D {
  x: number
  y: number
  z: number
}

interface MountainPoint extends Point3D {
  opacity: number
  size: number
}

const BackgroundCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.8;
`

const GenerativeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  const mountainData = useMemo(() => {
    const points: MountainPoint[] = []
    const width = 200
    const height = 120
    const centerX = width / 2
    const centerY = height * 0.7

    for (let x = 0; x < width; x += 2) {
      for (let y = 0; y < height; y += 2) {
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        )
        
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const normalizedDistance = distanceFromCenter / maxDistance
        
        const mountainHeight = Math.max(0, 
          (1 - normalizedDistance * normalizedDistance) * 40 +
          Math.sin(x * 0.1) * 3 +
          Math.cos(y * 0.15) * 2 +
          (Math.random() - 0.5) * 4
        )
        
        if (mountainHeight > 1) {
          const baseZ = mountainHeight
          const variance = Math.random() * 0.3 + 0.7
          
          points.push({
            x: (x - centerX) * 12,
            y: (y - centerY) * 8,
            z: baseZ * variance,
            opacity: Math.min(1, mountainHeight / 20 + 0.2),
            size: Math.random() * 1.5 + 0.8
          })
        }
      }
    }
    
    const codeLines = 12
    for (let i = 0; i < codeLines; i++) {
      const linePoints = Math.floor(Math.random() * 20) + 15
      for (let j = 0; j < linePoints; j++) {
        points.push({
          x: (Math.random() - 0.5) * 1400,
          y: (Math.random() - 0.5) * 600 - 150,
          z: Math.random() * 15 + 8,
          opacity: 0.4 + Math.random() * 0.3,
          size: 0.5 + Math.random() * 0.8
        })
      }
    }
    
    return points
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      
      ctx.scale(dpr, dpr)
    }

    const animate = () => {
      timeRef.current += 0.016
      
      if (!canvas || !ctx) return
      
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const time = timeRef.current
      const rotationY = Math.sin(time * 0.1) * 0.3
      const rotationX = Math.cos(time * 0.15) * 0.1
      
      mountainData.forEach((point, index) => {
        const waveOffset = Math.sin(time * 0.5 + index * 0.01) * 2
        const z = point.z + waveOffset
        
        const cosY = Math.cos(rotationY)
        const sinY = Math.sin(rotationY)
        const cosX = Math.cos(rotationX)
        const sinX = Math.sin(rotationX)
        
        const x1 = point.x * cosY - z * sinY
        const z1 = point.x * sinY + z * cosY
        
        const y1 = point.y * cosX - z1 * sinX
        const z2 = point.y * sinX + z1 * cosX
        
        const perspective = 400
        const scale = perspective / (perspective + z2 + 250)
        
        const screenX = centerX + x1 * scale * 2.5
        const screenY = centerY + y1 * scale * 2.5
        
        if (screenX >= 0 && screenX <= rect.width && 
            screenY >= 0 && screenY <= rect.height) {
          
          const dynamicOpacity = point.opacity * scale * 
            (0.8 + Math.sin(time * 0.3 + index * 0.02) * 0.2)
          
          const pulseSize = point.size * scale * 
            (1 + Math.sin(time * 0.8 + index * 0.015) * 0.3)
          
          const hue = 120 + Math.sin(time * 0.1 + z2 * 0.01) * 20
          
          ctx.fillStyle = `hsla(${hue}, 60%, 85%, ${Math.max(0, Math.min(1, dynamicOpacity))})`
          
          ctx.beginPath()
          ctx.arc(screenX, screenY, Math.max(0.5, pulseSize), 0, Math.PI * 2)
          ctx.fill()
          
          if (pulseSize > 1.2) {
            ctx.strokeStyle = `hsla(${hue}, 80%, 90%, ${dynamicOpacity * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.arc(screenX, screenY, pulseSize * 1.5, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      })
      
      const connections = Math.floor(mountainData.length * 0.1)
      for (let i = 0; i < connections; i++) {
        const p1 = mountainData[Math.floor(Math.random() * mountainData.length)]
        const p2 = mountainData[Math.floor(Math.random() * mountainData.length)]
        
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + 
          Math.pow(p1.y - p2.y, 2) + 
          Math.pow(p1.z - p2.z, 2)
        )
        
        if (distance < 80) {
          const x1Screen = centerX + (p1.x * Math.cos(rotationY) - (p1.z + Math.sin(time * 0.5)) * Math.sin(rotationY)) * 3
          const y1Screen = centerY + p1.y * 3
          const x2Screen = centerX + (p2.x * Math.cos(rotationY) - (p2.z + Math.sin(time * 0.5)) * Math.sin(rotationY)) * 3
          const y2Screen = centerY + p2.y * 3
          
          ctx.strokeStyle = `hsla(120, 50%, 80%, ${0.1 * (1 - distance / 80)})`
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(x1Screen, y1Screen)
          ctx.lineTo(x2Screen, y2Screen)
          ctx.stroke()
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mountainData])

  return <BackgroundCanvas ref={canvasRef} />
}

export default GenerativeBackground