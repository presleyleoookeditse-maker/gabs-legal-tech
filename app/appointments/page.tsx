'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Download } from 'lucide-react'
import { exportAppointmentsCSV, downloadCSV } from '@/lib/csv-export'
import { useState } from 'react'

export default function AppointmentsPage() {
  const { appointments, addAppointment } = useAppStore()
  const [showNewForm, setShowNewForm] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    caseType: 'Consultation',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    status: 'pending',
  })

  const handleExportCSV = () => {
    const csv = exportAppointmentsCSV(appointments)
    const today = new Date().toISOString().split('T')[0]
    downloadCSV(`Appointments_${today}.csv`, csv)
  }

  const handleAddAppointment = () => {
    if (formData.clientName && formData.date && formData.time) {
      addAppointment({
        clientName: formData.clientName,
        caseType: formData.caseType,
        date: formData.date,
        time: formData.time,
        status: formData.status as 'confirmed' | 'pending',
      })
      setFormData({
        clientName: '',
        caseType: 'Consultation',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'pending',
      })
      setShowNewForm(false)
    }
  }

  if (showNewForm) {
    return (
      <AppLayout>
        <div className="max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Add New Appointment</h1>
            <Button
              variant="outline"
              onClick={() => setShowNewForm(false)}
            >
              Cancel
            </Button>
          </div>

          <Card className="bg-card p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Case Type</label>
                <select
                  value={formData.caseType}
                  onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                >
                  <option>Consultation</option>
                  <option>Case Review</option>
                  <option>Hearing Prep</option>
                  <option>Document Review</option>
                  <option>Follow-up</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>

              <Button
                onClick={handleAddAppointment}
                className="w-full"
              >
                Add Appointment
              </Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
  }

  const sortedAppointments = [...appointments].sort((a, b) =>
    new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
  )

  return (
    <AppLayout>
      <div className="space-y-6">
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
          <Button
            size="sm"
            className="gap-2"
            onClick={() => setShowNewForm(true)}
          >
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
      </div>
    </AppLayout>
  )
}
