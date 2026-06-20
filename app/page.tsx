'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Calendar, DollarSign, FileText, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const { cases, appointments, invoices } = useAppStore()

  const activeCases = cases.filter((c) => c.status === 'active').length
  const unpaidInvoices = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const paidInvoices = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const todayAppointments = appointments.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  ).length

  const recentCases = cases.slice(0, 5)
  const upcomingAppointments = appointments.slice(0, 3)

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            {new Date().toLocaleDateString('en-BW', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Key Metrics - Video Hook Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Cases */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{activeCases}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          {/* Unpaid Invoices - THE HOOK */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
                <p className="mt-2 text-4xl font-bold text-red-600">P{unpaidInvoices.toLocaleString('en-BW')}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </Card>

          {/* Paid Invoices - Show ROI */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid Invoices</p>
                <p className="mt-2 text-4xl font-bold text-green-600">P{paidInvoices.toLocaleString('en-BW')}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </Card>

          {/* Today's Appointments */}
          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{todayAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <div className="border-b border-border p-6">
                <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
              </div>
              <div className="divide-y divide-border">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-6">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{apt.clientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.caseType}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-foreground">{apt.time}</span>
                        <Badge
                          variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                        >
                          {apt.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No appointments scheduled
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/cases">
                <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                  View Cases
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/more-tools/timer">
                <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                  Billable Timer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/more-tools/templates">
                <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                  Templates
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/invoices">
                <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                  Invoices
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Cases */}
        <Card className="border-border bg-card">
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Recent Cases</h2>
              <Link href="/cases" className="text-sm text-blue-600 hover:underline">
                View all →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Case #</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Client</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Next Hearing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentCases.map((case_) => (
                  <tr key={case_.id} className="hover:bg-secondary/30">
                    <td className="px-6 py-4 text-sm font-mono text-foreground">{case_.caseNumber}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{case_.clientName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{case_.caseType}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={case_.status === 'active' ? 'default' : 'secondary'}>
                        {case_.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(case_.nextHearing).toLocaleDateString('en-BW', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
