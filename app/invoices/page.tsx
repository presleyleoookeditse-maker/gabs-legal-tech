'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import { exportInvoicesCSV, downloadCSV } from '@/lib/csv-export'
import { useState } from 'react'

export default function InvoicesPage() {
  const { invoices, addInvoice } = useAppStore()
  const [showNewForm, setShowNewForm] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    status: 'unpaid',
  })

  const handleExportCSV = () => {
    const csv = exportInvoicesCSV(invoices)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Invoices_${today}.csv`, csv)
  }

  const handleAddInvoice = () => {
    if (formData.description && formData.amount) {
      addInvoice({
        description: formData.description,
        amount: parseFloat(formData.amount),
        status: formData.status as 'paid' | 'unpaid' | 'overdue',
        dateCreated: new Date().toISOString(),
        daysOverdue: formData.status === 'overdue' ? 5 : 0,
      })
      setFormData({ description: '', amount: '', status: 'unpaid' })
      setShowNewForm(false)
    }
  }

  if (showNewForm) {
    return (
      <AppLayout>
        <div className="max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Add New Invoice</h1>
            <Button
              variant="outline"
              onClick={() => setShowNewForm(false)}
            >
              Cancel
            </Button>
          </div>

          <Card className="bg-card p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="e.g., Consultation Fee"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Amount (Pula)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="1500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <Button
                onClick={handleAddInvoice}
                className="w-full"
              >
                Add Invoice
              </Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
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
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowNewForm(true)}
          >
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
