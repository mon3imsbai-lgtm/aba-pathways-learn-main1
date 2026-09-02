import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { BookOpen, Package, FileText, Users, MessageSquare } from "lucide-react"
import { getCourses, getProducts, getBlogPosts, getTestimonials, getContactMessages, getOrders, getRefundRequests } from "@/lib/db/queries"
import { AdminLayout } from "@/components/admin/admin-layout"

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: courses } = useSuspenseQuery({
    queryKey: ["admin", "courses"],
    queryFn: getCourses,
  })
  const { data: products } = useSuspenseQuery({
    queryKey: ["admin", "products"],
    queryFn: getProducts,
  })
  const { data: posts } = useSuspenseQuery({
    queryKey: ["admin", "blog"],
    queryFn: getBlogPosts,
  })
  const { data: testimonials } = useSuspenseQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: getTestimonials,
  })
  const { data: messages } = useSuspenseQuery({
    queryKey: ["admin", "messages"],
    queryFn: getContactMessages,
  })
  const { data: orders } = useSuspenseQuery({
    queryKey: ["admin", "orders"],
    queryFn: getOrders,
  })
  const { data: refunds } = useSuspenseQuery({
    queryKey: ["admin", "refunds"],
    queryFn: getRefundRequests,
  })

  const stats = [
    { label: "الدورات", value: courses.length, icon: BookOpen, to: "/admin/courses" },
    { label: "المنتجات", value: products.length, icon: Package, to: "/admin/products" },
    { label: "المقالات", value: posts.length, icon: FileText, to: "/admin/blog" },
    { label: "آراء العملاء", value: testimonials.length, icon: Users, to: "/admin/testimonials" },
    { label: "الرسائل", value: messages.length, icon: MessageSquare, to: "/admin/messages" },
    { label: "الطلبات", value: orders.length, icon: Package, to: "/admin/orders" },
    { label: "طلبات الاسترداد", value: refunds.length, icon: FileText, to: "/admin/refunds" },
  ]

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">لوحة التحكم</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.to}
              className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
