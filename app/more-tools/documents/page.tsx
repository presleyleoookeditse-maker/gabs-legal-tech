'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import jsPDF from 'jspdf'
import { FileText } from 'lucide-react'

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'nda' | 'lease'>('nda')

  // NDA State
  const [ndaForm, setNdaForm] = useState({
    partyAName: '',
    partyAAddress: '',
    partyBName: '',
    partyBAddress: '',
    effectiveDate: '',
    termMonths: '',
  })

  // Lease State
  const [leaseForm, setLeaseForm] = useState({
    landlordName: '',
    tenantName: '',
    propertyAddress: '',
    monthlyRent: '',
    deposit: '',
    startDate: '',
    termMonths: '',
  })

  const addText = (doc: any, text: string, x: number, y: number, options = {}) => {
    const wrapped = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
    doc.text(wrapped, x, y, options)
    return wrapped.length * 4 + 3
  }

  const generateNDAPDF = () => {
    if (!ndaForm.partyAName || !ndaForm.partyBName || !ndaForm.effectiveDate) {
      alert('Please fill in all required fields')
      return
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 15

    // Letterhead
    doc.setFont('Arial', 'bold')
    doc.setFontSize(14)
    doc.text('GABS LEGAL TECH', 20, yPos)
    doc.setFontSize(9)
    doc.setFont('Arial', 'normal')
    doc.text('Professional Legal Services', 20, yPos + 5)
    doc.text('Gaborone, Botswana', 20, yPos + 9)
    
    yPos += 20

    // Title
    doc.setFont('Arial', 'bold')
    doc.setFontSize(14)
    doc.text('CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT', pageWidth / 2, yPos, { align: 'center' })
    yPos += 12

    // Date and Parties
    doc.setFontSize(10)
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `THIS AGREEMENT is made and entered into effective as of the ${ndaForm.effectiveDate} ("Effective Date")`, 20, yPos)
    yPos += 5

    doc.setFont('Arial', 'bold')
    doc.text('BETWEEN:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `${ndaForm.partyAName}, a person resident at ${ndaForm.partyAAddress} ("the Disclosing Party")`, 25, yPos)
    yPos += 3

    doc.setFont('Arial', 'bold')
    doc.text('AND:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `${ndaForm.partyBName}, a person resident at ${ndaForm.partyBAddress} ("the Receiving Party")`, 25, yPos)
    yPos += 8

    doc.setFont('Arial', 'bold')
    doc.text('WHEREAS:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Disclosing Party desires to disclose certain confidential information to the Receiving Party for the purpose of business discussion and evaluation. The parties wish to protect the confidentiality of such information.`, 25, yPos)
    yPos += 10

    doc.setFont('Arial', 'bold')
    doc.text('NOW IT IS AGREED:', 20, yPos)
    yPos += 8

    // Clause 1
    doc.setFont('Arial', 'bold')
    doc.text('1. DEFINITION OF CONFIDENTIAL INFORMATION', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `"Confidential Information" means all information, whether written, oral, electronic or visual, disclosed by the Disclosing Party to the Receiving Party, including but not limited to business plans, financial statements, pricing information, technical data, trade secrets, client lists, proprietary processes, marketing strategies, and any other information marked as confidential or which reasonably should be understood to be confidential.`, 20, yPos)
    yPos += 8

    // Clause 2
    doc.setFont('Arial', 'bold')
    doc.text('2. EXCLUSIONS FROM CONFIDENTIAL INFORMATION', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `Confidential Information shall not include information that: (a) is or becomes publicly available without breach of this Agreement; (b) is rightfully received by the Receiving Party from a third party without confidentiality restrictions; (c) is independently developed by the Receiving Party without use of Confidential Information; or (d) is required to be disclosed by law or court order.`, 20, yPos)
    yPos += 8

    // Clause 3
    doc.setFont('Arial', 'bold')
    doc.text('3. OBLIGATIONS OF RECEIVING PARTY', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Receiving Party agrees to: (a) maintain the Confidential Information in strict confidence using reasonable care; (b) limit disclosure to employees and advisors with a legitimate need to know; (c) not use the Confidential Information except for the purpose stated herein; and (d) ensure that employees and advisors are bound by confidentiality obligations no less restrictive than those contained herein.`, 20, yPos)
    yPos += 8

    // Clause 4
    doc.setFont('Arial', 'bold')
    doc.text('4. TERM AND DURATION', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `This Agreement shall commence on the Effective Date and shall continue for a period of ${ndaForm.termMonths} (${ndaForm.termMonths}) months, unless sooner terminated by either party upon thirty (30) days written notice. The obligations under this Agreement shall survive termination for three (3) years.`, 20, yPos)
    yPos += 8

    // Clause 5
    doc.setFont('Arial', 'bold')
    doc.text('5. REMEDIES', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Receiving Party acknowledges that breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages would be an inadequate remedy. The parties agree that injunctive relief shall be available in addition to any other remedies available at law or in equity.`, 20, yPos)
    yPos += 8

    // Clause 6
    doc.setFont('Arial', 'bold')
    doc.text('6. GOVERNING LAW', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `This Agreement shall be governed by and construed in accordance with the laws of the Republic of Botswana, and the parties hereby submit to the exclusive jurisdiction of the courts of Botswana.`, 20, yPos)
    yPos += 8

    // Clause 7
    doc.setFont('Arial', 'bold')
    doc.text('7. SEVERABILITY', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `If any provision of this Agreement is found to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and all other provisions shall remain in full force and effect.`, 20, yPos)
    yPos += 10

    // Signature section
    doc.setFont('Arial', 'bold')
    doc.text('IN WITNESS WHEREOF the parties have executed this Agreement as of the Effective Date.', 20, yPos)
    yPos += 12

    doc.setFont('Arial', 'normal')
    doc.text('DISCLOSING PARTY:', 20, yPos)
    yPos += 8
    doc.text('_______________________', 20, yPos)
    yPos += 4
    doc.text(ndaForm.partyAName, 20, yPos)
    yPos += 5
    doc.text('Date: _______________', 20, yPos)

    doc.text('RECEIVING PARTY:', pageWidth / 2 + 5, yPos - 9)
    doc.text('_______________________', pageWidth / 2 + 5, yPos - 1)
    doc.text(ndaForm.partyBName, pageWidth / 2 + 5, yPos + 3)
    doc.text('Date: _______________', pageWidth / 2 + 5, yPos + 8)

    // Footer
    doc.setFontSize(8)
    doc.setFont('Arial', 'italic')
    doc.text(`Generated by Gabs Legal Tech on ${new Date().toLocaleDateString('en-BW')}`, pageWidth / 2, pageHeight - 8, { align: 'center' })
    doc.text('This document is prepared for legal purposes. For clarification, consult with a qualified attorney.', pageWidth / 2, pageHeight - 4, { align: 'center' })

    const filename = `NDA_${ndaForm.partyAName.replace(/\s+/g, '_')}_${ndaForm.partyBName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
  }

  const generateLeasePDF = () => {
    if (!leaseForm.landlordName || !leaseForm.tenantName || !leaseForm.propertyAddress || !leaseForm.monthlyRent) {
      alert('Please fill in all required fields')
      return
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 15

    // Letterhead
    doc.setFont('Arial', 'bold')
    doc.setFontSize(14)
    doc.text('GABS LEGAL TECH', 20, yPos)
    doc.setFontSize(9)
    doc.setFont('Arial', 'normal')
    doc.text('Professional Legal Services', 20, yPos + 5)
    doc.text('Gaborone, Botswana', 20, yPos + 9)
    
    yPos += 20

    // Title
    doc.setFont('Arial', 'bold')
    doc.setFontSize(14)
    doc.text('RESIDENTIAL LEASE AGREEMENT', pageWidth / 2, yPos, { align: 'center' })
    yPos += 12

    // Parties
    doc.setFontSize(10)
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `THIS LEASE AGREEMENT is entered into effective as of ${leaseForm.startDate} ("Commencement Date")`, 20, yPos)
    yPos += 5

    doc.setFont('Arial', 'bold')
    doc.text('BETWEEN:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `${leaseForm.landlordName} ("the Landlord")`, 25, yPos)
    yPos += 3

    doc.setFont('Arial', 'bold')
    doc.text('AND:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `${leaseForm.tenantName} ("the Tenant")`, 25, yPos)
    yPos += 8

    doc.setFont('Arial', 'bold')
    doc.text('PROPERTY DETAILS:', 20, yPos)
    yPos += 6

    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the residential property located at: ${leaseForm.propertyAddress}`, 20, yPos)
    yPos += 10

    // Rental Terms
    doc.setFont('Arial', 'bold')
    doc.text('1. RENTAL PAYMENT', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    doc.text(`1.1 Monthly Rent: P${parseFloat(leaseForm.monthlyRent).toFixed(2)}`, 20, yPos)
    yPos += 5
    doc.text(`1.2 Security Deposit: P${parseFloat(leaseForm.deposit).toFixed(2)}`, 20, yPos)
    yPos += 5
    yPos += addText(doc, `1.3 VAT Compliance: A Value Added Tax (VAT) of 15% shall be added to all rental payments in accordance with Botswana Revenue Authority (BURS) requirements.`, 20, yPos)
    yPos += 5
    yPos += addText(doc, `1.4 Rent shall be due and payable in advance on the first day of each month. Late payment shall incur a penalty of 10% of the monthly rent plus 0.5% interest per day on arrears.`, 20, yPos)
    yPos += 10

    // Lease Term
    doc.setFont('Arial', 'bold')
    doc.text('2. LEASE TERM', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `This Lease shall be for a fixed term of ${leaseForm.termMonths} (${leaseForm.termMonths}) months, commencing on the Commencement Date. Upon expiration, the Lease shall terminate unless renewed in writing by both parties.`, 20, yPos)
    yPos += 10

    // Quiet Enjoyment
    doc.setFont('Arial', 'bold')
    doc.text('3. QUIET ENJOYMENT', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Landlord covenants that the Tenant shall have peaceful and quiet enjoyment of the Property without interruption or disturbance from the Landlord or any person claiming under the Landlord, subject to the terms and conditions of this Lease.`, 20, yPos)
    yPos += 10

    // Repairs and Maintenance
    doc.setFont('Arial', 'bold')
    doc.text('4. REPAIRS AND MAINTENANCE', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `4.1 The Landlord shall maintain the structure and exterior of the Property in good repair and habitable condition.`, 20, yPos)
    yPos += 4
    yPos += addText(doc, `4.2 The Tenant shall maintain the interior, including minor repairs, fixtures, and appliances, and shall keep the Property clean and sanitary at all times.`, 20, yPos)
    yPos += 4
    yPos += addText(doc, `4.3 The Tenant shall promptly notify the Landlord of any defects or required repairs.`, 20, yPos)
    yPos += 10

    // Termination
    doc.setFont('Arial', 'bold')
    doc.text('5. TERMINATION', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `Either party may terminate this Lease upon written notice of not less than two (2) months prior to the intended date of termination. Upon termination, the Tenant shall vacate the Property in clean and good repair condition.`, 20, yPos)
    yPos += 10

    // Utilities and Services
    doc.setFont('Arial', 'bold')
    doc.text('6. UTILITIES', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `The Tenant shall be responsible for all utilities including water, electricity, and refuse collection. The Tenant shall maintain utilities in the Tenant's name for billing purposes.`, 20, yPos)
    yPos += 10

    // Governing Law
    doc.setFont('Arial', 'bold')
    doc.text('7. GOVERNING LAW', 20, yPos)
    yPos += 6
    doc.setFont('Arial', 'normal')
    yPos += addText(doc, `This Lease Agreement shall be governed by and construed in accordance with the laws of the Republic of Botswana. The parties submit to the exclusive jurisdiction of the courts of Botswana.`, 20, yPos)
    yPos += 10

    // Signature section
    doc.setFont('Arial', 'bold')
    doc.text('IN WITNESS WHEREOF the parties have executed this Lease as of the Commencement Date.', 20, yPos)
    yPos += 12

    doc.setFont('Arial', 'normal')
    doc.text('LANDLORD:', 20, yPos)
    yPos += 8
    doc.text('_______________________', 20, yPos)
    yPos += 4
    doc.text(leaseForm.landlordName, 20, yPos)
    yPos += 5
    doc.text('Date: _______________', 20, yPos)

    doc.text('TENANT:', pageWidth / 2 + 5, yPos - 9)
    doc.text('_______________________', pageWidth / 2 + 5, yPos - 1)
    doc.text(leaseForm.tenantName, pageWidth / 2 + 5, yPos + 3)
    doc.text('Date: _______________', pageWidth / 2 + 5, yPos + 8)

    // Footer
    doc.setFontSize(8)
    doc.setFont('Arial', 'italic')
    doc.text(`Generated by Gabs Legal Tech on ${new Date().toLocaleDateString('en-BW')}`, pageWidth / 2, pageHeight - 8, { align: 'center' })
    doc.text('This document is prepared for legal purposes. For clarification, consult with a qualified attorney.', pageWidth / 2, pageHeight - 4, { align: 'center' })

    const filename = `Lease_${leaseForm.tenantName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Document Generators</h1>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#222]">
          <button
            onClick={() => setActiveTab('nda')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'nda'
                ? 'border-b-2 border-[#00FF88] text-[#00FF88]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            NDA Generator
          </button>
          <button
            onClick={() => setActiveTab('lease')}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === 'lease'
                ? 'border-b-2 border-[#00FF88] text-[#00FF88]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Lease Agreement
          </button>
        </div>

        {/* NDA Tab */}
        {activeTab === 'nda' && (
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Party A Name *</label>
                  <input
                    type="text"
                    value={ndaForm.partyAName}
                    onChange={(e) => setNdaForm({ ...ndaForm, partyAName: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter party A name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Party A Address *</label>
                  <input
                    type="text"
                    value={ndaForm.partyAAddress}
                    onChange={(e) => setNdaForm({ ...ndaForm, partyAAddress: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter party A address"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Party B Name *</label>
                  <input
                    type="text"
                    value={ndaForm.partyBName}
                    onChange={(e) => setNdaForm({ ...ndaForm, partyBName: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter party B name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Party B Address *</label>
                  <input
                    type="text"
                    value={ndaForm.partyBAddress}
                    onChange={(e) => setNdaForm({ ...ndaForm, partyBAddress: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter party B address"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Effective Date *</label>
                  <input
                    type="date"
                    value={ndaForm.effectiveDate}
                    onChange={(e) => setNdaForm({ ...ndaForm, effectiveDate: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Term (months) *</label>
                  <input
                    type="number"
                    value={ndaForm.termMonths}
                    onChange={(e) => setNdaForm({ ...ndaForm, termMonths: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter term in months"
                  />
                </div>
              </div>
              <Button
                onClick={generateNDAPDF}
                className="w-full bg-[#00FF88] text-black hover:bg-[#00DD77] font-bold py-2"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate NDA PDF
              </Button>
            </div>
          </div>
        )}

        {/* Lease Tab */}
        {activeTab === 'lease' && (
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Landlord Name *</label>
                  <input
                    type="text"
                    value={leaseForm.landlordName}
                    onChange={(e) => setLeaseForm({ ...leaseForm, landlordName: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter landlord name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tenant Name *</label>
                  <input
                    type="text"
                    value={leaseForm.tenantName}
                    onChange={(e) => setLeaseForm({ ...leaseForm, tenantName: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter tenant name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Property Address *</label>
                  <input
                    type="text"
                    value={leaseForm.propertyAddress}
                    onChange={(e) => setLeaseForm({ ...leaseForm, propertyAddress: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter property address"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Monthly Rent (P) *</label>
                  <input
                    type="number"
                    value={leaseForm.monthlyRent}
                    onChange={(e) => setLeaseForm({ ...leaseForm, monthlyRent: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter monthly rent"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Security Deposit (P) *</label>
                  <input
                    type="number"
                    value={leaseForm.deposit}
                    onChange={(e) => setLeaseForm({ ...leaseForm, deposit: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter security deposit"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Lease Start Date *</label>
                  <input
                    type="date"
                    value={leaseForm.startDate}
                    onChange={(e) => setLeaseForm({ ...leaseForm, startDate: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Lease Term (months) *</label>
                  <input
                    type="number"
                    value={leaseForm.termMonths}
                    onChange={(e) => setLeaseForm({ ...leaseForm, termMonths: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter lease term in months"
                  />
                </div>
              </div>
              <Button
                onClick={generateLeasePDF}
                className="w-full bg-[#00FF88] text-black hover:bg-[#00DD77] font-bold py-2"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Lease PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
