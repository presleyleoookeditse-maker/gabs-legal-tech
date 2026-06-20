'use client'

import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Calendar, FileText, DollarSign, Mail } from 'lucide-react'

export default function HomePage() {
  const { cases, appointments, invoices } = useAppStore()

  const todayDate = new Date()
  const activeCases = cases.filter((c) => c.status === 'active').length
  const todayAppointments = appointments.filter(
    (a) => a.date === todayDate.toISOString().split('T')[0]
  ).length
  const unpaidInvoices = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const unreadMessages = 2

  const todayAppointmentsData = appointments
    .filter((a) => a.date === todayDate.toISOString().split('T')[0])
    .sort((a, b) => a.time.localeCompare(b.time))

  const upcomingCaseHearings = cases
    .filter((c) => c.status === 'active')
    .map((c) => {
      const hearingDate = new Date(c.nextHearing)
      const daysUntil = Math.ceil(
        (hearingDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      return { ...c, daysUntil }
    })
    .filter((c) => c.daysUntil >= 0 && c.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil)

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to Gabs Legal Tech
          </h1>
          <p className="mt-2 text-muted-foreground">
            Professional legal case & client management for Botswana law firms
          </p>
        </div>
        {/* Botswana Flag */}
        <div className="hidden shrink-0 sm:block">
          <svg width="80" height="54" viewBox="0 0 5 3" className="rounded shadow-md">
            <rect width="5" height="3" fill="#75AADB" />
            <rect y="1.125" width="5" height="0.75" fill="#FFFFFF" />
            <rect y="1.25" width="5" height="0.5" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Cases</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {activeCases}
              </p>
            </div>
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Appointments Today</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {todayAppointments}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                P{unpaidInvoices.toLocaleString('en-BW', { minimumFractionDigits: 0 })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Messages</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {unreadMessages}
              </p>
            </div>
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Today Timeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today Schedule */}
        <div className="lg:col-span-2">
          <Card className="bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                TODAY - {todayDate.toLocaleDateString('en-BW', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h2>
            </div>
            <div className="space-y-4">
              {todayAppointmentsData.length > 0 ? (
                todayAppointmentsData.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-start gap-4 border-l-2 border-primary py-2 pl-4"
                  >
                    <div className="text-sm font-semibold text-foreground">
                      {apt.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{apt.clientName}</p>
                      <p className="text-sm text-muted-foreground">{apt.caseType}</p>
                      <Badge
                        variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                        className="mt-2"
                      >
                        {apt.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No appointments today</p>
              )}
            </div>
          </Card>
        </div>

        {/* Upcoming Hearings */}
        <Card className="bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Upcoming Hearings
          </h2>
          <div className="space-y-3">
            {upcomingCaseHearings.length > 0 ? (
              upcomingCaseHearings.map((c) => (
                <div key={c.id} className="border-l-2 border-primary py-2 pl-4">
                  <p className="font-medium text-foreground">{c.caseNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.caseType}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    In {c.daysUntil} days
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No hearings scheduled</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/cases">
          <Card className="cursor-pointer bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Manage Cases</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  View and update cases
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </Link>

        <Link href="/appointments">
          <Card className="cursor-pointer bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Schedule Appointments</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  View upcoming appointments
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </Link>

        <Link href="/invoices">
          <Card className="cursor-pointer bg-card p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Manage Invoices</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track payments and billing
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </Link>
      </div>
    </main>
  )
}
