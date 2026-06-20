'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDocumentStore } from '@/lib/document-store'
import { downloadDocument } from '@/lib/pdf-generator'
import { Receipt, Download } from 'lucide-react'

export default function InvoiceGeneratorPage() {
  const addDocument = useDocumentStore((state) => state.addDocument)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    sellerName: '',
    sellerAddress: '',
    sellerVat: '',
    sellerPhone: '',
    buyerName: '',
    buyerAddress: '',
    buyerVat: '',
    itemDescription: '',
    itemQty: '1',
    itemUnitPrice: '',
    vatRate: '14',
    bankName: '',
    accountNumber: '',
    branchCode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGeneratePDF = () => {
    setIsGenerating(true)
    
    const title = `Invoice - ${formData.invoiceNumber || 'INV-001'}`
    
    addDocument({
      type: 'invoice',
      title,
      data: formData,
    })
    
    downloadDocument('invoice', formData, title)
    
    setTimeout(() => setIsGenerating(false), 500)
  }

  // Calculate totals for preview
  const qty = parseFloat(formData.itemQty) || 0
  const unitPrice = parseFloat(formData.itemUnitPrice) || 0
  const subtotal = qty * unitPrice
  const vatRate = parseFloat(formData.vatRate) || 14
  const vatAmount = subtotal * (vatRate / 100)
  const total = subtotal + vatAmount

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Receipt className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">VAT Invoice Generator</h1>
            <p className="text-muted-foreground">
              Create professional VAT-compliant invoices
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Invoice Details</CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details for your VAT Invoice
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Invoice Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber" className="text-foreground">
                  Invoice Number
                </Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  placeholder="INV-001"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate" className="text-foreground">
                  Invoice Date
                </Label>
                <Input
                  id="invoiceDate"
                  name="invoiceDate"
                  type="date"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="border-border bg-input text-foreground"
                />
              </div>
            </div>

            {/* Seller Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Seller Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sellerName" className="text-foreground">
                    Business Name
                  </Label>
                  <Input
                    id="sellerName"
                    name="sellerName"
                    value={formData.sellerName}
                    onChange={handleChange}
                    placeholder="Your business name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerVat" className="text-foreground">
                    VAT Number
                  </Label>
                  <Input
                    id="sellerVat"
                    name="sellerVat"
                    value={formData.sellerVat}
                    onChange={handleChange}
                    placeholder="VAT registration number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sellerAddress" className="text-foreground">
                    Address
                  </Label>
                  <Input
                    id="sellerAddress"
                    name="sellerAddress"
                    value={formData.sellerAddress}
                    onChange={handleChange}
                    placeholder="Business address"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellerPhone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="sellerPhone"
                    name="sellerPhone"
                    value={formData.sellerPhone}
                    onChange={handleChange}
                    placeholder="Contact number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Buyer Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Customer Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="buyerName" className="text-foreground">
                    Customer Name
                  </Label>
                  <Input
                    id="buyerName"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleChange}
                    placeholder="Customer name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerVat" className="text-foreground">
                    VAT Number (Optional)
                  </Label>
                  <Input
                    id="buyerVat"
                    name="buyerVat"
                    value={formData.buyerVat}
                    onChange={handleChange}
                    placeholder="Customer VAT number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerAddress" className="text-foreground">
                  Address
                </Label>
                <Input
                  id="buyerAddress"
                  name="buyerAddress"
                  value={formData.buyerAddress}
                  onChange={handleChange}
                  placeholder="Customer address"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Invoice Items</h3>
              <div className="space-y-2">
                <Label htmlFor="itemDescription" className="text-foreground">
                  Description
                </Label>
                <Input
                  id="itemDescription"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleChange}
                  placeholder="Product or service description"
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="itemQty" className="text-foreground">
                    Quantity
                  </Label>
                  <Input
                    id="itemQty"
                    name="itemQty"
                    type="number"
                    min="1"
                    value={formData.itemQty}
                    onChange={handleChange}
                    className="border-border bg-input text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemUnitPrice" className="text-foreground">
                    Unit Price (BWP)
                  </Label>
                  <Input
                    id="itemUnitPrice"
                    name="itemUnitPrice"
                    type="number"
                    step="0.01"
                    value={formData.itemUnitPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatRate" className="text-foreground">
                    VAT Rate (%)
                  </Label>
                  <Input
                    id="vatRate"
                    name="vatRate"
                    type="number"
                    value={formData.vatRate}
                    onChange={handleChange}
                    className="border-border bg-input text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Totals Preview */}
            <div className="rounded-lg bg-secondary/50 p-4">
              <h3 className="mb-3 font-semibold text-foreground">Invoice Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>BWP {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>VAT ({vatRate}%):</span>
                  <span>BWP {vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-foreground">
                  <span>Total:</span>
                  <span className="text-primary">BWP {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Payment Details</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-foreground">
                    Bank Name
                  </Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Bank name"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-foreground">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Account number"
                    className="border-border bg-input text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchCode" className="text-foreground">
                    Branch Code
                  </Label>
                  <Input
                    id="branchCode"
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={handleChange}
                    placeholder="Branch code"
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
