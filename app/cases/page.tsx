'use client'

import { useAppStore } from '@/lib/app-store'
import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import Link from 'next/link'

export default function CasesPage() {
  const { cases } = useAppStore()

  const downloadCSV = () => {
    const headers = ['Case #', 'Client', 'Type', 'Status', 'Next Hearing']
    const rows = cases.map((c) => [c.caseNumber, c.clientName, c.caseType, c.status, c.nextHearing])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Cases_2026-05-16.csv'
    a.click()
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Cases</h1>
          <div className="flex gap-2">
            <Button onClick={downloadCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {cases.length > 0 ? (
            cases.map((caseItem) => (
              <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00FF88] transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[#00FF88] font-bold text-sm">{caseItem.caseNumber}</p>
                      <p className="text-white font-bold text-lg">{caseItem.clientName}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Type</p>
                      <p className="text-white">{caseItem.caseType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Next Hearing</p>
                      <p className="text-white">{caseItem.nextHearing}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No cases yet. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
