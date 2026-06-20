'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useDocumentStore } from '@/lib/document-store'
import { downloadDocument } from '@/lib/pdf-generator'
import { FileSignature, Download } from 'lucide-react'

export default function NDAGeneratorPage() {
  const addDocument = useDocumentStore((state) => state.addDocument)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    disclosingParty: '',
    disclosingAddress: '',
    receivingParty: '',
    receivingAddress: '',
    purpose: '',
    effectiveDate: '',
    duration: '2',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGeneratePDF = () => {
    setIsGenerating(true)
    
    const title = `NDA - ${formData.disclosingParty || 'Untitled'} & ${formData.receivingParty || 'Party'}`
    
    // Add to history
    addDocument({
      type: 'nda',
      title,
      data: formData,
    })
    
    // Generate and download PDF
    downloadDocument('nda', formData, title)
    
    setTimeout(() => setIsGenerating(false), 500)
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileSignature className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Botswana NDA Generator</h1>
            <p className="text-muted-foreground">
              Create a legally binding Non-Disclosure Agreement
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Agreement Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details for your Non-Disclosure Agreement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Disclosing Party */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Disclosing Party</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="disclosingParty" className="text-foreground">
                    Full Name / Company Name
                  </Label>
                  <Input
                    id="disclosingParty"
                    name="disclosingParty"
                    value={formData.disclosingParty}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disclosingAddress" className="text-foreground">
                    Address
                  </Label>
                  <Input
                    id="disclosingAddress"
                    name="disclosingAddress"
                    value={formData.disclosingAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Receiving Party */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Receiving Party</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="receivingParty" className="text-foreground">
                    Full Name / Company Name
                  </Label>
                  <Input
                    id="receivingParty"
                    name="receivingParty"
                    value={formData.receivingParty}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receivingAddress" className="text-foreground">
                    Address
                  </Label>
                  <Input
                    id="receivingAddress"
                    name="receivingAddress"
                    value={formData.receivingAddress}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Agreement Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Agreement Terms</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-foreground">
                    Purpose of Disclosure
                  </Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Describe the purpose of this NDA..."
                    rows={3}
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="effectiveDate" className="text-foreground">
                      Effective Date
                    </Label>
                    <Input
                      id="effectiveDate"
                      name="effectiveDate"
                      type="date"
                      value={formData.effectiveDate}
                      onChange={handleChange}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-foreground">
                      Duration (years)
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.duration}
                      onChange={handleChange}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {isGenerating ? 'Generating...' : 'Generate PDF'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
