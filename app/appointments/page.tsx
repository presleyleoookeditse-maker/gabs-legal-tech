'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Plus, Download, Calendar } from 'lucide-react'

const appointments = [
  { id: '1', date: '18 May 2026', time: '10:00am', client: 'Mrs Kago Motswedi', type: 'Land Dispute', status: 'Confirmed' },
  { id: '2', date: '20 May 2026', time: '2:00pm', client: 'Mr Dube Thabo', type: 'Case Review', status: 'Pending' },
  { id: '3', date: '22 May 2026', time: '9:00am', client: 'New Client', type: 'Consultation', status: 'Confirmed' },
]

export default function AppointmentsPage() {
  const downloadCSV = () => {
    const headers = ['Date', 'Time', 'Client', 'Type', 'Status']
    const rows = appointments.map((a) => [a.date, a.time, a.client, a.type, a.status])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Appointments_2026-05-16.csv'
    a.click()
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Appointments</h1>
          <div className="flex gap-2">
            <Button onClick={downloadCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#00FF88]" />
                  <div>
                    <p className="text-white font-bold">{apt.time} - {apt.client}</p>
                    <p className="text-gray-400 text-sm">{apt.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${apt.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {apt.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{apt.type}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
