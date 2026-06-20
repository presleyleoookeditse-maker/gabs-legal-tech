'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Download } from 'lucide-react'
import {
  exportCasesCSV,
  exportInvoicesCSV,
  exportAppointmentsCSV,
  downloadCSV,
} from '@/lib/csv-export'

export default function SettingsPage() {
  const { updateFirmSettings, firmSettings, cases, invoices, appointments } =
    useAppStore()
  const [firmName, setFirmName] = useState(firmSettings.firmName)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveFirmSettings = () => {
    updateFirmSettings({ firmName })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleExportCases = () => {
    const csv = exportCasesCSV(cases)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Cases_${today}.csv`, csv)
  }

  const handleExportInvoices = () => {
    const csv = exportInvoicesCSV(invoices)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Invoices_${today}.csv`, csv)
  }

  const handleExportAppointments = () => {
    const csv = exportAppointmentsCSV(appointments)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Appointments_${today}.csv`, csv)
  }

  return (
    <AppLayout>
      <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your firm information and preferences
        </p>
      </div>

      {/* Firm Information */}
      <Card className="bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Firm Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Firm Name
            </label>
            <input
              type="text"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="Your Law Firm Name"
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              This name will appear on PDF invoices and letterhead
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Firm Logo
            </label>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary">
                <span className="text-xs text-muted-foreground">Logo Preview</span>
              </div>
              <Button variant="outline">Upload Logo</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Recommended size: 200x200px. Shows on top of PDF invoices.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Currency
            </label>
            <input
              type="text"
              value="BWP Pula"
              disabled
              className="mt-1 w-full rounded-lg border border-border bg-secondary px-4 py-2 text-muted-foreground"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Default currency for invoices and payments
            </p>
          </div>

          <Button
            onClick={handleSaveFirmSettings}
            className="mt-6"
          >
            {isSaved ? '✓ Saved' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Export Options</h2>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleExportCases}
          >
            <Download className="h-4 w-4" />
            Export Cases to CSV
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleExportInvoices}
          >
            <Download className="h-4 w-4" />
            Export Invoices to CSV
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleExportAppointments}
          >
            <Download className="h-4 w-4" />
            Export Appointments to CSV
          </Button>

          <div className="mt-4 rounded-lg bg-secondary/50 p-4">
            <p className="text-xs text-muted-foreground">
              📋 <strong>Data Privacy Note:</strong> For client confidentiality,
              all data stays in this app. Click a button to download CSV, then
              upload to your own Google Sheets/Excel. Your client data never
              leaves your control.
            </p>
          </div>
        </div>
      </Card>
      </div>
    </AppLayout>
  )
}
