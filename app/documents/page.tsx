'use client'

import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileSignature, Scale, Receipt, ArrowRight } from 'lucide-react'
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

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Document Generators</h1>
        <p className="mt-2 text-muted-foreground">
          Create legally compliant documents for your cases and business
        </p>
      </div>

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
    </AppLayout>
  )
}
