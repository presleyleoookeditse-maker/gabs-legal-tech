'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [firmName, setFirmName] = useState('Gabs Legal Tech')

  const downloadCasesCSV = () => {
    const csv = 'Case #,Client,Type,Status,Next Hearing\nGLT-001,Mr Dube Thabo,Land Dispute,Active,2026-05-20'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Cases_2026-05-16.csv'
    a.click()
  }

  const downloadInvoicesCSV = () => {
    const csv = 'Description,Amount,Status\nConsultation Fee,P1500.00,Paid\nFiling Fees,P2000.00,Unpaid'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Invoices_2026-05-16.csv'
    a.click()
  }

  const downloadAppointmentsCSV = () => {
    const csv = 'Date,Time,Client,Type,Status\n18 May 2026,10:00am,Mrs Kago,Land Dispute,Confirmed'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Appointments_2026-05-16.csv'
    a.click()
  }

  return (
    <AppLayout>
      <div className="space-y-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Settings</h1>

        {/* Firm Settings */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] space-y-4">
          <h2 className="text-xl font-bold text-white">Firm Information</h2>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Firm Name</label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Firm Logo</label>
            <div className="border-2 border-dashed border-[#222] rounded px-4 py-8 text-center">
              <p className="text-gray-400">Drag and drop your logo here or click to upload</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Currency</label>
            <input
              type="text"
              value="BWP Pula"
              disabled
              className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-gray-500 cursor-not-allowed"
            />
            <p className="text-gray-500 text-xs mt-1">Currency is locked to BWP Pula</p>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] space-y-4">
          <h2 className="text-xl font-bold text-white">Export Options</h2>
          
          <div className="space-y-3">
            <Button onClick={downloadCasesCSV} variant="outline" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Export Cases to CSV
            </Button>
            <Button onClick={downloadInvoicesCSV} variant="outline" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Export Invoices to CSV
            </Button>
            <Button onClick={downloadAppointmentsCSV} variant="outline" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Export Appointments to CSV
            </Button>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] rounded p-4 text-sm text-gray-400">
            <p>For client confidentiality, all data stays in this app. Click button to download CSV, then upload to your own Google Sheets/Excel. Your client data never leaves your control.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
