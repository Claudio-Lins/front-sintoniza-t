import React, { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ToastContext = createContext({})

export function ToastProvider({ children }) {
  function toastSucess (msg) {
    toast(msg, {
      style: {
        background: '#05a513',
        width: '30rem',
        color: '#fff',
        fontSize: '1.2rem',
      },
      position: 'center',
      autoClose: 1000,
    })
  }
  function toastFail(msg) {
    toast(msg, {
      style: {
        background: '#f00',
        color: '#fff',
        fontSize: '1.2rem',
      },
      position: 'center',
      autoClose: 1000,
    })
  }

  return (
    <ToastContext.Provider value={{ toastSucess, toastFail }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
