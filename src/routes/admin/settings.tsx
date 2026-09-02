import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { getSiteSettings, adminUpdateSiteSetting } from "@/lib/db/queries"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
})

type Settings = Record<string, string>

function AdminSettings() {
  const queryClient = useQueryClient()
  const { data: settings } = useSuspenseQuery({
    queryKey: ["admin", "settings"],
    queryFn: getSiteSettings,
  })
  const [form, setForm] = useState<Settings>({})

  useEffect(() => {
    if (settings) {
      setForm(settings)
    }
  }, [settings])

  const updateMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      adminUpdateSiteSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] })
      toast.success("تم تحديث الإعدادات بنجاح")
    },
    onError: () => toast.error("حدث خطأ في تحديث الإعدادات"),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    Object.entries(form).forEach(([key, value]) => {
      updateMutation.mutate({ key, value })
    })
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إعدادات الموقع</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-border bg-card p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">اسم الموقع</label>
              <input
                type="text"
                value={form.site_name || ""}
                onChange={(e) => setForm({ ...form, site_name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">وصف الموقع</label>
              <textarea
                value={form.site_description || ""}
                onChange={(e) => setForm({ ...form, site_description: e.target.value })}
                className="h-24 w-full rounded-lg border border-border bg-background px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.contact_email || ""}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">رقم الهاتف</label>
              <input
                type="text"
                value={form.contact_phone || ""}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">العنوان</label>
              <input
                type="text"
                value={form.contact_address || ""}
                onChange={(e) => setForm({ ...form, contact_address: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90"
          >
            حفظ الإعدادات
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
