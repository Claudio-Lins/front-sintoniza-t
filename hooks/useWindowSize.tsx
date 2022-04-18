import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type ContextType = {
  children: ReactNode
  windowWidth?: number
  windowHeight?: number
}


const WindowSizeContext = createContext({})

export function WindowSizeProvider({ children }: ContextType) {

  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }
  }, [])
  // console.log('Hook: ', windowWidth)
  return (
    <WindowSizeContext.Provider value={{ windowWidth, windowHeight }}>
      {children}
    </WindowSizeContext.Provider>
  )
}
export function useWindowSize() {
  const context = useContext(WindowSizeContext)
  return context
}
