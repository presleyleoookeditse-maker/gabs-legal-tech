'use client'

import jsPDF from 'jspdf'
import type { GeneratedDocument, DocumentType } from '@/lib/document-store'

export function generateNDAPdf(data: Record<string, string>) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('NON-DISCLOSURE AGREEMENT', pageWidth / 2, 30, { align: 'center' })
  doc.text('(BOTSWANA)', pageWidth / 2, 40, { align: 'center' })
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  
  let y = 60
  const margin = 20
  const lineHeight = 7
  
  // Date
  doc.text(`Date: ${data.effectiveDate || new Date().toLocaleDateString()}`, margin, y)
  y += lineHeight * 2
  
  // Parties
  doc.setFont('helvetica', 'bold')
  doc.text('BETWEEN:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  
  doc.text(`1. ${data.disclosingParty || '[Disclosing Party]'}`, margin + 5, y)
  y += lineHeight
  doc.text(`   Address: ${data.disclosingAddress || '[Address]'}`, margin + 5, y)
  y += lineHeight
  doc.text('   (hereinafter referred to as the "Disclosing Party")', margin + 5, y)
  y += lineHeight * 2
  
  doc.text(`2. ${data.receivingParty || '[Receiving Party]'}`, margin + 5, y)
  y += lineHeight
  doc.text(`   Address: ${data.receivingAddress || '[Address]'}`, margin + 5, y)
  y += lineHeight
  doc.text('   (hereinafter referred to as the "Receiving Party")', margin + 5, y)
  y += lineHeight * 2
  
  // Purpose
  doc.setFont('helvetica', 'bold')
  doc.text('PURPOSE:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  const purposeLines = doc.splitTextToSize(data.purpose || '[Purpose of disclosure]', pageWidth - margin * 2)
  doc.text(purposeLines, margin, y)
  y += lineHeight * (purposeLines.length + 1)
  
  // Terms
  doc.setFont('helvetica', 'bold')
  doc.text('TERMS AND CONDITIONS:', margin, y)
  y += lineHeight * 1.5
  doc.setFont('helvetica', 'normal')
  
  const terms = [
    '1. The Receiving Party agrees to maintain the confidentiality of all information disclosed.',
    '2. Confidential information shall not be disclosed to any third party without written consent.',
    '3. The Receiving Party shall use the information solely for the stated purpose.',
    `4. This agreement shall remain in effect for ${data.duration || '2'} years from the effective date.`,
    '5. This agreement is governed by the laws of the Republic of Botswana.',
  ]
  
  terms.forEach((term) => {
    const lines = doc.splitTextToSize(term, pageWidth - margin * 2)
    doc.text(lines, margin, y)
    y += lineHeight * (lines.length + 0.5)
  })
  
  y += lineHeight
  
  // Signatures
  doc.setFont('helvetica', 'bold')
  doc.text('SIGNATURES:', margin, y)
  y += lineHeight * 2
  
  doc.setFont('helvetica', 'normal')
  doc.text('_______________________', margin, y)
  doc.text('_______________________', pageWidth - margin - 50, y)
  y += lineHeight
  doc.text('Disclosing Party', margin, y)
  doc.text('Receiving Party', pageWidth - margin - 50, y)
  y += lineHeight
  doc.text(`Name: ${data.disclosingParty || ''}`, margin, y)
  doc.text(`Name: ${data.receivingParty || ''}`, pageWidth - margin - 50, y)
  
  return doc
}

export function generateLeasePdf(data: Record<string, string>) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('RESIDENTIAL LEASE AGREEMENT', pageWidth / 2, 25, { align: 'center' })
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  
  let y = 45
  const margin = 20
  const lineHeight = 7
  
  // Parties
  doc.setFont('helvetica', 'bold')
  doc.text('PARTIES:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  
  doc.text(`Landlord: ${data.landlordName || '[Landlord Name]'}`, margin, y)
  y += lineHeight
  doc.text(`ID/Registration: ${data.landlordId || '[ID Number]'}`, margin, y)
  y += lineHeight
  doc.text(`Address: ${data.landlordAddress || '[Address]'}`, margin, y)
  y += lineHeight * 1.5
  
  doc.text(`Tenant: ${data.tenantName || '[Tenant Name]'}`, margin, y)
  y += lineHeight
  doc.text(`ID Number: ${data.tenantId || '[ID Number]'}`, margin, y)
  y += lineHeight
  doc.text(`Contact: ${data.tenantContact || '[Contact]'}`, margin, y)
  y += lineHeight * 2
  
  // Property
  doc.setFont('helvetica', 'bold')
  doc.text('PROPERTY DETAILS:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  
  doc.text(`Address: ${data.propertyAddress || '[Property Address]'}`, margin, y)
  y += lineHeight
  doc.text(`Type: ${data.propertyType || 'Residential'}`, margin, y)
  y += lineHeight
  doc.text(`Description: ${data.propertyDescription || '[Description]'}`, margin, y)
  y += lineHeight * 2
  
  // Lease Terms
  doc.setFont('helvetica', 'bold')
  doc.text('LEASE TERMS:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  
  doc.text(`Commencement Date: ${data.startDate || '[Start Date]'}`, margin, y)
  y += lineHeight
  doc.text(`Termination Date: ${data.endDate || '[End Date]'}`, margin, y)
  y += lineHeight
  doc.text(`Monthly Rent: BWP ${data.monthlyRent || '[Amount]'}`, margin, y)
  y += lineHeight
  doc.text(`Security Deposit: BWP ${data.deposit || '[Amount]'}`, margin, y)
  y += lineHeight
  doc.text(`Payment Due Date: ${data.paymentDueDate || '1st'} of each month`, margin, y)
  y += lineHeight * 2
  
  // Terms
  doc.setFont('helvetica', 'bold')
  doc.text('TERMS AND CONDITIONS:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  
  const terms = [
    '1. Tenant shall use the premises for residential purposes only.',
    '2. Tenant shall maintain the property in good condition.',
    '3. No alterations without written consent from the Landlord.',
    '4. Tenant shall not sublet without prior written approval.',
    '5. Either party may terminate with one month written notice.',
  ]
  
  terms.forEach((term) => {
    doc.text(term, margin, y)
    y += lineHeight
  })
  
  y += lineHeight
  
  // Signatures
  doc.setFont('helvetica', 'bold')
  doc.text('SIGNATURES:', margin, y)
  y += lineHeight * 2
  
  doc.setFont('helvetica', 'normal')
  doc.text('_______________________', margin, y)
  doc.text('_______________________', pageWidth - margin - 50, y)
  y += lineHeight
  doc.text('Landlord', margin, y)
  doc.text('Tenant', pageWidth - margin - 50, y)
  y += lineHeight
  doc.text(`Date: ${data.startDate || ''}`, margin, y)
  doc.text(`Date: ${data.startDate || ''}`, pageWidth - margin - 50, y)
  
  return doc
}

export function generateInvoicePdf(data: Record<string, string>) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('VAT INVOICE', pageWidth / 2, 25, { align: 'center' })
  
  doc.setFontSize(11)
  let y = 45
  const margin = 20
  const lineHeight = 7
  
  // Invoice Details
  doc.setFont('helvetica', 'normal')
  doc.text(`Invoice No: ${data.invoiceNumber || 'INV-001'}`, pageWidth - margin - 60, y)
  y += lineHeight
  doc.text(`Date: ${data.invoiceDate || new Date().toLocaleDateString()}`, pageWidth - margin - 60, y)
  y = 45
  
  // Seller Details
  doc.setFont('helvetica', 'bold')
  doc.text('FROM:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  doc.text(data.sellerName || '[Business Name]', margin, y)
  y += lineHeight
  doc.text(data.sellerAddress || '[Address]', margin, y)
  y += lineHeight
  doc.text(`VAT No: ${data.sellerVat || '[VAT Number]'}`, margin, y)
  y += lineHeight
  doc.text(`Tel: ${data.sellerPhone || '[Phone]'}`, margin, y)
  y += lineHeight * 2
  
  // Buyer Details
  doc.setFont('helvetica', 'bold')
  doc.text('BILL TO:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  doc.text(data.buyerName || '[Customer Name]', margin, y)
  y += lineHeight
  doc.text(data.buyerAddress || '[Address]', margin, y)
  y += lineHeight
  doc.text(`VAT No: ${data.buyerVat || '[VAT Number]'}`, margin, y)
  y += lineHeight * 2
  
  // Table Header
  const colWidths = [80, 25, 30, 35]
  const startX = margin
  
  doc.setFillColor(34, 34, 34)
  doc.rect(startX, y - 5, pageWidth - margin * 2, 10, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  
  doc.text('Description', startX + 5, y)
  doc.text('Qty', startX + colWidths[0], y)
  doc.text('Unit Price', startX + colWidths[0] + colWidths[1], y)
  doc.text('Amount', startX + colWidths[0] + colWidths[1] + colWidths[2], y)
  
  y += lineHeight + 3
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  
  // Items
  const description = data.itemDescription || 'Professional Services'
  const qty = data.itemQty || '1'
  const unitPrice = parseFloat(data.itemUnitPrice || '0')
  const amount = parseFloat(qty) * unitPrice
  
  doc.text(description, startX + 5, y)
  doc.text(qty, startX + colWidths[0], y)
  doc.text(`BWP ${unitPrice.toFixed(2)}`, startX + colWidths[0] + colWidths[1], y)
  doc.text(`BWP ${amount.toFixed(2)}`, startX + colWidths[0] + colWidths[1] + colWidths[2], y)
  
  y += lineHeight * 3
  
  // Line
  doc.setDrawColor(100)
  doc.line(startX + colWidths[0] + colWidths[1], y - lineHeight, pageWidth - margin, y - lineHeight)
  
  // Totals
  const subtotal = amount
  const vatRate = parseFloat(data.vatRate || '14')
  const vatAmount = subtotal * (vatRate / 100)
  const total = subtotal + vatAmount
  
  doc.text('Subtotal:', startX + colWidths[0] + colWidths[1], y)
  doc.text(`BWP ${subtotal.toFixed(2)}`, startX + colWidths[0] + colWidths[1] + colWidths[2], y)
  y += lineHeight
  
  doc.text(`VAT (${vatRate}%):`, startX + colWidths[0] + colWidths[1], y)
  doc.text(`BWP ${vatAmount.toFixed(2)}`, startX + colWidths[0] + colWidths[1] + colWidths[2], y)
  y += lineHeight
  
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL:', startX + colWidths[0] + colWidths[1], y)
  doc.text(`BWP ${total.toFixed(2)}`, startX + colWidths[0] + colWidths[1] + colWidths[2], y)
  
  y += lineHeight * 3
  
  // Payment Details
  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENT DETAILS:', margin, y)
  y += lineHeight
  doc.setFont('helvetica', 'normal')
  doc.text(`Bank: ${data.bankName || '[Bank Name]'}`, margin, y)
  y += lineHeight
  doc.text(`Account: ${data.accountNumber || '[Account Number]'}`, margin, y)
  y += lineHeight
  doc.text(`Branch Code: ${data.branchCode || '[Branch Code]'}`, margin, y)
  
  y += lineHeight * 2
  doc.setFontSize(10)
  doc.text('Thank you for your business!', pageWidth / 2, y, { align: 'center' })
  
  return doc
}

export function downloadDocument(type: DocumentType, data: Record<string, string>, title: string) {
  let doc: jsPDF
  
  switch (type) {
    case 'nda':
      doc = generateNDAPdf(data)
      break
    case 'lease':
      doc = generateLeasePdf(data)
      break
    case 'invoice':
      doc = generateInvoicePdf(data)
      break
  }
  
  doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}
