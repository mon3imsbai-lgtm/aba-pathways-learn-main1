import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getFeatures, adminCreateFeature, adminUpdateFeature, adminDeleteFeature } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Feature = Database["public"]["Tables"]["features"]["Row"]
type FeatureInput = Database["public"]["Tables"]["features"]["Insert"]

const emptyFeature: FeatureInput = {
  title: "",
  description: "",
  icon: "",
  order_index: 0,
  is_active: true,
}

export const Route = createFileRoute("/admin/features")({
  component: AdminFeatures,
})

function AdminFeatures() {
  const queryClient = useQueryClient()
  const { data: features } = useSuspenseQuery({
    queryKey: ["admin", "features"],
    queryFn: getFeatures,
  })
  const [editing, setEditing] = useState<Feature | null>(null)
  const [form, setForm] = useState<FeatureInput>(emptyFeature)

  const createMutation = useMutation({
    mutationFn: adminCreateFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "features"] })
      toast.success("تمت إضافة الميزة بنجاح")
      setForm(emptyFeature)
    },
    onError: () => toast.error("حدث خطأ في إضافة الميزة"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: FeatureInput }) =>
      adminUpdateFeature(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "features"] })
      toast.success("تم تحديث الميزة بنجاح")
      setEditing(null)
      setForm(emptyFeature)
    },
    onError: () => toast.error("حدث خطأ في تحديث الميزة"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "features"] })
      toast.success("تم حذف الميزة بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف الميزة"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (feature: Feature) => {
    setEditing(feature)
    setForm({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      order_index: feature.order_index,
      is_active: feature.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة الميزات</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل الميزة" : "إضافة ميزة جديدة"}
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
              required
            />
            <input
              type="number"
              placeholder="الترتيب"
              value={form.order_index}
              onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
          </div>
          <textarea
            placeholder="الوصف"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 h-24 w-full rounded-lg border border-border bg-background px-4 py-2"
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
                  setForm(emptyFeature)
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
                <th className="px-4 py-3 text-right">الترتيب</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.id} className="border-t border-border">
                  <td className="px-4 py-3">{feature.title}</td>
                  <td className="px-4 py-3">{feature.icon}</td>
                  <td className="px-4 py-3">{feature.order_index}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      feature.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {feature.is_active ? "نشط" : "مخفي"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(feature)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(feature.id)}
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
