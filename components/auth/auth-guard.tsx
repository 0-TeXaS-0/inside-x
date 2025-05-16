"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"

// Define public routes that don't require authentication
const publicRoutes = ["/", "/auth", "/legal/privacy", "/legal/terms"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    // Skip redirection if still loading auth state
    if (isLoading) return
    
    // Check if current route is public
    const isPublicRoute = publicRoutes.some(route => 
      pathname === route || pathname?.startsWith(`${route}/`)
    )
    
    // If not authenticated and trying to access protected route
    if (!user && !isPublicRoute) {
      // Store the intended destination to redirect after login
      if (pathname && pathname !== "/auth") {
        sessionStorage.setItem("redirectAfterAuth", pathname)
      }
      router.push("/auth")
      return
    }
    
    // If user is authenticated
    if (user) {
      // Redirect from auth page to onboarding or dashboard
      if (pathname === "/auth") {
        if (!user.hasCompletedOnboarding) {
          router.push("/onboarding")
        } else {
          router.push("/dashboard")
        }
        return
      }
      
      // Redirect from onboarding to dashboard if already completed
      if (pathname?.startsWith("/onboarding") && user.hasCompletedOnboarding) {
        router.push("/dashboard")
        return
      }
      
      // Redirect to onboarding if not completed and accessing protected routes
      if (!user.hasCompletedOnboarding && 
          !pathname?.startsWith("/onboarding") && 
          !isPublicRoute) {
        router.push("/onboarding")
        return
      }
    }
  }, [user, isLoading, pathname, router])

  // Show nothing while loading authentication state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="h-8 w-8 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
      </div>
    )
  }

  // Render children for authenticated routes or public routes
  return <>{children}</>
}
