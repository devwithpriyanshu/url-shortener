import { useState, createContext, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
interface AuthProviderProps {
  children: ReactNode
}

const backendUrl: string = import.meta.env.VITE_BACKEND_URL
export const AuthenticationContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  ;(async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok) {
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    } catch (error) {
      alert('Error Authenticating')
    }
  })()

  return (
    <AuthenticationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
