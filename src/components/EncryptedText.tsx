import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

interface EncryptedTextProps {
  text: string
  revealText?: string
  active?: boolean
  children?: React.ReactNode
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({ 
  text, 
  revealText = 'Coming Soon',
  active = false,
  children 
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const chars = '!@#$%^&*()_+-={}[]|:;<>,.?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
  useEffect(() => {
    // Disable animation on mobile for better performance
    if (isMobile) {
      setDisplayText(isHovered ? revealText : text)
      return
    }
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // If active prop is true, just show the text without animation
    if (active) {
      setDisplayText(text)
      return
    }
    
    // Only animate on hover state changes
    if (isHovered) {
      // Animate to reveal text
      let iteration = 0
      const targetText = revealText
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return letter
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )
        
        if (iteration >= targetText.length) {
          clearInterval(intervalRef.current!)
          setDisplayText(targetText)
        }
        
        iteration += 0.5 // Faster animation
      }, 60) // Slightly slower interval for better performance
    } else {
      // Animate back to original text
      let iteration = 0
      const targetText = text
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return letter
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
        )
        
        if (iteration >= targetText.length) {
          clearInterval(intervalRef.current!)
          setDisplayText(targetText)
        }
        
        iteration += 0.5 // Faster animation
      }, 60) // Slightly slower interval for better performance
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovered, text, revealText, active, chars, isMobile])
  
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span style={{ fontFamily: 'monospace' }}>{displayText}</span>
    </Container>
  )
}