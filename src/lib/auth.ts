import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/integrations/supabase/types"

export type UserRole = Database["public"]["Enums"]["user_role"]

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()
  if (error) return null
  return data
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const profile = await getUserProfile(userId)
  return profile?.role || null
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === "admin"
}

export async function isEditor(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === "admin" || role === "editor"
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  const admin = await isAdmin(user.id)
  if (!admin) throw new Error("Forbidden")
  return user
}

export async function requireEditor() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  const editor = await isEditor(user.id)
  if (!editor) throw new Error("Forbidden")
  return user
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })
  if (error) throw error

  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: data.user.id, full_name: fullName, role: "user" })
    if (profileError) console.error("Error creating profile:", profileError)
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
