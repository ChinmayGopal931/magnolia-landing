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
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const chars = '!@#$%^&*()_+-={}[]|:;<>,.?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
  useEffect(() => {
    if (!active && isHovered) {
      let iteration = 0
      const targetText = revealText
      const originalLength = text.length
      const targetLength = targetText.length
      const maxLength = Math.max(originalLength, targetLength)
      
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
            .padEnd(maxLength, chars[Math.floor(Math.random() * chars.length)])
            .slice(0, maxLength)
        )
        
        if (iteration >= targetLength) {
          clearInterval(intervalRef.current!)
          setDisplayText(targetText)
        }
        
        iteration += 1/3
      }, 30)
      
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    } else if (!active && !isHovered) {
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
        
        iteration += 1/3
      }, 30)
      
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    } else if (active) {
      setDisplayText(text)
    }
  }, [isHovered, text, revealText, active, chars])
  
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