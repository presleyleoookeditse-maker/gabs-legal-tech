'use client'

import { useAppStore } from '@/lib/app-store'
import Link from 'next/link'
import { ArrowLeft, Share2, Star, MoreVertical, FileText, Calendar, DollarSign, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-[#333] px-4 py-6">
        <div className="flex items-start justify-between mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#1a1a1a]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#1a1a1a]">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#1a1a1a]">
              <Star className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#1a1a1a]">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Welcome to Gabs Legal Tech</h1>
            <p className="mt-1 text-xs text-gray-500">Professional legal case & client management for Botswana law firms</p>
          </div>
          {/* Botswana Flag */}
          <svg width="32" height="24" viewBox="0 0 5 3" className="ml-4 shrink-0">
            <rect width="5" height="3" fill="#75AADB" />
            <rect y="1.125" width="5" height="0.75" fill="#FFFFFF" />
            <rect y="1.25" width="5" height="0.5" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Stats Row - 4 cards horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {/* Card 1: Active Cases */}
          <div className="flex-shrink-0 w-20 bg-[#1a1a1a] rounded-[12px] p-3 min-w-[80px]">
            <p className="text-xs text-gray-500 mb-2">Active Cases</p>
            <p className="text-2xl font-bold text-white">{activeCases}</p>
            <FileText className="h-5 w-5 text-green-500 mt-1 ml-auto" />
          </div>

          {/* Card 2: Appointments Today */}
          <div className="flex-shrink-0 w-20 bg-[#1a1a1a] rounded-[12px] p-3 min-w-[80px]">
            <p className="text-xs text-gray-500 mb-2">Appointments Today</p>
            <p className="text-2xl font-bold text-white">{todayAppointments}</p>
            <Calendar className="h-5 w-5 text-green-500 mt-1 ml-auto" />
          </div>

          {/* Card 3: Unpaid Invoices */}
          <div className="flex-shrink-0 w-28 bg-[#1a1a1a] rounded-[12px] p-3 min-w-[112px]">
            <p className="text-xs text-gray-500 mb-2">Unpaid Invoices</p>
            <p className="text-2xl font-bold text-white">P{unpaidInvoices.toLocaleString('en-BW')}</p>
            <DollarSign className="h-5 w-5 text-green-500 mt-1 ml-auto" />
          </div>

          {/* Card 4: New Messages */}
          <div className="flex-shrink-0 w-20 bg-[#1a1a1a] rounded-[12px] p-3 min-w-[80px]">
            <p className="text-xs text-gray-500 mb-2">New Messages</p>
            <p className="text-2xl font-bold text-white">{newMessages}</p>
            <Mail className="h-5 w-5 text-green-500 mt-1 ml-auto" />
          </div>
        </div>

        {/* Row 2: 2 cards 50/50 split */}
        <div className="grid grid-cols-2 gap-3">
          {/* Today Card */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-4">
            <p className="text-sm font-bold text-white">TODAY - {todayFormatted}</p>
            <p className="mt-2 text-xs text-gray-500">No appointments today</p>
          </div>

          {/* Upcoming Hearings Card */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-4">
            <p className="text-sm font-bold text-white">Upcoming Hearings</p>
            <p className="mt-2 text-xs text-gray-500">No hearings scheduled</p>
          </div>
        </div>

        {/* Row 3: 3 action cards 33/33/33 split */}
        <div className="grid grid-cols-3 gap-3">
          {/* Manage Cases */}
          <Link href="/cases">
            <div className="bg-[#1a1a1a] rounded-[12px] p-4 h-full cursor-pointer hover:bg-[#242424] transition-colors">
              <p className="text-sm font-bold text-white">Manage Cases</p>
              <p className="mt-1 text-[11px] text-gray-500">View and update cases</p>
              <ArrowRight className="h-4 w-4 text-green-500 mt-2" />
            </div>
          </Link>

          {/* Schedule Appointments */}
          <Link href="/appointments">
            <div className="bg-[#1a1a1a] rounded-[12px] p-4 h-full cursor-pointer hover:bg-[#242424] transition-colors">
              <p className="text-sm font-bold text-white">Schedule</p>
              <p className="mt-1 text-[11px] text-gray-500">View upcoming appointments</p>
              <ArrowRight className="h-4 w-4 text-green-500 mt-2" />
            </div>
          </Link>

          {/* Manage Invoices */}
          <Link href="/invoices">
            <div className="bg-[#1a1a1a] rounded-[12px] p-4 h-full cursor-pointer hover:bg-[#242424] transition-colors">
              <p className="text-sm font-bold text-white">Invoices</p>
              <p className="mt-1 text-[11px] text-gray-500">Track payments and billing</p>
              <ArrowRight className="h-4 w-4 text-green-500 mt-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
