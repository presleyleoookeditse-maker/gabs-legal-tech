'use client'

import { useAppStore } from '@/lib/app-store'
import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Plus, Download, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function CasesPage() {
  const { cases, addCase } = useAppStore()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    caseType: '',
    nextHearing: '',
    description: '',
  })

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

  const handleSubmit = () => {
    if (formData.clientName && formData.caseType && formData.nextHearing) {
      const newCase = {
        id: String(cases.length + 1),
        caseNumber: `CASE-${Math.floor(Math.random() * 10000)}`,
        clientName: formData.clientName,
        caseType: formData.caseType,
        status: 'active',
        nextHearing: formData.nextHearing,
      }
      if (addCase) {
        addCase(newCase)
      }
      alert(`Case for ${formData.clientName} created successfully!`)
      setFormData({ clientName: '', caseType: '', nextHearing: '', description: '' })
      setShowModal(false)
    } else {
      alert('Please fill in all required fields')
    }
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
            <Button onClick={() => setShowModal(true)} className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
              <Plus className="h-4 w-4" />
              New Case
            </Button>
          </div>
        </div>

        {/* New Case Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Create New Case</h2>
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
                  <label className="block text-gray-400 text-sm mb-2">Case Type *</label>
                  <select
                    value={formData.caseType}
                    onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  >
                    <option value="">Select case type</option>
                    <option value="Land Dispute">Land Dispute</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Employment">Employment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Next Hearing Date *</label>
                  <input
                    type="date"
                    value={formData.nextHearing}
                    onChange={(e) => setFormData({ ...formData, nextHearing: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88] min-h-[80px] resize-none"
                    placeholder="Enter case description"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#00FF88] text-black hover:bg-[#00DD77]">
                    Create Case
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
