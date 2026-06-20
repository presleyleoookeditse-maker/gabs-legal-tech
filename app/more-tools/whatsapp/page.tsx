'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { MessageCircle, Upload, Trash2 } from 'lucide-react'

export default function WhatsAppPage() {
  const { caseNotes, cases, addCaseNote } = useAppStore()
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    source: 'whatsapp' as const,
  })

  const caseNotesList = selectedCaseId ? caseNotes.filter((n) => n.caseId === selectedCaseId) : []

  const handleAddNote = () => {
    if (formData.content && selectedCaseId) {
      addCaseNote({
        caseId: selectedCaseId,
        content: formData.content,
        source: formData.source,
      })
      setFormData({ content: '', source: 'whatsapp' })
      setShowAddForm(false)
    }
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return '💬'
      case 'voice':
        return '🎙️'
      default:
        return '📝'
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsApp & Voice Notes</h1>
          <p className="text-muted-foreground mt-2">
            Attach voice notes, WhatsApp messages, and client communications to case files
          </p>
        </div>

        {/* Info Card */}
        <Card className="bg-primary/10 border-primary p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            How It Works
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground">
            <li>✓ Select a case below</li>
            <li>✓ Add voice notes or message transcripts</li>
            <li>✓ Notes automatically attach to case file</li>
            <li>✓ All evidence stored in one place</li>
          </ul>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Selector */}
          <Card className="bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cases</h2>
            <div className="space-y-2">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCaseId === c.id
                      ? 'bg-primary/10 border-primary'
                      : 'border-border hover:bg-secondary/50'
                  }`}
                >
                  <div className="font-medium text-foreground">{c.caseNumber}</div>
                  <div className="text-xs text-muted-foreground">{c.clientName}</div>
                  <div className="text-xs text-primary mt-1">
                    {caseNotes.filter((n) => n.caseId === c.id).length} notes
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Notes & Add Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Note */}
            {selectedCaseId && (
              <Card className="bg-card p-6">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {showAddForm ? 'Cancel' : 'Add Note'}
                </button>

                {showAddForm && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Note Type</label>
                      <select
                        value={formData.source}
                        onChange={(e) =>
                          setFormData({ ...formData, source: e.target.value as any })
                        }
                        className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                      >
                        <option value="whatsapp">WhatsApp Message</option>
                        <option value="voice">Voice Note</option>
                        <option value="manual">Manual Note</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Content</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                        placeholder="Paste WhatsApp message, transcribe voice note, or add note here..."
                        rows={5}
                      />
                    </div>

                    <Button
                      onClick={handleAddNote}
                      className="w-full"
                      disabled={!formData.content}
                    >
                      Attach to Case
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {/* Notes List */}
            <Card className="bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {selectedCaseId ? 'Case Notes' : 'Select a case to view notes'}
              </h2>

              {caseNotesList.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No notes yet. Add one using the form above.
                </p>
              ) : (
                <div className="space-y-3">
                  {caseNotesList
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .map((note) => (
                      <div key={note.id} className="p-4 rounded-lg border border-border bg-secondary/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getSourceIcon(note.source)}</span>
                            <Badge variant="outline" className="capitalize">
                              {note.source === 'whatsapp' ? 'WhatsApp' : note.source === 'voice' ? 'Voice' : 'Manual'}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString('en-BW')}{' '}
                            {new Date(note.createdAt).toLocaleTimeString('en-BW', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-foreground whitespace-pre-wrap text-sm">{note.content}</p>
                      </div>
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
