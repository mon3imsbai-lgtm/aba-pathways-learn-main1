import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getCourses, adminCreateCourse, adminUpdateCourse, adminDeleteCourse } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Course = Database["public"]["Tables"]["courses"]["Row"]
type CourseInput = Database["public"]["Tables"]["courses"]["Insert"]

const emptyCourse: CourseInput = {
  title: "",
  slug: "",
  description: "",
  full_description: "",
  hours: "",
  price: 0,
  status: "upcoming",
  featured: false,
  image_url: "",
  is_active: true,
}

export const Route = createFileRoute("/admin/courses")({
  component: AdminCourses,
})

function AdminCourses() {
  const queryClient = useQueryClient()
  const { data: courses } = useSuspenseQuery({
    queryKey: ["admin", "courses"],
    queryFn: getCourses,
  })
  const [editing, setEditing] = useState<Course | null>(null)
  const [form, setForm] = useState<CourseInput>(emptyCourse)

  const createMutation = useMutation({
    mutationFn: adminCreateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] })
      toast.success("تمت إضافة الدورة بنجاح")
      setForm(emptyCourse)
    },
    onError: () => toast.error("حدث خطأ في إضافة الدورة"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: CourseInput }) =>
      adminUpdateCourse(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] })
      toast.success("تم تحديث الدورة بنجاح")
      setEditing(null)
      setForm(emptyCourse)
    },
    onError: () => toast.error("حدث خطأ في تحديث الدورة"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] })
      toast.success("تم حذف الدورة بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف الدورة"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (course: Course) => {
    setEditing(course)
    setForm({
      title: course.title,
      slug: course.slug,
      description: course.description,
      full_description: course.full_description || "",
      hours: course.hours || "",
      price: course.price || 0,
      status: course.status,
      featured: course.featured,
      image_url: course.image_url || "",
      is_active: course.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة الدورات</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل الدورة" : "إضافة دورة جديدة"}
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
              placeholder="الرابط (slug)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
              required
            />
            <input
              type="text"
              placeholder="عدد الساعات"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
            <input
              type="number"
              placeholder="السعر"
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Course["status"] })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            >
              <option value="upcoming">قريباً</option>
              <option value="open">مفتوح</option>
              <option value="closed">مغلق</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              مميز
            </label>
          </div>
          <textarea
            placeholder="الوصف المختصر"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <textarea
            placeholder="الوصف الكامل"
            value={form.full_description}
            onChange={(e) => setForm({ ...form, full_description: e.target.value })}
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-2"
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
                  setForm(emptyCourse)
                }}
                className="rounded-lg border border-border px-6 py-2"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">العنوان</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">السعر</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-t border-border">
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      course.status === "open" ? "bg-green-100 text-green-800" :
                      course.status === "upcoming" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {course.status === "open" ? "مفتوح" : course.status === "upcoming" ? "قريباً" : "مغلق"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{course.price} MAD</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(course)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(course.id)}
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
