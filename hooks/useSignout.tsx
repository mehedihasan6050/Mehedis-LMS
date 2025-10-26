"use client"

import { authClient } from "@/lib/auth-cllient"
import { useRouter } from "next/navigation"

export function useSignout() {
  const router = useRouter()

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        }
      }
    })
  }

  return signOut
}