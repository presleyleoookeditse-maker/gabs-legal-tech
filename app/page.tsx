'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Calendar, FileText } from 'lucide-react'

export default function HomePage() {
  const { cases, appointments, invoices } = useAppStore()

  const activeCases = cases.filter((c) => c.status === 'active').length
  const unpaidInvoices = invoices
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  const todayAppointments = appointments.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  ).length

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

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{activeCases}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
                <p className="mt-2 text-4xl font-bold text-foreground">P{unpaidInvoices.toLocaleString('en-BW')}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{todayAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/cases">
              <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                View Cases
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/appointments">
              <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                Appointments
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/invoices">
              <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                Invoices
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button className="w-full justify-between bg-foreground text-background hover:bg-foreground/90">
                Settings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Empty State Message */}
        <Card className="border-border bg-card p-12 text-center">
          <h3 className="text-xl font-semibold text-foreground">Welcome to Gabs Legal Tech</h3>
          <p className="mt-2 text-muted-foreground">
            Start by creating a new case, adding clients, or scheduling appointments using the navigation menu.
          </p>
        </Card>
      </div>
    </AppLayout>
  )
}
