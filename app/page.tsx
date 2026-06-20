'use client'

import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDocumentStore } from '@/lib/document-store'
import { FileSignature, Scale, Receipt, History, ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'

const tools = [
  {
    title: 'Botswana NDA Generator',
    description: 'Create legally binding Non-Disclosure Agreements tailored for Botswana law.',
    icon: FileSignature,
    href: '/nda',
  },
  {
    title: 'Residential Lease Agreement',
    description: 'Generate comprehensive residential lease agreements for landlords and tenants.',
    icon: Scale,
    href: '/lease',
  },
  {
    title: 'VAT Invoice Generator',
    description: 'Create professional VAT-compliant invoices for your business transactions.',
    icon: Receipt,
    href: '/invoice',
  },
]

export default function HomePage() {
  const documents = useDocumentStore((state) => state.documents)
  const recentDocs = documents.slice(0, 3)

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to Gabs Legal Tech</h1>
            <p className="mt-2 text-muted-foreground">
              Professional legal document generation for Botswana businesses
            </p>
          </div>
          {/* Botswana Flag */}
          <div className="hidden shrink-0 sm:block">
            <svg width="80" height="54" viewBox="0 0 5 3" className="rounded shadow-md">
              <rect width="5" height="3" fill="#75AADB" />
              <rect y="1.125" width="5" height="0.75" fill="#FFFFFF" />
              <rect y="1.25" width="5" height="0.5" fill="#000000" />
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{documents.length}</p>
                  <p className="text-sm text-muted-foreground">Documents Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileSignature className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Document Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Botswana Compliant</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Tools */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">Document Generators</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="group cursor-pointer border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-foreground">
                      {tool.title}
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Recent Documents</h2>
            <Link
              href="/history"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recentDocs.length > 0 ? (
            <div className="space-y-2">
              {recentDocs.map((doc) => (
                <Card key={doc.id} className="border-border bg-card">
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-secondary p-2">
                        <History className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase text-primary">
                      {doc.type}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="py-8 text-center">
                <History className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-muted-foreground">No documents generated yet</p>
                <p className="text-sm text-muted-foreground">
                  Start by creating your first document above
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
