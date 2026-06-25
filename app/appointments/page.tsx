'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Plus, Download, Calendar, X } from 'lucide-react'
import { useState } from 'react'

const initialAppointments = [
  { id: '1', date: '18 May 2026', time: '10:00am', client: 'Mrs Kago Motswedi', type: 'Land Dispute', status: 'Confirmed' },
  { id: '2', date: '20 May 2026', time: '2:00pm', client: 'Mr Dube Thabo', type: 'Case Review', status: 'Pending' },
  { id: '3', date: '22 May 2026', time: '9:00am', client: 'New Client', type: 'Consultation', status: 'Confirmed' },
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    client: '',
    date: '',
    time: '',
    type: '',
    status: 'Pending',
  })

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

  const handleSubmit = () => {
    if (formData.client && formData.date && formData.time && formData.type) {
      const newAppointment = {
        id: String(appointments.length + 1),
        date: formData.date,
        time: formData.time,
        client: formData.client,
        type: formData.type,
        status: formData.status,
      }
      setAppointments([...appointments, newAppointment])
      alert(`Appointment scheduled for ${formData.client}!`)
      setFormData({ client: '', date: '', time: '', type: '', status: 'Pending' })
      setShowModal(false)
    } else {
      alert('Please fill in all required fields')
    }
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
            <Button onClick={() => setShowModal(true)} className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
              <Plus className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* New Appointment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Appointment Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Appointment Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  >
                    <option value="">Select type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Case Review">Case Review</option>
                    <option value="Land Dispute">Land Dispute</option>
                    <option value="Document Signing">Document Signing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#00FF88] text-black hover:bg-[#00DD77]">
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {appointments.length > 0 ? (
            appointments.map((apt) => (
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
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No appointments scheduled yet. Create one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
