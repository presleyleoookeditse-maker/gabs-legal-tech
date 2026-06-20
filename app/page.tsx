'use client'

import { useAppStore } from '@/lib/app-store'
import Link from 'next/link'
import { FileText, Calendar, DollarSign, Mail, ArrowRight, AlertCircle } from 'lucide-react'

export default function HomePage() {
  const { cases, appointments, invoices } = useAppStore()

  const activeCases = cases.filter((c) => c.status === 'active').length
  const unpaidInvoices = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const newMessages = 2
  const appointmentsCount = appointments.length

  const formatCurrency = (amount: number) => {
    return `P${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  return (
    <div className="min-h-screen bg-black" suppressHydrationWarning>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome to Gabs Legal Tech</h1>
          <p className="text-gray-400 text-sm md:text-base">Professional legal case & client management for Botswana law firms</p>
        </div>

        {/* Stats Row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Cases */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <p className="text-gray-400 text-sm mb-4">Active Cases</p>
            <p className="text-4xl font-bold text-white mb-6">{activeCases}</p>
            <FileText className="h-8 w-8 text-[#00FF88]" />
          </div>

          {/* Appointments */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <p className="text-gray-400 text-sm mb-4">Appointments Today</p>
            <p className="text-4xl font-bold text-white mb-6">{appointmentsCount}</p>
            <Calendar className="h-8 w-8 text-[#00FF88]" />
          </div>

          {/* Unpaid Invoices */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <p className="text-gray-400 text-sm mb-4">Unpaid Invoices</p>
            <p className="text-4xl font-bold text-white mb-6">{formatCurrency(unpaidInvoices)}</p>
            <DollarSign className="h-8 w-8 text-[#00FF88]" />
          </div>

          {/* Messages */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
            <p className="text-gray-400 text-sm mb-4">New Client Messages</p>
            <p className="text-4xl font-bold text-white mb-6">{newMessages}</p>
            <Mail className="h-8 w-8 text-[#00FF88]" />
          </div>
        </div>

        {/* TODAY Section */}
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
          <h2 className="text-lg font-bold text-white mb-4">TODAY - 16 MAY 2026</h2>
          <div className="space-y-4">
            {/* Appointment */}
            <div className="flex items-start gap-3 pb-4 border-b border-[#222]">
              <Calendar className="h-5 w-5 text-[#00FF88] mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">10:00am - Mrs Kago Motswedi</p>
                <p className="text-gray-400 text-sm">Land Dispute Consultation</p>
              </div>
            </div>

            {/* Case */}
            <div className="flex items-start gap-3 pb-4 border-b border-[#222]">
              <FileText className="h-5 w-5 text-[#00FF88] mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Case GLT-001 - Hearing in 2 days</p>
                <p className="text-gray-400 text-sm">Mr Dube Thabo vs ABC Properties</p>
              </div>
            </div>

            {/* Invoice */}
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Invoice P2,000 - Overdue 5 days</p>
                <p className="text-gray-400 text-sm">Filing Fees - GLT-002</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/cases">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00FF88] transition-colors cursor-pointer h-full">
              <p className="text-white font-bold mb-2">Manage Cases</p>
              <p className="text-gray-400 text-sm mb-4">View and update cases</p>
              <ArrowRight className="h-5 w-5 text-[#00FF88]" />
            </div>
          </Link>

          <Link href="/appointments">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00FF88] transition-colors cursor-pointer h-full">
              <p className="text-white font-bold mb-2">Schedule Appointments</p>
              <p className="text-gray-400 text-sm mb-4">View upcoming appointments</p>
              <ArrowRight className="h-5 w-5 text-[#00FF88]" />
            </div>
          </Link>

          <Link href="/invoices">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] hover:border-[#00FF88] transition-colors cursor-pointer h-full">
              <p className="text-white font-bold mb-2">Manage Invoices</p>
              <p className="text-gray-400 text-sm mb-4">Track payments and billing</p>
              <ArrowRight className="h-5 w-5 text-[#00FF88]" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
