'use client'

import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import { exportAppointmentsCSV, downloadCSV } from '@/lib/csv-export'

export default function AppointmentsPage() {
  const { appointments } = useAppStore()

  const handleExportCSV = () => {
    const csv = exportAppointmentsCSV(appointments)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Appointments_${today}.csv`, csv)
  }

  const sortedAppointments = [...appointments].sort((a, b) =>
    new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
  )

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map((apt) => (
            <Card key={apt.id} className="bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {apt.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(apt.date).toLocaleDateString('en-BW', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="font-semibold text-foreground">
                      {apt.clientName}
                    </p>
                    <p className="text-muted-foreground">{apt.caseType}</p>
                  </div>
                </div>
                <Badge
                  variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                >
                  {apt.status}
                </Badge>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-card p-6 text-center">
            <p className="text-muted-foreground">No appointments scheduled</p>
          </Card>
        )}
      </div>
    </main>
  )
}
