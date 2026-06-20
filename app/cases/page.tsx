'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { exportCasesCSV, downloadCSV } from '@/lib/csv-export'

export default function CasesPage() {
  const { cases, addCase } = useAppStore()
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [formData, setFormData] = useState({
    caseNumber: '',
    clientName: '',
    caseType: 'Contract Dispute',
    summary: '',
  })

  const handleExportCSV = () => {
    const csv = exportCasesCSV(cases)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Cases_${today}.csv`, csv)
  }

  const handleAddCase = () => {
    if (formData.caseNumber && formData.clientName) {
      addCase({
        caseNumber: formData.caseNumber,
        clientName: formData.clientName,
        caseType: formData.caseType,
        summary: formData.summary,
        status: 'active',
        nextHearing: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        documents: [],
        notes: [],
      })
      setFormData({ caseNumber: '', clientName: '', caseType: 'Contract Dispute', summary: '' })
      setShowNewForm(false)
    }
  }

  if (showNewForm) {
    return (
      <AppLayout>
        <div className="max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Add New Case</h1>
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
                <label className="text-sm font-medium text-foreground">Case Number</label>
                <input
                  type="text"
                  value={formData.caseNumber}
                  onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="GLT-001"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Case Type</label>
                <select
                  value={formData.caseType}
                  onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                >
                  <option>Contract Dispute</option>
                  <option>Land Dispute</option>
                  <option>Employment</option>
                  <option>Family Law</option>
                  <option>Criminal</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Summary</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="Case summary..."
                  rows={4}
                />
              </div>

              <Button
                onClick={handleAddCase}
                className="w-full"
              >
                Add Case
              </Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
  }

  const caseDetail = cases.find((c) => c.id === selectedCase)

  return (
    <AppLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Cases</h1>
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
            New Case
          </Button>
        </div>
      </div>

      {selectedCase && caseDetail ? (
        // Case Detail View
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-card p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {caseDetail.caseNumber}
                  </h2>
                  <p className="mt-1 text-muted-foreground">{caseDetail.caseType}</p>
                </div>
                <Badge
                  variant={
                    caseDetail.status === 'active'
                      ? 'default'
                      : caseDetail.status === 'closed'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {caseDetail.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">Client</h3>
                  <p className="text-muted-foreground">{caseDetail.clientName}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Summary</h3>
                  <p className="text-muted-foreground">{caseDetail.summary}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Next Hearing</h3>
                  <p className="text-muted-foreground">
                    {new Date(caseDetail.nextHearing).toLocaleDateString('en-BW')}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Documents</h3>
                  <div className="mt-2 space-y-1">
                    {caseDetail.documents.length > 0 ? (
                      caseDetail.documents.map((doc) => (
                        <p
                          key={doc}
                          className="text-sm text-primary hover:underline"
                        >
                          📄 {doc}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No documents</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">Notes</h3>
                  <div className="mt-2 space-y-1">
                    {caseDetail.notes.length > 0 ? (
                      caseDetail.notes.map((note, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          • {note}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No notes</p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setSelectedCase(null)}
                className="mt-6 w-full"
              >
                Back to Cases
              </Button>
            </Card>
          </div>
        </div>
      ) : (
        // Cases List View
        <div className="space-y-4">
          {cases.length > 0 ? (
            cases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="cursor-pointer bg-card p-6 transition-all hover:shadow-lg"
                onClick={() => setSelectedCase(caseItem.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {caseItem.caseNumber}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {caseItem.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {caseItem.caseType}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        caseItem.status === 'active'
                          ? 'default'
                          : caseItem.status === 'closed'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {caseItem.status}
                    </Badge>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Next: {new Date(caseItem.nextHearing).toLocaleDateString('en-BW')}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="bg-card p-6 text-center">
              <p className="text-muted-foreground">No cases yet</p>
            </Card>
          )}
        </div>
      )}
      </div>
    </AppLayout>
  )
}
