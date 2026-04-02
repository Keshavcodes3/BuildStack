import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAuth from '../Features/Auth/Hooks/useAuth'
import { setLoading } from '../Features/Auth/Slices/auth.slice'

const RootLayout = ({ children }) => {
  const dispatch = useDispatch()
  const { handleGetProfile } = useAuth()
  const { loading } = useSelector((state) => state.auth)
  const initRef = useRef(false)

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initRef.current) return
    initRef.current = true

    const token = localStorage.getItem("token")
    
    if (token) {
      const initializeAuth = async () => {
        try {
          dispatch(setLoading(true))
          await handleGetProfile()
        } catch (error) {
          console.error('Auth initialization failed:', error)
          localStorage.removeItem("token")
        } finally {
          dispatch(setLoading(false))
        }
      }

      initializeAuth()
    } else {
      dispatch(setLoading(false))
    }
  }, []) // Empty dependency array - run only once on mount

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return children
}

export default RootLayout
