'use client'

import { useAppStore } from '@/lib/app-store'
import Link from 'next/link'
import { FileText, Calendar, DollarSign, Mail, ArrowRight, ArrowLeft, Share2, Star, MoreVertical } from 'lucide-react'

export default function HomePage() {
  const { cases, appointments, invoices } = useAppStore()

  const activeCases = cases.filter((c) => c.status === 'active').length
  const unpaidInvoices = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const todayAppointments = appointments.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  ).length
  const newMessages = 2

  const todayDate = new Date()
  const todayFormatted = todayDate.toLocaleDateString('en-BW', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase()

  const formatCurrency = (amount: number) => {
    return `P${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <ArrowLeft className="h-5 w-5 text-white cursor-pointer hover:text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to Gabs Legal Tech</h1>
              <p className="text-sm text-gray-400">Professional legal case & client management for Botswana law firms</p>
            </div>
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-500" />
              <Star className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-500" />
              <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer hover:text-green-500" />
              <span className="text-2xl ml-2">🇧🇼</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Row - 4 cards horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {/* Card 1: Active Cases */}
            <div className="flex-shrink-0 min-w-[calc(25%-12px)] bg-[#1a1a1a] rounded-[12px] p-5">
              <p className="text-sm text-gray-400 mb-3">Active Cases</p>
              <p className="text-4xl font-bold text-white mb-8">{activeCases}</p>
              <FileText className="h-6 w-6 text-green-500" />
            </div>

            {/* Card 2: Appointments Today */}
            <div className="flex-shrink-0 min-w-[calc(25%-12px)] bg-[#1a1a1a] rounded-[12px] p-5">
              <p className="text-sm text-gray-400 mb-3">Appointments Today</p>
              <p className="text-4xl font-bold text-white mb-8">{todayAppointments}</p>
              <Calendar className="h-6 w-6 text-green-500" />
            </div>

            {/* Card 3: Unpaid Invoices */}
            <div className="flex-shrink-0 min-w-[calc(25%-12px)] bg-[#1a1a1a] rounded-[12px] p-5">
              <p className="text-sm text-gray-400 mb-3">Unpaid Invoices</p>
              <p className="text-4xl font-bold text-white mb-8">{formatCurrency(unpaidInvoices)}</p>
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>

            {/* Card 4: New Messages */}
            <div className="flex-shrink-0 min-w-[calc(25%-12px)] bg-[#1a1a1a] rounded-[12px] p-5">
              <p className="text-sm text-gray-400 mb-3">New Messages</p>
              <p className="text-4xl font-bold text-white mb-8">{newMessages}</p>
              <Mail className="h-6 w-6 text-green-500" />
            </div>
          </div>

          {/* Row 2: 2 cards 50/50 split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Today Card */}
            <div className="bg-[#1a1a1a] rounded-[12px] p-6">
              <p className="text-base font-bold text-white">TODAY - {todayFormatted}</p>
              <p className="mt-3 text-sm text-gray-500">No appointments today</p>
            </div>

            {/* Upcoming Hearings Card */}
            <div className="bg-[#1a1a1a] rounded-[12px] p-6">
              <p className="text-base font-bold text-white">Upcoming Hearings</p>
              <p className="mt-3 text-sm text-gray-500">No hearings scheduled</p>
            </div>
          </div>

          {/* Row 3: 3 action cards 33/33/33 split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Manage Cases */}
            <Link href="/cases">
              <div className="bg-[#1a1a1a] rounded-[12px] p-6 h-full cursor-pointer hover:bg-[#242424] transition-colors">
                <p className="text-base font-bold text-white">Manage Cases</p>
                <p className="mt-2 text-sm text-gray-500">View and update cases</p>
                <ArrowRight className="h-5 w-5 text-green-500 mt-4" />
              </div>
            </Link>

            {/* Schedule Appointments */}
            <Link href="/appointments">
              <div className="bg-[#1a1a1a] rounded-[12px] p-6 h-full cursor-pointer hover:bg-[#242424] transition-colors">
                <p className="text-base font-bold text-white">Schedule Appointments</p>
                <p className="mt-2 text-sm text-gray-500">View upcoming appointments</p>
                <ArrowRight className="h-5 w-5 text-green-500 mt-4" />
              </div>
            </Link>

            {/* Manage Invoices */}
            <Link href="/invoices">
              <div className="bg-[#1a1a1a] rounded-[12px] p-6 h-full cursor-pointer hover:bg-[#242424] transition-colors">
                <p className="text-base font-bold text-white">Manage Invoices</p>
                <p className="mt-2 text-sm text-gray-500">Track payments and billing</p>
                <ArrowRight className="h-5 w-5 text-green-500 mt-4" />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
