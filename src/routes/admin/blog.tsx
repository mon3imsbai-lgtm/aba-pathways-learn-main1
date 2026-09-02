import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getBlogPosts, adminCreateBlogPost, adminUpdateBlogPost, adminDeleteBlogPost } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
type BlogPostInput = Database["public"]["Tables"]["blog_posts"]["Insert"]

const emptyPost: BlogPostInput = {
  title: "",
  excerpt: "",
  content: "",
  status: "draft",
}

export const Route = createFileRoute("/admin/blog")({
  component: AdminBlog,
})

function AdminBlog() {
  const queryClient = useQueryClient()
  const { data: posts } = useSuspenseQuery({
    queryKey: ["admin", "blog"],
    queryFn: getBlogPosts,
  })
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [form, setForm] = useState<BlogPostInput>(emptyPost)

  const createMutation = useMutation({
    mutationFn: adminCreateBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] })
      toast.success("تمت إضافة المقال بنجاح")
      setForm(emptyPost)
    },
    onError: () => toast.error("حدث خطأ في إضافة المقال"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: BlogPostInput }) =>
      adminUpdateBlogPost(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] })
      toast.success("تم تحديث المقال بنجاح")
      setEditing(null)
      setForm(emptyPost)
    },
    onError: () => toast.error("حدث خطأ في تحديث المقال"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] })
      toast.success("تم حذف المقال بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف المقال"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (post: BlogPost) => {
    setEditing(post)
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url || "",
      status: post.status,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة المقالات</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل المقال" : "إضافة مقال جديد"}
          </h2>
          <input
            type="text"
            placeholder="العنوان"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="المقتطف"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <textarea
            placeholder="المحتوى"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="mb-4 h-32 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <input
            type="text"
            placeholder="رابط الصورة"
            value={form.cover_image_url}
            onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
            className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-2"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as BlogPost["status"] })}
            className="mb-4 rounded-lg border border-border bg-background px-4 py-2"
          >
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
          <div className="flex gap-2">
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
                  setForm(emptyPost)
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
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-border">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      post.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.status === "published" ? "منشور" : "مسودة"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(post)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(post.id)}
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
