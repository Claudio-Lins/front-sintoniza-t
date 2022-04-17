import React, { createContext, useContext, useEffect, useState } from 'react'

const WindowSizeContext = createContext({})

export function WindowSizeProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState('')
  const [windowHeight, setWindowHeight] = useState('')

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
