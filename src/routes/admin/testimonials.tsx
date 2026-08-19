import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getTestimonials, adminCreateTestimonial, adminUpdateTestimonial, adminDeleteTestimonial } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]
type TestimonialInput = Database["public"]["Tables"]["testimonials"]["Insert"]

const emptyTestimonial: TestimonialInput = {
  name: "",
  role: "",
  quote: "",
  is_active: true,
}

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
})

function AdminTestimonials() {
  const queryClient = useQueryClient()
  const { data: testimonials } = useSuspenseQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: getTestimonials,
  })
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<TestimonialInput>(emptyTestimonial)

  const createMutation = useMutation({
    mutationFn: adminCreateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] })
      toast.success("تمت إضافة الرأي بنجاح")
      setForm(emptyTestimonial)
    },
    onError: () => toast.error("حدث خطأ في إضافة الرأي"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: TestimonialInput }) =>
      adminUpdateTestimonial(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] })
      toast.success("تم تحديث الرأي بنجاح")
      setEditing(null)
      setForm(emptyTestimonial)
    },
    onError: () => toast.error("حدث خطأ في تحديث الرأي"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] })
      toast.success("تم حذف الرأي بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف الرأي"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (testimonial: Testimonial) => {
    setEditing(testimonial)
    setForm({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      avatar_url: testimonial.avatar_url || "",
      is_active: testimonial.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة آراء العملاء</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل الرأي" : "إضافة رأي جديد"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="الاسم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
              required
            />
            <input
              type="text"
              placeholder="المسمى الوظيفي"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
              required
            />
            <input
              type="text"
              placeholder="رابط الصورة الشخصية"
              value={form.avatar_url}
              onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
          </div>
          <textarea
            placeholder="النص"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
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
                  setForm(emptyTestimonial)
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
                <th className="px-4 py-3 text-right">الاسم</th>
                <th className="px-4 py-3 text-right">المسمى</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-t border-border">
                  <td className="px-4 py-3">{testimonial.name}</td>
                  <td className="px-4 py-3">{testimonial.role}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      testimonial.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {testimonial.is_active ? "نشط" : "مخفي"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(testimonial.id)}
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
