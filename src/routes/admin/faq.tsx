import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getFaqItems, adminCreateFaqItem, adminUpdateFaqItem, adminDeleteFaqItem } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type FaqItem = Database["public"]["Tables"]["faq_items"]["Row"]
type FaqItemInput = Database["public"]["Tables"]["faq_items"]["Insert"]

const emptyFaq: FaqItemInput = {
  question: "",
  answer: "",
  order_index: 0,
  is_active: true,
}

export const Route = createFileRoute("/admin/faq")({
  component: AdminFaq,
})

function AdminFaq() {
  const queryClient = useQueryClient()
  const { data: faqs } = useSuspenseQuery({
    queryKey: ["admin", "faq"],
    queryFn: getFaqItems,
  })
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [form, setForm] = useState<FaqItemInput>(emptyFaq)

  const createMutation = useMutation({
    mutationFn: adminCreateFaqItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faq"] })
      toast.success("تمت إضافة السؤال بنجاح")
      setForm(emptyFaq)
    },
    onError: () => toast.error("حدث خطأ في إضافة السؤال"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: FaqItemInput }) =>
      adminUpdateFaqItem(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faq"] })
      toast.success("تم تحديث السؤال بنجاح")
      setEditing(null)
      setForm(emptyFaq)
    },
    onError: () => toast.error("حدث خطأ في تحديث السؤال"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteFaqItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "faq"] })
      toast.success("تم حذف السؤال بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف السؤال"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (faq: FaqItem) => {
    setEditing(faq)
    setForm({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index,
      is_active: faq.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة الأسئلة الشائعة</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل السؤال" : "إضافة سؤال جديد"}
          </h2>
          <input
            type="text"
            placeholder="السؤال"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <textarea
            placeholder="الإجابة"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className="mb-4 h-24 w-full rounded-lg border border-border bg-background px-4 py-2"
            required
          />
          <input
            type="number"
            placeholder="الترتيب"
            value={form.order_index}
            onChange={(e) => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })}
            className="mb-4 rounded-lg border border-border bg-background px-4 py-2"
          />
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
                  setForm(emptyFaq)
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
                <th className="px-4 py-3 text-right">السؤال</th>
                <th className="px-4 py-3 text-right">الترتيب</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-t border-border">
                  <td className="px-4 py-3">{faq.question}</td>
                  <td className="px-4 py-3">{faq.order_index}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      faq.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {faq.is_active ? "نشط" : "مخفي"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(faq)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(faq.id)}
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
