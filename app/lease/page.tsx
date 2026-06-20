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
import { Scale, Download } from 'lucide-react'

export default function LeaseGeneratorPage() {
  const addDocument = useDocumentStore((state) => state.addDocument)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    landlordName: '',
    landlordId: '',
    landlordAddress: '',
    tenantName: '',
    tenantId: '',
    tenantContact: '',
    propertyAddress: '',
    propertyType: 'Residential House',
    propertyDescription: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: '',
    paymentDueDate: '1st',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGeneratePDF = () => {
    setIsGenerating(true)
    
    const title = `Lease - ${formData.propertyAddress || 'Property'}`
    
    addDocument({
      type: 'lease',
      title,
      data: formData,
    })
    
    downloadDocument('lease', formData, title)
    
    setTimeout(() => setIsGenerating(false), 500)
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Residential Lease Agreement</h1>
            <p className="text-muted-foreground">
              Generate a comprehensive lease agreement
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Lease Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details for your Residential Lease Agreement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Landlord Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Landlord Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="landlordName" className="text-foreground">
                    Full Name / Company Name
                  </Label>
                  <Input
                    id="landlordName"
                    name="landlordName"
                    value={formData.landlordName}
                    onChange={handleChange}
                    placeholder="Enter landlord name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landlordId" className="text-foreground">
                    ID / Registration Number
                  </Label>
                  <Input
                    id="landlordId"
                    name="landlordId"
                    value={formData.landlordId}
                    onChange={handleChange}
                    placeholder="Enter ID number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordAddress" className="text-foreground">
                  Address
                </Label>
                <Input
                  id="landlordAddress"
                  name="landlordAddress"
                  value={formData.landlordAddress}
                  onChange={handleChange}
                  placeholder="Enter landlord address"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Tenant Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Tenant Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tenantName" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="tenantName"
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    placeholder="Enter tenant name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenantId" className="text-foreground">
                    ID Number
                  </Label>
                  <Input
                    id="tenantId"
                    name="tenantId"
                    value={formData.tenantId}
                    onChange={handleChange}
                    placeholder="Enter ID number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantContact" className="text-foreground">
                  Contact Number
                </Label>
                <Input
                  id="tenantContact"
                  name="tenantContact"
                  value={formData.tenantContact}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Property Details</h3>
              <div className="space-y-2">
                <Label htmlFor="propertyAddress" className="text-foreground">
                  Property Address
                </Label>
                <Input
                  id="propertyAddress"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  placeholder="Enter property address"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-foreground">
                    Property Type
                  </Label>
                  <Input
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    placeholder="e.g., Residential House, Apartment"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyDescription" className="text-foreground">
                  Property Description
                </Label>
                <Textarea
                  id="propertyDescription"
                  name="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={handleChange}
                  placeholder="Describe the property (e.g., 3 bedroom house with 2 bathrooms)"
                  rows={2}
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Lease Terms */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Lease Terms</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-foreground">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="border-border bg-input text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-foreground">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="border-border bg-input text-foreground"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent" className="text-foreground">
                    Monthly Rent (BWP)
                  </Label>
                  <Input
                    id="monthlyRent"
                    name="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit" className="text-foreground">
                    Security Deposit (BWP)
                  </Label>
                  <Input
                    id="deposit"
                    name="deposit"
                    type="number"
                    value={formData.deposit}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentDueDate" className="text-foreground">
                    Payment Due Date
                  </Label>
                  <Input
                    id="paymentDueDate"
                    name="paymentDueDate"
                    value={formData.paymentDueDate}
                    onChange={handleChange}
                    placeholder="e.g., 1st"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
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
