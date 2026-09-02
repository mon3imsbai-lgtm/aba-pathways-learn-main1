import type { ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Column<T> = {
  header: string;
  accessorKey: string;
  cell?: (row: T) => ReactNode;
};

interface DataTableProps<T> {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  columns: Column<T>[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
  onCreate?: () => void;
  createLabel?: string;
  getRowId: (item: T) => string | number;
}

export function DataTable<T>({
  queryKey,
  queryFn,
  columns,
  onDelete,
  onEdit,
  onCreate,
  createLabel = "إضافة جديد",
  getRowId,
}: DataTableProps<T>) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: T) => {
      if (onDelete) onDelete(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  if (isLoading) return <div className="text-sm text-muted-foreground">جاري التحميل...</div>;
  if (error) return <div className="text-sm text-red-600">حدث خطأ في التحميل</div>;

  return (
    <div className="space-y-4">
      {onCreate && (
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          {createLabel}
        </button>
      )}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {columns.map((col) => (
                  <th key={col.accessorKey} className="p-4 font-bold">
                    {col.header}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="p-4 font-bold text-left">إجراءات</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data?.map((row) => (
                <tr key={getRowId(row)} className="hover:bg-secondary/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.accessorKey} className="p-4">
                      {col.cell
                        ? col.cell(row)
                        : String((row as any)[col.accessorKey] ?? "")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="p-4 text-left">
                      <div className="flex items-center gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            تعديل
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => deleteMutation.mutate(row)}
                            disabled={deleteMutation.isPending}
                            className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
                          >
                            حذف
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {!data?.length && (
                <tr>
                  <td
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                  >
                    لا توجد بيانات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
