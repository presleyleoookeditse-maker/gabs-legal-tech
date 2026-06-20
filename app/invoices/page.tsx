'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const invoices = [
  { id: '1', amount: 1500, description: 'Consultation Fee', status: 'Paid' },
  { id: '2', amount: 2000, description: 'Filing Fees', status: 'Unpaid' },
  { id: '3', amount: 3000, description: 'Court Fees', status: 'Overdue' },
]

export default function InvoicesPage() {
  const totalUnpaid = invoices.filter((i) => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0)

  const downloadCSV = () => {
    const headers = ['Description', 'Amount', 'Status']
    const rows = invoices.map((i) => [i.description, `P${i.amount.toFixed(2)}`, i.status])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Invoices_2026-05-16.csv'
    a.click()
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <Button onClick={downloadCSV} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
          <p className="text-gray-400 text-sm mb-2">Total Unpaid</p>
          <p className="text-3xl font-bold text-white">P{totalUnpaid.toFixed(2)}</p>
        </div>

        <div className="grid gap-3">
          {invoices.map((inv) => (
            <div key={inv.id} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#222] flex justify-between items-center">
              <div>
                <p className="text-white font-bold">{inv.description}</p>
                <p className="text-gray-400 text-sm">P{inv.amount.toFixed(2)}</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' : inv.status === 'Unpaid' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                {inv.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
