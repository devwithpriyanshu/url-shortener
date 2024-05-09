import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../context/AuthContext.tsx'

const backendUrl: string = import.meta.env.VITE_BACKEND_URL

const Logout: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthenticationContext)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.status === 401) return '<h1>User not logged in ! </h1>'
      if (response.ok) {
        setIsLoggedIn(false)
        navigate('/login')
      }
    } catch (error) {
      alert('Server error, please try again later!')
    }
  }

  return (
    <>
      <button className="w-full text-right" onClick={handleSubmit}>
        Logout
      </button>
    </>
  )
}

export default Logout
