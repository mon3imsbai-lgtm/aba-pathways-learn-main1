import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { getProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Product = Database["public"]["Tables"]["products"]["Row"]
type ProductInput = Database["public"]["Tables"]["products"]["Insert"]

const emptyProduct: ProductInput = {
  title: "",
  description: "",
  price: 0,
  is_active: true,
}

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
})

function AdminProducts() {
  const queryClient = useQueryClient()
  const { data: products } = useSuspenseQuery({
    queryKey: ["admin", "products"],
    queryFn: getProducts,
  })
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductInput>(emptyProduct)

  const createMutation = useMutation({
    mutationFn: adminCreateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] })
      toast.success("تمت إضافة المنتج بنجاح")
      setForm(emptyProduct)
    },
    onError: () => toast.error("حدث خطأ في إضافة المنتج"),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductInput }) =>
      adminUpdateProduct(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] })
      toast.success("تم تحديث المنتج بنجاح")
      setEditing(null)
      setForm(emptyProduct)
    },
    onError: () => toast.error("حدث خطأ في تحديث المنتج"),
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] })
      toast.success("تم حذف المنتج بنجاح")
    },
    onError: () => toast.error("حدث خطأ في حذف المنتج"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, input: form })
    } else {
      createMutation.mutate(form)
    }
  }

  const startEdit = (product: Product) => {
    setEditing(product)
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image_url: product.image_url || "",
      file_url: product.file_url || "",
      is_active: product.is_active,
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة المنتجات</h1>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {editing ? "تعديل المنتج" : "إضافة منتج جديد"}
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
              type="number"
              placeholder="السعر (MAD)"
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
            <input
              type="text"
              placeholder="رابط الصورة"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="rounded-lg border border-border bg-background px-4 py-2"
            />
            <input
              type="text"
              placeholder="رابط ملف التحميل"
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
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
                  setForm(emptyProduct)
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
                <th className="px-4 py-3 text-right">السعر</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3">{product.price} MAD</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {product.is_active ? "نشط" : "مخفي"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(product.id)}
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
