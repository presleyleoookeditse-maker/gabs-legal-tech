'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import { exportInvoicesCSV, downloadCSV } from '@/lib/csv-export'

export default function InvoicesPage() {
  const { invoices } = useAppStore()

  const handleExportCSV = () => {
    const csv = exportInvoicesCSV(invoices)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Invoices_${today}.csv`, csv)
  }

  const totalUnpaid = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <AppLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-card p-6">
        <p className="text-sm text-muted-foreground">Total Unpaid</p>
        <p className="mt-1 text-3xl font-bold text-foreground">
          P{totalUnpaid.toLocaleString('en-BW', { minimumFractionDigits: 2 })}
        </p>
      </Card>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <Card key={invoice.id} className="bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {invoice.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.dateCreated).toLocaleDateString('en-BW')}
                  </p>
                  {invoice.daysOverdue && (
                    <p className="mt-1 text-xs text-red-500">
                      Overdue {invoice.daysOverdue} days
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">
                    P{invoice.amount.toLocaleString('en-BW', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <Badge
                    variant={
                      invoice.status === 'paid'
                        ? 'default'
                        : invoice.status === 'overdue'
                          ? 'destructive'
                          : 'secondary'
                    }
                    className="mt-2"
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-card p-6 text-center">
            <p className="text-muted-foreground">No invoices yet</p>
          </Card>
        )}
      </div>
      </div>
    </AppLayout>
  )
}
