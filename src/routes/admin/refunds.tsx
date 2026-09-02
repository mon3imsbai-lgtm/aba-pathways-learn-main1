import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Check, X } from "lucide-react"
import { getRefundRequests, adminUpdateRefundRequestStatus } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type RefundRequest = Database["public"]["Tables"]["refund_requests"]["Row"]

export const Route = createFileRoute("/admin/refunds")({
  component: AdminRefunds,
})

function AdminRefunds() {
  const queryClient = useQueryClient()
  const { data: refunds } = useSuspenseQuery({
    queryKey: ["admin", "refunds"],
    queryFn: getRefundRequests,
  })
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null)

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: RefundRequest["status"] }) =>
      adminUpdateRefundRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "refunds"] })
      toast.success("تم تحديث حالة الطلب")
    },
    onError: () => toast.error("حدث خطأ في تحديث الحالة"),
  })

  const getStatusColor = (status: RefundRequest["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "approved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
    }
  }

  const getStatusText = (status: RefundRequest["status"]) => {
    switch (status) {
      case "pending": return "قيد المراجعة"
      case "approved": return "موافق عليه"
      case "rejected": return "مرفوض"
    }
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">طلبات الاسترداد</h1>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">الاسم</th>
                <th className="px-4 py-3 text-right">البريد</th>
                <th className="px-4 py-3 text-right">البنك</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr
                  key={refund.id}
                  onClick={() => setSelectedRefund(refund)}
                  className={`cursor-pointer border-t border-border transition-colors hover:bg-muted ${
                    selectedRefund?.id === refund.id ? "bg-muted" : ""
                  }`}
                >
                  <td className="px-4 py-3">{refund.full_name}</td>
                  <td className="px-4 py-3">{refund.email}</td>
                  <td className="px-4 py-3">{refund.bank_name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(refund.status)}`}>
                      {getStatusText(refund.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {refund.status === "pending" && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateStatusMutation.mutate({ id: refund.id, status: "approved" })
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateStatusMutation.mutate({ id: refund.id, status: "rejected" })
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRefund && (
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold">تفاصيل الطلب</h3>
            <div className="grid gap-2 text-sm">
              <p><span className="font-medium">الاسم:</span> {selectedRefund.full_name}</p>
              <p><span className="font-medium">البريد:</span> {selectedRefund.email}</p>
              <p><span className="font-medium">رقم التسجيل:</span> {selectedRefund.registration_number}</p>
              <p><span className="font-medium">RIB:</span> {selectedRefund.bank_rib}</p>
              <p><span className="font-medium">صاحب الحساب:</span> {selectedRefund.account_holder}</p>
              <p><span className="font-medium">البنك:</span> {selectedRefund.bank_name}</p>
              <p><span className="font-medium">السبب:</span> {selectedRefund.reason || "لا يوجد"}</p>
              <p><span className="font-medium">التاريخ:</span> {new Date(selectedRefund.created_at).toLocaleString("ar-MA")}</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
