'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Copy, Download, FileText } from 'lucide-react'

export default function TemplatesPage() {
  const { templates, cases } = useAppStore()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<string>('')
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})

  const template = templates.find((t) => t.id === selectedTemplate)
  const caseData = cases.find((c) => c.id === selectedCase)

  const handleGenerateDocument = () => {
    if (!template || !caseData) return

    let content = template.content

    // Auto-fill case data
    const autoFillMap: Record<string, string> = {
      client_name: caseData.clientName,
      case_number: caseData.caseNumber,
    }

    // Replace template fields
    template.fields.forEach((field) => {
      const value = fieldValues[field] || autoFillMap[field] || ''
      const regex = new RegExp(`{{${field}}}`, 'g')
      content = content.replace(regex, value)
    })

    // Download as text file
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `${template.name.replace(/\s+/g, '_')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Document Templates</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates List */}
          <div>
            <Card className="bg-card p-6 space-y-3">
              <h2 className="text-lg font-semibold text-foreground mb-4">Available Templates</h2>
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplate(t.id)
                    setFieldValues({})
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTemplate === t.id
                      ? 'bg-primary/10 border-primary'
                      : 'border-border hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{t.category}</div>
                    </div>
                  </div>
                </button>
              ))}
            </Card>
          </div>

          {/* Preview & Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Selector */}
            <Card className="bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Select Case</h2>
              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
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

            {/* Fields Input */}
            {template && (
              <Card className="bg-card p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground mb-4">Fill Fields</h2>
                {template.fields.map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-foreground capitalize">
                      {field.replace(/_/g, ' ')}
                    </label>
                    <input
                      type="text"
                      value={fieldValues[field] || ''}
                      onChange={(e) =>
                        setFieldValues({ ...fieldValues, [field]: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                      placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                    />
                  </div>
                ))}

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Preview</h3>
                  <pre className="bg-secondary/50 p-4 rounded-lg text-xs text-muted-foreground overflow-auto max-h-64">
                    {template.content}
                  </pre>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerateDocument}
                    className="flex-1 gap-2"
                    disabled={!selectedCase}
                  >
                    <Download className="h-4 w-4" />
                    Download Document
                  </Button>
                  <Button
                    onClick={() => {
                      const content = template.content
                      navigator.clipboard.writeText(content)
                    }}
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
