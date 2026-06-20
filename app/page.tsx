'use client'

import { useAppStore } from '@/lib/app-store'
import { AppLayout } from '@/components/app-layout'
import Link from 'next/link'
import { FileText, Calendar, DollarSign, Mail, ArrowRight } from 'lucide-react'

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
    return new Intl.NumberFormat('en-BW', {
      style: 'currency',
      currency: 'BWP',
    }).format(amount)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Row - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active Cases */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-5">
            <p className="text-sm text-gray-400 mb-3">Active Cases</p>
            <p className="text-4xl font-bold text-white mb-8">{activeCases}</p>
            <FileText className="h-6 w-6 text-green-500 ml-auto" />
          </div>

          {/* Card 2: Appointments Today */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-5">
            <p className="text-sm text-gray-400 mb-3">Appointments Today</p>
            <p className="text-4xl font-bold text-white mb-8">{todayAppointments}</p>
            <Calendar className="h-6 w-6 text-green-500 ml-auto" />
          </div>

          {/* Card 3: Unpaid Invoices */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-5">
            <p className="text-sm text-gray-400 mb-3">Unpaid Invoices</p>
            <p className="text-4xl font-bold text-white mb-8">{formatCurrency(unpaidInvoices)}</p>
            <DollarSign className="h-6 w-6 text-green-500 ml-auto" />
          </div>

          {/* Card 4: New Messages */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-5">
            <p className="text-sm text-gray-400 mb-3">New Messages</p>
            <p className="text-4xl font-bold text-white mb-8">{newMessages}</p>
            <Mail className="h-6 w-6 text-green-500 ml-auto" />
          </div>
        </div>

        {/* Row 2: 2 cards 50/50 split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Today Card */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-6">
            <p className="text-lg font-bold text-white">TODAY - {todayFormatted}</p>
            <p className="mt-3 text-sm text-gray-500">No appointments today</p>
          </div>

          {/* Upcoming Hearings Card */}
          <div className="bg-[#1a1a1a] rounded-[12px] p-6">
            <p className="text-lg font-bold text-white">Upcoming Hearings</p>
            <p className="mt-3 text-sm text-gray-500">No hearings scheduled</p>
          </div>
        </div>

        {/* Row 3: 3 action cards 33/33/33 split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </AppLayout>
  )
}
