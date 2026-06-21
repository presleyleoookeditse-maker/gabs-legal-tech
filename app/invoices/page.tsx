'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Download, Plus, X } from 'lucide-react'
import { useState } from 'react'

const initialInvoices = [
  { id: '1', amount: 1500, description: 'Consultation Fee', status: 'Paid' },
  { id: '2', amount: 2000, description: 'Filing Fees', status: 'Unpaid' },
  { id: '3', amount: 3000, description: 'Court Fees', status: 'Overdue' },
]

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    clientName: '',
    status: 'Unpaid',
  })

  const totalUnpaid = invoices.filter((i) => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0)

  const handleSubmit = () => {
    if (formData.description && formData.amount && formData.clientName) {
      const newInvoice = {
        id: String(invoices.length + 1),
        amount: parseFloat(formData.amount),
        description: formData.description,
        status: formData.status,
      }
      setInvoices([...invoices, newInvoice])
      console.log('New invoice:', newInvoice)
      alert(`Invoice for ${formData.clientName} created successfully!`)
      setFormData({ description: '', amount: '', clientName: '', status: 'Unpaid' })
      setShowModal(false)
    } else {
      alert('Please fill in all required fields')
    }
  }

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
          <div className="flex gap-2">
            <Button onClick={downloadCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button onClick={() => setShowModal(true)} className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* New Invoice Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Create New Invoice</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description *</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="e.g., Consultation Fee, Filing Fees"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Amount (P) *</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#00FF88] text-black hover:bg-[#00DD77]">
                    Create Invoice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
