import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Eye, Check, X } from "lucide-react"
import { getContactMessages, adminUpdateContactMessageStatus } from "@/lib/db/queries"
import type { Database } from "@/integrations/supabase/types"
import { AdminLayout } from "@/components/admin/admin-layout"
import { toast } from "sonner"

type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"]

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
})

function AdminMessages() {
  const queryClient = useQueryClient()
  const { data: messages } = useSuspenseQuery({
    queryKey: ["admin", "messages"],
    queryFn: getContactMessages,
  })
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ContactMessage["status"] }) =>
      adminUpdateContactMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] })
      toast.success("تم تحديث حالة الرسالة")
    },
    onError: () => toast.error("حدث خطأ في تحديث الحالة"),
  })

  const getStatusColor = (status: ContactMessage["status"]) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "read": return "bg-yellow-100 text-yellow-800"
      case "responded": return "bg-green-100 text-green-800"
    }
  }

  const getStatusText = (status: ContactMessage["status"]) => {
    switch (status) {
      case "new": return "جديد"
      case "read": return "مقروء"
      case "responded": return "تم الرد"
    }
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">رسائل الاتصال</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Messages list */}
          <div className="lg:col-span-1 overflow-x-auto rounded-xl border border-border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-right">الاسم</th>
                  <th className="px-4 py-3 text-right">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`cursor-pointer border-t border-border transition-colors hover:bg-muted ${
                      selectedMessage?.id === message.id ? "bg-muted" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{message.full_name}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedMessage.full_name}</h2>
                  <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(selectedMessage.status)}`}>
                    {getStatusText(selectedMessage.status)}
                  </span>
                </div>
                <div className="mb-4 grid gap-2 text-sm">
                  <p><span className="font-medium">البريد:</span> {selectedMessage.email}</p>
                  <p><span className="font-medium">نوع الطلب:</span> {selectedMessage.request_type}</p>
                  <p><span className="font-medium">التاريخ:</span> {new Date(selectedMessage.created_at).toLocaleString("ar-MA")}</p>
                </div>
                <div className="mb-4 rounded-lg bg-muted p-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="flex gap-2">
                  {selectedMessage.status !== "read" && (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: selectedMessage.id, status: "read" })}
                      className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                    >
                      <Eye className="h-4 w-4" />
                      تحديد كمقروء
                    </button>
                  )}
                  {selectedMessage.status !== "responded" && (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: selectedMessage.id, status: "responded" })}
                      className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                      <Check className="h-4 w-4" />
                      تحديد كتم الرد
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-border">
                <p className="text-muted-foreground">اختر رسالة لعرض تفاصيلها</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
