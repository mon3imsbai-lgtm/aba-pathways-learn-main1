import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Eye } from "lucide-react"
import { getOrders, getOrderItems, adminUpdateOrderStatus } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type Order = Database["public"]["Tables"]["orders"]["Row"]
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"]

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
})

function AdminOrders() {
  const queryClient = useQueryClient()
  const { data: orders } = useSuspenseQuery({
    queryKey: ["admin", "orders"],
    queryFn: getOrders,
  })
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Order["status"] }) =>
      adminUpdateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] })
      toast.success("تم تحديث حالة الطلب")
    },
    onError: () => toast.error("حدث خطأ في تحديث الحالة"),
  })

  const handleSelectOrder = async (order: Order) => {
    setSelectedOrder(order)
    const items = await getOrderItems(order.id)
    setOrderItems(items)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "paid": return "bg-blue-100 text-blue-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "قيد الانتظار"
      case "paid": return "مدفوع"
      case "completed": return "مكتمل"
      case "cancelled": return "ملغي"
    }
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">إدارة الطلبات</h1>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">رقم الطلب</th>
                <th className="px-4 py-3 text-right">المبلغ</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-right">التاريخ</th>
                <th className="px-4 py-3 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleSelectOrder(order)}
                  className={`cursor-pointer border-t border-border transition-colors hover:bg-muted ${
                    selectedOrder?.id === order.id ? "bg-muted" : ""
                  }`}
                >
                  <td className="px-4 py-3">#{order.id}</td>
                  <td className="px-4 py-3">{order.total_amount} MAD</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.created_at).toLocaleDateString("ar-MA")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectOrder(order)
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">طلب #{selectedOrder.id}</h3>
              <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(selectedOrder.status)}`}>
                {getStatusText(selectedOrder.status)}
              </span>
            </div>
            <div className="mb-4 grid gap-2 text-sm">
              <p><span className="font-medium">المبلغ الإجمالي:</span> {selectedOrder.total_amount} MAD</p>
              <p><span className="font-medium">التاريخ:</span> {new Date(selectedOrder.created_at).toLocaleString("ar-MA")}</p>
            </div>

            <h4 className="mb-2 font-semibold">عناصر الطلب</h4>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-right">المنتج</th>
                    <th className="px-4 py-2 text-right">الكمية</th>
                    <th className="px-4 py-2 text-right">السعر</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-t border-border">
                      <td className="px-4 py-2">Product #{item.product_id}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.unit_price} MAD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedOrder.status === "pending" && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "paid" })}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  تحديد كمدفوع
                </button>
                <button
                  onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "completed" })}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  تحديد كمكتمل
                </button>
                <button
                  onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "cancelled" })}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
