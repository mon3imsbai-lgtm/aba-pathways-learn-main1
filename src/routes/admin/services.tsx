import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getServices, adminCreateService, adminUpdateService, adminDeleteService } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Service = Database["public"]["Tables"]["services"]["Row"]
type ServiceInput = Database["public"]["Tables"]["services"]["Insert"]

const emptyService: ServiceInput = {
  title: "",
  description: "",
  icon: "",
  is_active: true,
}

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
})

function AdminServices() {
  const queryClient = useQueryClient()
  const { data: services } = useSuspenseQuery({
    queryKey: ["admin", "services"],
    queryFn: getServices,
  })
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState<ServiceInput>(emptyService)

  const createMutation = useMutation({
    mutationFn: adminCreateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] })
      toast.success("تمت إضافة الخدمة بنجاح")
      setForm(emptyService)
    },
    onError: () => toast.error("حدث خطأ في إضافة الخدمة"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: ServiceInput }) =>
      adminUpdateService(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] })
      toast.success("تم تحديث الخدمة بنجاح")
      setEditing(null)
      setForm(emptyService)
    },
    onError: () => toast.error("حدث خطأ في تحديث الخدمة"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] })
      toast.success("تم حذف الخدمة بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف الخدمة"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (service: Service) => {
    setEditing(service)
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      is_active: service.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة الخدمات</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="العنوان"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
              required
            />
            <input
              type="text"
              placeholder="اسم الأيقونة"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
          </div>
          <textarea
            placeholder="الوصف"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90"
            >
              {editing ? "تحديث" : "إضافة"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null)
                  setForm(emptyService)
                }}
                className="rounded-lg border border-border px-6 py-2"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">العنوان</th>
                <th className="px-4 py-3 text-right">الأيقونة</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t border-border">
                  <td className="px-4 py-3">{service.title}</td>
                  <td className="px-4 py-3">{service.icon}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {service.is_active ? "نشط" : "مخفي"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(service)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
