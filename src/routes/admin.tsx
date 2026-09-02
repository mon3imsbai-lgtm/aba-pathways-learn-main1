import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { getCurrentUser, isAdmin } from "@/lib/auth"

export const Route = createFileRoute("/admin")({
  component: AdminComponent,
})

function AdminComponent() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function check() {
      const user = await getCurrentUser()
      if (!user || !(await isAdmin(user.id))) {
        navigate({ to: "/auth" })
      } else {
        setChecking(false)
      }
    }
    void check()
  }, [navigate])

  if (checking) return <div>Loading...</div>
  return <div>Loading...</div>
}
