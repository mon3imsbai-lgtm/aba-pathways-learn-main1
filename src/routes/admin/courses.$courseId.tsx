import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateCourse } from "@/lib/db/queries";
import type { TablesUpdate } from "@/integrations/supabase/types";
import { AdminLayout } from "@/components/admin/admin-layout";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/courses/$courseId")({
  beforeLoad: async ({ params }) => {
    const { getCourseBySlug } = await import("@/lib/db/queries");
    const course = await getCourseBySlug(params.courseId);
    if (!course) throw redirect({ to: "/admin/courses" });
    return { course };
  },
  component: AdminCourseEditPage,
});

function AdminCourseEditPage() {
  const { course } = Route.useRouteContext();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Partial<TablesUpdate<"courses">>>(course);

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: TablesUpdate<"courses"> }) =>
      adminUpdateCourse(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      toast.success("تم تحديث الدورة بنجاح");
    },
    onError: () => toast.error("حدث خطأ في تحديث الدورة"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: course.id, updates: form as TablesUpdate<"courses"> });
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <a href="/admin/courses" className="text-sm text-muted-foreground hover:text-foreground">
            ← العودة للدورات
          </a>
          <h1 className="text-3xl font-extrabold">تعديل الدورة</h1>
        </div>

        <div className="max-w-2xl rounded-xl border border-border bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">الوصف الكامل</label>
              <textarea
                value={form.full_description ?? ""}
                onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">السعر (MAD)</label>
                <input
                  type="number"
                  value={form.price ?? ""}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">الحالة</label>
                <select
                  value={form.status ?? "upcoming"}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
                >
                  <option value="upcoming">قريباً</option>
                  <option value="open">مفتوح</option>
                  <option value="closed">مغلق</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured ?? false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm font-semibold">مسار رئيسي</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="active"
                type="checkbox"
                checked={form.is_active ?? true}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="active" className="text-sm font-semibold">نشط</label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {updateMutation.isPending ? "جاري التحديث..." : "تحديث الدورة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
