'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BillableTimer } from '@/components/billable-timer'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function TimerPage() {
  const { cases, billableEntries, addBillableEntry, updateInvoice, invoices } = useAppStore()
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')

  const selectedCase = cases.find((c) => c.id === selectedCaseId)
  const caseEntries = selectedCaseId
    ? billableEntries.filter((e) => e.caseId === selectedCaseId)
    : []

  const totalHours = caseEntries.reduce((sum, e) => sum + e.hours, 0)
  const totalAmount = caseEntries.reduce((sum, e) => sum + e.total, 0)

  const handleSaveTimer = (hours: number, description: string, hourlyRate: number) => {
    if (selectedCaseId) {
      addBillableEntry({
        caseId: selectedCaseId,
        description,
        hours,
        hourlyRate,
        total: hours * hourlyRate,
        date: new Date().toISOString().split('T')[0],
      })

      // Auto-create invoice line item
      const invoice = invoices.find((i) => i.description.includes(description))
      if (!invoice) {
        addBillableEntry({
          caseId: selectedCaseId,
          description: `Invoice: ${description}`,
          hours,
          hourlyRate,
          total: hours * hourlyRate,
          date: new Date().toISOString().split('T')[0],
        })
      }
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billable Hours Timer</h1>
          <p className="text-muted-foreground mt-2">
            Track time spent on cases and auto-generate invoices
          </p>
        </div>

        {/* Case Selector */}
        <Card className="bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Case</h2>
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
          >
            <option value="">-- Select Case --</option>
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.caseNumber} - {c.clientName}
              </option>
            ))}
          </select>
        </Card>

        {selectedCaseId && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timer */}
            <div className="lg:col-span-2">
              <BillableTimer caseId={selectedCaseId} onSave={handleSaveTimer} />
            </div>

            {/* Summary */}
            <Card className="bg-card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Summary</h2>

              <div className="space-y-2 p-4 rounded-lg bg-secondary/50">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Hours:</span>
                  <span className="font-bold text-lg text-primary">{totalHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-lg text-primary">P{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Recent Entries</h3>
                {caseEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No entries yet</p>
                ) : (
                  <div className="space-y-2">
                    {caseEntries
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 rounded-lg bg-secondary/50 border border-border"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {entry.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline">
                              {entry.hours.toFixed(2)}h @ P{entry.hourlyRate}
                            </Badge>
                            <span className="font-bold text-primary">
                              P{entry.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
