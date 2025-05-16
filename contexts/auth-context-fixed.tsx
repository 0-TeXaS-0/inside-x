"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Define the user type
export type User = {
  id: string
  username: string
  displayName: string
  email: string
  avatar: string | null
  isPremium: boolean
  isAnonymous: boolean
  hasCompletedOnboarding: boolean
}

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  signup: (userData: {
    username: string;
    email: string;
    password: string;
    displayName: string;
  }) => Promise<void>;
  logout: () => void;
  toggleAnonymousMode: () => void;
  updateOnboardingStatus: (completed: boolean) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      try {
        // Check for stored authentication in localStorage
        const storedUser = localStorage.getItem("insidex_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication check failed", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any credentials and create a mock user
      const newUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        username: usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail,
        displayName: usernameOrEmail.includes("@") ? usernameOrEmail.split("@")[0] : usernameOrEmail,
        email: usernameOrEmail.includes("@") ? usernameOrEmail : `${usernameOrEmail}@example.com`,
        avatar: null,
        isPremium: Math.random() > 0.5, // Random premium status for demo
        isAnonymous: false,
        hasCompletedOnboarding: false
      }
      
      setUser(newUser)
      localStorage.setItem("insidex_user", JSON.stringify(newUser))
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Signup function
  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
    displayName: string;
  }) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create a new user
      const newUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        username: userData.username,
        displayName: userData.displayName || userData.username,
        email: userData.email,
        avatar: null,
        isPremium: false,
        isAnonymous: false,
        hasCompletedOnboarding: false
      }
      
      setUser(newUser)
      localStorage.setItem("insidex_user", JSON.stringify(newUser))
    } catch (err) {
      setError("Signup failed. Please try again.")
      console.error("Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("insidex_user")
  }

  // Toggle anonymous mode
  const toggleAnonymousMode = () => {
    if (!user) return
    
    const updatedUser = {
      ...user,
      isAnonymous: !user.isAnonymous
    }
    
    setUser(updatedUser)
    localStorage.setItem("insidex_user", JSON.stringify(updatedUser))
  }

  // Update onboarding status
  const updateOnboardingStatus = (completed: boolean) => {
    if (!user) return
    
    const updatedUser = {
      ...user,
      hasCompletedOnboarding: completed
    }
    
    setUser(updatedUser)
    localStorage.setItem("insidex_user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signup,
        logout,
        toggleAnonymousMode,
        updateOnboardingStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
