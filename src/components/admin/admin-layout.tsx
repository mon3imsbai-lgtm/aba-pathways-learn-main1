import { Outlet, Link, useLocation } from "@tanstack/react-router"
import { useState } from "react"
import { LayoutDashboard, BookOpen, ShoppingBag, MessageSquare, Users, FileText, Settings, Package, HelpCircle, Sparkles, LogOut } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "لوحة التحكم", end: true },
  { to: "/admin/courses", icon: BookOpen, label: "الدورات" },
  { to: "/admin/products", icon: Package, label: "المنتجات" },
  { to: "/admin/services", icon: MessageSquare, label: "الخدمات" },
  { to: "/admin/blog", icon: FileText, label: "المقالات" },
  { to: "/admin/testimonials", icon: Users, label: "آراء العملاء" },
  { to: "/admin/faq", icon: HelpCircle, label: "الأسئلة الشائعة" },
  { to: "/admin/features", icon: Sparkles, label: "الميزات" },
  { to: "/admin/messages", icon: MessageSquare, label: "الرسائل" },
  { to: "/admin/refunds", icon: FileText, label: "طلبات الاسترداد" },
  { to: "/admin/orders", icon: ShoppingBag, label: "الطلبات" },
  { to: "/admin/settings", icon: Settings, label: "الإعدادات" },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("حدث خطأ في تسجيل الخروج")
    } else {
      toast.success("تم تسجيل الخروج بنجاح")
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-64 border-l border-border bg-surface transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link to="/admin" className="text-lg font-bold text-primary">
              AbaTools Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {navItems.map((item) => {
              const isActive = item.end
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-border p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <span className="text-xl">☰</span>
          </button>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              عرض الموقع
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
