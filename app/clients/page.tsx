'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    caseType: '',
  })

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      console.log('New client:', formData)
      alert(`Client ${formData.name} created successfully!`)
      setFormData({ name: '', email: '', phone: '', address: '', caseType: '' })
      setShowModal(false)
    } else {
      alert('Please fill in all required fields')
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <Button onClick={() => setShowModal(true)} className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        </div>

        {/* New Client Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Add New Client</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Case Type</label>
                  <select
                    value={formData.caseType}
                    onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                  >
                    <option value="">Select case type</option>
                    <option value="Land Dispute">Land Dispute</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#00FF88] text-black hover:bg-[#00DD77]">
                    Create Client
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button className="bg-[#00FF88] text-black hover:bg-[#00DD77]">
          Login as Demo Client
        </Button>

        <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#222]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Client Portal - Demo User</h2>
            <div className="space-y-2">
              <p className="text-gray-400">Your Case: <span className="text-white font-bold">GLT-001 Land Dispute</span></p>
              <p className="text-gray-400">Next Hearing: <span className="text-white font-bold">20 May 2026</span></p>
              <p className="text-gray-400">Status: <span className="text-green-400 font-bold">Active</span></p>
              <p className="text-gray-400">Messages: <span className="text-white font-bold">2 new updates</span></p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
