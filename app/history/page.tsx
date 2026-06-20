'use client'

import { AppLayout } from '@/components/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDocumentStore, type DocumentType } from '@/lib/document-store'
import { downloadDocument } from '@/lib/pdf-generator'
import { History, FileSignature, Scale, Receipt, Download, Trash2, FileText } from 'lucide-react'

const typeIcons: Record<DocumentType, typeof FileSignature> = {
  nda: FileSignature,
  lease: Scale,
  invoice: Receipt,
}

const typeLabels: Record<DocumentType, string> = {
  nda: 'NDA',
  lease: 'Lease Agreement',
  invoice: 'VAT Invoice',
}

export default function HistoryPage() {
  const { documents, clearHistory } = useDocumentStore()

  const handleRedownload = (doc: (typeof documents)[0]) => {
    downloadDocument(doc.type, doc.data, doc.title)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <History className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Documents History</h1>
              <p className="text-muted-foreground">
                View and re-download your generated documents
              </p>
            </div>
          </div>
          {documents.length > 0 && (
            <Button
              variant="outline"
              onClick={clearHistory}
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear History
            </Button>
          )}
        </div>

        {/* Documents List */}
        {documents.length > 0 ? (
          <div className="space-y-3">
            {documents.map((doc) => {
              const Icon = typeIcons[doc.type]
              return (
                <Card key={doc.id} className="border-border bg-card">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{doc.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                            {typeLabels[doc.type]}
                          </span>
                          <span>
                            {new Date(doc.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRedownload(doc)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-border bg-card">
            <CardContent className="py-16 text-center">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground/30" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No documents yet</h3>
              <p className="mt-1 text-muted-foreground">
                Documents you generate will appear here for easy access
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}
